const skills: Record<string, string[]> = {
  Frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML / CSS'],
  DevOps: ['Docker', 'Kubernetes', 'ArgoCD', 'GitHub Actions', 'k3s', 'Helm'],
  Tools: ['Git', 'Linux', 'Nginx', 'PostgreSQL', 'VS Code'],
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-cyan-400 text-sm mb-3 tracking-widest uppercase">02. Skills</p>
        <h2 className="text-4xl font-bold text-white mb-12">Tech stack</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-mono">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
