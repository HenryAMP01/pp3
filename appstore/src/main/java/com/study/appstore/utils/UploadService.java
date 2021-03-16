package com.study.appstore.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Collections;
import java.util.Map;
import static java.util.Map.entry;
import java.util.UUID;

import com.study.appstore.exceptions.custom.BadFormatException;
import com.study.appstore.exceptions.custom.FileNotFoundException;

import org.springframework.stereotype.Service;

@Service
public class UploadService {

    private static final String UPLOAD_PATH = "C:/Users/henry/Documentos/pp3-project/app-store/src/assets/images";

    private static final Map<String, String> VALID_FORMATS = Collections
            .unmodifiableMap(Map.of("image/jpg", ".jpg", "image/jpeg", ".jpeg", "image/png", ".png"));

    public void saveBase64File(String encoded, String filename) throws IOException {

        this.createUploadDirectory();

        Map<String, String> data = getDataFromBase64(encoded);

        final String base64 = data.get("base64");
        final byte[] base64Bytes = Base64.getDecoder().decode(base64);

        Files.write(getUploadPath().resolve(filename), base64Bytes);
    }
    
    public void deleteFile(final String filename) throws IOException {
        File file = getUploadPath().resolve(filename).toFile();
        if (!file.delete()) {
            throw new FileNotFoundException("File not foun or is corrupt");
        }
    }

    public String getUniqueFilenameBase64File(final String encoded) {

        final String extension = getExtensionFromBase64(encoded);

        StringBuilder filename = new StringBuilder();
        filename.append(UUID.randomUUID().toString());
        filename.append(extension);

        return filename.toString();
    }

    private Map<String, String> getDataFromBase64(final String encoded) {

        String[] base64Split = encoded.split(",");

        if (base64Split.length != 2) {
            throw new BadFormatException("Invalid base64 format");
        }

        final String metadata = base64Split[0];
        final String base64 = base64Split[1];

        Map<String, String> data = Map.ofEntries(entry("metadata", metadata), entry("base64", base64));

        return data;
    }

    private String getExtensionFromBase64(final String encoded) {

        Map<String, String> data = getDataFromBase64(encoded);

        final String metadata = data.get("metadata");
        final String format = metadata.substring(5, metadata.indexOf(";"));

        if (!VALID_FORMATS.containsKey(format)) {
            throw new BadFormatException("Invalid format to upload file");
        }

        return VALID_FORMATS.get(format);
    }

    private void createUploadDirectory() throws IOException {
        Path path = getUploadPath();
        if (!path.toFile().exists()) {
            Files.createDirectory(path);
        }
    }

    private Path getUploadPath() {
        return Paths.get(UPLOAD_PATH).toAbsolutePath();
    }

}
