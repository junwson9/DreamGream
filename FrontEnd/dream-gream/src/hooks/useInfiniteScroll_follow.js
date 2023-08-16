/* eslint-disable */
import { API_URL } from '../config';
import axiosInstance from '../utils/axiosInterceptor';

export const UseInfiniteScroll = async (
  loginFlag,
  lastPostID,
  size,
  categoryID,
) => {
  console.log(`categoryID=${categoryID}`);
  let res;

  if (lastPostID === null) {
    res = await axiosInstance.get(`${API_URL}/api/posts/achieved`, {
      params: {
        'login-flag': loginFlag,
        'category-id': categoryID,
      },
    });
    console.log('요청감');
  } else {
    res = await axiosInstance.get(
      `${API_URL}/api/posts/achieved?last-post-id=${lastPostID}`,
      {
        params: {
          'login-flag': loginFlag,
          'category-id': categoryID,
        },
      },
    );
  }

  const postList = res.data.data.post_list.content;
  console.log('postList:', postList);
  const nextLastPostId = postList[postList.length - 1]?.post_id;
  return { postList, nextLastPostId, isLast: postList.length < size };
};
