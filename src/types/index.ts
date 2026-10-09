/** DummyJSON API models and small application-level extensions. */
export interface Address {
  address?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  country?: string;
  coordinates?: { lat: number; lng: number };
}
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  gender?: string;
  age?: number;
  image?: string;
  phone?: string;
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: { color?: string; type?: string };
  ip?: string;
  address?: Address;
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };
  company?: {
    department?: string;
    name?: string;
    title?: string;
    address?: Address;
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
}
export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt?: string;
    updatedAt?: string;
    barcode?: string;
    qrCode?: string;
  };
  thumbnail: string;
  images: string[];
}
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number } | number;
  views?: number;
  userId: number;
}
export type TodoPriority = "Low" | "Medium" | "High";
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  priority?: TodoPriority;
  local?: boolean;
}
export interface CartItem {
  product: Product;
  quantity: number;
}
export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}
