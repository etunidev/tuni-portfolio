import tuniImg from '../assets/tuni.png'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative text-center max-w-4xl">
        <div className="mb-6 flex justify-center">
          <img
            src={tuniImg}
            alt="Tunahan Erbay"
            className="w-44 h-44 rounded-full object-cover border-2 border-cyan-500/40"
          />
        </div>
        <p className="font-mono text-cyan-400 text-sm mb-4 tracking-widest uppercase">Hello, I'm</p>
        <h1 className="text-5xl font-bold mb-4 text-white">
          Tunahan <span className="text-gradient">Erbay</span>
        </h1>
        <p className="text-xl text-gray-400 mb-6 font-light">
          Fullstack Software Engineer
        </p>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          Fullstack Software Engineer based in Switzerland with 8+ years of hands-on
          experience across the full software stack. Focused on clean architecture,
          code quality, and delivering reliable software.
        </p>
      </div>
    </section>
  )
}
