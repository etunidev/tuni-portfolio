import { useState, useEffect } from 'react'
import portfolioData from '../assets/portfolio.json'

const cvUrl = '/CV_Tunahan_Erbay.pdf'
const { email } = portfolioData.about

function DocumentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/90 backdrop-blur border-b border-gray-800' : ''
    }`}>
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-cyan-400 font-medium text-lg">tuni.dev</a>
        <div className="flex items-center gap-3">
          <a
            href={cvUrl}
            download="CV_Tunahan_Erbay.pdf"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors font-mono"
          >
            <DocumentIcon />
            Resume
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-cyan-500 text-gray-950 rounded-lg hover:bg-cyan-400 transition-colors font-semibold"
          >
            <MailIcon />
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
