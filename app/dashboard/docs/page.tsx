'use client';

import { useState } from "react";
import ExcelUploader from "./excel-uploader";
import QAForm from "./qa-form";
import DocumentList from "./document-list";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"upload" | "qa" | "list">("upload");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-purple-500">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Knowledge Base Manager
        </h1>

        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "upload"
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white"
              }`}
            >
              Upload Documents
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "qa"
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white"
              }`}
            >
              Add Q&A
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "list"
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white"
              }`}
            >
              Document List
            </button>
          </div>
        </div>

        {activeTab === "upload" && <ExcelUploader />}
        {activeTab === "qa" && <QAForm />}
        {activeTab === "list" && <DocumentList />}
      </div>
    </div>
  );
};

export default Page;