import { useState } from 'react'
import portfolioData from '../assets/portfolio.json'
import { PortfolioCard } from './PortfolioCard'

export default function Experience() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-2">
        {portfolioData.experience.map((entry, i) => (
          <PortfolioCard
            key={i}
            entry={entry}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
