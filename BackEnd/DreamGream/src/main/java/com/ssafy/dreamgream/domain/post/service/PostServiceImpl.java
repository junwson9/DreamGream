package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl {

	private final PostRepository postRepository;

	public Slice<PostListResponseDto> findAchievedPostList(String categoryName, Boolean isAchieved, Long lastPostId, Pageable pageable) {
		return postRepository.findPostListByAchievedStatus(categoryName, isAchieved, lastPostId, pageable);
	}

	@Transactional
	public Slice<PostListResponseDto> findPostListByMember(Long memberId, Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable) {
		//TODO 존재하지 않는 memberId 예외처리

		return postRepository.findPostListByMember(memberId, categoryId, isAchieved, lastPostId, pageable);
	}
}
