const experience = [
  {
    role: 'Software Engineer',
    company: 'Your Company',
    period: '2023 — Present',
    description: 'Describe what you built and what impact it had. Replace this with your real experience.',
    tags: ['React', 'TypeScript', 'Node.js'],
  },
  {
    role: 'Frontend Developer',
    company: 'Previous Company',
    period: '2021 — 2023',
    description: 'Describe what you built and what impact it had. Replace this with your real experience.',
    tags: ['React', 'JavaScript', 'CSS'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-cyan-400 text-sm mb-3 tracking-widest uppercase">03. Experience</p>
        <h2 className="text-4xl font-bold text-white mb-12">Work history</h2>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800" />
          <div className="space-y-12">
            {experience.map((job, i) => (
              <div key={i} className="pl-8 relative">
                <div className="absolute left-0 top-1.5 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2" />
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                    <p className="text-cyan-400 font-mono text-sm">{job.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm font-mono">{job.period}</span>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
