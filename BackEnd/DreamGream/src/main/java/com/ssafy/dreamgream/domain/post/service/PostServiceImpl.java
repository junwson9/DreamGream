package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl {

	private final PostRepository postRepository;
	private final MemberService memberService;

	public Slice<PostListResponseDto> findAchievedPostList(Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable) {
		return postRepository.findPostListByAchievedStatus(categoryId, isAchieved, lastPostId, pageable);
	}



//  // 개인 피드 조회 방식 변경으로 아래 코드 폐기
//	public Slice<PostListResponseDto> findPostListOfMember(Long memberId, Boolean isAchieved, Long categoryId, Long lastPostId, Pageable pageable) {
//		//TODO 존재하지 않는 memberId 예외처리
//
//		return postRepository.findPostListOfMember(memberId, isAchieved, categoryId, lastPostId, pageable);
//	}
//
//	public Slice<PostListResponseDto> findMyPostList(Boolean isAchieved, Long categoryId, Long lastPostId, Pageable pageable) {
//		Long currentMemberId = memberService.getCurrentMember().getMemberId();
//		return postRepository.findMyPostList(currentMemberId, isAchieved, categoryId, lastPostId, pageable);
//	}


}
