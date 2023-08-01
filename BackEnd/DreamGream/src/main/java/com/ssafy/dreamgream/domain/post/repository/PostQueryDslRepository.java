package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface PostQueryDslRepository {

	Slice<PostListResponseDto> findPostListByAchievedStatus(Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable);

	Slice<PostListResponseDto> findPostListOfMember(Long memberId, Boolean isAchieved, Long categoryId, Long lastPostId, Pageable pageable);

	Slice<PostListResponseDto> findMyPostList(Long currentMemberId, Boolean isAchieved, Long categoryId, Long lastPostId, Pageable pageable);
}
