package com.ssafy.dreamgream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.swing.*;

@SpringBootApplication
@EnableJpaAuditing // Auditing 기능 활성화
public class DreamGreamApplication {

	public static void main(String[] args) {
		SpringApplication.run(DreamGreamApplication.class, args);
	}

}
