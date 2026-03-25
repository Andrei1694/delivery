package com.party.ceva.demo.service;

import com.party.ceva.demo.dto.FileUploadResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Locale;
import java.util.Set;

@Service
public class ImageUploadService {

    private static final Set<String> SUPPORTED_IMAGE_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/avif"
    );

    private final FileStorageService fileStorageService;

    public ImageUploadService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    public FileUploadResponse uploadImage(MultipartFile file) {
        validateImageFile(file);

        try {
            String storedReference = fileStorageService.storeFile(file);
            String fileName = extractFileName(storedReference);
            String fileUrl = buildFileUrl(storedReference, fileName);
            return new FileUploadResponse(fileName, fileUrl);
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload file.", ex);
        }
    }

    private void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is required.");
        }

        String contentType = file.getContentType();
        if (!StringUtils.hasText(contentType)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image file is required.");
        }

        String normalizedContentType = contentType.toLowerCase(Locale.ROOT);
        if (!SUPPORTED_IMAGE_CONTENT_TYPES.contains(normalizedContentType)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unsupported image format. Use JPEG, PNG, WebP, GIF, or AVIF."
            );
        }
    }

    private String extractFileName(String storedReference) {
        if (!StringUtils.hasText(storedReference)) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Stored file reference is invalid.");
        }

        if (!isAbsoluteUrl(storedReference)) {
            return storedReference;
        }

        URI uri = URI.create(storedReference);
        String path = uri.getPath();
        if (!StringUtils.hasText(path)) {
            return storedReference;
        }

        String[] pathSegments = path.split("/");
        return pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : storedReference;
    }

    private String buildFileUrl(String storedReference, String fileName) {
        if (isAbsoluteUrl(storedReference)) {
            return storedReference;
        }

        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(fileName)
                .toUriString();
    }

    private boolean isAbsoluteUrl(String value) {
        try {
            URI uri = URI.create(value);
            return uri.isAbsolute();
        } catch (IllegalArgumentException ex) {
            return false;
        }
    }
}
