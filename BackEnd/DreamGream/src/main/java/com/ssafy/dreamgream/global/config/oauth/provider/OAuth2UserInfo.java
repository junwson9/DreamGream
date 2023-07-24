package com.ssafy.dreamgream.global.config.oauth.provider;

import java.util.Map;

public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getNameAttributeKey();
    public abstract String getNickname();
    public abstract String getEmail();
}
