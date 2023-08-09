package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageGenerateRequestDto {

    @NotNull(message = "버킷리스트는 필수 값입니다.")
    String title;

    @NotNull(message = "카테고리는 필수 값입니다.")
    @JsonProperty("category_name")
    String categoryName;
}
