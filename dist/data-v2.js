// Immutable national snapshot with four high-salience replacements.
import {questions as v1Questions,parties,sources} from './data-v1.js';
const replacements=[
  {
    "id": 10,
    "key": "cost-of-living",
    "topic": "Cost of living",
    "category": "Economy & public services",
    "statement": "The government should prioritise reducing everyday living costs, even if this requires additional public spending.",
    "pro": "Targeted relief can protect household budgets when prices rise.",
    "con": "Broad subsidies are expensive and may delay structural solutions.",
    "positions": [
      0,
      1,
      1,
      -1,
      1,
      1,
      1
    ],
    "de": {
      "topic": "Lebenshaltungskosten",
      "category": "Wirtschaft & Staat",
      "statement": "Die Regierung sollte die Senkung der alltäglichen Lebenshaltungskosten priorisieren, auch wenn dafür mehr öffentliche Ausgaben nötig sind.",
      "pro": "Gezielte Entlastungen können Haushalte bei steigenden Preisen schützen.",
      "con": "Breite Zuschüsse sind teuer und können strukturelle Lösungen verzögern."
    }
  },
  {
    "id": 19,
    "key": "internal-security",
    "topic": "Internal security",
    "category": "Europe & security",
    "statement": "The federal government should give police and prosecutors more resources to fight serious crime, even if this increases public spending.",
    "pro": "More staff can improve prevention and help bring crimes to court.",
    "con": "Extra spending does not guarantee better results; prevention and oversight also matter.",
    "positions": [
      1,
      1,
      1,
      1,
      1,
      0,
      1
    ],
    "de": {
      "topic": "Innere Sicherheit",
      "category": "Europa & Sicherheit",
      "statement": "Der Bund sollte Polizei und Staatsanwaltschaften mehr Mittel zur Bekämpfung schwerer Kriminalität geben, auch wenn die öffentlichen Ausgaben steigen.",
      "pro": "Mehr Personal kann Prävention und Strafverfolgung verbessern.",
      "con": "Mehr Geld garantiert keine besseren Ergebnisse; auch Prävention und Kontrolle sind wichtig."
    }
  },
  {
    "id": 20,
    "key": "skilled-immigration",
    "topic": "Skilled immigration",
    "category": "Migration & rights",
    "statement": "Germany should make it easier for qualified workers from outside the EU to come and work here.",
    "pro": "Targeted immigration can help address labour shortages.",
    "con": "Recruitment from abroad cannot replace training at home and needs fair standards.",
    "positions": [
      1,
      1,
      1,
      1,
      -1,
      1,
      -1
    ],
    "de": {
      "topic": "Fachkräfteeinwanderung",
      "category": "Migration & Rechte",
      "statement": "Deutschland sollte qualifizierten Arbeitskräften aus Ländern außerhalb der EU die Einwanderung zur Arbeit erleichtern.",
      "pro": "Gezielte Einwanderung kann bei Fachkräftemangel helfen.",
      "con": "Zuwanderung ersetzt keine Ausbildung im Inland und braucht faire Standards."
    }
  },
  {
    "id": 21,
    "key": "bureaucracy",
    "topic": "Less bureaucracy",
    "category": "Economy & public services",
    "statement": "Germany should remove more regulations for businesses, even when this weakens some labour or environmental requirements.",
    "pro": "Fewer rules can speed up decisions and reduce costs.",
    "con": "Rolling back safeguards can weaken working conditions, consumer protection and environmental standards.",
    "positions": [
      1,
      0,
      1,
      1,
      1,
      -1,
      0
    ],
    "de": {
      "topic": "Weniger Bürokratie",
      "category": "Wirtschaft & Staat",
      "statement": "Deutschland sollte mehr Vorschriften für Unternehmen abbauen, auch wenn dadurch einige Arbeits- oder Umweltanforderungen schwächer werden.",
      "pro": "Weniger Regeln können Entscheidungen beschleunigen und Kosten senken.",
      "con": "Weniger Schutzvorschriften können Arbeitsbedingungen, Verbraucherschutz und Umweltstandards schwächen."
    }
  }
];
const byId=new Map(replacements.map(q=>[q.id,q]));
export const nationalQuestions=v1Questions.map(q=>byId.get(q.id)||q);
export const nationalParties=parties;
export const nationalSources=sources;
export const nationalCoverage=nationalQuestions.map(q=>q.positions.filter(p=>p!==null).length);
export function rankNational(answers){return parties.map((p,j)=>{let total=0,count=0;nationalQuestions.forEach((q,i)=>{const a=answers[i],pos=q.positions[j];if(![-1,1].includes(a)||pos===null)return;total+=1-Math.abs(a-pos)/2;count++});return {party:j,score:count?Math.round(total/count*100):null,count};}).sort((a,b)=>(b.score??-1)-(a.score??-1)||a.party-b.party);}

