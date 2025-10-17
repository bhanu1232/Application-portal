import React, { useState, useRef } from 'react';
import type { ApplicationFormData } from './types';
import { initialFormData } from './constants';
import Header from './components/Header';
import PersonalInfo from './components/PersonalInfo';
import ContactInfo from './components/ContactInfo';
import Qualifications from './components/Qualifications';
import Research from './components/Research';
import TeachingExperience from './components/TeachingExperience';
import Declaration from './components/Declaration';

// Since jsPDF and html2canvas are loaded from a CDN, we need to tell TypeScript about them.
declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
}


const App: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGeneratePdf = async () => {
    const formElement = formRef.current;
    if (!formElement) return;

    setIsGeneratingPdf(true);
    try {
        const { jsPDF } = window.jspdf;
        const canvas = await window.html2canvas(formElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        // A4 page dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        const ratio = imgWidth / imgHeight;
        const docImgWidth = pdfWidth;
        const docImgHeight = docImgWidth / ratio;
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        let heightLeft = docImgHeight;
        
        pdf.addImage(imgData, 'PNG', 0, position, docImgWidth, docImgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - docImgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, docImgWidth, docImgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('Academic_Consultant_Application.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Sorry, there was an error generating the PDF. Please try again.");
    } finally {
        setIsGeneratingPdf(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here,
    // e.g., by sending data to a server.
    console.log('Form Submitted:', formData);
    alert('Application submitted successfully! (Check console for data)');
  };

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div ref={formRef} className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <Header />
        <main className="p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-12">
            <PersonalInfo
              data={formData}
              setData={setFormData}
              photoPreview={photoPreview}
              onPhotoChange={handlePhotoChange}
            />
            <ContactInfo data={formData.contact} setData={setFormData} />
            <Qualifications data={formData} setData={setFormData} />
            <Research data={formData} setData={setFormData} />
            <TeachingExperience data={formData.teachingExperience} setData={setFormData} />
            <Declaration data={formData.declaration} setData={setFormData} />
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <button
                type="button"
                onClick={handleGeneratePdf}
                disabled={isGeneratingPdf}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-12 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                SUBMIT APPLICATION
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default App;