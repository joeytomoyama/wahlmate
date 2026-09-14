// Version 1 datasets are immutable: retain them when introducing later editions.
import {questions,parties,sources,rank} from './data-v1.js';
import {berlinQuestions,berlinParties,berlinSources,rankBerlin} from './berlin-data-v1.js';
import {mvQuestions,mvParties,mvSources,rankMV} from './mv-data-v1.js';
import * as mv2026 from './mv-data-v2.js';
import {nationalQuestions,nationalParties,nationalSources,rankNational} from './data-v2.js';
export const editionsV1 = {
  germany: {questions,parties,sources,rank},
  berlin: {questions:berlinQuestions,parties:berlinParties,sources:berlinSources,rank:rankBerlin},
  mv: {questions:mvQuestions,parties:mvParties,sources:mvSources,rank:rankMV,preview:true}
};
export const currentEditions={germany:{questions:nationalQuestions,parties:nationalParties,sources:nationalSources,rank:rankNational,version:2},berlin:editionsV1.berlin,mv:{questions:mv2026.mvQuestions,parties:mv2026.mvParties,sources:mv2026.mvSources,rank:mv2026.rankMV,version:2}};
const versions={'1':editionsV1,'2':{germany:currentEditions.germany,mv:currentEditions.mv}};
export function encodeResult(edition, answers, language='de',version=edition==='mv'?2:1) {
  const registry=Object.hasOwn(versions,String(version))?versions[String(version)]:null;
  const data=registry&&Object.hasOwn(registry,edition)?registry[edition]:null;
  if(!data || answers.length!==data.questions.length || !answers.every(a=>[-1,0,1].includes(a))) throw Error('Incomplete result');
  return '#'+new URLSearchParams({v:String(version),edition,answers:answers.map(a=>a===1?'y':a===-1?'n':'-').join(''),lang:language==='en'?'en':'de'});
}
export function decodeResult(hash) {
  if(!hash || hash==='#') return null;
  const params=new URLSearchParams(hash.replace(/^#/,''));
  if(!params.has('answers')&&!params.has('v')) return null;
  if(['v','edition','answers','lang'].some(k=>params.getAll(k).length>1)) throw Error('Invalid link');
  const version=params.get('v');
  if(!Object.hasOwn(versions,version)) throw Error('Unsupported version');
  const edition=params.get('edition');
  const data=Object.hasOwn(versions[version],edition)?versions[version][edition]:null;
  const encoded=params.get('answers')||'';
  if(!data || encoded.length!==data.questions.length || !/^[yn-]+$/.test(encoded)) throw Error('Invalid answers');
  return {edition,version:Number(version),answers:[...encoded].map(a=>a==='y'?1:a==='n'?-1:0),language:params.get('lang')==='en'?'en':'de',data};
}
