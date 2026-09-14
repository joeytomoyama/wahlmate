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
    text.textContent=full.length>20?full.slice(0,19)+'…':full;
    const title=document.createElementNS('http://www.w3.org/2000/svg','title');title.textContent=full;node.prepend(title);
  });
  const sortScore=node=>{const value=parseFloat(scores[node.querySelector('text').textContent.trim()]);return Number.isFinite(value)?value:-1};
  const order=[...svg.querySelectorAll('[data-party]')].sort((a,b)=>sortScore(b)-sortScore(a)||+a.dataset.party-+b.dataset.party).map(n=>+n.dataset.party);
  svg.setAttribute('viewBox',`0 0 720 ${Math.max(680,90+svg.querySelectorAll('[data-node]').length*34)}`);
  order.forEach((oldIndex,displayIndex)=>{
    const node=svg.querySelector(`[data-party="${oldIndex}"]`);if(!node)return;
    const wrapper=document.createElementNS('http://www.w3.org/2000/svg','g');
    wrapper.classList.add('party-hit');wrapper.dataset.party=oldIndex;
    wrapper.setAttribute('tabindex','0');wrapper.setAttribute('role','button');
    wrapper.setAttribute('transform',`translate(485 ${90+displayIndex*85})`);
    const hit=document.createElementNS('http://www.w3.org/2000/svg','rect');
    hit.setAttribute('x','-28');hit.setAttribute('y','-31');hit.setAttribute('width','205');hit.setAttribute('height','62');hit.setAttribute('fill','transparent');
    node.removeAttribute('data-party');node.removeAttribute('transform');node.setAttribute('transform','translate(0 0)');
    const label=node.querySelector('text');const name=label?.textContent.trim();
    if(label&&scores[name]){
      label.setAttribute('y','-3');
      if(name.length>22)label.style.fontSize='12px';
      const detail=document.createElementNS('http://www.w3.org/2000/svg','text');
      detail.classList.add('party-coverage');detail.setAttribute('x','16');detail.setAttribute('y','18');
      detail.textContent=coverage[name];node.append(detail);
      const score=document.createElementNS('http://www.w3.org/2000/svg','text');
      score.classList.add('party-score');score.setAttribute('x','16');score.setAttribute('y','-22');
      score.textContent=scores[name];score.style.fill=label?.getAttribute('fill')||'currentColor';node.append(score);
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
    svg.querySelectorAll(`.edge[data-p="${oldIndex}"]`).forEach(edge=>{const y=+edge.dataset.q;const target=90+displayIndex*85;edge.setAttribute('d',`M215,${58+y*34}C350,${58+y*34} 350,${target} 485,${target}`)});
  });
}
const observer=new MutationObserver(()=>enhanceGraph(document.querySelector('.network')));
observer.observe(document.body,{childList:true,subtree:true});
enhanceGraph(document.querySelector('.network'));
