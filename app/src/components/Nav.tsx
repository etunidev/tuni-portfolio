import { useState, useEffect } from 'react'
import portfolioData from '../assets/portfolio.json'
import { TABS, Tab } from '../types'

const cvUrl = '/cv-tunahan-erbay.pdf'
const { email } = portfolioData.about

interface NavProps {
  tabsInNav?: boolean
  activeTab?: Tab
  setActiveTab?: (tab: Tab) => void
}

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

export default function Nav({ tabsInNav, activeTab, setActiveTab }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled || tabsInNav ? 'bg-gray-950/90 backdrop-blur border-b border-gray-800' : ''
    }`}>
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-cyan-400 font-medium text-lg">tuni.dev</a>

        {setActiveTab && (
          <div className={`hidden sm:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 ${
            tabsInNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-mono rounded-md transition-colors ${
                  activeTab === tab
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <a
            href={cvUrl}
            download="cv-tunahan-erbay.pdf"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors font-mono"
          >
            <DocumentIcon />
            <span className="hidden sm:inline">Resume</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-cyan-500 text-gray-950 rounded-lg hover:bg-cyan-400 transition-colors font-semibold"
          >
            <MailIcon />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
