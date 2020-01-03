import { ID } from '@datorama/akita';

export interface Job {
  id?: ID;
  positionName?: string;
  companyName?: string;
  durationDay?: string;
  durationDayText?: string;
  imageUrl?: string;
  countryCode?: string;
  countryName?: string;
  cityName?: string;
  townName?: string;
  address?: string;
  postalCode?: string;
  hasLatitude?: boolean;
  hasLongitude?: boolean;
  latitude?: string;
  longitude?: string;
  description?: string;
  status?: boolean;
  contactPhone?: string;
}

export interface Tag {
  id: ID;
  positionName: string;
  companyName: string;
  countryName: string;
  cityName: string;
  postalCode: string;
}