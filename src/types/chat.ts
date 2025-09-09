import { Place } from './place';

// Chat and messaging types
export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string; // For group chats
  participants: string[]; // User IDs
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'place' | 'swipe-battle';
  metadata?: {
    imageUrl?: string;
    placeId?: string;
    swipeBattleId?: string;
  };
  timestamp: string;
  readBy: string[]; // User IDs who have read this message
}

// Feed related types
export interface FeedPost {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  place?: Place;
  likes: string[]; // User IDs who liked this post
  comments: Comment[];
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'feed_like' | 'feed_comment' | 'swipe_battle';
  title: string;
  message: string;
  data?: any; // Additional data based on notification type
  read: boolean;
  createdAt: string;
}
