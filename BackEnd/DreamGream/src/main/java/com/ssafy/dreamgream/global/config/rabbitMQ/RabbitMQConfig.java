package com.ssafy.dreamgream.global.config.rabbitMQ;


import org.springframework.amqp.core.*;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${spring.rabbitmq.host}")
    private String rabbitmqHost;

    @Value("${spring.rabbitmq.port}")
    private int rabbitmqPort;

    @Value("${spring.rabbitmq.username}")
    private String rabbitmqUsername;

    @Value("${spring.rabbitmq.password}")
    private String rabbitmqPassword;

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitmqHost);
        connectionFactory.setPort(rabbitmqPort);
        connectionFactory.setUsername(rabbitmqUsername);
        connectionFactory.setPassword(rabbitmqPassword);

        return connectionFactory;
    }

    /**
     * RabbitTemplate을 생성하여 반환
     *
     * @param connectionFactory RabbitMQ와의 연결을 위한 ConnectionFactory 객체
     * @return RabbitTemplate 객체
     */
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        // JSON 형식의 메시지를 직렬화하고 역직렬할 수 있도록 설정
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

    /**
     * Jackson 라이브러리를 사용하여 메시지를 JSON 형식으로 변환하는 MessageConverter 빈을 생성
     *
     * @return MessageConverter 객체
     */
    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.queue.request.name}")
    private String requestQueueName;

    @Value("${rabbitmq.queue.request.routing-key}")
    private String requestRoutingKey;

    @Value("${rabbitmq.queue.response.name}")
    private String responseQueueName;

    @Value("${rabbitmq.queue.response.routing-key}")
    private String responseRoutingKey;

    @Bean
    public TopicExchange imageCreationExchange() {
        return new TopicExchange(exchangeName);
    }

    @Bean
    public Queue imageCreationRequestQueue() {
        return new Queue(requestQueueName, true, false, false);
    }

    @Bean
    public Queue imageCreationResponseQueue() {
        return new Queue(responseQueueName, true, false, false);
    }

    @Bean
    public Binding bindingImageCreationRequestQueue(TopicExchange exchange, Queue imageCreationRequestQueue) {
        return BindingBuilder.bind(imageCreationRequestQueue).to(exchange).with(requestRoutingKey);
    }

    @Bean
    public Binding bindingImageCreationResponseQueue(TopicExchange exchange, Queue imageCreationResponseQueue) {
        return BindingBuilder.bind(imageCreationResponseQueue).to(exchange).with(responseRoutingKey);
    }

}
