// Version 1 datasets are immutable: retain them when introducing later editions.
import {questions,parties,sources,rank} from './data-v1.js';
import {berlinQuestions,berlinParties,berlinSources,rankBerlin} from './berlin-data-v1.js';
export const editionsV1 = {
  germany: {questions,parties,sources,rank},
  berlin: {questions:berlinQuestions,parties:berlinParties,sources:berlinSources,rank:rankBerlin}
};
export function encodeResult(edition, answers, language='de') {
  const data=editionsV1[edition];
  if(!data || answers.length!==data.questions.length || !answers.every(a=>[-1,0,1].includes(a))) throw Error('Incomplete result');
  return '#'+new URLSearchParams({v:'1',edition,answers:answers.map(a=>a===1?'y':a===-1?'n':'-').join(''),lang:language==='en'?'en':'de'});
}
export function decodeResult(hash) {
  if(!hash || hash==='#') return null;
  const params=new URLSearchParams(hash.replace(/^#/,''));
  if(!params.has('answers')&&!params.has('v')) return null;
  if(['v','edition','answers','lang'].some(k=>params.getAll(k).length>1)) throw Error('Invalid link');
  if(params.get('v')!=='1') throw Error('Unsupported version');
  const edition=params.get('edition');
  const data=Object.hasOwn(editionsV1,edition)?editionsV1[edition]:null;
  const encoded=params.get('answers')||'';
  if(!data || encoded.length!==data.questions.length || !/^[yn-]+$/.test(encoded)) throw Error('Invalid answers');
  return {edition,answers:[...encoded].map(a=>a==='y'?1:a==='n'?-1:0),language:params.get('lang')==='en'?'en':'de',data};
}
