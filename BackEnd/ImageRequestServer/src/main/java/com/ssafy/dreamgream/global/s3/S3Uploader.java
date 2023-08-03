package com.ssafy.dreamgream.global.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {

    private static final String S3_BUCKET_DIRECTORY_NAME = "ai";
    private static final String IMAGE_TYPE = "image/png";

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadAIImage(byte[] imageBytes) throws IOException {
        // metadata 설정
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(IMAGE_TYPE);
        objectMetadata.setContentLength(imageBytes.length);
        InputStream fileInputStream = new ByteArrayInputStream(imageBytes);

        String imageKey = S3_BUCKET_DIRECTORY_NAME + "/" + UUID.randomUUID() + "_" + getDate() + ".png";

        // uploading image to s3 bucket
        amazonS3Client.putObject(bucket, imageKey, fileInputStream, objectMetadata);
        log.info("이미지 업로드 성공");
        fileInputStream.close();

        return amazonS3Client.getUrl(bucket, imageKey).toString();
    }


    private String getDate() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        return format.format(date);
    }
}
