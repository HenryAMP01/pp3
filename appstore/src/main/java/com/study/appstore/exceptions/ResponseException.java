package com.study.appstore.exceptions;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.Set;

import org.springframework.http.HttpStatus;

public class ResponseException implements Serializable {

    private static final long serialVersionUID = 1L;

    private final HttpStatus status;
    private final Integer code;
    private final String message;
    private final Instant timestamp;
    private Set<String> info;

    public ResponseException(HttpStatus status, Integer code, String message, Set<String> info) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.timestamp = Instant.now();
        this.info = info;
    }

    public ResponseException(HttpStatus status, Integer code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public HttpStatus getStatus() {
        return this.status;
    }

    public Integer getCode() {
        return this.code;
    }

    public String getMessage() {
        return this.message;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public Set<String> getInfo() {
        return this.info;
    }

    public void setInfo(Set<String> info) {
        this.info = info;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ResponseException)) {
            return false;
        }
        ResponseException responseException = (ResponseException) o;
        return Objects.equals(status, responseException.status) && Objects.equals(code, responseException.code)
                && Objects.equals(message, responseException.message)
                && Objects.equals(timestamp, responseException.timestamp)
                && Objects.equals(info, responseException.info);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, code, message, timestamp, info);
    }

    @Override
    public String toString() {
        return "{" + " status='" + getStatus() + "'" + ", code='" + getCode() + "'" + ", message='" + getMessage() + "'"
                + ", timestamp='" + getTimestamp() + "'" + ", info='" + getInfo() + "'" + "}";
    }

}
