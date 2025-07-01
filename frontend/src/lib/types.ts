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
