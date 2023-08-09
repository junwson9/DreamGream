package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.dreamgream.global.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

        byte[] imageBytes = sendRequestToColab(prompt);

        if (imageBytes == null) {
            producer.sendImageCreationRequest(sseId, "error");
        } else {
            String url = null;
            url = s3Uploader.uploadAIImage(imageBytes, sseId);
            producer.sendImageCreationRequest(sseId, url);
        }
    }

    // 코랩 서버에 이미지 생성 요청
    public byte[] sendRequestToColab(String prompt) {
        String apiUrl = COLAB_URL;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String image_prompt = prompt;
        HttpEntity<String> requestEntity = new HttpEntity<>("{\"image_prompt\" : \"" + prompt + "\"}", headers);
        byte[] ImageBytes = null;
        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, byte[].class);
            if (response.getStatusCode().is2xxSuccessful()) {
                ImageBytes = response.getBody();
            }
        } catch (Exception e) {
            log.error("ERROR: 이미지 서버로 요청 전송 실패");
        }

        return ImageBytes;
    }

}
