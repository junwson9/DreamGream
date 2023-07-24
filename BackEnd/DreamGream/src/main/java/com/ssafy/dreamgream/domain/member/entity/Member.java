package com.ssafy.dreamgream.domain.member.entity;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.Year;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Year birthyear;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "created_date")
    @CreationTimestamp
    private LocalDateTime createdDate;

    @Builder
    public Member(String email, String nickname, Gender gender, Provider provider, Role role) {
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.provider = provider;
        this.role = role;
    }
}
