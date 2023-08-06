package com.ssafy.dreamgream.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "follow_uk",
                        columnNames = {"from_member_id", "to_member_id"}
                )
        }
)
public class Follow {

    @Id
    @GeneratedValue
    @Column(name = "follow_id")
    private Long followId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    private Member toMember;

    @Builder
    public Follow(Member toMember, Member fromMember) {
        this.toMember = toMember;
        this.fromMember = fromMember;
    }

}
