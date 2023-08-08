package com.ssafy.dreamgream.global.config;
import com.ssafy.dreamgream.domain.post.dto.response.UnAchievedPostUpdateResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.modelmapper.config.Configuration;



@org.springframework.context.annotation.Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // 일치하지 않는 필드명 무시하기
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true);

        // 만약 필드명이 일치하지 않을 경우 수동으로 매핑 규칙을 추가해줄 수 있습니다.
//        modelMapper.typeMap(Post.class, UnAchievedPostUpdateResponseDto.class)
//                .addMapping(src -> src.getContent(), UnAchievedPostUpdateResponseDto::setContent)
//                .addMapping(src -> src.getTitle(), UnAchievedPostUpdateResponseDto::setTitle)
//                .addMapping(src -> src.getDeadLine(), UnAchievedPostUpdateResponseDto::setDeadLine);

        return modelMapper;
    }
}
