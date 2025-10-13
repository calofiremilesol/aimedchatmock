export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  mrn: string;
}

export interface Allergy {
  allergen: string;
  reaction: string;
  severity: string;
}

export interface ChronicCondition {
  condition: string;
  diagnosedDate: string;
  status: string;
  medications: string[];
}

export interface SurgicalHistory {
  procedure: string;
  date: string;
  complications: string;
}

export interface MedicalHistory {
  allergies: Allergy[];
  chronicConditions: ChronicCondition[];
  surgicalHistory: SurgicalHistory[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  prescribedBy: string;
}

export interface Visit {
  date: string;
  type: string;
  provider: string;
  chiefComplaint: string;
  assessment: string;
  plan: string;
}

export interface VitalSigns {
  lastRecorded: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
  height: string;
  bmi: number;
}

export interface LabResult {
  date: string;
  test: string;
  result: string;
  reference: string;
  status: string;
}

export interface PatientSummary {
  patient: Patient;
  medicalHistory: MedicalHistory;
  currentMedications: Medication[];
  recentVisits: Visit[];
  vitalSigns: VitalSigns;
  labResults: LabResult[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  context?: string;
}