export interface SearchFriendResponse {
  id: number;
  username: string;
  fullName: string;
  avatar?: string;
}

export interface FriendProfileResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  friendItem: {
    hasFriendRequestSent: boolean;
    hasFriendRequestReceived: boolean;
    friendRequestId: number;
    isFriend: boolean;
    isUserOnline: boolean;
    lastSeenUser: string;
  };
}

export type FriendsListResponse = SearchFriendResponse[];

export interface FriendRequest {
  id: number;
  user: {
    id: number;
    username: string;
    fullName: string;
    avatar?: string;
  };
}
export type FriendRequestsResponse = FriendRequest[];