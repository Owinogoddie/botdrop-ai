'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Document {
  id: string;
  fileName: string;
  uploadedAt: string;
}

const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      } else {
        toast.error('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('An error occurred while fetching documents');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Document deleted successfully');
        fetchDocuments();
      } else {
        toast.error('Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('An error occurred while deleting the document');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center border-b py-2">
            <span>{doc.fileName}</span>
            <div>
              <span className="text-sm text-gray-500 mr-4">
                {new Date(doc.uploadedAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;