import { OrgLogo } from './OrgLogo'

export interface CardEntry {
  title: string
  organization: string
  logo?: string
  location?: string
  startDate?: string | null
  endDate?: string | null
  summary?: string
  achievements?: string[]
  skills?: string[]
  certified?: boolean
}

interface Props {
  entry: CardEntry
  open: boolean
  onToggle: () => void
}

function formatDate(d: string | null | undefined): string | null {
  if (d === null) return 'Present'
  if (!d) return null
  const [year, month] = d.split('-')
  if (!month) return year
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[+month - 1]} ${year}`
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function PortfolioCard({ entry, open, onToggle }: Props) {
  const start = formatDate(entry.startDate)
  const end = formatDate(entry.endDate)
  const period = start && end
    ? `${start} — ${end}`
    : start
    ? `${start} — Present`
    : end ?? null

  const hasExpandable =
    (entry.achievements?.length ?? 0) > 0 ||
    (entry.skills?.length ?? 0) > 0

  return (
    <div className="relative pb-8 last:pb-4">
      {/* Date — left of the timeline line, w-40 matches section gutter */}
      {period && (
        <div className="absolute hidden sm:block w-40 text-right pr-5 top-0 right-full">
          <span className="text-xs font-mono text-gray-500 leading-snug">{period}</span>
        </div>
      )}

      {/* Dot on the timeline line */}
      <div className="hidden sm:block absolute -left-[5px] top-[5px] w-2.5 h-2.5 rounded-full bg-gray-950 border-2 border-cyan-500 z-10" />

      {/* Content — entire area is clickable when expandable */}
      <div
        onClick={hasExpandable ? onToggle : undefined}
        className={`pl-0 sm:pl-8 rounded-lg -mx-2 px-2 py-2 -my-2 transition-colors ${
          hasExpandable ? 'cursor-pointer hover:bg-white/[0.03]' : ''
        }`}
      >
        {/* Mobile: date above title */}
        {period && (
          <p className="sm:hidden text-xs font-mono text-gray-600 mb-1.5">{period}</p>
        )}

        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <OrgLogo logo={entry.logo} name={entry.organization} />
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold leading-snug">{entry.title}</p>
            <p className="text-cyan-400 font-mono text-sm mt-0.5">
              {entry.organization}
              {entry.location ? ` — ${entry.location}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
            <div className="hidden md:flex gap-1.5">
              {entry.skills?.slice(0, 2).map(s => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
            {entry.certified && (
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs font-mono border border-emerald-500/20">
                certified
              </span>
            )}
            {hasExpandable && (
              <span className="text-gray-600 ml-1">
                <Chevron open={open} />
              </span>
            )}
          </div>
        </div>

        {/* Summary — always visible */}
        {entry.summary && (
          <p className="text-gray-400 text-sm leading-relaxed mt-2">{entry.summary}</p>
        )}

        {/* Expanded: achievements + skills */}
        {open && hasExpandable && (
          <div className="mt-4 pt-4 border-t border-gray-800/60 space-y-4">
            {(entry.achievements?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                  Achievements
                </p>
                <ul className="space-y-2">
                  {entry.achievements!.map((a, i) => (
                    <li key={i} className="text-gray-400 text-sm flex gap-2 leading-relaxed">
                      <span className="text-cyan-500 shrink-0 mt-0.5">›</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(entry.skills?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.skills!.map(s => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono border border-cyan-500/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
