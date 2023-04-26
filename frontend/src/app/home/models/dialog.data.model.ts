import { PassengerModel } from "./passenger.model"

export interface DialogData {
  from: String
  to: String
  travelDate: Date
  travelTime: String
  accomodation: String
  passengers: PassengerModel[]
  fare: number
}
