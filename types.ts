
export interface AcademicCareer {
  id: string;
  course: string;
  subject: string;
  year: string;
  percentage: string;
  division: string;
  university: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  journalName: string;
  year: string;
  issnIsbn: string;
  ugcApproved: 'Yes' | 'No' | '';
  impactFactor: string;
  type: 'Indian' | 'Foreign' | '';
}

export interface Book {
    id: string;
    title: string;
    year: string;
    issnIsbn: string;
    type: 'Subject' | 'Chapter' | '';
}

export interface Award {
    id: string;
    name: string;
    type: 'International' | 'State' | 'Fellowship' | '';
}

export interface Conference {
    id: string;
    title: string;
    organizedBy: string;
    year: string;
    level: 'National' | 'Indian/Foreign' | '';
}

export interface TeachingExperienceEntry {
  id: string;
  university: string;
  designation: string;
  from: string;
  to: string;
}

export interface ApplicationFormData {
  personal: {
    fullName: string;
    department: string;
    specialization: string;
    gender: 'Male' | 'Female' | '';
    dob: string;
    fatherName: string;
    motherName: string;
    birthPlace: string;
    birthDistrict: string;
    nationality: string;
    religion: string;
    caste: 'SC' | 'ST' | 'BC' | 'OC' | 'Minority' | '';
    subCaste: string;
    phCategory: 'None' | 'PH-HH' | 'PH-OH' | 'PH-VH';
    qualificationTest: 'NET' | 'SLET' | 'APSET' | 'Other' | '';
  };
  photo: File | null;
  contact: {
    presentPost: string;
    communicationAddress: string;
    mobile: string;
    email: string;
    pan: string;
    aadhar: string;
  };
  qualifications: {
    phdAwardDate: string;
    researchArea: string;
    postDocExperience: string;
    mphilPassDate: string;
    academicCareer: AcademicCareer[];
  };
  research: {
      papers: ResearchPaper[];
      books: Book[];
      awards: Award[];
      conferences: Conference[];
  };
  teachingExperience: TeachingExperienceEntry[];
  declaration: {
      agreed: boolean;
      date: string;
      place: string;
  }
}
