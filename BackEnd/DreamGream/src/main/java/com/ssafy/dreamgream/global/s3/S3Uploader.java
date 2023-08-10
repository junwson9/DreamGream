package com.ssafy.dreamgream.global.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import com.ssafy.dreamgream.global.common.exception.customException.InvalidInputValueException;
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

    public String getImageUrl(String directory, MultipartFile multipartFile, Long memberId) {
        String[] allowedExtensions = {"jpg", "jpeg", "png"};
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        String originalFilename = multipartFile.getOriginalFilename();

        String type = getFileType(originalFilename);
        boolean isAllowedExtension = false;

        for (String allowedExtension : allowedExtensions) {
            if (allowedExtension.equalsIgnoreCase(type)) {
                isAllowedExtension = true;
                break;
            }
        }

        if (!isAllowedExtension) {
            throw new InvalidInputValueException("허용되지 않은 확장자입니다.", ErrorCode.INVALID_INPUT_VALUE);
        }

        String imageKey = directory + "/member_" + memberId + "/" + getUuidFileName(originalFilename);

        String url = null;
        try {
            amazonS3Client.putObject(bucket, imageKey, multipartFile.getInputStream(), objectMetadata);
            url = amazonS3Client.getUrl(bucket, imageKey).toString();
        } catch (Exception e) {
            log.error("프로필 이미지 업로드 실패");
            log.error(e.getMessage());
        }
        log.info("프로필 이미지 업로드 성공");

        return url;
    }

    private String getUuidFileName(String fileName) {

        String url = fileName.substring(fileName.indexOf(".") + 1);

        return UUID.randomUUID() + "_" + getDate() + url;
    }

    private String getFileType(String fileName){

        String type = fileName.substring(fileName.lastIndexOf(".")+1);

        return type;
    }

    private String getDate() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        return format.format(date);
    }
}
