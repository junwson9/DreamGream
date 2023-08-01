package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import java.util.List;

public interface PostQueryDslRepository {

	List<PostListResponseDto> findPostListByAchievedStatus(String categoryName, Boolean isAchieved);

}
