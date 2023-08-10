// /* eslint-disable */
// import { API_URL } from '../config';
// import axiosInstance from './axiosInterceptor';

// export default UseInfiniteScroll = async (lastPostID, size) => {
//   const res = await axiosInstance.get(
//     `${API_URL}/api/posts/achieved?last_post_id=${lastPostID}`,
//   );
//   const postList = res.data.data.post_list.content;
//   return {
//     postList,
//     nextLastPostId: postList[postList.length - 1]?.postId,
//     isLast: postList.length < size,
//   };
// };
