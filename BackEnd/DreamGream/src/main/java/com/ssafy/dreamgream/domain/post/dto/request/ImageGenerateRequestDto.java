package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Data
@ToString
public class ImageGenerateRequestDto {
    String title;
    @JsonProperty("category_name")
    String categoryName;
}
