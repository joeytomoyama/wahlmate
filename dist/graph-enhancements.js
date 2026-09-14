const style=document.createElement('style');
style.textContent='.rankings{display:none!important}.results-grid{grid-template-columns:1fr!important}.party-hit{cursor:pointer}.party-hit.active .party-node circle{stroke:#173f30;stroke-width:3}.party-hit.active .party-node text{font-weight:800}';
document.head.appendChild(style);
function enhanceGraph(svg){
  if(!svg||svg.dataset.enhanced||!svg.querySelector('.party-node'))return;
  svg.dataset.enhanced='true';
  const scores={},coverage={};
  document.querySelectorAll('.rank-item').forEach(row=>{const name=row.querySelector('strong')?.textContent,score=row.querySelector('.percent')?.textContent;if(name){scores[name]=score;coverage[name]=row.querySelector('.coverage')?.textContent||''}});
  svg.querySelectorAll('[data-node]').forEach(node=>{
    const text=node.querySelector('text'); if(!text)return;
    const full=text.textContent.replace(/^\d+\s+/, '');
    text.dataset.fullLabel=full;
    text.textContent=full;
    const title=document.createElementNS('http://www.w3.org/2000/svg','title');title.textContent=full;node.prepend(title);
  });
  const sortScore=node=>{const value=parseFloat(scores[node.querySelector('text').textContent.trim()]);return Number.isFinite(value)?value:-1};
  const order=[...svg.querySelectorAll('[data-party]')].sort((a,b)=>sortScore(b)-sortScore(a)||+a.dataset.party-+b.dataset.party).map(n=>+n.dataset.party);
  const graphHeight=Math.max(680,90+svg.querySelectorAll('[data-node]').length*34);
  svg.setAttribute('viewBox',`0 0 640 ${graphHeight}`);
  const headings=svg.querySelectorAll(':scope > text');
  headings[1]?.setAttribute('x','352');
  order.forEach((oldIndex,displayIndex)=>{
    const node=svg.querySelector(`[data-party="${oldIndex}"]`);if(!node)return;
    const wrapper=document.createElementNS('http://www.w3.org/2000/svg','g');
    wrapper.classList.add('party-hit');wrapper.dataset.party=oldIndex;
    wrapper.setAttribute('tabindex','0');wrapper.setAttribute('role','button');
    wrapper.setAttribute('transform',`translate(340 ${90+displayIndex*85})`);
    const hit=document.createElementNS('http://www.w3.org/2000/svg','rect');
    hit.setAttribute('x','-28');hit.setAttribute('y','-31');hit.setAttribute('width','330');hit.setAttribute('height','62');hit.setAttribute('fill','transparent');
    node.removeAttribute('data-party');node.removeAttribute('transform');node.setAttribute('transform','translate(0 0)');
    const label=node.querySelector('text');const name=label?.textContent.trim();
    if(label&&scores[name]){
      label.setAttribute('y','-3');
      if(name.length>22)label.style.fontSize='12px';
      const detail=document.createElementNS('http://www.w3.org/2000/svg','text');
      detail.classList.add('party-coverage');detail.setAttribute('x','16');detail.setAttribute('y','18');
      detail.textContent=coverage[name];node.append(detail);
      const nameSpan=document.createElementNS('http://www.w3.org/2000/svg','tspan');
      nameSpan.textContent=name;
      const score=document.createElementNS('http://www.w3.org/2000/svg','tspan');
      score.classList.add('party-score');score.setAttribute('dx','10');
      score.textContent=scores[name];score.style.fill=label.getAttribute('fill')||'currentColor';
      label.textContent='';label.append(nameSpan,score);
    }
    node.parentNode.insertBefore(wrapper,node);wrapper.append(hit,node);
    const enter=node.onmouseenter,leave=node.onmouseleave,click=node.onclick;
    node.onmouseenter=node.onmouseleave=node.onclick=null;
    node.removeAttribute('tabindex');node.removeAttribute('role');
    node.style.pointerEvents='none';hit.setAttribute('pointer-events','all');
    wrapper.setAttribute('aria-label',`${name}, ${scores[name]}, ${coverage[name]}`);
    wrapper.onmouseenter=()=>enter?.();wrapper.onmouseleave=()=>leave?.();wrapper.onclick=()=>click?.();
    wrapper.onfocus=()=>enter?.();wrapper.onblur=()=>leave?.();
    wrapper.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();wrapper.onclick()}};
    svg.querySelectorAll(`.edge[data-p="${oldIndex}"]`).forEach(edge=>{const y=+edge.dataset.q;const target=90+displayIndex*85;edge.setAttribute('d',`M215,${58+y*34}C275,${58+y*34} 280,${target} 340,${target}`)});
  });
  // Lay out horizontally in screen pixels; row spacing and height stay fixed.
  const fit=()=>{
    const width=svg.getBoundingClientRect?.().width||svg.clientWidth||0;
    if(!width)return;
    svg.style.height=`${graphHeight}px`;
    svg.setAttribute('viewBox',`0 0 ${width} ${graphHeight}`);
    // Keep a visible central network on narrow screens by giving the topic and
    // party columns a smaller share of the width before expanding the center.
    const usable=width-24,
      narrow=width<700,
      topicLimit=usable*(narrow?.28:.40),
      partyLimit=usable*(narrow?.28:.35);
    let topicWidth=0,partyNatural=0;
    const topicSize=Math.min(18,Math.max(12,width/35));
    svg.querySelectorAll('[data-node]').forEach(node=>{
      const text=node.querySelector('text');if(!text)return;
      text.style.fontSize=`${topicSize}px`;
      text.textContent=text.dataset.fullLabel;
      if(text.getComputedTextLength){while(text.getComputedTextLength()>topicLimit&&text.textContent.length>2)text.textContent=text.textContent.slice(0,-2)+'…';topicWidth=Math.max(topicWidth,text.getComputedTextLength());}
    });
    svg.querySelectorAll('.party-node text').forEach(text=>{if(text.getComputedTextLength)partyNatural=Math.max(partyNatural,text.getComputedTextLength());});
    const partyScale=Math.min(1,partyLimit/Math.max(1,partyNatural));
    const partyWidth=partyNatural*partyScale;
    const gap=narrow?12:Math.max(12,Math.min(36,(usable-topicWidth-partyWidth)/3));
    const topicX=12+topicWidth+gap;
    const partyX=width-12-partyWidth-gap;
    svg.querySelectorAll('[data-node] circle').forEach(circle=>circle.setAttribute('cx',topicX));
    headings[1]?.setAttribute('x',partyX+gap);
    order.forEach((party,index)=>{
      const wrapper=svg.querySelector(`[data-party="${party}"]`);if(!wrapper)return;
      const targetY=90+index*85;
      wrapper.setAttribute('transform',`translate(${partyX} ${targetY})`);
      wrapper.querySelector('rect')?.setAttribute('width',width-partyX+20);
      const node=wrapper.querySelector('.party-node');
      node.setAttribute('transform',`scale(${partyScale})`);
      node.querySelectorAll('text').forEach(text=>text.setAttribute('x',gap/partyScale));
      svg.querySelectorAll(`.edge[data-p="${party}"]`).forEach(edge=>{
        const y=58+Number(edge.dataset.q)*34,mid=(topicX+partyX)/2;
        edge.setAttribute('d',`M${topicX},${y}C${mid},${y} ${mid},${targetY} ${partyX},${targetY}`);
      });
    });
  };
  fit();
  document.fonts?.ready.then(fit);
  if(typeof ResizeObserver!=='undefined'){
    const resize=new ResizeObserver(()=>{if(!svg.isConnected){resize.disconnect();return;}fit()});
    resize.observe(svg);
  }
}
const observer=new MutationObserver(()=>enhanceGraph(document.querySelector('.network')));
observer.observe(document.body,{childList:true,subtree:true});
enhanceGraph(document.querySelector('.network'));
