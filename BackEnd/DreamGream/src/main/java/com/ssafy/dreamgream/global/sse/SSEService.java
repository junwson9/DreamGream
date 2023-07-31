package com.ssafy.dreamgream.global.sse;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class SSEService {

    private final ConcurrentHashMap<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public void addSseEmitter(Long sseId, SseEmitter emitter) {
        sseEmitters.put(sseId, emitter);
        emitter.onCompletion(() -> sseEmitters.remove(sseId));
        emitter.onTimeout(() -> sseEmitters.remove(sseId));
    }

    public void sendImageResponse(Long sseId, ImageGenerateResponseDto dto) {
        log.info("sending image url");
        SseEmitter emitter = sseEmitters.get(sseId);
        log.info("sseId : {}", sseId);
        if (emitter != null) {
            try {
                log.info("sending data to client");
                emitter.send(dto);
            } catch (IOException e) {
                // Handle exception when sending the response to the client
                e.printStackTrace();
            } finally {
                log.info("emitter complete");
                emitter.complete();
            }
        } else {
            // Handle case when SSEEmitter is not found for the given SSE ID
            // This might happen if the SSE connection is closed or expired
        }
    }

    private void removeEmitter(String userId) {
        sseEmitters.remove(userId);
        System.out.println("SSE connection closed for user: " + userId);
    }
}
