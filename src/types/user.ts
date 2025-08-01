export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address; // Optional address field
  phone: string;
  website: string;
  company?: Company; // Optional company field
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: Geo; // Optional geo field
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type UserTitle = "name" | "username" | "email";

export interface NewUser {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  addressStreet: string;
  addressSuite: string;
  addressCity: string;
  addressZipcode: string;
  addressGeoLat: string;
  addressGeoLng: string;
  companyName: string;
  companyCatchPhrase: string;
  companyBs: string;
}
