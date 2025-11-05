import { ProfileResponse } from './user';
import { Place, Match } from './place';
import { Chat, Message, FeedPost } from './chat';

// Redux state types
export interface RootState {
  auth: AuthState;
  user: UserState;
  places: PlacesState;
  chat: ChatState;
  feed: FeedState;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  profile: ProfileResponse | null;
  viewingProfile: any | null;
  loading: boolean;
  error: string | null;
}

export interface PlacesState {
  currentSwipeStack: Place[];
  favorites: Place[];
  matches: Match[];
  loading: boolean;
  error: string | null;
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: { [chatId: string]: Message[] };
  loading: boolean;
  error: string | null;
}

export interface FeedState {
  posts: FeedPost[];
  loading: boolean;
  error: string | null;
  page: number;
  hasNext: boolean;
}
