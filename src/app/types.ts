export interface Court {
  id?: number,
  name?: string,
  available?: boolean
  reservableTypeId?: number
}

export interface AnonymizedReservation{
  id: number
  timeFrom: Date,
  timeTo: Date,
  reservableName: string
}

export interface CalendarData{
  id: number,
  title: string,
  start: Date,
  end: Date
}

export interface ReservablePrice{
  id: number,
  weekDays: boolean,
  weekendsAndHolidays: boolean,
  timeFrom: Date,
  timeTo: Date,
  price: number
}

export interface ReservableType{
  id?: number,
  name: string,
  openFrom: Date,
  openTo: Date,
  defaultPrice?: number
  prices?: ReservablePrice[]
  reservableList?: Court[]
}

export interface NewReservation {
  reservableType?: number,
  court?: number,
  username?: string,
  date?: Date,
  timeFrom?: Date,
  timeTo?: Date
}

export interface Reservation{
  id?: number
  timeFrom: Date,
  timeTo: Date,
  reservableId: number,
  userName: string
}

export interface User{
  id: number,
  username: string,
  firstName: string,
  surname: string
}

export interface Page<T> {
  totalElements: number,
  content: T[]
}
