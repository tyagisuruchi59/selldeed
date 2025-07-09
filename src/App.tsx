'use client';
import React, { useState } from 'react';
import { FileText, Calendar, User, Home, DollarSign, UserCheck } from 'lucide-react';

interface FormData {
  fullName: string;
  fatherName: string;
  propertySize: string;
  saleAmount: string;
  date: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    fatherName: '',
    propertySize: '',
    saleAmount: '',
    date: ''
  });
  
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [showDocument, setShowDocument] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateDocument = (data: FormData) => {
    const template = `
      <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: 'Times New Roman', serif; line-height: 1.6; color: #1a202c;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 32px; font-weight: bold; color: #2d3748; margin-bottom: 8px;">SALE DEED</h1>
          <div style="width: 100px; height: 3px; background: linear-gradient(to right, #3182ce, #63b3ed); margin: 0 auto;"></div>
        </div>
        
        <div style="background: #f7fafc; padding: 30px; border-radius: 12px; border-left: 4px solid #3182ce; margin-bottom: 30px;">
          <p style="margin: 0; font-size: 18px; text-align: justify;">
            This <strong>Sale Deed</strong> is made on <strong>${data.date}</strong> between <strong>${data.fullName}</strong>, S/o <strong>${data.fatherName}</strong>, for a property of <strong>${data.propertySize}</strong> sq.ft., sold for <strong>₹${data.saleAmount}</strong>.
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
          <div style="background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #2d3748; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Seller Details</h3>
            <div style="space-y: 10px;">
              <p><strong>Full Name:</strong> ${data.fullName}</p>
              <p><strong>Father's Name:</strong> ${data.fatherName}</p>
            </div>
          </div>
          
          <div style="background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #2d3748; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Property Details</h3>
            <div style="space-y: 10px;">
              <p><strong>Property Size:</strong> ${data.propertySize} sq.ft.</p>
              <p><strong>Sale Amount:</strong> ₹${data.saleAmount}</p>
              <p><strong>Date of Sale:</strong> ${data.date}</p>
            </div>
          </div>
        </div>
        
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 40px;">
          <h3 style="color: #2d3748; font-size: 20px; margin-bottom: 20px;">Terms and Conditions</h3>
          <ul style="list-style-type: disc; padding-left: 20px; space-y: 8px;">
            <li>The seller hereby transfers all rights, title, and interest in the above-mentioned property to the buyer.</li>
            <li>The property is free from all encumbrances, liens, and legal disputes.</li>
            <li>The sale amount has been received in full by the seller.</li>
            <li>The buyer shall be responsible for all future taxes and obligations related to the property.</li>
          </ul>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-top: 60px;">
          <div style="text-align: center;">
            <div style="width: 200px; border-top: 2px solid #4a5568; padding-top: 10px;">
              <p style="font-weight: bold;">Seller's Signature</p>
              <p style="font-size: 14px; color: #718096;">${data.fullName}</p>
            </div>
          </div>
          
          <div style="text-align: center;">
            <div style="width: 200px; border-top: 2px solid #4a5568; padding-top: 10px;">
              <p style="font-weight: bold;">Buyer's Signature</p>
              <p style="font-size: 14px; color: #718096;">_________________</p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 12px; color: #718096;">
            This document is generated electronically and serves as a template for legal documentation.
          </p>
        </div>
      </div>
    `;
    
    return template;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.fatherName || !formData.propertySize || !formData.saleAmount || !formData.date) {
      alert('Please fill in all fields');
      return;
    }
    
    const document = generateDocument(formData);
    setGeneratedDocument(document);
    setShowDocument(true);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Sale Deed Document</title>
            <style>
              body { margin: 0; padding: 20px; }
              @media print { 
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${generatedDocument}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Sale Deed Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Create professional sale deed documents with ease</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Document Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  placeholder="Enter seller's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <UserCheck className="w-4 h-4" />
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  placeholder="Enter father's name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Home className="w-4 h-4" />
                  Property Size (sq.ft.)
                </label>
                <input
                  type="number"
                  name="propertySize"
                  value={formData.propertySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  placeholder="Enter property size"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  Sale Amount (₹)
                </label>
                <input
                  type="number"
                  name="saleAmount"
                  value={formData.saleAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  placeholder="Enter sale amount"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Date of Sale
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Generate Sale Deed
              </button>
            </form>
          </div>

          {/* Document Preview Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Document Preview
              </h2>
              {showDocument && (
                <button
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                >
                  Print Document
                </button>
              )}
            </div>
            
            {showDocument ? (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: generatedDocument }} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Fill the form and click "Generate Sale Deed" to preview the document</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;