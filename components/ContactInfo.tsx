
import React from 'react';
import type { ApplicationFormData } from '../types';
import SectionTitle from './SectionTitle';
import InputField from './InputField';

interface ContactInfoProps {
  data: ApplicationFormData['contact'];
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  return (
    <section>
      <SectionTitle title="2. Professional & Contact Details" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField
          label="13. Present Post Held"
          id="presentPost"
          name="presentPost"
          value={data.presentPost}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <label htmlFor="communicationAddress" className="block text-sm font-medium text-gray-700 mb-1">
            14. Communication Address
          </label>
          <textarea
            id="communicationAddress"
            name="communicationAddress"
            rows={3}
            value={data.communicationAddress}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          ></textarea>
        </div>
        <InputField
          label="15. Mobile No."
          id="mobile"
          name="mobile"
          type="tel"
          value={data.mobile}
          onChange={handleChange}
        />
        <InputField
          label="16. Email ID"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <InputField
          label="17. PAN No."
          id="pan"
          name="pan"
          value={data.pan}
          onChange={handleChange}
        />
        <InputField
          label="18. Aadhar No."
          id="aadhar"
          name="aadhar"
          value={data.aadhar}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default ContactInfo;
