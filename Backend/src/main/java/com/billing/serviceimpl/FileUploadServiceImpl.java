package com.billing.serviceimpl;

import com.billing.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final S3Client s3Client;

    @Override
    public String upload(MultipartFile file, String folderName) {

        if (!folderName.equals("item-assets") && !folderName.equals("category-assets")) {
            throw new IllegalArgumentException("Invalid folder name");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        String key = folderName+ "/" + UUID.randomUUID() + "." + extension;
        // NOTE: Key is the filename and Value is the Object(Image).
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response =  s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if (response.sdkHttpResponse().isSuccessful()) {
                return "https://"+bucketName+".s3.amazonaws.com/"+key;
            }
            else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Upload failed");
            }

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public Boolean delete(String imgURL) {
        // imgURL =  "https://"+bucketName+".s3.amazonaws.com/"+key;
        String baseUrl = "https://" + bucketName + ".s3.amazonaws.com/";
        String key = imgURL.replace(baseUrl, "");

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
               .bucket(bucketName)
               .key(key)
               .build();
        try {
            DeleteObjectResponse response = s3Client.deleteObject(deleteObjectRequest);
            return true;
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
