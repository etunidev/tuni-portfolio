type Entry = { title: string; issuer: string; certified?: true }

const certifications: Entry[] = [
  { title: 'Professional Scrum Master I (PSM I)', issuer: 'Scrum.org', certified: true },
  { title: 'Leading SAFe® 6 Agilist', issuer: 'Scaled Agile, Inc.', certified: true },
]

const courses: Entry[] = [
  { title: 'Developing Generative AI Applications on AWS', issuer: 'Fast Lane' },
  { title: 'Architecture Workshop — Kubernetes Native Development with Quarkus', issuer: 'RedHat' },
  { title: 'Angular — The Complete Guide', issuer: 'Udemy' },
  { title: 'The Ultimate Agile Scrum Master Certification Training', issuer: 'Udemy' },
  { title: 'Spring & Hibernate for Beginners (incl. Spring Boot)', issuer: 'Udemy' },
  { title: 'Application Security Fundamentals', issuer: 'ELCA' },
  { title: 'BPMN Method & Style (Expert Course incl. Certification)', issuer: 'ELCA' },
  { title: 'Quality in Software Design', issuer: 'ELCA' },
  { title: 'Angular Advanced Training', issuer: 'ELCA' },
  { title: 'Web Frontend Coding Best Practices', issuer: 'ELCA' },
  { title: 'Usability / UX Introduction', issuer: 'ELCA' },
  { title: 'Code Quality', issuer: 'ELCA' },
]

function EntryRow({ entry }: { entry: Entry }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-800 last:border-0">
      <div>
        <p className="text-gray-300 text-sm">{entry.title}</p>
        <p className="text-gray-500 text-xs font-mono mt-0.5">{entry.issuer}</p>
      </div>
      {entry.certified && (
        <span className="shrink-0 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20">
          certified
        </span>
      )}
    </div>
  )
}

export default function Courses() {
  return (
    <section id="courses" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10">Courses & Certifications</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-mono">Certifications</h3>
            <div>
              {certifications.map(entry => <EntryRow key={entry.title} entry={entry} />)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-mono">Courses</h3>
            <div>
              {courses.map(entry => <EntryRow key={entry.title} entry={entry} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
