export interface ordersDto {
  
  id: number,
  createdDate: string,
  customer: {
    id: number,
    firstName: string,
    patronymic: string,
    surName: string,
    fullName: string,
    phone: string
  },
  visitDate: string,
  status: string,
  master: {
    id: number,
    firstName: string,
    patronymic: string,
    surName: string,
    fullName: string,
    position: string,
    startWorkDate: string,
    photo: string
  },
  service: {
    id: number,
    name: string,
    description: string,
    price: number,
    photo: string,
    isPopular: boolean
  },
  finishStatus: string
    
  }