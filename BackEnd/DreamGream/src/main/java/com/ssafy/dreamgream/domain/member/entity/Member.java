package com.ssafy.dreamgream.domain.member.entity;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(columnDefinition = "YEAR")
    private Integer birthyear;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreatedDate
    @Column(name = "created_date")
    private Timestamp createdDate;

    @LastModifiedDate
    @Column(name = "modified_date")
    private Timestamp modifiedDate;

    @Builder
    public Member(String email, String nickname, Gender gender, Integer birthyear, Provider provider, Role role) {
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.birthyear = birthyear;
        this.provider = provider;
        this.role = role;
    }

    public void updateMemberRoleToUser(Gender gender, Integer birthyear, Role role) {
        this.gender = gender;
        this.birthyear = birthyear;
        this.role = role;
    }

}
