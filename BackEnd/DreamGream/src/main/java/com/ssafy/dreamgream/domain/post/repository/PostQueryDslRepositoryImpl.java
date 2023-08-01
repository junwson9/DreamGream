package com.ssafy.dreamgream.domain.post.repository;

import static com.ssafy.dreamgream.domain.post.entity.QPost.post;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class PostQueryDslRepositoryImpl implements PostQueryDslRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<PostListResponseDto> findPostListByAchievedStatus(String categoryName, Boolean isAchieved) {

		BooleanExpression expression = post.isAchieved.eq(isAchieved).and(post.isDisplay.eq(true));

		if (StringUtils.hasText(categoryName)) {
			expression = expression.and(post.category.categoryName.eq(categoryName));
		}

		return jpaQueryFactory
			.select(Projections.constructor(PostListResponseDto.class,
				post.postId, post.title, post.isDisplay, post.isAchieved,
				post.createdDate, post.achievedDate, post.cheerCnt, post.celebrateCnt,
				post.aiImg, post.achievementImg, post.category.categoryName,
				post.member.memberId, post.member.nickname))
			.from(post)
			.where(expression)
			.orderBy(post.createdDate.desc())
			.fetch();
	}

}
