import { TABS, Tab } from '../types'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Education from './Education'
import Projects from './Projects'
import Courses from './Courses'

interface Props {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export default function TabPanel({ activeTab, setActiveTab }: Props) {
  return (
    <div>
      <div className="sticky top-[61px] z-40 bg-gray-950 border-b border-gray-800">
        <div className="w-full px-6 flex">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-4 text-sm font-mono whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[60vh]">
        {activeTab === 'About' && <About />}
        {activeTab === 'Skills' && <Skills />}
        {activeTab === 'Experience' && <Experience />}
        {activeTab === 'Education' && <Education />}
        {activeTab === 'Projects' && <Projects />}
        {activeTab === 'Courses' && <Courses />}
      </div>
    </div>
  )
}
