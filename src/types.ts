export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  category: 'maintenance' | 'diagnostics' | 'performance' | 'repairs';
  estimatedTime?: string;
  priceEstimate?: string;
}

export interface BeforeAfterPhoto {
  id: string;
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  vehicle: string;
  verified: boolean;
}

export interface ServiceBooking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
