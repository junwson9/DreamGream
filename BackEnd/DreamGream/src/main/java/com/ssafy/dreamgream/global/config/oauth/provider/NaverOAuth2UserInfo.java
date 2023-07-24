package com.ssafy.dreamgream.global.config.oauth.provider;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getNameAttributeKey() {
        return attributes.get("id").toString();
    }

    @Override
    public String getNickname() {
        return null;
    }

    @Override
    public String getEmail() {
        return null;
    }
}
