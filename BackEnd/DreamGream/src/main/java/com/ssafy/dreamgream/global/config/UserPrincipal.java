package com.ssafy.dreamgream.global.config;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
public class UserPrincipal implements OAuth2User {

    private final String email;
    private final String nickname;
    private final Role role;
    private final Provider provider;
    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return email;
    }

    public static UserPrincipal create(Member member, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = create(member);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    private static UserPrincipal create(Member member) {
        UserPrincipal userPrincipal = new UserPrincipal(
                member.getEmail(),
                member.getNickname(),
                member.getRole(),
                member.getProvider(),
                Collections.singletonList(new SimpleGrantedAuthority(Role.ROLE_USER.name()))
        );
        return userPrincipal;
    }

    private void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }


    public UserPrincipal(String email, String nickname, Role role, Provider provider, Collection<GrantedAuthority> authorities) {
        this.email = email;
        this.nickname = nickname;
        this.role = role;
        this.provider = provider;
        this.authorities = authorities;
    }
}
