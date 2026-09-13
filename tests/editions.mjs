import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {encodeResult,decodeResult,editionsV1} from '../dist/share-results.js';
const source=fs.readFileSync(new URL('../dist/app-fixed.js',import.meta.url),'utf8').replace(/^import.*$/gm,'');
function app(hash=''){
  const nodes=new Map();
  const element=()=>({innerHTML:'',dataset:{},setAttribute(){},append(){},focus(){},select(){}});
  const buttons=[-1,0,1].map(answer=>({...element(),dataset:{answer}}));
  const document={documentElement:{dataset:{}},querySelector(s){if(s==='.network')return null;if(!nodes.has(s))nodes.set(s,element());return nodes.get(s)},querySelectorAll(s){return s==='[data-answer]'?buttons:[]},createElement:element};
  const de=editionsV1.germany,be=editionsV1.berlin;
  const context=vm.createContext({document,window:{addEventListener(){}},location:{hash,href:'https://example.com/'+hash,pathname:'/',search:''},history:{replaceState(){}},localStorage:{getItem(){return null}},URL,encodeResult,decodeResult,editionsV1,germanyQuestions:de.questions,germanyParties:de.parties,germanySources:de.sources,rankGermany:de.rank,berlinQuestions:be.questions,berlinParties:be.parties,berlinSources:be.sources,rankBerlin:be.rank});
  vm.runInContext(source,context);
  return {nodes,buttons,read:expr=>vm.runInContext(expr,context)};
}
for(const edition of Object.keys(editionsV1)){
  for(const language of ['de','en'])for(const answers of [Array(21).fill(0),Array(21).fill(1),Array.from({length:21},(_,i)=>[-1,0,1][i%3])]){
    const hash=encodeResult(edition,answers,language),result=decodeResult(hash);
    assert.deepEqual(result.answers,answers);assert.equal(result.edition,edition);
    assert.deepEqual(result.data.rank(result.answers),editionsV1[edition].rank(answers));
    const a=app(hash);
    assert.equal(a.read('view'),'results');assert.equal(a.read('edition'),edition);assert.equal(a.read('language'),language);
    assert.ok(a.nodes.get('#app').innerHTML.includes('id="share-results"'));
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
for(const hash of ['#v=2&edition=mv&answers='+ 'y'.repeat(21),'#v=1&edition=bad&answers='+ 'y'.repeat(21),'#v=1&edition=mv&answers=y','#v=1&edition=mv&answers='+ 'x'.repeat(21),'#v=1&v=1&edition=mv&answers='+ 'y'.repeat(21)])assert.throws(()=>decodeResult(hash));
assert.equal(decodeResult(''),null);
assert.throws(()=>encodeResult('mv',Array(21).fill(null)));
console.log('PASS: three editions, both languages, full quiz flow, review, switching, sharing, invalid links and MV draft safeguards.');
