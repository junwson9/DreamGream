package com.ssafy.dreamgream.global.rabbitMQ;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.dreamgream.global.rabbitMQ.dto.ColabResponseDto;
import com.ssafy.dreamgream.global.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.*;
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

    private final String COLAB_URL = "https://imagegenerate.ngrok.io/image";

    private final RestTemplate restTemplate;
    private final ImageCreationRequestProducer producer;
    private final S3Uploader s3Uploader;

    public void creatImage(Long sseId, String prompt) {
        // colab 서버로 이미지 생성 요청 보냄

        byte[] ImageBytes = sendRequestToColab(prompt);
        String url = null;
        try {
            url = s3Uploader.uploadAIImage(ImageBytes);
        } catch (IOException e) {
            log.error("s3 이미지 업로드 중 에러 발생");
            throw new RuntimeException(e);
        }

        producer.sendImageCreationRequest(sseId, url);

    }

    // 코랩 서버에 이미지 생성 요청
    public byte[] sendRequestToColab(String prompt) {
        String apiUrl = COLAB_URL;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String image_prompt = prompt;
        HttpEntity<String> requestEntity = new HttpEntity<>("{\"image_prompt\" : \"" + prompt + "\"}", headers);
        ResponseEntity<byte[]> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, byte[].class);
        byte[] ImageBytes = response.getBody();

        return ImageBytes;
    }

}
