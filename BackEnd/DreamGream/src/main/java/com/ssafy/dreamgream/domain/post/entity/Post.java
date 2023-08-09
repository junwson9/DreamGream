package com.ssafy.dreamgream.domain.post.entity;

import com.ssafy.dreamgream.domain.member.entity.Member;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
	private Long postId;

	private String title;

	private String content;

	@Column(name = "dead_line")
	private String deadLine;

	@Column(name = "is_display")
	private Boolean isDisplay;

	@Column(name = "is_achieved")
	private Boolean isAchieved;

	@Column(name = "achievement_content")
	private String achievementContent;

	@Column(name = "achieved_date")
	private LocalDateTime achievedDate;

	@Column(name = "cheer_cnt")
	@ColumnDefault("0")
	private Long cheerCnt;

	@Column(name = "celebrate_cnt")
	@ColumnDefault("0")
	private Long celebrateCnt;

	@Column(name = "ai_img")
	private String aiImg;

	@Column(name = "achievement_img")
	private String achievementImg;

	@CreatedDate
	@Column(name = "created_date")
	private LocalDateTime createdDate;

	@LastModifiedDate
	@Column(name = "modified_date")
	private LocalDateTime modifiedDate;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	public void setAchievementImg(String achievementImg) {
		this.achievementImg = achievementImg;
	}

	public void setCheerCnt(Long cheerCnt) {
		this.cheerCnt = cheerCnt;
	}

	public void setCelebrateCnt(Long celebrateCnt) {
		this.celebrateCnt = celebrateCnt;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public void updateCheerAndCelebrateCnt(Long cheerCnt, Long celebrateCnt) {
		this.cheerCnt = cheerCnt;
		this.celebrateCnt = celebrateCnt;
	}
}
