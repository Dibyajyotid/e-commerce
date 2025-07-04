export interface Testimonial {
  name: string;
  designation: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  vendor: string;
  image: string;
  description: string;
  category: string;
  originalPrice?: number;
  discount?: number;
  isPopular?: boolean;
  isNew?: boolean;
  preparationTime?: string;
  distance?: string;
  reviews?: number;
}

export interface CartItem<T = BaseProduct> {
  product: T;
  quantity: number;
}

// types/delivery.ts
export type DeliveryStatus =
  | "accepted"
  | "en-route-pickup"
  | "arrived-pickup"
  | "picked-up"
  | "en-route-delivery"
  | "delivered";

export type Priority = "high" | "normal";

export interface AvailableDelivery {
  id: string;
  orderId: string;
  vendor: string;
  customer: string;
  pickup: string;
  delivery: string;
  distance: string;
  fee: number;
  items: string[];
  estimatedTime: string;
  priority: Priority;
  customerRating: number;
  tips: number;
}

export interface ActiveDelivery extends AvailableDelivery {
  status: DeliveryStatus;
  acceptedAt: string;
  progress: number;
  customerPhone?: string;
  estimatedArrival?: string;
}

export interface TodayStats {
  deliveries: number;
  earnings: number;
  tips: number;
  rating: number;
  distance: number;
  hours: number;
}

