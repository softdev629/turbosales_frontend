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
