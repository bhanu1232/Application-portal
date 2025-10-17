
import React from 'react';
import type { ApplicationFormData } from '../types';
import InputField from './InputField';

interface DeclarationProps {
  data: ApplicationFormData['declaration'];
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
}

const Declaration: React.FC<DeclarationProps> = ({ data, setData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      declaration: {
        ...prev.declaration,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-blue-800 text-center mb-4">DECLARATION</h2>
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
        <p className="text-sm">
          I hereby declare that, all the information furnished in this application are true to the best of my knowledge and belief and if found incorrect, I am prepared to bear the consequences.
        </p>
        <p className="text-sm mt-2">
          Further, that by reason of the purely temporary hiring of services, I shall not be claim to any preference for recruitment to any post or any service benefits of Sri Venkateswara University, Tirupati.
        </p>
      </div>

      <div className="mt-6 flex items-center">
        <input
          id="agreed"
          name="agreed"
          type="checkbox"
          checked={data.agreed}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="agreed" className="ml-2 block text-sm font-medium text-gray-900">
          I Agree
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <InputField
          label="Place"
          id="place"
          name="place"
          value={data.place}
          onChange={handleChange}
        />
        <InputField
          label="Date"
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          disabled
        />
         <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Signature</label>
            <div className="h-12 border-b-2 border-gray-400"></div>
        </div>
      </div>
    </section>
  );
};

export default Declaration;
