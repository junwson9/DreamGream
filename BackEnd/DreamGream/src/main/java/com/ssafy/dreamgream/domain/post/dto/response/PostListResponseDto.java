package com.ssafy.dreamgream.domain.post.dto.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
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

}
