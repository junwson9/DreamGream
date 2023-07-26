package com.ssafy.dreamgream.global.config.oauth.providerUserInfo;

import com.ssafy.dreamgream.domain.member.enums.Provider;

import java.util.Map;

public class OAuth2UserInfoFactory {

	public static OAuth2UserInfo getOAuth2UserInfo(Provider provider, Map<String, Object> attributes) {
		if (provider == Provider.KAKAO) {
			return new KakaoOAuth2UserInfo(attributes);
		}
		return null;
	}

}
