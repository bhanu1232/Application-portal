
import React from 'react';
import type { ApplicationFormData, AcademicCareer } from '../types';
import SectionTitle from './SectionTitle';
import InputField from './InputField';

interface QualificationsProps {
  data: ApplicationFormData;
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
}

const Qualifications: React.FC<QualificationsProps> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      qualifications: { ...prev.qualifications, [name]: value },
    }));
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      qualifications: {
        ...prev.qualifications,
        academicCareer: prev.qualifications.academicCareer.map(row =>
          row.id === id ? { ...row, [name]: value } : row
        ),
      },
    }));
  };

  const addRow = () => {
    setData(prev => ({
      ...prev,
      qualifications: {
        ...prev.qualifications,
        academicCareer: [...prev.qualifications.academicCareer, { id: crypto.randomUUID(), course: '', subject: '', year: '', percentage: '', division: '', university: '' }]
      }
    }));
  };

  const removeRow = (id: string) => {
    setData(prev => ({
      ...prev,
      qualifications: {
        ...prev.qualifications,
        academicCareer: prev.qualifications.academicCareer.filter(row => row.id !== id)
      }
    }));
  };

  return (
    <section>
      <SectionTitle title="19. Qualifications" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <InputField
          label="(b) Date of Award of Ph.D."
          id="phdAwardDate"
          name="phdAwardDate"
          type="date"
          value={data.qualifications.phdAwardDate}
          onChange={handleChange}
        />
        <InputField
          label="(c) Specify Area of Research"
          id="researchArea"
          name="researchArea"
          value={data.qualifications.researchArea}
          onChange={handleChange}
        />
        <InputField
          label="(d) Post Doctoral Experience, if any"
          id="postDocExperience"
          name="postDocExperience"
          value={data.qualifications.postDocExperience}
          onChange={handleChange}
        />
        <InputField
          label="(e) Date of Passing M.Phil. Degree"
          id="mphilPassDate"
          name="mphilPassDate"
          type="date"
          value={data.qualifications.mphilPassDate}
          onChange={handleChange}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">(f) Academic Career (Start with highest degree)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              {['Course Name', 'Subject', 'Year of Passing', '% of Marks', 'Division', 'Name of the University/Board', 'Action'].map(header => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.qualifications.academicCareer.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2"><input type="text" name="course" value={row.course} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="text" name="subject" value={row.subject} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="text" name="year" value={row.year} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="text" name="percentage" value={row.percentage} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="text" name="division" value={row.division} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2"><input type="text" name="university" value={row.university} onChange={(e) => handleTableChange(e, row.id)} className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm" /></td>
                <td className="px-4 py-2 text-center">
                  <button type="button" onClick={() => removeRow(row.id)} className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={data.qualifications.academicCareer.length <= 1}>
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

export default Qualifications;
