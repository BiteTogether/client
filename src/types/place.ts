// Place/Restaurant related types
export interface Place {
  id: string;
  name: string;
  description: string;
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
  };
  rating: number;
  priceLevel: number; // 1-4 ($ to $$$$)
  cuisineTypes: string[];
  openingHours: OpeningHours[];
  contact: {
    phone?: string;
    website?: string;
    email?: string;
  };
  features: string[]; // ['wifi', 'parking', 'outdoor-seating']
  createdAt: string;
  updatedAt: string;
}

export interface OpeningHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  open: string; // "09:00"
  close: string; // "22:00"
  closed: boolean;
}

// Swiping related types
export interface SwipeAction {
  userId: string;
  placeId: string;
  action: 'like' | 'dislike';
  timestamp: string;
}

export interface Match {
  id: string;
  users: string[]; // User IDs
  place: Place;
  createdAt: string;
  status: 'active' | 'expired' | 'completed';
}

// Swipe Battle types
export interface SwipeBattle {
  id: string;
  chatId: string;
  places: Place[];
  participants: string[]; // User IDs
  votes: SwipeVote[];
  winner?: Place;
  status: 'active' | 'completed' | 'expired';
  expiresAt: string;
  createdAt: string;
}

export interface SwipeVote {
  userId: string;
  placeId: string;
  timestamp: string;
}
