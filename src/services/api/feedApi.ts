import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { CreatePostRequest, Post, Posts, LikePostRequest, CommentPostRequest, Comments, LikesList } from '../../types/feed';
import { GetListParams } from '../../types/';

export const createPost = (data: Partial<CreatePostRequest>) => {
  return apiService.post(API_ENDPOINTS.FEED.CREATE_POST, data);
};

export const fetchPosts = (params?: GetListParams) => {
  return apiService.get<Posts>(API_ENDPOINTS.FEED.POSTS, { params });
};

export const fetchPostsByUserID = (userId: number, params?: GetListParams) => {
  const url = API_ENDPOINTS.FEED.POSTS_BY_USER_ID.replace('{userId}', String(userId));
  return apiService.get<Posts>(url, { params });
};

export const getPostById = (id: string) => {
  const url = API_ENDPOINTS.FEED.GET_POST_BY_ID.replace('{id}', String(id));
  return apiService.get<Post>(url);
};

export const updatePost = (id: string, data: Partial<CreatePostRequest>) => {
  const url = API_ENDPOINTS.FEED.UPDATE_POST.replace('{id}', String(id));
  return apiService.put(url, data);
};

export const deletePost = (id: string) => {
  const url = API_ENDPOINTS.FEED.DELETE_POST.replace('{id}', String(id));
  return apiService.delete(url);
};

export const likePost = (data: LikePostRequest) => {
  return apiService.post(API_ENDPOINTS.FEED.LIKE_POST, data);
};

export const unlikePost = (data: LikePostRequest) => {
  return apiService.delete(API_ENDPOINTS.FEED.UNLIKE_POST, { data });
};

export const commentPost = (data: CommentPostRequest) => {
  return apiService.post(API_ENDPOINTS.FEED.COMMENT, data);
};

export const fetchCommentsByPostId = (postId: string, params?: GetListParams) => {
  const url = API_ENDPOINTS.FEED.GET_COMMENTS_BY_POST_ID.replace('{postId}', String(postId));
  return apiService.get<Comments>(url, { params });
};

export const fetchLikesByPostId = (postId: string, params?: GetListParams) => {
  const url = API_ENDPOINTS.FEED.GET_LIKES_BY_POST_ID.replace('{postId}', String(postId));
  return apiService.get<LikesList>(url, { params });
};

export const deleteComment = (commentId: string) => {
  const url = API_ENDPOINTS.FEED.DELETE_COMMENT.replace('{commentId}', String(commentId));
  return apiService.delete(url);
};

export const editComment = (commentId: string, data: CommentPostRequest) => {
  const url = API_ENDPOINTS.FEED.EDIT_COMMENT.replace('{commentId}', String(commentId));
  return apiService.put(url, data);
};

export const fetchRepliesByCommentId = (commentId: string, params?: GetListParams) => {
  const url = API_ENDPOINTS.FEED.GET_REPLIES_BY_COMMENT_ID.replace('{commentId}', String(commentId));
  return apiService.get<Comments>(url, { params });
};