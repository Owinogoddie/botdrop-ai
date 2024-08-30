import { IconContext } from 'react-icons'
import { FaRocket, FaUserPlus, FaBook, FaComments, FaBolt, FaChartBar } from 'react-icons/fa'

const features = [
  { name: 'Easy Setup', icon: FaRocket },
  { name: 'Lead Generation', icon: FaUserPlus },
  { name: 'Customizable Knowledge Base', icon: FaBook },
  { name: 'Consulting Capabilities', icon: FaComments },
  { name: 'Real-time Interaction', icon: FaBolt },
  { name: 'Analytics and Reporting', icon: FaChartBar },
]

export default function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-center text-center">
              <div className="bg-light p-4 rounded-full mb-4">
                <IconContext.Provider value={{ size: '2em', color: '#4F46E5' }}>
                  <feature.icon />
                </IconContext.Provider>
              </div>
              <h3 className="text-xl font-semibold">{feature.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}