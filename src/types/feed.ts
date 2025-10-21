import { Place } from "./place";

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

export interface NewPostRequest {
  topic?: string;
  text?: string;
  images?: string[];
  place?: Place;
  postOption: string;
  createdAt: string;
  updatedAt: string;
}

export type Option = { 
    label: string; 
    value: string 
};