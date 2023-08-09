package com.ssafy.dreamgream.domain.member.dto.request;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UpdateInfoRequestDto {

	@NotNull(message = "닉네임은 필수 값입니다.")
	@Size(max = 25, message = "닉네임은 최대 25자까지 입력 가능합니다.")
	String nickname;

	@NotNull(message = "성별은 필수 값입니다.")
	@Enumerated(EnumType.STRING)
	Gender gender;

	@NotNull(message = "태어난 해는 필수 값입니다.")
	Integer birthyear;

}
