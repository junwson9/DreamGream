package com.ssafy.dreamgream.global.config.oauth.providerUserInfo;

import java.util.Map;

public abstract class OAuth2UserInfo {

	protected Map<String, Object> attributes;

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public abstract String getOAuth2Id();

	public abstract String getNickname();

	public abstract String getEmail();

}
