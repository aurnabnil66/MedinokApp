export interface IResult {
  app_info: {
    app_version: string;
    device_name: string;
    device_version: string;
    active_on: string;
  };
  vehicle: {
    vehicle_brand_name: string;
    vehicle_model: string;
    year_of_model: string;
    vehicle_license_no: string;
    vehicle_image: string;
    driver_type: string;
    permit_no: string;
    fuel_type: string;
    vehicle_type: string;
  };
  pharmacyConnectionCode: {
    code: string;
  };
  _id: string;
  fname: string;
  lname: string;
  username: string;
  fullname: string;
  first_name: string;
  last_name: string;
  email: string;
  otp: string;
  password: string;
  profile_img: string;
  driver_license: string;
  motor_insurance: string;
  registeration_certificate: string;
  driver_license_status: string;
  motor_insurance_status: string;
  registeration_certificate_status: string;
  profile_img_status: string;
  pan_card: string;
  mobile_no: string;
  mobileVerified: boolean;
  country_code: string;
  isOnline: string;
  active: boolean;
  delete: boolean;
  token: string;
  socialType: string;
  socialId: string;
  total_jobs: number;
  today_jobs: number;
  earning: number;
  today_earning: number;
  total_earning: number;
  rating_driver: number;
  location: string;
  stripe_driverId: string;
  distance: number;
  isNewUser: number;
  isVerified: boolean;
  isDeclined: boolean;
  socket_status: boolean;
  amount_payable: number;
  payment_request: boolean;
  city: string | null;
  language: string;
  message_sent: boolean;
  mail_sent: boolean;
  isBusy: boolean;
  isVehicleRegistered: boolean;
  suspended_note: string;
  timeZone: string;
  driver_speak_languages: string[];
  driver_availability: string[];
  driver_internet_plan: string;
  driver_has_vehicle: string;
  driver_phone_type: string;
  is_first_delivery_experience: string;
  driver_criminal_background_checked: string;
  driver_legal_canada: string;
  stripe_info_status: boolean;
  dispatchCompanyId: string;
  registeredFrom: string;
  devices: string[]; // Depending on what devices is, you may want to define a specific interface for it
  lat_long: [number, number];
  createdAt: string;
  __v: number;
  last_payment_recieved_on: string;
  restrictPublicJobs: boolean;
  paysafeProfileId: string | null;
  linked_pharmacies: string[]; // Depending on what linked_pharmacies is, you may want to define a specific interface for it
}

export interface AccessTokenInfo {
  accessToken: string
}

export interface LoginResponse {
  code: number;
  message: string;
  result: IResult;
}

interface User {
  fullName: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface APIQualityTransaction {
  timestamp: number;
  status: string;
  statusCode: number;
  message: string;
  totalCount: number;
  numberOfElements: number;
  content: TransactionContent[];
}

export interface TransactionContent {
  id: number;
  transactionId: string;
  sampleSize: number;
  defectiveItem: number;
  repaired: boolean;
}
