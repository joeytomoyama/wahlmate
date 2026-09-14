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
currentEditions.germany.version=3;currentEditions.berlin={...editionsV1.berlin,version:3};currentEditions.mv.version=3;
const versions={'1':editionsV1,'2':{germany:currentEditions.germany,mv:currentEditions.mv},'3':currentEditions};
const answerAlphabet='012';
function packAnswers(answers){const bytes=[];for(let i=0;i<answers.length;i+=4){let byte=0;for(let j=0;j<4&&i+j<answers.length;j++)byte|=answerAlphabet.indexOf(String(answers[i+j]+1))<<(j*2);bytes.push(byte)}return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function unpackAnswers(encoded,length){if(!/^[A-Za-z0-9_-]+$/.test(encoded))throw Error('Invalid answers');const raw=atob(encoded.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-encoded.length%4)%4)),bytes=[...raw].map(c=>c.charCodeAt(0)),answers=[];for(const byte of bytes)for(let j=0;j<4&&answers.length<length;j++){const value=(byte>>(j*2))&3;if(value>2)throw Error('Invalid answers');answers.push(value-1)}if(answers.length!==length)throw Error('Invalid answers');return answers}
export function encodeResult(edition, answers, language='de',version=3) {
  const registry=Object.hasOwn(versions,String(version))?versions[String(version)]:null;
  const data=registry&&Object.hasOwn(registry,edition)?registry[edition]:null;
  if(!data || answers.length!==data.questions.length || !answers.every(a=>[-1,0,1].includes(a))) throw Error('Incomplete result');
  // Encoding is independent of the question snapshot: old results keep their
  // original dataset while every newly copied link uses compact answers.
  return '#'+new URLSearchParams({v:String(version),e:edition,r:packAnswers(answers),l:language==='en'?'en':'de'});
}
export function decodeResult(hash) {
  if(!hash || hash==='#') return null;
  const params=new URLSearchParams(hash.replace(/^#/,''));
  if(!params.has('answers')&&!params.has('v')) return null;
  if(['v','edition','answers','lang','e','r','l'].some(k=>params.getAll(k).length>1)) throw Error('Invalid link');
  const version=params.get('v');
  if(!Object.hasOwn(versions,version)) throw Error('Unsupported version');
  const compact=params.has('r')||version==='3';
  const edition=compact?params.get('e'):params.get('edition');
  const data=Object.hasOwn(versions[version],edition)?versions[version][edition]:null;
  const encoded=compact?params.get('r')||'':params.get('answers')||'';
  const answers=compact?unpackAnswers(encoded,data?.questions.length||0):[...encoded].map(a=>a==='y'?1:a==='n'?-1:0);
  if(!data || (!compact&&(encoded.length!==data.questions.length||!/^[yn-]+$/.test(encoded)))) throw Error('Invalid answers');
  return {edition,version:Number(version),answers,language:(compact?params.get('l'):params.get('lang'))==='en'?'en':'de',data};
}
