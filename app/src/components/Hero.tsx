import tuniImg from '../assets/tuni.png'
import portfolioData from '../assets/portfolio.json'

function calcYearsOfExperience(startYear: number, startMonth: number, startDay: number): string {
  const start = new Date(startYear, startMonth - 1, startDay)
  const today = new Date()
  let years = today.getFullYear() - start.getFullYear()
  const m = today.getMonth() - start.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < start.getDate())) years--
  return `${years}+`
}

const { name, position, introduction } = portfolioData.hero
const intro = introduction.replace('{yearsOfExperience}', calcYearsOfExperience(2018, 6, 1))

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative text-center max-w-4xl">
        <div className="mb-6 flex justify-center">
          <img
            src={tuniImg}
            alt={name}
            className="w-44 h-44 rounded-full object-cover border-2 border-cyan-500/40"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-white">
          {name.split(' ')[0]} <span className="text-gradient">{name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-xl text-gray-400 mb-6 font-light">{position}</p>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">{intro}</p>
      </div>

      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600 hover:text-cyan-400 transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  )
}
