export interface IUpcomingJobargType {
  driverId: string;
  userId: number;
}

export interface IUpcomingJob {
  _id: number;
  pharmacy_name: string;
  location: string;
  delivery_count: number;
  pickup_count: number;
}
export interface IUpcomingJobs {
  code: number;
  message?: string;
  result: IUpcomingJob[];
}

export interface IUpcomingjobTimingObj {
  startDateTime: string;
  endDateTime: string;
}

export interface IUpcomingJobExpandedListItem {
  _id: string;
  pick_up_location: string;
  jobTimingObj: IUpcomingjobTimingObj;
  ride_fare: number;
  estimate_distance: number;
}

export interface IUpcomingJobExpandedList {
  code: number;
  message?: string;
  result: IUpcomingJobExpandedListItem[];
}
