const facts = [
  { label: 'Location', value: 'Switzerland' },
  { label: 'Email', value: 'erbaytunahan@gmail.com' },
  { label: 'Focus', value: 'Frontend & DevOps' },
  { label: 'Status', value: 'Open to opportunities' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-mono text-cyan-400 text-sm mb-3 tracking-widest uppercase">01. About</p>
          <h2 className="text-4xl font-bold text-white mb-6">Who I am</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              I'm a software engineer with a passion for building things that work well —
              both in code and in production. I enjoy the full lifecycle from writing clean
              frontend interfaces to setting up the infrastructure that runs them reliably.
            </p>
            <p>
              Currently diving deep into DevOps: containers, Kubernetes, GitOps with ArgoCD,
              and CI/CD pipelines. I believe great software is only as good as the system
              that delivers and operates it.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {facts.map(({ label, value }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <p className="text-xs font-mono text-cyan-400 mb-1">{label}</p>
              <p className="text-gray-300 text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
