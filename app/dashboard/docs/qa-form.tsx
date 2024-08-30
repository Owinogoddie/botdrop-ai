'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function QAForm() {
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/documents/add-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123', // Replace with actual user ID
          websiteId: 'website456', // Replace with actual website ID
          questions,
        }),
      });

      if (response.ok) {
        toast.success('Questions and answers added successfully!');
        setQuestions([{ question: '', answer: '' }]);
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred during submission');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((qa, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              value={qa.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              placeholder="Enter question"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              value={qa.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Enter answer"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit Q&A
        </button>
      </form>
    </div>
  );
}