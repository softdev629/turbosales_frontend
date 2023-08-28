export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ICenters {
  center_id: string;
  address: {
    city: string;
    country: string;
  };
  referer_center_id: string;
  level: string;
  purchases: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  center_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetmeResponse {
  status: string;
  user: IUser;
}
