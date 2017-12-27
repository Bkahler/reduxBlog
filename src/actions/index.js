import axios from 'axios';

const ROOT_URL ='http://localhost:3000'

export const FETCH_POSTS = 'FETCH_POSTS'

export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
};
