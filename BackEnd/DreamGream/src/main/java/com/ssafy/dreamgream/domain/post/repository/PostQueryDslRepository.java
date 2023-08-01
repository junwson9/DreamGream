package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface PostQueryDslRepository {

	Slice<PostListResponseDto> findPostListByAchievedStatus(String categoryName, Boolean isAchieved, Long lastPostId, Pageable pageable);

	Slice<PostListResponseDto> findPostListByMember(Long memberId, Long lastPostId, Pageable pageable, Boolean isAchieved);
}
