// TypeScript tip tanımları

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Route {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  image: string;
  rating: number;
  reviewCount: number;
  stops: number;
}
