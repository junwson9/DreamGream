package com.ssafy.dreamgream.global.auth.dto.request;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import java.time.Year;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UpdateRoleToUserRequestDto {

	@NotNull(message = "성별은 필수 값입니다.")
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@NotNull(message = "태어난 해는 필수 값입니다.")
	private Integer birthyear;

}
