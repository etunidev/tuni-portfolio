import { useState } from 'react'
import portfolioData from '../assets/portfolio.json'
import { PortfolioCard } from './PortfolioCard'

export default function Courses() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex">
          <div className="hidden sm:block w-40 shrink-0" />
          <div className="flex-1 border-l border-gray-800">
            {portfolioData.courses.map((entry, i) => (
              <PortfolioCard
                key={i}
                entry={entry}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
