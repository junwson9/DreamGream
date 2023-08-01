package com.ssafy.dreamgream.global.config;
import com.ssafy.dreamgream.myScheduler;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class SchedulerConfig {
    public myScheduler myscheduler() {
        return new myScheduler();
    }
}
