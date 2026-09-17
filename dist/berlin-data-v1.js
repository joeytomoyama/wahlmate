// Berlin 2026 edition. Positions are editorial readings of the parties' Berlin programmes.
export const berlinParties=[['CDU','CDU','#434750'],['SPD','SPD','#e64348'],['Bündnis 90 / Die Grünen','Bündnis 90 / Die Grünen','#23965c'],['FDP','FDP','#cfad00'],['AfD','AfD','#159ed3'],['Die Linke','Die Linke','#c63c83'],['BSW','BSW','#883b75']];
const rows=[
['Mieten','Wohnen','Berlin sollte einen landeseigenen Mietendeckel einführen.','Mehr Schutz kann Verdrängung bremsen und Haushalte kurzfristig entlasten.','Ein Deckel kann Investitionen und neuen Mietwohnungsbau bremsen.',[-1,1,1,-1,-1,1,1]],
['Vergesellschaftung','Wohnen','Große private Wohnungsunternehmen sollten gegen Entschädigung vergesellschaftet werden.','Öffentliche Kontrolle kann dauerhaft bezahlbare Mieten sichern.','Die Entschädigung wäre teuer und private Investitionen könnten zurückgehen.',[-1,0,1,-1,-1,1,1]],
['Neubau','Wohnen','Berlin sollte schneller und höher bauen, auch wenn dafür Regeln gelockert werden.','Mehr Angebot kann den Wohnungsmangel langfristig verringern.','Dichte und Lockerungen können Kieze, Klima und Wohnqualität belasten.',[1,1,0,1,1,-1,1]],
['Tempelhofer Feld','Stadtentwicklung','Auf dem Tempelhofer Feld sollte neuer Wohnraum entstehen dürfen.','Bauen auf einem großen innerstädtischen Areal schafft Wohnungen ohne neue Außenbezirke.','Die freie Fläche ist ein einzigartiger Erholungs- und Klimaraum.',[1,0,-1,1,1,-1,0]],
['Verkehrswende','Mobilität','Berlin sollte Autospuren zugunsten von Radwegen, Fußwegen und ÖPNV umverteilen.','Sicherere, klimafreundliche Wege nutzen mehr Menschen und schaffen Platz.','Weniger Autospuren können Pendeln und Lieferverkehr erschweren.',[1,0,1,-1,1,-1,-1]],
['A100','Mobilität','Der Ausbau der A100 sollte beendet werden.','Das spart Flächen und Geld und verhindert zusätzlichen Autoverkehr.','Eine leistungsfähige Straße kann Staus reduzieren und Bezirke verbinden.',[-1,0,1,-1,-1,1,1]],
['ÖPNV-Preis','Mobilität','Der Berliner Nahverkehr sollte deutlich günstiger oder teilweise kostenlos werden.','Niedrige Preise erleichtern Teilhabe und machen den Umstieg attraktiver.','Mindereinnahmen müssen ersetzt werden, während Angebot und Pünktlichkeit zählen.',[0,1,1,-1,0,1,1]],
['Schulessen','Bildung','Das Schulessen sollte für alle Berliner Kinder kostenlos sein.','Kostenloses Essen unterstützt Familien und verbessert Chancengleichheit.','Eine pauschale Leistung kostet viel und hilft auch Haushalten, die sie nicht brauchen.',[1,1,1,-1,-1,1,1]],
['Schulplätze','Bildung','Berlin sollte neue Schulen und Kitaplätze schneller bauen, auch mit vereinfachten Verfahren.','Schneller Ausbau entlastet Familien und verhindert überfüllte Einrichtungen.','Schnellverfahren können Qualität, Beteiligung und langfristige Planung schwächen.',[1,1,1,1,1,1,1]],
['Deutschförderung','Bildung','Kinder sollten vor der Einschulung verpflichtend an Sprachförderung teilnehmen, wenn sie Deutsch nicht ausreichend sprechen.','Frühe Sprachkenntnisse erleichtern Bildung und Integration.','Pflichten können Familien stigmatisieren und freie Zeit von Kindern begrenzen.',[1,0,-1,0.5,1,-1,1]],
['Polizei','Sicherheit','Berlin sollte mehr in Polizei und sichtbare Präsenz an Orten mit vielen Straftaten investieren.','Präsenz kann abschrecken und das Sicherheitsgefühl stärken.','Mehr Polizei allein löst soziale Ursachen nicht und kann marginalisierte Gruppen stärker kontrollieren.',[1,0,-1,1,1,-1,1]],
['Videoüberwachung','Sicherheit','Berlin sollte an Kriminalitätsschwerpunkten mehr Videoüberwachung einsetzen.','Aufnahmen können Ermittlungen unterstützen und abschrecken.','Überwachung greift in Privatsphäre ein und verhindert Straftaten nicht zuverlässig.',[1,0,-1,1,1,-1,1]],
['Aufenthalt','Integration','Berlin sollte geduldeten Menschen schneller eine sichere Aufenthaltsperspektive ermöglichen.','Sicherheit erleichtert Arbeit, Bildung und gesellschaftliche Teilhabe.','Befürworter strengerer Regeln sehen Anreize für irreguläre Migration und betonen einheitliche Verfahren.',[-1,1,1,-1,-1,1,-1]],
['Unterbringung','Integration','Berlin sollte Geflüchtete dezentral in regulären Wohnungen statt in großen Sammelunterkünften unterbringen.','Dezentrale Unterbringung fördert Selbstständigkeit und vermindert Konflikte.','Wohnraum ist knapp; große Einrichtungen können schneller und günstiger organisiert werden.',[0,1,1,-1,-1,1,1]],
['Kultur','Kultur','Berlin sollte Kulturangebote stärker öffentlich finanzieren, auch wenn dafür andere Ausgaben gekürzt werden müssten.','Kultur stärkt Stadtleben, Bildung und internationale Ausstrahlung.','Förderung ist teuer und politische Auswahl kann Freiheit und Vielfalt beeinflussen.',[0,1,1,-1,-1,1,0]],
['Klima','Klima','Berlin sollte seine Klimaneutralität deutlich vor 2045 erreichen.','Schneller Klimaschutz senkt Schäden und macht Berlin unabhängiger von fossilen Energien.','Ein zu hohes Tempo kann Mieten, Mobilität und Arbeitsplätze stärker belasten.',[1,0,1,-1,1,1,0]],
['Energie','Klima','Berlin sollte den Ausbau von Solarenergie auf öffentlichen und privaten Gebäuden verpflichtend beschleunigen.','Mehr Solarstrom senkt Emissionen und stärkt die lokale Versorgung.','Pflichten können Eigentümer finanziell belasten und technisch nicht überall sinnvoll sein.',[1,0,1,-1,0,1,0]],
['Krankenhäuser','Gesundheit','Berlin sollte Krankenhäuser und wichtige Gesundheitsangebote stärker in öffentlicher Hand sichern.','Öffentliche Steuerung kann Versorgung statt Rendite priorisieren.','Private Träger können investieren und effizient arbeiten; Verstaatlichung ist teuer.',[0,1,1,-1,-1,1,0]],
['Verwaltung','Berlin','Berlin sollte Verwaltungsleistungen vollständig digital anbieten, ohne Papierwege abzuschaffen.','Digitale Verfahren können Wartezeiten und Bürokratie verringern.','Menschen ohne digitale Zugänge dürfen nicht ausgeschlossen werden; Ausfälle sind riskant.',[1,1,0,1,-1,0,1]],
['Schuldenbremse','Finanzen','Berlin sollte für Investitionen mehr Kredite aufnehmen dürfen, auch wenn dafür die Schuldenbremse gelockert wird.','Investitionen in Schulen, Wohnungen und Infrastruktur zahlen sich langfristig aus.','Mehr Schulden engen künftige Haushalte ein und können Ausgaben disziplinlos machen.',[-1,1,1,-1,-1,1,1]],
['Olympia','Berlin','Berlin sollte sich um die Austragung Olympischer Spiele bewerben.','Große Spiele können Infrastruktur, Sport und internationale Aufmerksamkeit bringen.','Kosten, Verdrängung und unklare Folgelasten sprechen gegen die Bewerbung.',[1,0,-1,1,1,-1,-1]]
];
const deCats={Wohnen:'Wohnen',Stadtentwicklung:'Stadtentwicklung',Mobilität:'Mobilität',Bildung:'Bildung',Sicherheit:'Sicherheit',Integration:'Integration',Kultur:'Kultur',Klima:'Klima',Gesundheit:'Gesundheit',Berlin:'Berlin',Finanzen:'Finanzen'};
const enCats={Wohnen:'Housing',Stadtentwicklung:'Urban development',Mobilität:'Mobility',Bildung:'Education',Sicherheit:'Safety',Integration:'Integration',Kultur:'Culture',Klima:'Climate',Gesundheit:'Healthcare',Berlin:'Berlin',Finanzen:'Finance'};
const enStatements=[
'Berlin should introduce a state-level rent cap.',
'Large private housing companies should be brought into public ownership in exchange for compensation.',
'Berlin should allow faster and taller construction, even if some rules have to be relaxed.',
'New housing should be allowed on parts of Tempelhofer Feld.',
'Berlin should reallocate car lanes to cycling, walking and public transport.',
'Further construction of the A100 motorway should be stopped.',
'Berlin public transport should become substantially cheaper or partly free.',
'School meals should be free for every child in Berlin.',
'Berlin should build new schools and childcare places faster, including through simplified procedures.',
'Children with insufficient German should be required to attend language support before starting school.',
'Berlin should invest more in police and visible presence in places with high levels of crime.',
'Berlin should use more video surveillance at crime hotspots.',
'Berlin should give people with tolerated status a secure residence perspective more quickly.',
'Berlin should house refugees in ordinary homes across the city rather than large collective accommodation.',
'Berlin should provide more public funding for culture, even if other spending has to be reduced.',
'Berlin should reach climate neutrality substantially before 2045.',
'Berlin should accelerate solar power on public and private buildings through mandatory requirements.',
'Berlin should keep hospitals and essential healthcare services more strongly in public ownership.',
'Berlin should offer all administrative services digitally while retaining paper-based access.',
'Berlin should be allowed to borrow more for investment, even if the debt brake has to be relaxed.',
'Berlin should apply to host the Olympic Games.'
];
export const berlinQuestions=rows.map(([topic,category,statement,pro,con,positions],i)=>({id:i+1,topic,category,statement,pro,con,positions,de:{topic,category,statement,pro,con},en:{topic:{Mieten:'Rents',Vergesellschaftung:'Public ownership',Neubau:'New housing',['Tempelhofer Feld']:'Tempelhofer Feld',Verkehrswende:'Transport shift',A100:'A100 motorway',['ÖPNV-Preis']:'Public transport fares',Schulessen:'School meals',Schulplätze:'School places',Deutschförderung:'German support',Polizei:'Police',Videoüberwachung:'CCTV',Aufenthalt:'Residence status',Unterbringung:'Accommodation',Kultur:'Culture',Klima:'Climate',Energie:'Energy',Krankenhäuser:'Hospitals',Verwaltung:'Administration',Schuldenbremse:'Debt brake',Olympia:'Olympics'}[topic],category:enCats[category],statement:enStatements[i],pro,con}}));
export const berlinSources=[['CDU','https://berlin-wird.de/image/uploads/data/regierungsprogramm2026_2031.pdf'],['SPD','https://spd.berlin/wahlprogramm/'],['Bündnis 90 / Die Grünen','https://gruene.berlin/wahlprogramm-neu/unser-wahlprogramm-praeambel'],['FDP','https://www.fdp-berlin.de/wahlprogramm'],['AfD','https://afd.berlin/abgeordnetenhauswahl/'],['Die Linke','https://www.die-linke-berlin.de/positionen/wahlprogramm/'],['BSW','https://bsw.berlin/']];
export function rankBerlin(answers){return berlinParties.map((p,j)=>{let total=0,count=0;berlinQuestions.forEach((q,i)=>{if(!answers[i]||q.positions[j]===null)return;total+=1-Math.abs(answers[i]-q.positions[j])/2;count++});return{party:j,score:count?Math.round(total/count*100):null,count}}).sort((a,b)=>(b.score??-1)-(a.score??-1)||a.party-b.party)}
