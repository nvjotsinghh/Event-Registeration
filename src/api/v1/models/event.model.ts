export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export type EventCategory =
  | "conference"
  | "workshop"
  | "seminar"
  | "meetup"
  | "webinar"
  | "other";

export interface Event {
  id?: string;
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  status: EventStatus;
  category: EventCategory;
  organizerName: string;
  organizerEmail: string;
  tags?: string[];
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  status?: EventStatus;
  category: EventCategory;
  organizerName: string;
  organizerEmail: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface UpdateEventDto extends Partial<CreateEventDto> {}