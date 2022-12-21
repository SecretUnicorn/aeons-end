export interface IApplicant {
  id: number;
  email: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IBuyInterest {
  id: number;
  uid: string;
  salutation: 'm' | 'd' | 'w';
  last_edited: Date;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  street: string | null;
  zip: string | null;
  city: string | null;
  telephone_number: string | null;
  mobile_number: string | null;
  room_from: number;
  room_to: number;
  space_from: number;
  space_to: number;
  purchase_price: number;
  wishes: string | null;
  comment: string | null;
  category: ICategory;
  applicant: IApplicant;
  wants_ground_floor: boolean;
  wants_upstairs: boolean;
  wants_penthouse: boolean;
}

export interface IPaginatedResponse<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
}
