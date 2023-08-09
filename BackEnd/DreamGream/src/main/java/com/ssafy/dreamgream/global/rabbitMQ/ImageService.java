package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.dreamgream.domain.post.dto.response.ImageGenerateResponseDto;
import com.ssafy.dreamgream.global.rabbitMQ.dto.PromptCreationConsumeDto;
import com.ssafy.dreamgream.global.rabbitMQ.dto.PromptCreationProduceDto;
import com.ssafy.dreamgream.global.sse.SSEService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageCreationRequestProducer imageCreationRequestProducer;
    private final SSEService sseService;
    private final RestTemplate restTemplate;

    @Value("${prompt.url}")
    private String promptUrl;

    // 생성된 prompt를 producer에게 전달
    public void processImageCreation(Long sseId, PromptCreationProduceDto produceDto) {

        if (!sseService.checkEmitter(sseId)) {
            log.error("ERROR: 존재하지 않는 sseId 입니다");
            throw new RuntimeException();
        }

        String prompt = callPromptServer(produceDto);
        log.info("prompt: ", prompt);

        if (prompt == null) {
            throw new RuntimeException();
        }

        imageCreationRequestProducer.sendImageCreationRequest(sseId, prompt);

    }

    public void processImageResponse(Long sseId, String url) {
        log.info("Received SSE ID: " + sseId);
        log.info("Received url: " + url);

        ImageGenerateResponseDto imageGenerateResponseDto = ImageGenerateResponseDto.builder().url(url).build();
        sseService.sendImageResponse(sseId, imageGenerateResponseDto);
    }

    // 프롬프트 생성 서버로 프롬프트 생성 요청을 보냄
    public String callPromptServer(PromptCreationProduceDto dto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PromptCreationProduceDto> requestEntity = new HttpEntity<>(dto, headers);
        String generatedPrompt = null;
        try {
            PromptCreationConsumeDto response = restTemplate.postForObject(promptUrl, requestEntity, PromptCreationConsumeDto.class);
            generatedPrompt = response.getImagePrompt();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("프롬프트 생성 안됨");
        }

        return generatedPrompt;
    }

}
