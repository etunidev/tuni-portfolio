'use strict'

const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const ROOT = path.join(__dirname, '..')

const portfolioPath = path.join(ROOT, 'app/src/assets/portfolio.json')
const privatePath = path.join(__dirname, 'portfolio-private.json')
const photoPath = path.join(ROOT, 'app/src/assets/tuni.png')
const outputPublicPath = path.join(ROOT, 'app/public/cv-tunahan-erbay.pdf')
const outputPrivatePath = path.join(__dirname, 'cv-tunahan-erbay-private.pdf')

const forcePublic = process.argv.includes('--public')

const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))

let privateData = {}
let hasPrivate = false
if (!forcePublic) {
  try {
    privateData = JSON.parse(fs.readFileSync(privatePath, 'utf8'))
    hasPrivate = true
    console.log('✓ Private data loaded')
  } catch {
    console.log('ℹ No portfolio-private.json — using public data only')
  }
} else {
  console.log('ℹ --public flag set — skipping private data')
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function mergeDeep(base, override) {
  const result = { ...base }

  for (const key of Object.keys(override ?? {})) {
    result[key] = isObject(override[key]) && isObject(base[key])
      ? mergeDeep(base[key], override[key])
      : override[key]
  }

  return result
}

const data = mergeDeep(portfolio, privateData)

let photoDataUrl = ''
try {
  const buf = fs.readFileSync(photoPath)
  const ext = path.extname(photoPath).slice(1).toLowerCase()
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`
  photoDataUrl = `data:${mime};base64,${buf.toString('base64')}`
} catch {
  console.log('ℹ No profile photo found')
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatDate(value) {
  if (value === null) return 'Present'
  if (!value) return ''

  const [year, month] = String(value).split('-')
  if (!month) return year

  return `${MONTHS[Number(month) - 1]} ${year}`
}

function period(entry) {
  const start = formatDate(entry.startDate)
  const end = formatDate(entry.endDate)

  if (start && end) return `${start} – ${end}`
  if (start && !end) return `${start} – Present`
  if (!start && end) return end

  return ''
}

function yearsOfExperience(startYear, startMonth, startDay) {
  const start = new Date(startYear, startMonth - 1, startDay)
  const today = new Date()
  let years = today.getFullYear() - start.getFullYear()
  const m = today.getMonth() - start.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < start.getDate())) years--
  return `${years}+`
}

function tag(value) {
  return `<span class="tag">${esc(value)}</span>`
}

function renderTags(items = [], limit = Infinity) {
  return items.slice(0, limit).map(tag).join('')
}

function renderSectionTitle(title) {
  return `<div class="section-title">${esc(title)}</div>`
}

function renderInfo(label, value) {
  if (!value) return ''

  return `
    <div class="info-row">
      <span class="info-label">${esc(label)}</span>
      <span class="info-value">${value}</span>
    </div>
  `
}

function renderLanguage(language) {
  return `
    <div class="language">
      <span class="language-name">${esc(language.language)}</span>
      <span class="language-fluency">${esc(language.fluency)}</span>
    </div>
  `
}

function renderTimelineHeader(entry, subtitle = '') {
  const date = period(entry)
  const location = [entry.organization, entry.location].filter(Boolean).join(', ')

  return `
    <div class="timeline-header">
      <div class="timeline-meta">
        ${date ? `<div>${esc(date)}</div>` : ''}
        ${location ? `<div>${esc(location)}</div>` : ''}
        ${subtitle ? `<div>${esc(subtitle)}</div>` : ''}
      </div>
      <div class="timeline-title">
        ${esc(entry.title)}
        ${entry.certified ? '<span class="badge">Certified</span>' : ''}
      </div>
    </div>
  `
}

function renderEducation(entry) {
  return `
    <div class="entry">
      ${renderTimelineHeader(entry)}
      ${entry.summary ? `<p class="summary">${esc(entry.summary)}</p>` : ''}
    </div>
  `
}

function renderExperience(entry) {
  return `
    <div class="entry">
      ${renderTimelineHeader(entry)}
      ${entry.summary ? `<p class="summary">${esc(entry.summary)}</p>` : ''}

      ${entry.achievements?.length ? `
        <ul class="bullets">
          ${entry.achievements.map(item => `<li>${esc(item)}</li>`).join('')}
        </ul>
      ` : ''}

      ${entry.skills?.length ? `
        <div class="tags">${renderTags(entry.skills, 18)}</div>
      ` : ''}
    </div>
  `
}

function renderProject(entry) {
  return `
    <div class="project">
      <div class="project-head">
        <div>
          <div class="project-title">${esc(entry.title)}</div>
          <div class="project-meta">
            ${esc([entry.organization, entry.location].filter(Boolean).join(' — '))}
          </div>
        </div>
        <div class="project-date">${esc(period(entry))}</div>
      </div>

      ${entry.summary ? `<p class="summary">${esc(entry.summary)}</p>` : ''}

      ${entry.achievements?.length ? `
        <ul class="bullets">
          ${entry.achievements.slice(0, 2).map(item => `<li>${esc(item)}</li>`).join('')}
        </ul>
      ` : ''}

      ${entry.skills?.length ? `
        <div class="tags">${renderTags(entry.skills, 10)}</div>
      ` : ''}
    </div>
  `
}

function renderCourse(entry) {
  const date = period(entry)
  const skills = entry.skills?.length ? ` — ${entry.skills.join(', ')}` : ''

  return `
    <li>
      <strong>${esc(entry.title)}</strong>
      ${entry.certified ? '<span class="badge">Certified</span>' : ''}
      <span class="muted">
        ${entry.organization ? `, ${esc(entry.organization)}` : ''}
        ${date ? ` (${esc(date)})` : ''}
        ${skills ? esc(skills) : ''}
      </span>
    </li>
  `
}

function renderSkills(skills = {}) {
  const groups = [
    ['Backend', skills.backend],
    ['Frontend', skills.frontend],
    ['DevOps', skills.devops],
    ['Tools', skills.tools],
    ['Methods', skills.methods]
  ]

  return `
    <div class="skills-grid">
      ${groups
        .filter(([, items]) => items?.length)
        .map(([title, items]) => `
          <div class="skill-group">
            <div class="skill-title">${esc(title)}</div>
            <div class="tags">${renderTags(items)}</div>
          </div>
        `)
        .join('')}
    </div>
  `
}

function generateHTML(d, isPrivate = false) {
  const hero = d.hero ?? {}
  const about = d.about ?? {}
  const skills = d.skills ?? {}

  const yoe = yearsOfExperience(2018, 6, 1)
  const intro = (hero.introduction ?? '').replace('{yearsOfExperience}', yoe)

  const contactPublic = [
    about.email    && renderInfo('Email', `<a href="mailto:${esc(about.email)}">${esc(about.email)}</a>`),
    about.location && renderInfo('Location', esc(about.location)),
    about.linkedin && renderInfo('LinkedIn', `<a href="${esc(about.linkedin)}">${esc(about.linkedin.replace('https://', ''))}</a>`),
    about.github   && renderInfo('GitHub', `<a href="${esc(about.github)}">${esc(about.github.replace('https://', ''))}</a>`),
  ].filter(Boolean).join('')

  const contactPrivate = [
    about.phone    && renderInfo('Phone', `<a href="tel:${esc(about.phone)}">${esc(about.phone)}</a>`),
    about.email    && renderInfo('Email', `<a href="mailto:${esc(about.email)}">${esc(about.email)}</a>`),
    about.linkedin && renderInfo('LinkedIn', `<a href="${esc(about.linkedin)}">${esc(about.linkedin.replace('https://', ''))}</a>`),
    about.github   && renderInfo('GitHub', `<a href="${esc(about.github)}">${esc(about.github.replace('https://', ''))}</a>`),
  ].filter(Boolean).join('')

  const personalien = [
    about.address     && renderInfo('Address', esc(about.address)),
    about.birthDate   && renderInfo('Date of Birth', esc(about.birthDate)),
    about.nationality && renderInfo('Nationality', esc(about.nationality)),
    about.permit      && renderInfo('Work Permit', esc(about.permit)),
    about.civilStatus && renderInfo('Civil Status', esc(about.civilStatus)),
  ].filter(Boolean).join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(hero.name)} CV</title>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4;
    margin: 0;
  }

  body {
    width: 210mm;
    min-height: 297mm;
    font-family: Carlito, Calibri, Arial, sans-serif;
    color: #333;
    font-size: 10pt;
    line-height: 1.35;
    background: linear-gradient(to right, #d3d3d3 0, #d3d3d3 8cm, white 8cm, white 100%);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .header {
    position: relative;
    z-index: 1;
    height: 4.4cm;
    background: #444;
    color: white;
    padding: 1cm 1cm 0.6cm 1cm;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .header-left {
    flex: 1;
  }

  .name {
    font-size: 27pt;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    line-height: 1;
  }

  .intro {
    margin-top: 10px;
    max-width: 13cm;
    font-size: 9.4pt;
    line-height: 1.6;
    color: #eee;
  }

  .photo {
    width: 3cm;
    height: 3cm;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 0 0 2px #22b8cf;
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
  }

  .sidebar {
    width: 8cm;
    flex-shrink: 0;
    padding: 0.55cm 1cm 1cm;
  }

  .sidebar-skills,
  .main-page-break {
    break-before: page;
    padding-top: 0.55cm;
  }

  .main {
    flex: 1;
    background: white;
    padding: 0.55cm 1cm 1cm;
  }

  .section-title {
    font-size: 11pt;
    font-weight: 800;
    color: #111;
    text-transform: uppercase;
    border-bottom: 1pt solid #111;
    padding-bottom: 2px;
    margin: 12px 0 7px;
    break-after: avoid;
  }

  .section-title:first-child {
    margin-top: 0;
  }

  .info-row {
    margin-bottom: 6px;
    font-size: 8.8pt;
  }

  .info-label {
    display: block;
    color: #5b6b73;
    font-style: italic;
    margin-bottom: 1px;
  }

  .info-value {
    display: block;
    font-weight: 700;
    word-break: break-word;
  }

  .language {
    margin-bottom: 7px;
  }

  .language-name {
    display: block;
    color: #5b6b73;
    font-style: italic;
    font-size: 9pt;
  }

  .language-fluency {
    display: block;
    font-weight: 700;
    font-size: 9pt;
  }

  .sidebar-text {
    font-size: 8.8pt;
    line-height: 1.5;
  }

  .entry {
    margin-bottom: 5px;
    padding-top: 6px;
    padding-bottom: 11px;
    border-bottom: 1px solid #e2e2e2;
    break-inside: avoid;
  }

  .section-group > .entry:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .timeline-header {
    display: flex;
    gap: 8px;
    margin-bottom: 3px;
  }

  .timeline-meta {
    width: 40%;
    flex-shrink: 0;
    color: #666;
    font-size: 8.2pt;
    line-height: 1.4;
  }

  .timeline-meta div::before {
    content: "▸ ";
    color: #22b8cf;
  }

  .timeline-title {
    flex: 1;
    color: #111;
    font-size: 11pt;
    font-weight: 800;
    line-height: 1.25;
  }

  .summary {
    font-size: 8.7pt;
    color: #444;
    margin: 3px 0 4px;
    line-height: 1.45;
  }

  .bullets {
    list-style: none;
    margin: 3px 0 5px;
  }

  .bullets li {
    position: relative;
    padding-left: 12px;
    margin-bottom: 2px;
    font-size: 8.6pt;
    line-height: 1.4;
  }

  .bullets li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #333;
  }

  .tags {
    margin-top: 3px;
  }

  .tag {
    display: inline-block;
    background: rgba(34, 184, 207, 0.1);
    border: 1px solid rgba(34, 184, 207, 0.3);
    border-radius: 999px;
    padding: 1px 7px;
    margin: 1px 2px 1px 0;
    font-size: 8pt;
    color: #0e7d92;
  }

  .badge {
    display: inline-block;
    border: 1px solid #aaa;
    border-radius: 3px;
    padding: 1px 5px;
    margin-left: 4px;
    font-size: 7.6pt;
    color: #555;
    font-weight: 700;
    vertical-align: middle;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 18px;
    row-gap: 8px;
  }

  .sidebar .skills-grid {
    grid-template-columns: 1fr;
    row-gap: 7px;
  }

  .skill-title {
    color: #5b6b73;
    font-style: italic;
    font-size: 9pt;
    margin-bottom: 3px;
  }

  .project {
    margin-bottom: 4px;
    padding-top: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e2e2;
    break-inside: avoid;
  }

  .section-group > .project:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .project-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .project-title {
    font-size: 10.2pt;
    font-weight: 800;
    color: #111;
  }

  .project-meta {
    font-size: 8.2pt;
    color: #22b8cf;
    margin-top: 1px;
  }

  .project-date {
    font-size: 8pt;
    color: #666;
    white-space: nowrap;
    padding-top: 1px;
  }

  .course-list {
    list-style: none;
  }

  .course-list li {
    position: relative;
    padding-left: 12px;
    padding-bottom: 2px;
    margin-bottom: 2px;
    font-size: 8.5pt;
    line-height: 1.35;
    break-inside: avoid;
    border-bottom: 1px solid #ececec;
  }

  .course-list li:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }

  .course-list li::before {
    content: "•";
    position: absolute;
    left: 0;
  }

  .muted {
    color: #666;
    font-weight: 400;
  }
</style>
</head>

<body>
  <div class="header">
    <div class="header-left">
      <div class="name">${esc(hero.name)}</div>
      <p class="intro">${esc(intro)}</p>
    </div>
    ${photoDataUrl ? `<img class="photo" src="${photoDataUrl}" alt="" />` : ''}
  </div>

  <div class="content">
    <aside class="sidebar">
      ${renderSectionTitle('Contact')}
      ${isPrivate ? contactPrivate : contactPublic}

      ${isPrivate && personalien ? `
        ${renderSectionTitle('Personal Details')}
        ${personalien}
      ` : ''}

      ${renderSectionTitle('Languages')}
      ${(about.languages ?? []).map(renderLanguage).join('')}

      ${about.interests?.length ? `
        ${renderSectionTitle('Interests')}
        <p class="sidebar-text">${esc(about.interests.join(', '))}</p>
      ` : ''}

      ${skills.softSkills?.length ? `
        ${renderSectionTitle('Soft Skills')}
        <p class="sidebar-text">${esc(skills.softSkills.join(', '))}</p>
      ` : ''}

      <div class="sidebar-skills">
        ${renderSectionTitle('Skills')}
        ${renderSkills(skills)}
      </div>
    </aside>

    <main class="main">
      ${renderSectionTitle('Experience')}
      <div class="section-group">${(d.experience ?? []).map(renderExperience).join('')}</div>

      ${renderSectionTitle('Education')}
      <div class="section-group">${(d.education ?? []).map(renderEducation).join('')}</div>

      <div class="main-page-break">
        ${renderSectionTitle('Projects')}
        <div class="section-group">${(d.projects ?? []).map(renderProject).join('')}</div>
      </div>

      <div class="main-page-break">
        ${renderSectionTitle('Certifications & Courses')}
        <ul class="course-list">
          ${(d.courses ?? []).map(renderCourse).join('')}
        </ul>
      </div>
    </main>
  </div>
</body>
</html>
`
}

async function main() {
  console.log('Generating CV...')

  const html = generateHTML(data, hasPrivate)

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load' })

  await page.pdf({
    path: hasPrivate ? outputPrivatePath : outputPublicPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  })

  await browser.close()

  const savedTo = hasPrivate ? outputPrivatePath : outputPublicPath
  console.log(`✓ Saved → ${savedTo}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})