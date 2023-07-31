package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl {

	private final PostRepository postRepository;

	public List<PostListResponseDto> findAchievedPostList(String categoryName, Boolean isAchieved) {
		return postRepository.findPostListByAchievedStatus(categoryName, isAchieved);
	}

}
