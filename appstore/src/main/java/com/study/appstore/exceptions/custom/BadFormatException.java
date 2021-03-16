package com.study.appstore.exceptions.custom;

public class BadFormatException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BadFormatException() {
        super();
    }

    public BadFormatException(String message) {
        super(message);
    }

    public BadFormatException(Throwable cause) {
        super(cause);
    }

    public BadFormatException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
