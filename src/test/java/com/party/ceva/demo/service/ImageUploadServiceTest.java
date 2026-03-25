package com.party.ceva.demo.service;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ImageUploadServiceTest {

    @Test
    void uploadImageRejectsHeicFiles() {
        RecordingFileStorageService storageService = new RecordingFileStorageService();
        ImageUploadService imageUploadService = new ImageUploadService(storageService);
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "dish.heic",
                "image/heic",
                new byte[]{1, 2, 3}
        );

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> imageUploadService.uploadImage(file)
        );

        assertEquals(400, exception.getStatusCode().value());
        assertEquals("Unsupported image format. Use JPEG, PNG, WebP, GIF, or AVIF.", exception.getReason());
        assertEquals(0, storageService.storeCalls);
    }

    @Test
    void uploadImageAcceptsWebpFiles() {
        ImageUploadService imageUploadService = new ImageUploadService(
                file -> "https://example.com/uploads/dish.webp"
        );
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "dish.webp",
                "image/webp",
                new byte[]{1, 2, 3}
        );

        var response = imageUploadService.uploadImage(file);

        assertEquals("dish.webp", response.getFileName());
        assertEquals("https://example.com/uploads/dish.webp", response.getFileUrl());
    }

    private static final class RecordingFileStorageService implements FileStorageService {
        private int storeCalls;

        @Override
        public String storeFile(MultipartFile file) {
            storeCalls += 1;
            return "https://example.com/uploads/dish.webp";
        }
    }
}
