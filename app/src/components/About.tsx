import portfolioData from '../assets/portfolio.json'

const { location, email, languages, interests } = portfolioData.about

function calcAge(birthYear: number, birthMonth: number, birthDay: number): number {
  const today = new Date()
  let age = today.getFullYear() - birthYear
  const m = today.getMonth() + 1 - birthMonth
  if (m < 0 || (m === 0 && today.getDate() < birthDay)) age--
  return age
}

const age = calcAge(2000, 4, 29)

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

function CakeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v3" />
      <path d="M12 8v3" />
      <path d="M17 8v3" />
      <path d="M7 4h0.01" />
      <path d="M12 4h0.01" />
      <path d="M17 4h0.01" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
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

export default function About() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-1.5 mb-2 text-cyan-400">
            <MapPinIcon />
            <p className="text-xs font-mono">Location</p>
          </div>
          <p className="text-gray-300 text-sm">{location}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-1.5 mb-2 text-cyan-400">
            <MailIcon />
            <p className="text-xs font-mono">Email</p>
          </div>
          <p className="text-gray-300 text-sm break-all">{email}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-1.5 mb-2 text-cyan-400">
            <CakeIcon />
            <p className="text-xs font-mono">Age</p>
          </div>
          <p className="text-gray-300 text-sm">{age}</p>
        </div>

        <div className="col-span-2 sm:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-1.5 mb-3 text-cyan-400">
            <GlobeIcon />
            <p className="text-xs font-mono">Languages</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {languages.map(({ language, fluency }) => (
              <div key={language} className="flex items-baseline gap-2">
                <span className="text-gray-300 text-sm">{language}</span>
                <span className="text-gray-600 text-xs font-mono">{fluency}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-1.5 mb-3 text-cyan-400">
            <SparkleIcon />
            <p className="text-xs font-mono">Interests</p>
          </div>
          <div className="flex flex-col gap-1.5">
            {interests.map(interest => (
              <span key={interest} className="text-gray-300 text-sm">{interest}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
