package com.billing.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {

    String upload(MultipartFile file,  String folderName);
    Boolean delete(String imgURL);
}
