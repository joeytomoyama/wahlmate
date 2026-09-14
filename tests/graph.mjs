import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
// Small DOM fixture exercises the enhancement without launching a browser.
class Element {
  constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.attributes={};this.style={};this.textContent='';this.classes=new Set();this.classList={add:c=>this.classes.add(c)};}
  setAttribute(k,v){this.attributes[k]=String(v);}
  getAttribute(k){return this.attributes[k]??null;}
  removeAttribute(k){delete this.attributes[k];if(k==='data-party')delete this.dataset.party;}
  append(...nodes){for(const n of nodes){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(c=>c!==n);n.parentNode=this;this.children.push(n);}}
  appendChild(n){this.append(n);}
  prepend(n){n.parentNode=this;this.children.unshift(n);}
  insertBefore(n,target){n.parentNode=this;this.children.splice(this.children.indexOf(target),0,n);}
  querySelectorAll(selector){const matches=n=>selector[0]==='.'?n.classes.has(selector.slice(1)):selector==='[data-node]'?'node' in n.dataset:selector==='[data-party]'?'party' in n.dataset:selector.startsWith('[data-party=')?n.dataset.party===selector.match(/"(\d+)"/)[1]:selector.startsWith('.edge[')?false:n.tag===selector;return this.children.flatMap(n=>[...(matches(n)?[n]:[]),...n.querySelectorAll(selector)]);}
  querySelector(s){return this.querySelectorAll(s)[0]||null;}
}
const svg=new Element('svg');
let enters=0,leaves=0,clicks=0;
const names=['Unknown','Zero','Highest'];
const ranks=names.map((name,j)=>{const row=new Element('div'),label=new Element('strong'),percent=new Element('span'),coverage=new Element('span');label.textContent=name;percent.classes.add('percent');percent.textContent=['—','0%','100%'][j];coverage.classes.add('coverage');coverage.textContent=['0/21','12/21','20/21'][j]+' compared';row.append(label,percent,coverage);return row;});
names.forEach((name,j)=>{const node=new Element('g');node.classes.add('party-node');node.dataset.party=String(j);const label=new Element('text');label.textContent=name;node.append(label);node.onmouseenter=()=>enters++;node.onmouseleave=()=>leaves++;node.onclick=()=>clicks++;svg.append(node);});
const topic=new Element('g');topic.dataset.node='0';const text=new Element('text');text.textContent='01 Ein besonders langer deutscher Themenname';topic.append(text);svg.append(topic);
const document={head:new Element('head'),body:new Element('body'),createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),querySelector:s=>s==='.network'?svg:null,querySelectorAll:s=>s==='.rank-item'?ranks:[]};
vm.runInNewContext(fs.readFileSync(new URL('../dist/graph-enhancements.js',import.meta.url),'utf8'),{document,MutationObserver:class{observe(){}}});
const wrappers=svg.querySelectorAll('[data-party]');
assert.equal(wrappers.length,3);
assert.equal(wrappers.find(w=>String(w.dataset.party)==='2').attributes.transform,'translate(485 90)');
assert.equal(wrappers.find(w=>String(w.dataset.party)==='1').attributes.transform,'translate(485 175)');
assert.equal(wrappers.find(w=>String(w.dataset.party)==='0').attributes.transform,'translate(485 260)');
for(const wrapper of wrappers){assert.ok(wrapper.attributes['aria-label'].includes('compared'));const hit=wrapper.querySelector('rect');assert.equal(hit.attributes.width,'330');assert.equal(hit.attributes.height,'62');assert.equal(hit.attributes['pointer-events'],'all');wrapper.onmouseenter();wrapper.onmouseleave();wrapper.onfocus();wrapper.onblur();wrapper.onkeydown({key:'Enter',preventDefault(){}});assert.ok(wrapper.querySelector('.party-coverage'));}
assert.equal(enters,6);assert.equal(leaves,6);assert.equal(clicks,3);
assert.ok(text.textContent.endsWith('…'));assert.ok(topic.querySelector('title').textContent.includes('Themenname'));
console.log('PASS: graph sorting (including 0% vs unknown), coverage labels, enlarged hover targets and keyboard handlers.');
