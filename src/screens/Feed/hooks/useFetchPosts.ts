import { useState } from 'react';
import { fetchPosts, fetchPostsByUserID } from 'services/api/feedApi';
import { Posts } from 'types/feed';

export function useFetchPosts() {
  const [posts, setPosts] = useState<Posts>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchPosts = async (userId?: number) => {
    setLoading(true);
    try {
      let response;
      if (userId) {
        response = await fetchPostsByUserID(Number(userId));
      } else {
        response = await fetchPosts();
      }
      if (response.data) setPosts(response.data);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, handleFetchPosts, setPosts };
}