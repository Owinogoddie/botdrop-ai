'use client'

import React, { useState } from 'react'

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How easy is it to set up BotDrop AI?",
    answer: "Setting up BotDrop AI is very simple. After registration, you just need to enter your website URL and configure your chatbot preferences. The process typically takes less than 10 minutes."
  },
  {
    question: "Can I customize the chatbot's appearance?",
    answer: "Yes, on our Pro plan, you can fully customize the chatbot's appearance. We offer pre-made templates, and you can also adjust colors, chat window size, and position to match your website's design."
  },
  {
    question: "How does the lead generation feature work?",
    answer: "The chatbot can be configured to collect visitor information, such as email addresses. This data is securely stored in your dashboard, where you can view and export leads. On the Pro plan, you can also send bulk emails to these leads."
  },
  {
    question: "Is there a limit to the number of conversations?",
    answer: "Our Free plan has a limit on monthly conversations. The Pro and Enterprise plans offer unlimited conversations to suit businesses of all sizes."
  },
]

export default function FAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-light rounded-lg focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border border-light rounded-b-lg">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}