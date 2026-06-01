export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative text-center max-w-4xl">
        <p className="font-mono text-cyan-400 text-sm mb-4 tracking-widest uppercase">Hello, I'm</p>
        <h1 className="text-6xl font-bold mb-4 text-white">
          Tunahan <span className="text-gradient">Erbay</span>
        </h1>
        <p className="text-2xl text-gray-400 mb-6 font-light">
          Software Engineer & DevOps Enthusiast
        </p>
        <p className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Building reliable software and scalable infrastructure. Passionate about clean code,
          automation, and cloud-native technologies.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#experience"
            className="px-6 py-3 bg-cyan-500 text-gray-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            View CV
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
