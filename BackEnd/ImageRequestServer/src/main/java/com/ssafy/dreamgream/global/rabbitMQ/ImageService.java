package com.ssafy.dreamgream.global.rabbitMQ;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {


    //private final RestTemplate restTemplate;
    private final ImageCreationRequestProducer producer;

/*    // 코랩 서버에 이미지 생성 요청
    public ColabResponseDto sendRequestToColab(String prompt) {
        String apiUrl = "https://example.com/api/endpoint"; // Replace with your API URL

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(prompt, headers);

        //ColabResponseDto response = restTemplate.postForObject(apiUrl, requestEntity, ColabResponseDto.class);

        return response;
    }*/

    // base64로 encoding된 이미지를 decode
    public void convertImage(String encodedImage) {
        byte[] imageBytes = Base64.getDecoder().decode(encodedImage);

        log.info("image converted");

    }

    public void test() {
        producer.sendImageCreationRequest(123L, "test.com");
    }


}
