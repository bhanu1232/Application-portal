
import type { ApplicationFormData } from './types';

export const initialFormData: ApplicationFormData = {
  personal: {
    fullName: '',
    department: '',
    specialization: '',
    gender: '',
    dob: '',
    fatherName: '',
    motherName: '',
    birthPlace: '',
    birthDistrict: '',
    nationality: 'Indian',
    religion: '',
    caste: '',
    subCaste: '',
    phCategory: 'None',
    qualificationTest: '',
  },
  photo: null,
  contact: {
    presentPost: '',
    communicationAddress: '',
    mobile: '',
    email: '',
    pan: '',
    aadhar: '',
  },
  qualifications: {
    phdAwardDate: '',
    researchArea: '',
    postDocExperience: '',
    mphilPassDate: '',
    academicCareer: [{ id: crypto.randomUUID(), course: '', subject: '', year: '', percentage: '', division: '', university: '' }],
  },
  research: {
    papers: [{ id: crypto.randomUUID(), title: '', journalName: '', year: '', issnIsbn: '', ugcApproved: '', impactFactor: '', type: '' }],
    books: [{ id: crypto.randomUUID(), title: '', year: '', issnIsbn: '', type: 'Subject' }],
    awards: [{ id: crypto.randomUUID(), name: '', type: 'International' }],
    conferences: [{ id: crypto.randomUUID(), title: '', organizedBy: '', year: '', level: 'National' }],
  },
  teachingExperience: [{ id: crypto.randomUUID(), university: '', designation: '', from: '', to: '' }],
  declaration: {
      agreed: false,
      date: new Date().toISOString().split('T')[0],
      place: ''
  }
};
