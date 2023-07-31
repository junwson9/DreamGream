package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageGenerateRequestDto {
    String title;
    @JsonProperty("category_name")
    String categoryName;
}
