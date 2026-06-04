import portfolioData from '../assets/portfolio.json'

const LABELS: Record<string, string> = {
  backend: 'Backend',
  frontend: 'Frontend',
  devops: 'DevOps',
  tools: 'Tools',
  methods: 'Methods',
  softSkills: 'Soft Skills',
}

export default function Skills() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {(Object.entries(portfolioData.skills) as [string, string[]][]).map(([key, items]) => (
          <div key={key} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3 font-mono">{LABELS[key] ?? key}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-800/60 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
