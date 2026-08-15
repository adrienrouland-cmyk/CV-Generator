import { mkdirSync, writeFileSync } from 'node:fs'

const out = new URL('./out/', import.meta.url)
mkdirSync(out, { recursive: true })

const C = {
  paper: '#F3F1E9', surface: '#FFFEFA', sage: '#526B4E', sageDark: '#3F553C',
  ink: '#25302A', muted: '#6D756F', border: '#DCE1D9', clay: '#C66B4F',
  stage: '#E3DDD1', pale: '#E8EEE4', white: '#FFFFFF', soft: '#F7F5EF'
}

const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const text = (x, y, value, size = 14, weight = 400, fill = C.ink, anchor = 'start', spacing = 0) =>
  `<text x="${x}" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(value)}</text>`
const lines = (x, y, values, size = 14, weight = 400, fill = C.ink, gap = 20) =>
  values.map((v, i) => text(x, y + i * gap, v, size, weight, fill)).join('')
const rect = (x, y, w, h, fill, r = 0, stroke = 'none', sw = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
const rule = (x1, y1, x2, y2, color = C.border, sw = 1) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}"/>`

const field = (x, y, label, value, w = 300) =>
  text(x, y, label, 13, 650) + rect(x, y + 12, w, 50, C.white, 10, C.border, 1) + text(x + 14, y + 44, value, 14, 400)
const button = (x, y, label, w = 132, fill = C.sage, color = C.surface) =>
  rect(x, y, w, 48, fill, 12) + text(x + w / 2, y + 30, label, 14, 650, color, 'middle')

const steps = (active) => {
  const labels = ['Profil', 'Formation', 'Expérience', 'Finalisation']
  const xs = [48, 442, 836, 1230]
  return labels.map((label, i) => {
    const on = i + 1 === active
    return rect(xs[i], 100, 36, 36, on ? C.sage : C.paper, 18, on ? C.sage : C.border, 1) +
      text(xs[i] + 18, 123, i + 1, 13, 800, on ? C.surface : C.muted, 'middle') +
      text(xs[i] + 48, 123, label, 14, on ? 700 : 500, on ? C.ink : C.muted)
  }).join('')
}

const cvPreview = (phase = 'complete') => {
  const education = phase === 'profile' ? '#DCE1D9' : C.ink
  const experience = ['profile', 'formation'].includes(phase) ? '#DCE1D9' : C.ink
  return `
    ${text(1177, 221, 'APERÇU EN DIRECT · FORMAT A4', 11, 800, C.sage, 'middle', 1)}
    <g filter="url(#shadow)">
      ${rect(838, 242, 680, 780, C.white, 0)}
      ${rect(838, 242, 202, 780, C.sage, 0)}
    </g>
    ${rect(868, 276, 58, 58, C.surface, 29)}${text(897, 313, 'AD', 18, 800, C.sage, 'middle')}
    ${text(868, 369, 'CONTACT', 11, 800, C.surface, 'start', 1)}
    ${lines(868, 397, ['Paris, France', 'adrien@email.com', '06 12 34 56 78', 'linkedin.com/in/adrien'], 10, 400, C.surface, 16)}
    ${text(868, 490, 'COMPÉTENCES', 11, 800, C.surface, 'start', 1)}
    ${['Product discovery','UX writing','Design systems','Analytics'].map((s,i)=>rect(868,506+i*42,138,30,C.sageDark,15)+text(937,526+i*42,s,9,500,C.surface,'middle')).join('')}
    ${text(1075, 305, 'ADRIEN', 34, 800)}${text(1075, 343, 'DEVIENNE', 34, 800)}
    ${text(1075, 371, 'PRODUCT MANAGER · PARIS', 11, 800, C.clay, 'start', 1)}
    ${rect(1075, 389, 64, 4, C.clay, 2)}
    ${text(1075, 431, 'PROFIL', 11, 800, C.sage, 'start', 1)}
    ${lines(1075, 458, ['Product manager orienté usage, je transforme les signaux terrain', 'en expériences simples, mesurables et désirables.'], 12, 400, C.ink, 18)}
    ${text(1075, 526, 'EXPÉRIENCE', 11, 800, C.sage, 'start', 1)}
    ${lines(1075, 553, ['2024 — Aujourd’hui  ·  Product Manager', 'Studio Produit — Paris', 'Discovery, priorisation et suivi des résultats.'], 11, 400, experience, 18)}
    ${text(1075, 644, 'FORMATION', 11, 800, C.sage, 'start', 1)}
    ${lines(1075, 671, ['2022  ·  Master Product Management', 'École du Numérique — Paris'], 11, 400, education, 18)}
  `
}

const desktop = ({ active, title, eyebrow, helper, editor, phase = 'complete', overlay = '' }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1616" height="1100" viewBox="0 0 1616 1100">
  <defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#25302A" flood-opacity=".15"/></filter></defs>
  ${rect(0, 0, 1616, 1100, C.paper, 24)}
  ${rect(0, 0, 1616, 76, C.ink, 24)}${rect(0, 52, 1616, 24, C.ink)}
  ${text(32, 47, 'ATELIER CV', 18, 800, C.surface, 'start', 1)}
  ${rect(1380, 20, 204, 36, '#35433A', 18)}${text(1482, 43, '●  Brouillon enregistré', 12, 650, '#DDEAD7', 'middle')}
  ${rect(0, 76, 1616, 84, C.surface)}${rule(0,160,1616,160,C.border,1)}${steps(active)}
  ${rect(28, 188, 710, 884, C.surface, 20, C.border, 1)}
  ${rect(766, 188, 822, 884, C.stage, 20)}
  ${text(60, 231, eyebrow, 12, 800, C.sage, 'start', 1.2)}
  ${text(60, 283, title, 32, 800)}
  ${text(60, 329, helper, 15, 400, C.muted)}
  ${editor}
  ${cvPreview(phase)}
  ${overlay}
</svg>`

const profileEditor = `
  ${field(60, 368, 'Prénom', 'Adrien', 305)}${field(381, 368, 'Nom', 'Devienne', 305)}
  ${field(60, 462, 'Adresse e-mail', 'adrien@email.com', 305)}${field(381, 462, 'Téléphone', '06 12 34 56 78', 305)}
  ${rect(60, 568, 626, 52, '#F1EEE4', 10)}${text(76, 600, 'Vos données restent dans votre navigateur.', 13, 500, C.muted)}
  ${button(544, 646, 'Continuer  →', 142)}
`

const formationEditor = `
  ${rect(60, 366, 626, 190, C.soft, 14, C.border, 1)}
  ${text(80, 397, 'FORMATION 01', 11, 800, C.sage, 'start', 1)}
  ${field(80, 421, 'Diplôme', 'Master Product Management', 280)}${field(376, 421, 'Établissement', 'École du Numérique', 280)}
  ${text(80, 532, '2020 — 2022 · Paris', 12, 600, C.muted)}
  ${rect(60, 572, 626, 74, C.white, 14, C.border, 1)}${text(80, 603, '+', 24, 500, C.sage)}${text(116, 602, 'Ajouter une formation', 14, 650, C.sage)}
  ${button(60, 694, '←  Retour', 116, C.soft, C.ink)}${button(544, 694, 'Continuer  →', 142)}
`

const experienceEditor = `
  ${rect(60, 366, 626, 226, C.soft, 14, C.border, 1)}
  ${text(80, 397, 'EXPÉRIENCE 01', 11, 800, C.sage, 'start', 1)}
  ${field(80, 421, 'Poste', 'Product Manager', 280)}${field(376, 421, 'Entreprise', 'Studio Produit', 280)}
  ${field(80, 505, 'Période', '2024 — Aujourd’hui', 280)}${field(376, 505, 'Lieu', 'Paris', 280)}
  ${rect(60, 610, 626, 74, C.white, 14, C.border, 1)}${text(80, 641, '+', 24, 500, C.sage)}${text(116, 640, 'Ajouter une expérience', 14, 650, C.sage)}
  ${button(60, 726, '←  Retour', 116, C.soft, C.ink)}${button(544, 726, 'Continuer  →', 142)}
`

const finalEditor = `
  ${text(60, 378, 'STYLE DU DOCUMENT', 11, 800, C.sage, 'start', 1)}
  ${rect(60, 394, 196, 104, C.sage, 14)}${text(158, 430, 'ATELIER', 14, 800, C.surface, 'middle')}${text(158, 458, 'Sélectionné', 11, 500, '#DDEAD7', 'middle')}
  ${rect(272, 394, 196, 104, C.soft, 14, C.border, 1)}${text(370, 445, 'MINIMAL', 14, 700, C.muted, 'middle')}
  ${rect(484, 394, 202, 104, C.soft, 14, C.border, 1)}${text(585, 445, 'ÉDITORIAL', 14, 700, C.muted, 'middle')}
  ${text(60, 542, 'COULEUR D’ACCENT', 11, 800, C.sage, 'start', 1)}
  ${['#526B4E','#C66B4F','#D6A85F','#355C6F','#493E52'].map((c,i)=>rect(60+i*58,560,42,42,c,21,i===0?C.ink:'none',i===0?3:0)).join('')}
  ${rect(60, 630, 626, 72, '#F1EEE4', 12)}${text(80, 660, '✓ Toutes les sections essentielles sont complètes', 13, 650, C.sageDark)}${text(80, 683, 'Le document est prêt à être exporté.', 12, 400, C.muted)}
  ${button(60, 742, '←  Retour', 116, C.soft, C.ink)}${button(486, 742, 'Télécharger le PDF', 200, C.clay, C.surface)}
`

const successOverlay = `
  ${rect(0,0,1616,1100,'#25302A',24)}<rect x="0" y="0" width="1616" height="1100" rx="24" fill="#25302A" opacity=".42"/>
  <g filter="url(#shadow)">${rect(489,300,638,430,C.surface,24)}</g>
  ${rect(754,346,108,108,C.pale,54)}${text(808,417,'✓',48,700,C.sage,'middle')}
  ${text(808,501,'Votre CV est prêt',30,800,C.ink,'middle')}
  ${text(808,544,'Le PDF a été généré au format A4.',15,400,C.muted,'middle')}
  ${button(646,588,'Ouvrir le PDF',156,C.sage,C.surface)}${button(814,588,'Créer une copie',156,C.soft,C.ink)}
  ${text(808,682,'CV_Adrien_Devienne.pdf · 128 Ko',12,500,C.muted,'middle')}
`

const emptyEditor = `
  ${rect(60, 380, 626, 240, C.soft, 16, C.border, 1)}
  ${rect(322, 420, 102, 102, C.pale, 51)}${text(373, 485, '✎', 40, 500, C.sage, 'middle')}
  ${text(373, 564, 'Commencez par votre profil', 20, 750, C.ink, 'middle')}
  ${text(373, 592, 'Quatre champs suffisent pour démarrer.', 13, 400, C.muted, 'middle')}
  ${button(287, 650, 'Remplir mon profil', 172)}
`

const emptyPreview = `
  ${text(1177,221,'APERÇU DU DOCUMENT',11,800,C.sage,'middle',1)}
  <g filter="url(#shadow)">${rect(838,242,680,780,C.white,0)}</g>
  ${rect(870,274,184,724,'#EEF1EA',0)}${rect(1088,290,276,28,'#EEF1EA',8)}${rect(1088,338,192,14,'#F3F1E9',7)}
  ${rect(1088,402,360,12,'#F3F1E9',6)}${rect(1088,428,318,12,'#F3F1E9',6)}
  ${text(1178,760,'Votre CV prend forme ici',18,700,C.muted,'middle')}${text(1178,790,'Les sections apparaissent au fil des étapes.',12,400,'#9BA19D','middle')}
`

writeFileSync(new URL('01-profile.svg', out), desktop({active:1,title:'Qui êtes-vous ?',eyebrow:'ÉTAPE 01 · IDENTITÉ',helper:'Ces informations apparaîtront en haut de votre CV.',editor:profileEditor,phase:'profile'}))
writeFileSync(new URL('02-formation.svg', out), desktop({active:2,title:'Votre parcours académique',eyebrow:'ÉTAPE 02 · FORMATION',helper:'Ajoutez les diplômes les plus pertinents pour ce poste.',editor:formationEditor,phase:'formation'}))
writeFileSync(new URL('03-experience.svg', out), desktop({active:3,title:'Vos expériences',eyebrow:'ÉTAPE 03 · EXPÉRIENCE',helper:'Décrivez les rôles qui démontrent le mieux votre impact.',editor:experienceEditor,phase:'experience'}))
writeFileSync(new URL('04-finalisation.svg', out), desktop({active:4,title:'Derniers réglages',eyebrow:'ÉTAPE 04 · FINALISATION',helper:'Choisissez la finition avant de générer votre document.',editor:finalEditor,phase:'complete'}))
writeFileSync(new URL('05-export-success.svg', out), desktop({active:4,title:'Derniers réglages',eyebrow:'ÉTAPE 04 · FINALISATION',helper:'Choisissez la finition avant de générer votre document.',editor:finalEditor,phase:'complete',overlay:successOverlay}))
writeFileSync(new URL('06-empty.svg', out), `
<svg xmlns="http://www.w3.org/2000/svg" width="1616" height="1100" viewBox="0 0 1616 1100">
<defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#25302A" flood-opacity=".12"/></filter></defs>
${rect(0,0,1616,1100,C.paper,24)}${rect(0,0,1616,76,C.ink,24)}${rect(0,52,1616,24,C.ink)}${text(32,47,'ATELIER CV',18,800,C.surface,'start',1)}
${rect(0,76,1616,84,C.surface)}${rule(0,160,1616,160,C.border,1)}${steps(1)}${rect(28,188,710,884,C.surface,20,C.border,1)}${rect(766,188,822,884,C.stage,20)}
${text(60,231,'NOUVEAU DOCUMENT',12,800,C.sage,'start',1)}${text(60,283,'Créez votre CV',32,800)}${text(60,329,'Avancez étape par étape, sans perdre le fil.',15,400,C.muted)}${emptyEditor}${emptyPreview}
</svg>`)

const mobileBase = (title, subtitle, body, footer) => `
<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">
  <defs><filter id="mshadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#25302A" flood-opacity=".14"/></filter></defs>
  ${rect(0,0,390,844,C.paper,24)}${rect(0,0,390,64,C.ink,24)}${rect(0,40,390,24,C.ink)}
  ${text(20,39,'ATELIER CV',15,800,C.surface,'start',.6)}${text(370,38,'•••',16,700,C.surface,'end')}
  ${text(20,101,title,24,800)}${text(20,128,subtitle,12,400,C.muted)}
  ${body}${footer}
</svg>`

const mobileProfile = mobileBase('Votre profil','Étape 1 sur 4',`
  ${rect(20,154,350,4,C.border,2)}${rect(20,154,88,4,C.sage,2)}
  ${field(20,194,'Prénom','Adrien',350)}${field(20,290,'Nom','Devienne',350)}${field(20,386,'Adresse e-mail','adrien@email.com',350)}${field(20,482,'Téléphone','06 12 34 56 78',350)}
  ${rect(20,590,350,58,'#F1EEE4',12)}${text(36,624,'Vos données restent dans ce navigateur.',12,500,C.muted)}
`,`${rect(0,760,390,84,C.surface)}${rule(0,760,390,760,C.border,1)}${button(208,778,'Continuer  →',162)}`)

const mobilePreview = mobileBase('Aperçu du CV','Mis à jour à l’instant',`
  ${rect(20,150,350,552,C.stage,18)}
  <g filter="url(#mshadow)">${rect(57,178,276,488,C.white,0)}${rect(57,178,82,488,C.sage,0)}</g>
  ${rect(70,196,30,30,C.surface,15)}${text(85,216,'AD',9,800,C.sage,'middle')}
  ${text(70,246,'CONTACT',7,800,C.surface)}${lines(70,265,['Paris','adrien@email.com','06 12 34 56 78'],6,400,C.surface,12)}
  ${text(157,218,'ADRIEN',17,800)}${text(157,238,'DEVIENNE',17,800)}${text(157,256,'PRODUCT MANAGER',7,800,C.clay)}
  ${text(157,292,'PROFIL',7,800,C.sage)}${lines(157,309,['Product manager orienté usage,','expériences simples et mesurables.'],7,400,C.ink,12)}
  ${text(157,360,'EXPÉRIENCE',7,800,C.sage)}${lines(157,377,['2024 — Aujourd’hui','Product Manager · Studio Produit'],7,400,C.ink,12)}
  ${text(157,430,'FORMATION',7,800,C.sage)}${lines(157,447,['2022 · Master Product Management','École du Numérique'],7,400,C.ink,12)}
`,`${rect(0,760,390,84,C.surface)}${rule(0,760,390,760,C.border,1)}${button(20,778,'Modifier',112,C.soft,C.ink)}${button(146,778,'Finaliser le CV',224,C.sage,C.surface)}`)

const mobileExport = mobileBase('Votre CV est prêt','Étape 4 sur 4',`
  ${rect(20,154,350,4,C.sage,2)}${rect(141,184,108,108,C.pale,54)}${text(195,254,'✓',44,700,C.sage,'middle')}
  ${text(195,330,'Prêt à être envoyé',24,800,C.ink,'middle')}${text(195,358,'Format A4 · 1 page · Atelier',12,400,C.muted,'middle')}
  ${rect(20,396,350,112,C.surface,16,C.border,1)}${text(40,427,'CV_Adrien_Devienne.pdf',14,700)}${text(40,452,'128 Ko · Mis à jour maintenant',11,400,C.muted)}${rect(310,420,40,40,C.pale,20)}${text(330,446,'↓',20,700,C.sage,'middle')}
  ${rect(20,530,350,78,'#F1EEE4',14)}${text(40,560,'Conseil Atelier',11,800,C.sage)}${text(40,585,'Relisez le PDF avant de l’envoyer.',12,400,C.muted)}
`,`${rect(0,740,390,104,C.surface)}${rule(0,740,390,740,C.border,1)}${button(20,762,'Télécharger le PDF',350,C.clay,C.surface)}`)

writeFileSync(new URL('m01-profile.svg', out), mobileProfile)
writeFileSync(new URL('m02-preview.svg', out), mobilePreview)
writeFileSync(new URL('m03-export.svg', out), mobileExport)

console.log('Generated 9 SVG mockups in', out.pathname)
