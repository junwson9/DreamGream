package com.ssafy.dreamgream.global.config.oauth.providerUserInfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

	public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getOAuth2Id() {
		return attributes.get("id").toString();
	}

	@Override
	public String getNickname() {
		Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

		if (properties == null) {
			return null;
		}

		return (String) properties.get("nickname");
	}

	@Override
	public String getEmail() {
		Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
		return (String) account.get("email");
	}

}
