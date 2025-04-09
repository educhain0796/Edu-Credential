
export interface Credential {
  id: number;
  name: string;
  issuer: string;
  date: string;
  fraudStatus: "Valid" | "Suspicious";
  score: number;
  image?: string;
  // Adding UserCredential properties to make it compatible
  skills?: string[];
  year?: number | null;
  isSelected?: boolean;
  notes?: string;
}

export interface FraudCheckResponse {
  status: "Valid" | "Suspicious";
  confidence: number;
  analysis: {
    watermark: boolean;
    signature: boolean;
    textConsistency: boolean;
    issuerVerified: boolean;
  };
}

export interface UserCredential {
  id: string;
  name: string;
  issuer: string;
  skills: string[];
  year: number | null;
  isSelected: boolean;
  notes?: string;
}

export interface CareerSuggestion {
  role: string;
  description: string;
  eligibility_criteria: string[];
  perks: string[];
  pros: string[];
  cons: string[];
  package: {
    entry_level: string;
    after_5_years: string;
  };
  work_life_balance_rating: string;
  how_ssoc_participation_helps: string;
}

export interface CareerResponse {
  career_suggestions: CareerSuggestion[];
  next_steps: string[];
}
