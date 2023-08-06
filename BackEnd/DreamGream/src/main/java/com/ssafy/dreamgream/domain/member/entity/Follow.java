package com.ssafy.dreamgream.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "follow_uk",
                        columnNames = {"follower_id", "target_id"}
                )
        }
)
public class Follow {

    @Id
    @GeneratedValue
    @Column(name = "follow_id")
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private Member follower;

    @ManyToOne
    @JoinColumn(name = "target_id")
    private Member target;

}
