import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {encodeResult,decodeResult,editionsV1,currentEditions} from '../dist/share-results.js';
import {renderMVMethod} from '../dist/mv-method.js';
const source=fs.readFileSync(new URL('../dist/app-fixed.js',import.meta.url),'utf8').replace(/^import.*$/gm,'');
function app(hash=''){
  const nodes=new Map();
  const element=()=>({innerHTML:'',dataset:{},setAttribute(){},append(){},focus(){},select(){}});
  const buttons=[-1,0,1].map(answer=>({...element(),dataset:{answer}}));
  const document={documentElement:{dataset:{}},querySelector(s){if(s==='.network')return null;if(!nodes.has(s))nodes.set(s,element());return nodes.get(s)},querySelectorAll(s){return s==='[data-answer]'?buttons:[]},createElement:element};
  const de=editionsV1.germany,be=editionsV1.berlin;
  const context=vm.createContext({document,window:{addEventListener(){}},location:{hash,href:'https://example.com/'+hash,pathname:'/',search:''},history:{replaceState(){}},localStorage:{getItem(){return null}},URL,btoa,atob,encodeResult,decodeResult,editionsV1,currentEditions,renderMVMethod,germanyQuestions:de.questions,germanyParties:de.parties,germanySources:de.sources,rankGermany:de.rank,berlinQuestions:be.questions,berlinParties:be.parties,berlinSources:be.sources,rankBerlin:be.rank});
  vm.runInContext(source,context);
  return {nodes,buttons,read:expr=>vm.runInContext(expr,context)};
}
for(const edition of Object.keys(editionsV1)){
  for(const language of ['de','en'])for(const answers of [Array(21).fill(0),Array(21).fill(1),Array.from({length:21},(_,i)=>[-1,0,1][i%3])]){
    const hash=encodeResult(edition,answers,language,1),result=decodeResult(hash);
    assert.deepEqual(result.answers,answers);assert.equal(result.edition,edition);
    assert.deepEqual(result.data.rank(result.answers),editionsV1[edition].rank(answers));
    const a=app(hash);
    assert.equal(a.read('view'),'results');assert.equal(a.read('edition'),edition);assert.equal(a.read('language'),language);
    assert.ok(a.nodes.get('#app').innerHTML.includes('id="share-results"'));
    assert.ok(a.nodes.get('#app').innerHTML.includes('aria-label="common ground – home"'));
    assert.ok(!a.nodes.get('#app').innerHTML.includes('id="about"'));
    assert.equal(a.read('JSON.stringify(answers)'),JSON.stringify(answers));
    if(edition==='mv'){
      assert.ok(a.nodes.get('#app').innerHTML.includes('edition-notice'));
      assert.ok(result.data.rank(answers).every(r=>r.score===null));
      assert.ok(!a.nodes.get('#app').innerHTML.includes('2025 election programmes'));
    }
  }
  const a=app();
  a.nodes.get('#edition-menu').onclick({target:{closest:()=>({dataset:{edition}})}});
  assert.equal(a.read('edition'),edition);assert.equal(a.read('view'),'quiz');
  for(let i=0;i<21;i++)a.buttons[i%3].onclick();
  assert.equal(a.read('view'),'results');assert.equal(a.read('count()'),21);
  a.nodes.get('#review').onclick();assert.equal(a.read('view'),'quiz');
  a.nodes.get('#lang-en').onclick();assert.equal(a.read('language'),'en');
  a.nodes.get('#edition-menu').onclick({target:{closest:()=>({dataset:{edition:'germany'}})}});
  assert.equal(a.read('count()'),0);assert.equal(a.read('edition'),'germany');
}
for(const q of editionsV1.mv.questions){for(const key of ['topic','category','statement','pro','con']){assert.ok(q[key]);assert.ok(q.de[key]);}assert.equal(q.positions.length,7);}
assert.equal(editionsV1.mv.questions.flatMap(q=>q.positions).filter(v=>v!==null).length,6);
for(const hash of ['#v=3&edition=mv&answers='+ 'y'.repeat(21),'#v=2&edition=berlin&answers='+ 'y'.repeat(21),'#v=1&edition=bad&answers='+ 'y'.repeat(21),'#v=1&edition=mv&answers=y','#v=1&edition=mv&answers='+ 'x'.repeat(21),'#v=1&v=1&edition=mv&answers='+ 'y'.repeat(21),'#v=toString&edition=mv&answers='+ 'y'.repeat(21)])assert.throws(()=>decodeResult(hash));
assert.equal(decodeResult(''),null);
assert.throws(()=>encodeResult('mv',Array(21).fill(null)));
const mv=currentEditions.mv;
assert.equal(currentEditions.germany.questions.length,21);
assert.equal(currentEditions.germany.questions[9].key,'cost-of-living');
assert.equal(currentEditions.germany.questions[18].key,'internal-security');
assert.equal(currentEditions.germany.questions[19].key,'skilled-immigration');
assert.equal(currentEditions.germany.questions[20].key,'bureaucracy');
for(const q of currentEditions.germany.questions)assert.equal(q.positions.length,7);
assert.equal(mv.questions.length,21);
assert.equal(mv.questions.flatMap(q=>q.positions).filter(p=>p!==null).length,125);
assert.equal(new Set(mv.questions.map(q=>q.key)).size,21);
for(const q of mv.questions){
  assert.equal(q.positions.length,7);
  for(const key of ['topic','category','statement','pro','con']){assert.ok(q[key]);assert.ok(q.de[key]);}
  q.positions.forEach((p,j)=>{assert.ok([null,-1,0,0.5,1].includes(p));const e=q.evidenceNotes.find(e=>e.party===j);if(p!==null){assert.ok(e,`${q.id}/${j} lacks evidence`);assert.equal(e.position,p);assert.ok(e.url.startsWith('https://'));assert.ok(e.section);}else assert.equal(e,undefined);});
}
for(const language of ['de','en'])for(const answers of [Array(21).fill(1),Array(21).fill(-1),Array(21).fill(0),Array.from({length:21},(_,i)=>[-1,0,1][i%3])]){
  const hash=encodeResult('mv',answers,language),result=decodeResult(hash),a=app(hash);
  assert.equal(result.version,3);assert.equal(a.read('datasetVersion'),3);
  assert.deepEqual(result.answers,answers);assert.equal(a.read('view'),'results');
  assert.ok(!a.nodes.get('#app').innerHTML.includes('6 of 147'));
  assert.ok(!a.nodes.get('#app').innerHTML.includes('6 von 147'));
  assert.ok(a.nodes.get('#app').innerHTML.includes('125'));
  assert.ok(a.nodes.get('#app').innerHTML.includes('mv-evidence'));
  assert.equal(a.read('encodeResult(edition,answers,language,datasetVersion)'),hash);
  const ranked=mv.rank(answers);
  for(const r of ranked){
    const compared=mv.questions.flatMap((q,i)=>answers[i]&&q.positions[r.party]!==null?[[answers[i],q.positions[r.party]]]:[]);
    const expected=compared.length?Math.round(compared.reduce((sum,[a,p])=>sum+1-Math.abs(a-p)/2,0)/compared.length*100):null;
    assert.equal(r.count,compared.length);assert.equal(r.score,expected);
  }
  for(let i=1;i<ranked.length;i++)assert.ok((ranked[i-1].score??-1)>=(ranked[i].score??-1));
  a.nodes.get('#review').onclick();assert.ok(!a.nodes.get('#app').innerHTML.includes('mv-evidence'));
}
const onlyKita=Array(21).fill(0);onlyKita[0]=1;
assert.equal(mv.rank(onlyKita).find(r=>r.party===3).score,null);
assert.equal(mv.rank(Array(21).fill(1)).find(r=>r.party===3).count,12);
const oldMV=app(encodeResult('mv',Array(21).fill(1),'de',1));
assert.equal(oldMV.read('datasetVersion'),1);
assert.equal(decodeResult(oldMV.read('encodeResult(edition,answers,language,datasetVersion)')).version,1);
oldMV.nodes.get('#edition-menu').onclick({target:{closest:()=>({dataset:{edition:'mv'}})}});
assert.equal(oldMV.read('datasetVersion'),3);assert.equal(oldMV.read('count()'),0);
for(const edition of ['germany','berlin','mv']){
  const compact=encodeResult(edition,Array.from({length:21},(_,i)=>[-1,0,1][i%3]),'de');
  assert.match(compact,/^#v=3&e=(germany|berlin|mv)&r=[A-Za-z0-9_-]+&l=de$/);
  assert.ok(compact.length<55);assert.ok(!compact.includes('answers='));assert.deepEqual(decodeResult(compact).answers,Array.from({length:21},(_,i)=>[-1,0,1][i%3]));
}
for(const hash of ['#v=3&e=mv&r=00000000&l=de','#v=3&e=mv&r=AA&l=de','#v=3&e=mv&r=________&l=de','#v=3&e=mv&r=!!!!!!!!&l=de'])assert.throws(()=>decodeResult(hash));
console.log('PASS: three editions, bilingual full quiz flow, review, switching, v1/v3 links, compact sharing, MV scoring, coverage and 125 sourced positions.');
