package com.ssafy.dreamgream.global.config.oauth;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;


@Getter
@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User {

	private final Long id;
	private final String email;
	private final Role role;
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
		return String.valueOf(id);
	}

	private void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public CustomOAuth2User(Long id, String email, Role role, Collection<GrantedAuthority> authorities) {
		this.id = id;
		this.email = email;
		this.role = role;
		this.authorities = authorities;
	}

	public static CustomOAuth2User create(Member member, Map<String, Object> attributes) {
		CustomOAuth2User customOAuth2User = create(member);
		customOAuth2User.setAttributes(attributes);
		return customOAuth2User;
	}

	private static CustomOAuth2User create(Member member) {
		CustomOAuth2User customOAuth2User = new CustomOAuth2User(
			member.getId(),
			member.getEmail(),
			member.getRole(),
			Collections.singletonList(new SimpleGrantedAuthority(member.getRole().name()))
		);
		return customOAuth2User;
	}

}
