export interface User {
  username: string;
  password: string;
  validators: Validator[];
}
export interface Society {
  id: string;
  id_card_number: string;
  password: string;
  name: string;
  born_date: string;
  gender: string;
  address: string;
  regional_id: string;
  validations: Validation[];
  regional: Regional;
  job_apply_societies: JobApplySociety[];
  job_apply_positions: JobApplyPosition[];
}
export interface Regional {
  id: string;
  province: string;
  district: string;
  societies: Society[];
}
export interface Validator {
  id: string;
  user_id: string;
  role: string;
  name: string;
  user: User;
  validations: Validation[];
}
export interface JobVacancy {
  id: string;
  job_category_id: string;
  company: string;
  address: string;
  description: string;
  job_apply_positions: JobApplyPosition[];
  available_positions: AvailablePosition[];
  job_category: JobCategory;
  job_apply_societies: JobApplySociety[];
}
export interface JobCategory {
  id: string;
  job_category: string;
  validations: Validation[];
  job_vacancies: JobVacancy[];
}
export interface JobApplySociety {
  id: string;
  notes: string;
  date: string;
  society_id: string;
  job_vacancy_id: string;
  society: Society;
  job_apply_positions: JobApplyPosition[];
  job_vacancy: JobVacancy;
}
export interface JobApplyPosition {
  id: string;
  date: string;
  society_id: string;
  job_vacancy_id: string;
  available_position_id: string;
  job_apply_society_id: string;
  status: string;
  society: Society;
  job_apply_society: JobApplySociety;
  available_position: AvailablePosition;
  job_vacancy: JobVacancy;
}
export interface AvailablePosition {
  id: number;
  job_vacancy_id: string;
  position: string;
  capacity: string;
  apply_capacity: string;
  job_apply_positions: JobApplyPosition[];
  job_vacancy: JobVacancy;
  job_apply_positions_count: number;
}
export interface Validation {
  id: string;
  society_id: string;
  validator_id: string;
  job_category_id: string;
  status: string;
  work_experience: string;
  job_position: string;
  reason_accepted: string;
  validator_notes: string;
  validator: Validator;
  job_category: JobCategory;
  society: Society;
}
