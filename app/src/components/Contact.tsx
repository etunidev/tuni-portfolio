export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-cyan-400 text-sm mb-3 tracking-widest uppercase">04. Contact</p>
        <h2 className="text-4xl font-bold text-white mb-4">Get in touch</h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Whether you have a question, an opportunity, or just want to say hi —
          my inbox is always open.
        </p>
        <a
          href="mailto:erbaytunahan@gmail.com"
          className="inline-block px-8 py-4 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors font-mono"
        >
          erbaytunahan@gmail.com
        </a>
        <div className="flex justify-center gap-8 mt-12 text-gray-500 text-sm">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
        <p className="text-gray-700 text-xs mt-12 font-mono">
          Built with React · Docker · k3s · ArgoCD
        </p>
      </div>
    </section>
  )
}
