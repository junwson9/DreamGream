package com.ssafy.dreamgream.domain.post.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
public class PostListResponseDto {

	private Long postId;

	private String title;

	private Boolean isDisplay;

	private Boolean isAchieved;

	private LocalDateTime createdDate;

	private LocalDateTime achievedDate;

	private Long cheerCnt;

	private Long celebrateCnt;

	private String aiImg;

	private String achievementImg;

	private Long categoryId;

	// == Member 데이터 == //
	private Long memberId;
	
	private String nickname;

	private String profileImg;

	// == 좋아요 여부 == //
	private Boolean isCheered;

	private Boolean isCelebrated;


	public void updateCheerAndCelebrateCnt(Long cheerCnt, Long celebrateCnt) {
		this.cheerCnt = cheerCnt;
		this.celebrateCnt = celebrateCnt;
	}

	public void updateCheerCnt(Long cheerCnt) {
		this.cheerCnt = cheerCnt;
	}

	public void updateCelebrateCnt(Long celebrateCnt) {
		this.celebrateCnt = celebrateCnt;
	}

	public void updateIsCheered(Boolean isCheered) {
		this.isCheered = isCheered;
	}

	public void updateIsCelebrated(Boolean isCelebrated) {
		this.isCelebrated = isCelebrated;
	}

	public PostListResponseDto(Long postId, String title, Boolean isDisplay, Boolean isAchieved, LocalDateTime createdDate, LocalDateTime achievedDate, Long cheerCnt, Long celebrateCnt, String aiImg, String achievementImg, Long categoryId, Long memberId, String nickname, String profileImg) {
		this.postId = postId;
		this.title = title;
		this.isDisplay = isDisplay;
		this.isAchieved = isAchieved;
		this.createdDate = createdDate;
		this.achievedDate = achievedDate;
		this.cheerCnt = cheerCnt;
		this.celebrateCnt = celebrateCnt;
		this.aiImg = aiImg;
		this.achievementImg = achievementImg;
		this.categoryId = categoryId;
		this.memberId = memberId;
		this.nickname = nickname;
		this.profileImg = profileImg;
	}

	public PostListResponseDto(Long postId, String title, Boolean isDisplay, Boolean isAchieved, LocalDateTime createdDate, LocalDateTime achievedDate, Long cheerCnt, Long celebrateCnt, String aiImg, String achievementImg, Long categoryId, Long memberId, String nickname, String profileImg, Boolean isCheered, Boolean isCelebrated) {
		this.postId = postId;
		this.title = title;
		this.isDisplay = isDisplay;
		this.isAchieved = isAchieved;
		this.createdDate = createdDate;
		this.achievedDate = achievedDate;
		this.cheerCnt = cheerCnt;
		this.celebrateCnt = celebrateCnt;
		this.aiImg = aiImg;
		this.achievementImg = achievementImg;
		this.categoryId = categoryId;
		this.memberId = memberId;
		this.nickname = nickname;
		this.profileImg = profileImg;
		this.isCheered = isCheered;
		this.isCelebrated = isCelebrated;
	}
}
