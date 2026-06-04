export interface PerfumeNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  scentFamily: string;
  description: string;
  longDescription: string;
  rating: number;
  notes: PerfumeNotes;
  image: string;
  stock: number;
  volume: string;
  concentration: string;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface QuizVibeOption {
  value: string;
  label: string;
  description: string;
}
