export interface UserDataProps {
  id: string;
  username: string;
  password: string;
  role: "USER" | "ADMIN";
}

export interface PlaceDataProps {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  image_path: string;
  description: string;
}

export interface ScheduleDataProps {
  id: string;
  type: "BUS" | "TRAIN";
  line: string;
  from_place_id: string;
  to_place_id: string;
  travel_time: string;
  departure_time: string;
  arrival_time: string;
  distance: string;
  speed: string;
  from_place: PlaceDataProps;
  to_place: PlaceDataProps;
}

export interface RouteDataProps {
  id: string;
  from_place_id: string;
  to_place_id: string;
  schedules: [ScheduleDataProps];
  from_place: PlaceDataProps;
  to_place: PlaceDataProps;
  created_at: string;
  updated_at: string;
}

export interface ImageDataProps {
  file: File;
  previewUrl: string;
}
