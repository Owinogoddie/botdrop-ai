const features = [
    {
      title: 'Easy Setup and Integration',
      description: 'One-click installation compatible with all major website platforms.',
    },
    {
      title: 'Lead Generation',
      description: 'Capture email addresses, store leads in database, and send bulk emails (Pro plan).',
    },
    {
      title: 'Customizable Knowledge Base',
      description: 'Add your own information and continuously improve responses.',
    },
    {
      title: 'Consulting Capabilities',
      description: 'Configure for specific consulting scenarios with guided conversations.',
    },
    {
      title: 'Real-time Interaction',
      description: 'Live chat takeover option and instant notifications for urgent queries.',
    },
    {
      title: 'Analytics and Reporting',
      description: 'View chat history, analyze customer interactions, and identify areas for improvement.',
    },
  ]
  
  export default function DetailedFeatures() {
    return (
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Detailed Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }