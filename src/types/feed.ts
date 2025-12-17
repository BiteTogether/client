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
  parentCommentId?: string;
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
  repliesCount: number;
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
  parentCommentId?: string;

  newReplies?: Comments; // Add replies field to hold nested comments (just new temp reply)
  deletedReplyIds?: string[]; // To track deleted replies
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