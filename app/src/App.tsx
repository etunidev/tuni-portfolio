import { useState, useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TabPanel from './components/TabPanel'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import { Tab } from './types'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Experience')
  const [tabsInNav, setTabsInNav] = useState(false)
  const tabRef = useRef<HTMLDivElement>(null)

  const handleSetActiveTab = (tab: Tab) => {
    setActiveTab(tab)
    tabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current) {
        setTabsInNav(tabRef.current.getBoundingClientRect().top < 45)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <Nav tabsInNav={tabsInNav} activeTab={activeTab} setActiveTab={handleSetActiveTab} />
        <main>
          <Hero />
          <div ref={tabRef}>
            <TabPanel activeTab={activeTab} setActiveTab={handleSetActiveTab} tabsInNav={tabsInNav} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
