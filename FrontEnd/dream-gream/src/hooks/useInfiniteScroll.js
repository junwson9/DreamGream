/* eslint-disable */
import { API_URL } from '../config';
import axiosInstance from '../utils/axiosInterceptor';

<<<<<<< HEAD:FrontEnd/dream-gream/src/hooks/useInfiniteScroll.js
export const UseInfiniteScroll = async (loginFlag,lastPostID, size) => {
    let res
    if (lastPostID === null) {
      res = await axiosInstance.get(
        `${API_URL}/api/posts/achieved`,{
          params: {
            'login-flag': loginFlag,
          }
        }
        );
    }
    else{
      res = await axiosInstance.get(
      `${API_URL}/api/posts/achieved?last-post-id=${lastPostID}`,{
        params: {
        'login-flag': loginFlag,
        }
      }
    );
  }
    
    const postList = res.data.data.post_list.content
    const nextLastPostId = postList[postList.length - 1]?.post_id;
    return { postList,nextLastPostId, isLast: postList.length < size };
};
=======
// export const UseInfiniteScroll = async (lastPostID, size) => {
//     let res
//     if (lastPostID === null) {
//       res = await axiosInstance.get(
//         `${API_URL}/api/posts/achieved`,{
//           params: {
//             'login-flag': true,
//           }
//         }
//         );
//     }
//     else{
//       res = await axiosInstance.get(
//       `${API_URL}/api/posts/achieved?last-post-id=${lastPostID}`,{
//       params: {
//         'login-flag': true,
//       }
//     }
//     );
//   }

//     const postList = res.data.data.post_list.content
//     const nextLastPostId = postList[postList.length - 1]?.post_id;
//     console.log(postList);
//     console.log(postList[postList.length - 1]?.post_id);
//     return { postList,nextLastPostId, isLast: postList.length < size };
// };
>>>>>>> feature/image-signup:FrontEnd/dream-gream/src/utils/useInfiniteScroll.js
