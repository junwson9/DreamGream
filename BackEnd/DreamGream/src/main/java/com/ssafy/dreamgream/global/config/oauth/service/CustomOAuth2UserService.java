package com.ssafy.dreamgream.global.config.oauth.service;

import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.global.config.oauth.CustomOAuth2User;
import com.ssafy.dreamgream.global.config.oauth.providerUserInfo.OAuth2UserInfo;
import com.ssafy.dreamgream.global.config.oauth.providerUserInfo.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	/**
	 * loadUser()는 소셜 로그인 API의 사용자 정보 제공 URI로 요청을 보내서 사용자 정보를 얻고,
     * 이를 통해 OAuth2User 객체를 생성해 반환한다.
	 */
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);

		Provider provider = Provider.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
		OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(provider, oAuth2User.getAttributes());
		log.debug("provider: " + provider);

		// 회원가입 되어있는 계정인지 확인
		Member savedMember = memberRepository.findByEmail(userInfo.getEmail());

		if (savedMember != null) {
			log.info("회원가입이 되어있는 계정입니다.");
		} else {
			savedMember = createMember(userInfo, provider);
		}

		log.info("memberId: " + savedMember.getMemberId());

		// OAuth2User를 구현한 CustomOAuth2User 객체를 생성해서 반환
		return CustomOAuth2User.create(savedMember, oAuth2User.getAttributes());
	}

	private Member createMember(OAuth2UserInfo userInfo, Provider provider) {
		Member member = new Member().builder()
			.email(userInfo.getEmail())
			.nickname(userInfo.getNickname())
			.gender(null)
			.birthyear(null)
			.role(Role.ROLE_GUEST)
			.provider(provider)
			.build();
		return memberRepository.saveAndFlush(member);
	}

}
