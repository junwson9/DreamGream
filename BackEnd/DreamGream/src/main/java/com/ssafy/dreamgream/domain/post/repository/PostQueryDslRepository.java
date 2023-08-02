package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Map;

public interface PostQueryDslRepository {

	Slice<PostListResponseDto> findPublicPostsByAchievedStatus(Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable);

	Map<String, List<PostListResponseDto>> findPublicPostsByMember(Long memberId);

	Map<String, List<PostListResponseDto>> findPostsByMember(Long memberId);

}
