const steps = [
    { number: 1, title: 'Register and access your dashboard' },
    { number: 2, title: 'Enter your website URL' },
    { number: 3, title: 'Configure your chatbot' },
    { number: 4, title: 'Launch and start engaging customers' },
  ]
  
  export default function HowItWorks() {
    return (
      <section className="py-20 bg-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }