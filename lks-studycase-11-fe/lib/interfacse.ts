export interface User {
  id: number;
  username: string;
  password: string;
  medicals: Medical;
}
export interface Society {
  id: number;
  id_card_number: number;
  password: string;
  name: string;
  born_date: string;
  gender: "male" | "female";
  address: string;
  login_tokens: string;
  regional_id: number;
  regional: Regional;
  vaccinations: Vaccination[];
  consultations: Consultation[];
}
export interface Regional {
  id: number;
  province: string;
  district: string;
  spots: Spot[];
  societies: Society[];
}
export interface Medical {
  id: number;
  role: "doctor" | "officer";
  name: string;
  user_id: number;
  spot_id: number;
  user: User;
  spot: Spot;
}
export interface Spot {
  id: number;
  name: string;
  address: string;
  serve: number;
  capacity: number;
  regional_id: number;
  vaccines: Vaccine[];
  medicals: Medical[];
  vaccinations: Vaccination[];
  regional: Regional;
  available_vaccines: any;
}
export interface Vaccine {
  id: number;
  name: string;
  spots: Spot[];
  vaccinations: Vaccination[];
}
export interface Consultation {
  id: number;
  status: "pending" | "accepted" | "declined";
  disease_history: string;
  current_symptoms: string;
  doctor_notes: string;
  society_id: number;
  doctor_id: string;
  society: Society;
  doctor: User;
}
export interface Vaccination {
  id: number;
  dose: number;
  date: string;
  society_id: number;
  spot_id: number;
  vaccine_id: number;
  doctor_id: number;
  officer_id: string;
  society: Society;
  spot: Spot;
  vaccine: Vaccine;
  doctor: User;
  officer: User;
}
