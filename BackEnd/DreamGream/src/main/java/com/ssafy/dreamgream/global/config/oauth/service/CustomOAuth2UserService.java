package com.ssafy.dreamgream.global.config.oauth.service;

import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.global.config.UserPrincipal;
import com.ssafy.dreamgream.global.config.oauth.provider.OAuth2UserInfo;
import com.ssafy.dreamgream.global.config.oauth.provider.OAuth2UserInfoFactory;
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

    // 소셜로그인 후 provider에게 받은 userRequest 데이터에 대한 후처리
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Provider provider = Provider.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        log.info("provider: " + provider);
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(provider, oAuth2User.getAttributes());
        log.info("email: " + userInfo.getEmail());

        //userInfo.getNameAttributeKey를 db에 따로 저장할 것인가? 식별자가 필요한가?
        Member savedMember = memberRepository.findByEmail(userInfo.getEmail());

        if(savedMember != null) {
            //회원가입이 되어 있는 경우
            log.info("회원가입이 되어있는 계정입니다.");
        } else {
            savedMember = createMameber(userInfo, provider);
        }

        return UserPrincipal.create(savedMember, oAuth2User.getAttributes());
    }

    private Member createMameber(OAuth2UserInfo userInfo, Provider provider) {
        Member member = new Member().builder()
                .email(userInfo.getEmail())
                .nickname(userInfo.getNickname())
                .gender(null)
                .birthyear(null)
                .role(Role.ROLE_USER)
                .provider(provider)
                .build();
        return memberRepository.saveAndFlush(member);
    }

}
