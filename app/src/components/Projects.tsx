import { useState } from 'react'

const projects = [
  {
    title: 'Bachelor Thesis — Secure Scuttlebutt Library',
    description: 'Designed and implemented a Kotlin library for the group chat protocol of Secure Scuttlebutt, a decentralized peer-to-peer communication platform.',
    tags: ['Kotlin'],
  },
  {
    title: 'JabRef Open-Source Extension',
    description: 'Contributed an extension to JabRef, a widely used open-source reference management tool.',
    tags: ['Java'],
  },
  {
    title: 'Computer Game',
    description: 'Designed and implemented a fully functional computer game from scratch.',
    tags: ['Java'],
  },
  {
    title: 'Communication Protocol UI',
    description: 'Built a graphical user interface for a custom communication protocol.',
    tags: ['Python'],
  },
  {
    title: 'Distributed Filesystem Terminal App',
    description: 'Implemented a terminal application applying a centralized approach to distributed file systems.',
    tags: ['Python'],
  },
  {
    title: 'DIY Game Console',
    description: 'Programmed a self-assembled game console — both hardware assembly and software.',
    tags: ['C/C++'],
  },
  {
    title: 'Data Integration & Analysis',
    description: 'Designed and executed a data integration and analysis project across multiple data sources.',
    tags: ['SQL'],
  },
]

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-2">
        {projects.map((project, i) => (
          <div key={i} className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-900/60 transition-colors"
            >
              <p className="text-white font-semibold flex-1">{project.title}</p>
              <div className="hidden sm:flex gap-1.5 mr-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              <Chevron open={open === i} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 pt-3 border-t border-gray-800">
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
