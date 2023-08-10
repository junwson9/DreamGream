/* eslint-disable */
import { API_URL } from '../config';
import axiosInstance from './axiosInterceptor';

const UseInfiniteScroll = async (lastPostID, size) => {
    const res = await axiosInstance.get(
    `${API_URL}/api/posts/achieved?last-post-id=${lastPostID}`,
    );
    const postList = res.data.data.post_list.content
    console.log(postList);
    console.log(postList[postList.length - 1]?.post_id)
  return { postList, nextLastPostId: postList[postList.length - 1]?.post_id, isLast: postList.length < size };
};

export default UseInfiniteScroll;