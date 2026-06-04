interface Props {
  logo?: string
  name: string
}

export function OrgLogo({ logo, name }: Props) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  if (logo) {
    return (
      <img
        src={`/logos/${logo}`}
        alt={name}
        className="shrink-0 w-10 h-10 rounded-lg object-contain"
      />
    )
  }

  return (
    <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
      <span className="text-xs font-mono font-semibold text-gray-500">{initials}</span>
    </div>
  )
}
