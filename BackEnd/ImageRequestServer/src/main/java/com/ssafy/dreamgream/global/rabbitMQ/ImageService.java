package com.ssafy.dreamgream.global.rabbitMQ;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.dreamgream.global.rabbitMQ.dto.ColabResponseDto;
import com.ssafy.dreamgream.global.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {

    private final String COLAB_URL = "http://example.com/image";

    private final RestTemplate restTemplate;
    private final ImageCreationRequestProducer producer;
    private final S3Uploader s3Uploader;

    public void creatImage(Long sseId, String prompt) {
        // colab 서버로 이미지 생성 요청 보냄

        ColabResponseDto colabResponseDto = sendRequestToColab(prompt);
        String url = null;
        try {
            url = s3Uploader.uploadAIImage(colabResponseDto.getImageBytes());
        } catch (IOException e) {
            log.error("s3 이미지 업로드 중 에러 발생");
            throw new RuntimeException(e);
        }

        producer.sendImageCreationRequest(sseId, url);

    }

    // 코랩 서버에 이미지 생성 요청
    public ColabResponseDto sendRequestToColab(String prompt) {
        String apiUrl = COLAB_URL;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(prompt, headers);

        ColabResponseDto response = restTemplate.postForObject(apiUrl, requestEntity, ColabResponseDto.class);

        return response;
    }

}
