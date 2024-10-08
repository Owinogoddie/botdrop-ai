import React from 'react';

const HelpPage = () => {
  return (
    <div className="p-6 bg-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Help & Support</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">How do I set up my chatbot?</h3>
            <p className="text-gray-600">Navigate to the Chatbot Configuration page and enter your site URL. Then, choose the type of chatbot you want and add any custom knowledge.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">How can I view my leads?</h3>
            <p className="text-gray-600">Go to the Leads page in your dashboard to view all the leads generated by your chatbot.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">How do I customize the appearance of my chatbot?</h3>
            <p className="text-gray-600">Pro plan users can customize the chatbots appearance using pre-made templates in the Chatbot Configuration page.</p>
            <p className="text-gray-600">Pro plan users can customize the chatbot&apos;s appearance using pre-made templates in the Chatbot Configuration page.</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;