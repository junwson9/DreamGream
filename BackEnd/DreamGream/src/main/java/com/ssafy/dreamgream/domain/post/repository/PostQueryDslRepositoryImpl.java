package com.ssafy.dreamgream.domain.post.repository;

import static com.ssafy.dreamgream.domain.post.entity.QPost.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
@RequiredArgsConstructor
public class PostQueryDslRepositoryImpl implements PostQueryDslRepository {

	private final JPAQueryFactory jpaQueryFactory;

	// 전체피드 조회
	@Override
	public Slice<PostListResponseDto> findPublicPostsByAchievedStatus(Long categoryId, Boolean isAchieved, Post lastPost, Pageable pageable) {

		BooleanExpression expression = post.isAchieved.eq(isAchieved).and(post.isDisplay.eq(true));

		if (categoryId != null && categoryId != 0L) {
			expression = expression.and(post.category.categoryId.eq(categoryId));
		}

		OrderSpecifier<?> orderSpecifier;

		if (isAchieved) {
			orderSpecifier = post.modifiedDate.desc();
			if(lastPost != null) {
				expression = expression.and(post.modifiedDate.before(lastPost.getModifiedDate()));
			}
		} else {
			orderSpecifier = post.postId.desc();
			if(lastPost != null) {
				expression = expression.and(post.postId.lt(lastPost.getPostId()));
			}
		}

		List<PostListResponseDto> results = getPostsResults(expression, orderSpecifier, pageable);
		return checkLastPage(pageable, results);
	}


	// 베스트 게시글 조회
	@Override
	public List<PostListResponseDto> findBestPostsByAchievedStatus(Long categoryId, Boolean isAchieved) {

		BooleanExpression expression = post.isAchieved.eq(isAchieved).and(post.isDisplay.eq(true));

		if (categoryId != null && categoryId != 0L) {
			expression = expression.and(post.category.categoryId.eq(categoryId));
		}

		OrderSpecifier<?> orderSpecifier;

		if (isAchieved) {
			orderSpecifier = post.celebrateCnt.desc();
		} else {
			orderSpecifier = post.cheerCnt.desc();
		}

		return jpaQueryFactory
			.select(Projections.constructor(PostListResponseDto.class,
				post.postId, post.title, post.deadLine, post.isDisplay, post.isAchieved,
				post.createdDate, post.modifiedDate, post.achievedDate, post.cheerCnt, post.celebrateCnt,
				post.aiImg, post.achievementImg, post.category.categoryId,
				post.member.memberId, post.member.nickname, post.member.profileImg))
			.from(post)
			.where(expression)
			.orderBy(orderSpecifier)
			.limit(8)
			.fetch();
	}


	// 개인피드를 조회해오는 메서드
	@Override
	public Map<String, List<PostListResponseDto>> findPostsByMember(Long memberId, Boolean onlyPublic) {
		BooleanExpression expression = post.member.memberId.eq(memberId);
		if (onlyPublic) {
			expression = expression.and(post.isDisplay.eq(true));
		}

		Map<String, List<PostListResponseDto>> resultMap = new HashMap<>();

		BooleanExpression expressionAchieved = expression.and(post.isAchieved.eq(true));
		BooleanExpression expressionNotAchieved = expression.and(post.isAchieved.eq(false));

		OrderSpecifier<?> orderSpecifierAchieved = post.modifiedDate.desc();
		OrderSpecifier<?> orderSpecifierNotAchieved = post.postId.desc();

		List<PostListResponseDto> achievedPostList = getNotPageablePostsResults(expressionAchieved, orderSpecifierAchieved);
		List<PostListResponseDto> postList = getNotPageablePostsResults(expressionNotAchieved, orderSpecifierNotAchieved);

		resultMap.put("achieved_post_list", achievedPostList);
		resultMap.put("post_list", postList);

		return resultMap;
	}


	// 전체피드 expression 조건에 맞는 게시글 목록을 조회해오는 메서드
	private List<PostListResponseDto> getPostsResults(BooleanExpression expression, OrderSpecifier<?> orderSpecifier, Pageable pageable) {
		return jpaQueryFactory
				.select(Projections.constructor(PostListResponseDto.class,
						post.postId, post.title, post.deadLine, post.isDisplay, post.isAchieved,
						post.createdDate, post.modifiedDate, post.achievedDate, post.cheerCnt, post.celebrateCnt,
						post.aiImg, post.achievementImg, post.category.categoryId,
						post.member.memberId, post.member.nickname, post.member.profileImg
						))
				.from(post)
				.where(
						expression
				)
				.orderBy(orderSpecifier)
				.limit(pageable.getPageSize()+1)
				.fetch();
	}


	// 개인피드 expression 조건에 맞는 게시글 목록을 조회해오는 메서드
	private List<PostListResponseDto> getNotPageablePostsResults(BooleanExpression expression, OrderSpecifier<?> orderSpecifier) {
		return jpaQueryFactory
				.select(Projections.constructor(PostListResponseDto.class,
						post.postId, post.title, post.deadLine, post.isDisplay, post.isAchieved,
						post.createdDate, post.modifiedDate, post.achievedDate, post.cheerCnt, post.celebrateCnt,
						post.aiImg, post.achievementImg, post.category.categoryId,
						post.member.memberId, post.member.nickname, post.member.profileImg))
				.from(post)
				.where(
						expression
				)
				.orderBy(orderSpecifier)
				.fetch();
	}


	// 첫 페이지인 경우 lastPostId == null 처리하기 위한 메서드
	private BooleanExpression ltPostId(Long lastPostId) {
		return lastPostId == null ? null : post.postId.lt(lastPostId);
	}

	private BooleanExpression beforeDate(LocalDateTime lastDate) {
		return lastDate == null ? Expressions.asBoolean(true) : post.modifiedDate.before(lastDate);
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
