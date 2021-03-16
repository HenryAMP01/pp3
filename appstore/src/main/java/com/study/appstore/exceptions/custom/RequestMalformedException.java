package com.study.appstore.exceptions.custom;

public class RequestMalformedException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public RequestMalformedException() {
        super();
    }

    public RequestMalformedException(String message) {
        super(message);
    }

    public RequestMalformedException(Throwable cause) {
        super(cause);
    }

    public RequestMalformedException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
