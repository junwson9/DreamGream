package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PostQueryDslRepository {

	Slice<PostListResponseDto> findPublicPostsByAchievedStatus(Long categoryId, Boolean isAchieved, Post lastPost, Pageable pageable);

	Map<String, List<PostListResponseDto>> findPublicPostsByMember(Long memberId);

	Map<String, List<PostListResponseDto>> findPostsByMember(Long memberId);

	List<PostListResponseDto> findBestPostsByAchievedStatus(Long categoryId, Boolean isAchieved);

}
