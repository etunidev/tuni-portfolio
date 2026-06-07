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
    if (tabRef.current) {
      const navHeight = (document.querySelector('nav') as HTMLElement)?.offsetHeight ?? 61
      const tabBarEl = tabRef.current.firstElementChild as HTMLElement
      const tabBarHeight = tabBarEl?.offsetHeight ?? 0
      const skipTabBar = tabsInNav && window.innerWidth >= 640
      const rect = tabRef.current.getBoundingClientRect()
      window.scrollTo({
        top: window.scrollY + rect.top - navHeight + (skipTabBar ? tabBarHeight : 0),
        behavior: 'smooth'
      })
    }
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
