package com.ssafy.dreamgream.domain.post.repository;

import static com.ssafy.dreamgream.domain.post.entity.QPost.post;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class PostQueryDslRepositoryImpl implements PostQueryDslRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Slice<PostListResponseDto> findPostListByAchievedStatus(String categoryName, Boolean isAchieved, Long lastPostId, Pageable pageable) {

		BooleanExpression expression = post.isAchieved.eq(isAchieved).and(post.isDisplay.eq(true));

		if (StringUtils.hasText(categoryName)) {
			expression = expression.and(post.category.categoryName.eq(categoryName));
		}

		List<PostListResponseDto> results = getPostListQuery(expression, lastPostId, pageable);
		return checkLastPage(pageable, results);
	}


	@Override
	public Slice<PostListResponseDto> findPostListByMember(Long memberId, Long lastPostId, Pageable pageable, Boolean isAchieved) {

		BooleanExpression expression = post.isAchieved.eq(isAchieved).and(post.isDisplay.eq(true));

		List<PostListResponseDto> results = getPostListQuery(expression, lastPostId, pageable);
		return checkLastPage(pageable, results);
	}


	// expression(where) 조건에 맞는 게시글 목록을 조회해오는 메서드
	private List<PostListResponseDto> getPostListQuery(BooleanExpression expression, Long lastPostId, Pageable pageable) {
		return jpaQueryFactory
				.select(Projections.constructor(PostListResponseDto.class,
						post.postId, post.title, post.isDisplay, post.isAchieved,
						post.createdDate, post.achievedDate, post.cheerCnt, post.celebrateCnt,
						post.aiImg, post.achievementImg, post.category.categoryName,
						post.member.memberId, post.member.nickname))
				.from(post)
				.where(
						ltPostId(lastPostId),
						expression
				)
				.orderBy(post.postId.desc())
				.limit(pageable.getPageSize()+1)
				.fetch();
	}


	// 첫 페이지인 경우 post.postId.lt(lastPostId) 가 조건문에 없기 하기 위한 메서드
	private BooleanExpression ltPostId(Long lastPostId) {
		if (lastPostId == null) {
			return null;
		}

		return post.postId.lt(lastPostId);
	}


	// 무한 스크롤 처리를 위해 마지막 페이지를 체크하는 메서드
	private Slice<PostListResponseDto> checkLastPage(Pageable pageable, List<PostListResponseDto> results) {

		boolean hasNext = false;

		// 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
		if (results.size() > pageable.getPageSize()) {
			hasNext = true;
			results.remove(pageable.getPageSize());
		}

		return new SliceImpl<>(results, pageable, hasNext);
	}

}
