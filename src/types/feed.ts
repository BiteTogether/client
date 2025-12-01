export interface CreatePostRequest {
  placeId: number;
  content: string;
  rating: number;
  photoUrl: string;
};

export interface Post {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  id: string;
  placeId: number;
  content: string;
  rating: number;
  photoUrl: string;
  likeCount: number;
  commentCount: number;
  alreadyLiked: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type Posts = Post[];

export interface LikePostRequest {
  postId?: string;
  commentId?: string;
};

export interface CommentPostRequest {
  postId: string;
  content: string;
};

export interface Comment {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  id: string;
  postId: string;
  content: string;
  likeCount: number;
  alreadyLiked: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
};

export type Comments = Comment[];

export interface LikeListResponse {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  id: string;
  postId: string;
  commentId: string;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
};

export type LikesList = LikeListResponse[];