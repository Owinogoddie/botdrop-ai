'use client'

import React from 'react'

type PlanFeature = string;

interface Plan {
  name: string;
  price: string;
  features: PlanFeature[];
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    features: ['Basic chatbot functionality', 'Limited conversations', 'Standard templates'],
  },
  {
    name: 'Pro',
    price: '$49/mo',
    features: [
      'Advanced chatbot features',
      'Unlimited conversations',
      'Custom templates',
      'Lead generation tools',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Fully customized solution',
      'Dedicated support',
      'API access',
      'Custom integrations',
      'Service Level Agreement',
    ],
  },
]

export default function Pricing(): JSX.Element {
  return (
    <section className="py-20 bg-light" id="pricing">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Plans and Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}