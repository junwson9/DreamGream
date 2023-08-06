package com.ssafy.dreamgream.domain.member.entity;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer birthyear;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    private String profileImg;

    @Builder
    public Member(String email, String nickname, Gender gender, Integer birthyear, Provider provider, Role role) {
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.birthyear = birthyear;
        this.provider = provider;
        this.role = role;
    }

    public void updateRoleToUser(Gender gender, Integer birthyear, Role role) {
        this.gender = gender;
        this.birthyear = birthyear;
        this.role = role;
    }

    public void updateInfo(String nickname, Gender gender, Integer birthyear) {
        this.nickname = nickname;
        this.gender = gender;
        this.birthyear = birthyear;
    }

}
