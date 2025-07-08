export interface Company {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Job {
  _id?: string;
  title?: string;
  type?: string;
  location?: string;
  description?: string;
  salary?: string;
  company: {
    name?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
}

export interface JobFormData {
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export interface SearchFilters {
  search: string;
  type: string;
  location: string;
  salary: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
