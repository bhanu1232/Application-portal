
import React from 'react';
import type { ApplicationFormData } from '../types';
import SectionTitle from './SectionTitle';
import InputField from './InputField';
import RadioGroup from './RadioGroup';

interface PersonalInfoProps {
  data: ApplicationFormData;
  setData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  photoPreview: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, setData, photoPreview, onPhotoChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  return (
    <section>
      <SectionTitle title="1. Personal Information" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            label="1. Full Name (Block Letters)"
            id="fullName"
            name="fullName"
            value={data.personal.fullName}
            onChange={handleChange}
            containerClassName="lg:col-span-3"
          />
          <InputField
            label="2. Department"
            id="department"
            name="department"
            value={data.personal.department}
            onChange={handleChange}
          />
          <InputField
            label="3. Specialization"
            id="specialization"
            name="specialization"
            value={data.personal.specialization}
            onChange={handleChange}
          />
          <div/>
          <RadioGroup
            label="4. Gender"
            name="gender"
            options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
            selectedValue={data.personal.gender}
            onChange={handleChange}
          />
          <InputField
            label="5. Date of Birth"
            id="dob"
            name="dob"
            type="date"
            value={data.personal.dob}
            onChange={handleChange}
          />
          <InputField
            label="6. Place of Birth & District"
            id="birthPlace"
            name="birthPlace"
            value={data.personal.birthPlace}
            onChange={handleChange}
          />
          <InputField
            label="7. Father's Name"
            id="fatherName"
            name="fatherName"
            value={data.personal.fatherName}
            onChange={handleChange}
          />
          <InputField
            label="8. Mother's Name"
            id="motherName"
            name="motherName"
            value={data.personal.motherName}
            onChange={handleChange}
          />
          <InputField
            label="9. Nationality"
            id="nationality"
            name="nationality"
            value={data.personal.nationality}
            onChange={handleChange}
          />
          <InputField
            label="10. Religion"
            id="religion"
            name="religion"
            value={data.personal.religion}
            onChange={handleChange}
          />
          <RadioGroup
            label="11. Caste"
            name="caste"
            options={[
              { value: 'SC', label: 'SC' },
              { value: 'ST', label: 'ST' },
              { value: 'BC', label: 'BC' },
              { value: 'OC', label: 'OC' },
              { value: 'Minority', label: 'Minority' },
            ]}
            selectedValue={data.personal.caste}
            onChange={handleChange}
          />
           <InputField
            label="Sub-Caste"
            id="subCaste"
            name="subCaste"
            value={data.personal.subCaste}
            onChange={handleChange}
          />
          <RadioGroup
            label="12. Claim under PH"
            name="phCategory"
            options={[
              { value: 'None', label: 'None' },
              { value: 'PH-HH', label: 'PH-HH' },
              { value: 'PH-OH', label: 'PH-OH' },
              { value: 'PH-VH', label: 'PH-VH' },
            ]}
            selectedValue={data.personal.phCategory}
            onChange={handleChange}
          />
        </div>

        <div className="lg:col-span-1 flex flex-col items-center mt-6 lg:mt-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">PHOTO</label>
          <div className="w-40 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-2 overflow-hidden">
            {photoPreview ? (
              <img src={photoPreview} alt="Applicant" className="w-full h-full object-cover" />
            ) : (
              <span>Preview</span>
            )}
          </div>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={onPhotoChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-2">Upload a recent photograph.</p>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
