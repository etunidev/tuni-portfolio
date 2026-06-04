export interface CardEntry {
  title: string
  organization: string
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
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30">
      <button
        onClick={hasExpandable ? onToggle : undefined}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${
          hasExpandable ? 'hover:bg-gray-900/60' : 'cursor-default'
        }`}
      >
        {period && (
          <span className="text-gray-500 text-xs font-mono w-36 shrink-0 leading-relaxed">
            {period}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold">{entry.title}</p>
          <p className="text-cyan-400 font-mono text-sm">
            {entry.organization}
            {entry.location ? ` — ${entry.location}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mr-2 shrink-0">
          <div className="hidden sm:flex gap-1.5">
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
        </div>
        {hasExpandable && <Chevron open={open} />}
      </button>

      {entry.summary && (
        <p className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">{entry.summary}</p>
      )}

      {open && hasExpandable && (
        <div className="px-5 pb-5 pt-3 border-t border-gray-800 space-y-4">
          {(entry.achievements?.length ?? 0) > 0 && (
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                Achievements
              </p>
              <ul className="space-y-1.5">
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
  )
}
