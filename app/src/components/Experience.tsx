import { useState } from 'react'

const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'ELCA Informatik, Bern',
    period: '08/2022 — Present',
    description: 'Fullstack development with Java (Spring Boot) and Angular across multiple enterprise projects. Responsible for software design, architecture decisions, code reviews, and 3rd-level support. Served as Scrum Master from Jan–Dec 2024, running all ceremonies and coordinating with offshore teams. Since Sep 2025 focused on frontend and DevOps.',
    tags: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Scrum', 'Jenkins'],
  },
  {
    role: 'Founder',
    company: 'Freelance / Startup',
    period: '2022 — Present',
    description: 'Website design and development for private individuals and SMEs alongside employment. Also built and operated an online dropshipping shop.',
    tags: ['Web Development', 'TypeScript', 'JavaScript'],
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

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-2">
        {experience.map((job, i) => (
          <div key={i} className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-900/60 transition-colors"
            >
              <span className="text-gray-500 text-xs font-mono w-28 shrink-0 leading-relaxed">{job.period}</span>
              <div className="flex-1">
                <p className="text-white font-semibold">{job.role}</p>
                <p className="text-cyan-400 font-mono text-sm">{job.company}</p>
              </div>
              <div className="hidden sm:flex gap-1.5 mr-2">
                {job.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              <Chevron open={open === i} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 pt-3 border-t border-gray-800">
                <p className="text-gray-400 leading-relaxed mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
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
