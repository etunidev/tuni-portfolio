function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function GraduationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const facts = [
  { label: 'Location', value: 'Obergösgen, Switzerland', Icon: MapPinIcon },
  { label: 'Email', value: 'erbaytunahan@gmail.com', Icon: MailIcon },
  { label: 'Education', value: 'BSc CS, Uni Basel', Icon: GraduationIcon },
  {
    label: 'Languages',
    value: 'DE · CH-DE · TR — Native\nEN — Fluent · FR — Basic',
    Icon: GlobeIcon,
  },
]

export default function About() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Who I am</h2>
          <p className="text-gray-400 leading-relaxed">
            Senior Software Engineer at ELCA Informatik, Bern. I build full-stack
            applications with Java and Angular, take ownership of architecture decisions,
            and thrive in agile teams. Open to new challenges and always learning.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {facts.map(({ label, value, Icon }) => (
            <div key={label} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-1.5 mb-2 text-cyan-400">
                <Icon />
                <p className="text-xs font-mono">{label}</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
