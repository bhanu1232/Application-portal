
import React from 'react';
import type { ApplicationFormData } from '../types';
import SectionTitle from './SectionTitle';

interface TeachingExperienceProps {
  data: ApplicationFormData['teachingExperience'];
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
}

const TeachingExperience: React.FC<TeachingExperienceProps> = ({ data, setData }) => {

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      teachingExperience: prev.teachingExperience.map(row =>
        row.id === id ? { ...row, [name]: value } : row
      ),
    }));
  };

  const addRow = () => {
    setData(prev => ({
      ...prev,
      teachingExperience: [...data, { id: crypto.randomUUID(), university: '', designation: '', from: '', to: '' }]
    }));
  };

  const removeRow = (id: string) => {
    setData(prev => ({
      ...prev,
      teachingExperience: data.filter(row => row.id !== id)
    }));
  };

  return (
    <section>
      <SectionTitle title="25. Teaching Experience" subtitle="(SVU / OTHER UNIVERSITIES / COLLEGES)" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              {['Name of the University / College', 'Designation', 'From (Date)', 'To (Date)', 'Action'].map(header => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2"><input type="text" name="university" value={row.university} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="text" name="designation" value={row.designation} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="date" name="from" value={row.from} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="date" name="to" value={row.to} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2 text-center">
                  <button type="button" onClick={() => removeRow(row.id)} className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={data.length <= 1}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addRow} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md">
        Add Row
      </button>
    </section>
  );
};

export default TeachingExperience;
