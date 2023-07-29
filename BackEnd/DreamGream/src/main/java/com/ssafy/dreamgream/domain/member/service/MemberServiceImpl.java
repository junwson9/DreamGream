package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @Transactional
    @Override
    public Long join() {
        Member member = new Member().builder()
                .email("ssafy@ssafy.com")
                .nickname("김싸피")
                .gender(Gender.FEMALE)
                .provider(null)
                .role(Role.ROLE_USER)
                .build();
        memberRepository.save(member);
        return member.getId();
    }

    @Override
    @Transactional
    public TokenDto updateRoleToUser(Long id, Gender gender, Year birthyear) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("수정전 Authentication : {}", authentication);

        UserDetails userDetails = (User) authentication.getPrincipal();
        Long memberId = Long.valueOf(userDetails.getUsername());
        log.info("memberId : {}", memberId);

        // DB 업데이트
        Member member = memberRepository.findById(memberId).orElseThrow();
        member.updateMemberRoleToUser(gender, birthyear, Role.ROLE_USER);
        memberRepository.save(member);
        log.info("member : {}", member);

        // Security Authentication 업데이트
        List<GrantedAuthority> updatedAuthorities = new ArrayList<>(userDetails.getAuthorities());
        updatedAuthorities.add(new SimpleGrantedAuthority(Role.ROLE_USER.name()));
        updatedAuthorities.removeIf(auth -> auth.getAuthority().equals(Role.ROLE_GUEST.name()));

        // 변경된 authorities를 사용하여 새로운 Authentication 객체 생성
        Authentication newAuthentication = new UsernamePasswordAuthenticationToken(
            userDetails, authentication.getCredentials(), updatedAuthorities);
        SecurityContextHolder.getContext().setAuthentication(newAuthentication);
        log.info("newAuthentication : {}", newAuthentication);

        // JWT 재발급
        TokenDto tokenDto = jwtTokenProvider.generateUpdatedRoleTokenDto(newAuthentication);
        saveRefreshTokenRedis(newAuthentication, tokenDto);
        return tokenDto;
    }


    public void saveRefreshTokenRedis(Authentication authentication, TokenDto tokenDto) {
        redisTemplate.opsForValue()
            .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
                tokenDto.getRefreshTokenExpireIn(), TimeUnit.MILLISECONDS);
    }


}
