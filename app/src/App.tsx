import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TabPanel from './components/TabPanel'
import Footer from './components/Footer'
import { Tab } from './types'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Experience')

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      <Footer />
    </div>
  )
}
