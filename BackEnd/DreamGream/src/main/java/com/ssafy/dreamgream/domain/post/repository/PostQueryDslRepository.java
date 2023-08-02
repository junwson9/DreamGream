package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Map;

public interface PostQueryDslRepository {

	Slice<PostListResponseDto> findPostListByAchievedStatus(Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable);

	Map<String, List<PostListResponseDto>> findPostListOfMember(Long memberId);

	Map<String, List<PostListResponseDto>> findMyPostList(Long memberId);

	/* 	개인 피드 조회 방식 변경으로 아래 코드 폐기
	Slice<PostListResponseDto> findPostListOfMember(Long memberId, Boolean isAchieved, Long categoryId, Long lastPostId, Pageable pageable);

	Slice<PostListResponseDto> findMyPostList(Long currentMemberId, Boolean isAchieved, Long categoryId, Long lastPostId, Pageable pageable);
	*/
}
