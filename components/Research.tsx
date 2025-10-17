import React from 'react';
import type { ApplicationFormData, ResearchPaper, Book, Award, Conference } from '../types';
import SectionTitle from './SectionTitle';

interface ResearchProps {
  data: ApplicationFormData;
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
}

const Research: React.FC<ResearchProps> = ({ data, setData }) => {

  // Fix: Refactored to use a switch statement for type safety.
  // The previous implementation with a generic type <T> was causing a TypeScript error
  // because T was unconstrained and could not be inferred correctly when mapping over
  // a union of different array types (ResearchPaper[], Book[], etc.).
  const handleDynamicChange = (
    section: 'papers' | 'books' | 'awards' | 'conferences', 
    id: string, 
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData(prev => {
      const research = { ...prev.research };
      switch (section) {
        case 'papers':
          research.papers = research.papers.map(item => item.id === id ? { ...item, [name]: value } : item);
          break;
        case 'books':
          research.books = research.books.map(item => item.id === id ? { ...item, [name]: value } : item);
          break;
        case 'awards':
          research.awards = research.awards.map(item => item.id === id ? { ...item, [name]: value } : item);
          break;
        case 'conferences':
          research.conferences = research.conferences.map(item => item.id === id ? { ...item, [name]: value } : item);
          break;
      }
      return {
        ...prev,
        research,
      };
    });
  };

  const addRow = (section: 'papers' | 'books' | 'awards' | 'conferences') => {
    let newItem: ResearchPaper | Book | Award | Conference;
    switch (section) {
        case 'papers': newItem = { id: crypto.randomUUID(), title: '', journalName: '', year: '', issnIsbn: '', ugcApproved: '', impactFactor: '', type: '' }; break;
        case 'books': newItem = { id: crypto.randomUUID(), title: '', year: '', issnIsbn: '', type: 'Subject' }; break;
        case 'awards': newItem = { id: crypto.randomUUID(), name: '', type: 'International' }; break;
        case 'conferences': newItem = { id: crypto.randomUUID(), title: '', organizedBy: '', year: '', level: 'National' }; break;
    }
    setData(prev => ({
      ...prev,
      research: { ...prev.research, [section]: [...prev.research[section], newItem] }
    }));
  };

  const removeRow = (section: 'papers' | 'books' | 'awards' | 'conferences', id: string) => {
    setData(prev => ({
      ...prev,
      research: { ...prev.research, [section]: prev.research[section].filter((item: {id:string}) => item.id !== id) }
    }));
  };
  
  return (
    <section className="space-y-12">
      <div>
        <SectionTitle title="20, 24. Research Papers Published" subtitle="As notified by UGC with ISSN & ISBN, Impact Factor."/>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                {['Title of Paper', 'Name of Journal', 'Year', 'ISSN/ISBN', 'UGC Approved', 'Impact Factor', 'Indian/Foreign', 'Action'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.research.papers.map(p => (
                <tr key={p.id}>
                  <td className="p-2"><input name="title" value={p.title} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                  <td className="p-2"><input name="journalName" value={p.journalName} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                  <td className="p-2"><input name="year" value={p.year} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-24 border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                  <td className="p-2"><input name="issnIsbn" value={p.issnIsbn} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-32 border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                  <td className="p-2"><select name="ugcApproved" value={p.ugcApproved} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-24 border-gray-300 rounded-md shadow-sm sm:text-sm"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select></td>
                  <td className="p-2"><input name="impactFactor" value={p.impactFactor} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-28 border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                  <td className="p-2"><select name="type" value={p.type} onChange={e => handleDynamicChange('papers', p.id, e)} className="w-28 border-gray-300 rounded-md shadow-sm sm:text-sm"><option value="">Select</option><option value="Indian">Indian</option><option value="Foreign">Foreign</option></select></td>
                  <td className="p-2"><button type="button" onClick={() => removeRow('papers', p.id)} className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={data.research.papers.length <= 1}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => addRow('papers')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md">Add Paper</button>
        </div>
      </div>
      
      <div>
        <SectionTitle title="21. Books Published" />
         <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                {['Type', 'Title of Book', 'Year', 'ISSN/ISBN', 'Action'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.research.books.map(b => (
                    <tr key={b.id}>
                        <td className="p-2"><select name="type" value={b.type} onChange={e => handleDynamicChange('books', b.id, e)} className="w-32 border-gray-300 rounded-md shadow-sm sm:text-sm"><option value="Subject">Subject Book</option><option value="Chapter">Chapter in Book</option></select></td>
                        <td className="p-2"><input name="title" value={b.title} onChange={e => handleDynamicChange('books', b.id, e)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><input name="year" value={b.year} onChange={e => handleDynamicChange('books', b.id, e)} className="w-24 border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><input name="issnIsbn" value={b.issnIsbn} onChange={e => handleDynamicChange('books', b.id, e)} className="w-32 border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><button type="button" onClick={() => removeRow('books', b.id)} className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={data.research.books.length <= 1}>Remove</button></td>
                    </tr>
                ))}
            </tbody>
          </table>
          <button type="button" onClick={() => addRow('books')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md">Add Book</button>
        </div>
      </div>

      <div>
        <SectionTitle title="22. Awards Received" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                {['Award Type', 'Name of Award / Fellowship', 'Action'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.research.awards.map(a => (
                    <tr key={a.id}>
                        <td className="p-2"><select name="type" value={a.type} onChange={e => handleDynamicChange('awards', a.id, e)} className="w-48 border-gray-300 rounded-md shadow-sm sm:text-sm"><option value="International">International Award/Fellowship</option><option value="State">State/University Level Award</option><option value="Fellowship">Fellowship</option></select></td>
                        <td className="p-2"><input name="name" value={a.name} onChange={e => handleDynamicChange('awards', a.id, e)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><button type="button" onClick={() => removeRow('awards', a.id)} className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={data.research.awards.length <= 1}>Remove</button></td>
                    </tr>
                ))}
            </tbody>
          </table>
          <button type="button" onClick={() => addRow('awards')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md">Add Award</button>
        </div>
      </div>

      <div>
        <SectionTitle title="23. Papers Presented in Conferences / Seminars" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                {['Title of Conference/Seminar', 'Organized By', 'Year', 'Level', 'Action'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.research.conferences.map(c => (
                    <tr key={c.id}>
                        <td className="p-2"><input name="title" value={c.title} onChange={e => handleDynamicChange('conferences', c.id, e)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><input name="organizedBy" value={c.organizedBy} onChange={e => handleDynamicChange('conferences', c.id, e)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><input name="year" value={c.year} onChange={e => handleDynamicChange('conferences', c.id, e)} className="w-24 border-gray-300 rounded-md shadow-sm sm:text-sm"/></td>
                        <td className="p-2"><select name="level" value={c.level} onChange={e => handleDynamicChange('conferences', c.id, e)} className="w-36 border-gray-300 rounded-md shadow-sm sm:text-sm"><option value="National">National</option><option value="Indian/Foreign">Indian/Foreign</option></select></td>
                        <td className="p-2"><button type="button" onClick={() => removeRow('conferences', c.id)} className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={data.research.conferences.length <= 1}>Remove</button></td>
                    </tr>
                ))}
            </tbody>
          </table>
          <button type="button" onClick={() => addRow('conferences')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md">Add Conference</button>
        </div>
      </div>
    </section>
  );
};

export default Research;