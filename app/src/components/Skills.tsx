const skills: Record<string, string[]> = {
  Backend: ['Java', 'Spring Boot', 'Python', 'SQL', 'REST APIs'],
  Frontend: ['Angular', 'TypeScript', 'JavaScript', 'React', 'HTML / CSS'],
  Tools: ['Git', 'Maven', 'Jenkins', 'Jira', 'Confluence', 'IntelliJ IDEA', 'Docker'],
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10">Tech stack</h2>
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
