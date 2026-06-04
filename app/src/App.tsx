import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TabPanel from './components/TabPanel'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import { Tab } from './types'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Experience')

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
