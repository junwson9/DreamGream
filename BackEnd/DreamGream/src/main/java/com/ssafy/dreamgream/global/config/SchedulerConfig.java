package com.ssafy.dreamgream.global.config;
import com.ssafy.dreamgream.MyScheduler;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class SchedulerConfig {
    public MyScheduler myscheduler() {
        return new MyScheduler();
    }
}