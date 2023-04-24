import { PassengerModel } from "./passenger.model";

export class BookingModel {
  _id?: string;
  booked_by?: string;
  contact?: string;
  address?: string;
  departure?: string;
  destination?: string;
  travel_date?: string;
  travel_time?: string;
  accomodation?: string;
  passengers?: PassengerModel[];
  fare?: number;
  user_confirmed?: boolean;
  admin_confirmed?: boolean;
}
