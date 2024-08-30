'use client';

import { useState } from 'react';
import { HiCloudDownload } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ExcelUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        toast.error('Invalid file type. Please upload an Excel, PDF, or Word document.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setProcessing(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 'user123'); // Replace with actual user ID
    formData.append('websiteId', 'website456'); // Replace with actual website ID

    try {
      const response = await fetch('/api/process-document', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('File processed successfully!');
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('An error occurred during processing');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300 ease-in-out">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <HiCloudDownload className="w-10 h-10 mb-3 text-blue-400" />
              <p className="mb-2 text-sm text-blue-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-blue-500">XLSX, XLS, PDF, DOC, DOCX (MAX. 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".xlsx,.xls,.pdf,.doc,.docx" />
          </label>
        </div>
        {file && (
          <p className="text-lg text-gray-700">
            Selected file: {file.name}
          </p>
        )}
        <button
          type="submit"
          disabled={!file || processing}
          className={`w-full px-4 py-2 text-white rounded-md ${
            !file || processing
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } transition duration-300 ease-in-out`}
        >
          {processing ? 'Processing...' : 'Upload and Process'}
        </button>
      </form>
    </div>
  );
}