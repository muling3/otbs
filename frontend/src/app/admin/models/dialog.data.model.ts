import { PassengerModel } from "src/app/home/models/passenger.model"

export interface DialogData {
  id: String
  from: String
  to: String
  travelDate: Date
  travelTime: String
  accomodation: String
  passengers: PassengerModel[]
  fare: number
}
