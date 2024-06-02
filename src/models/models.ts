export interface Achievement {
  id: number;
  description: string;
  icon: string;
  image: string;
  name: string;
}

export interface Badge {
  id: number;
  achievement: Achievement;
  created_at: string;
  updated_at: string;
}

export interface Poop {
  id: number;
  latitude: number;
  longitude: number;
  created_at: string;
  note: string;
  place: string;
  rating: number;
  followers_count: number;
  comments_count: number;
}

export interface UserProfile {
  username: string;
  total_poops: number;
  poops_this_year: number;
  likes_received: number;
  time_using_poopmap: string;
  account_days: number;
  most_popular_place: string;
  badges: Badge[];
  poops: Poop[];
  avatar: string;
}
