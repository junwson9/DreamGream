package com.ssafy.dreamgream.global.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private String uploadProfile(MultipartFile multipartFile, Long memberId) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        String originalFilename = multipartFile.getOriginalFilename();
        String imageKey = "profile/member_" + memberId + "/" + getUuidFileName(originalFilename);

        String profileURL = null;
        try {
            amazonS3Client.putObject(bucket, imageKey, multipartFile.getInputStream(), objectMetadata);
            profileURL = amazonS3Client.getUrl(bucket, imageKey).toString();
        } catch (Exception e) {
            log.error("프로필 이미지 업로드 실패");
            log.error(e.getMessage());
        }
        log.info("프로필 이미지 업로드 성공");

        return profileURL;
    }

    private String getUuidFileName(String fileName) {

        String url = fileName.substring(fileName.indexOf(".") + 1);

        return UUID.randomUUID() + "_" + getDate() + url;
    }

    private String getDate() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        return format.format(date);
    }
}
