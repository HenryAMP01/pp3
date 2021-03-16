package com.study.appstore.exceptions;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

        /* 400 */

        // Request param faltante

        /*@Override
        protected ResponseEntity<Object> handleMissingServletRequestPart(MissingServletRequestPartException ex,
                        HttpHeaders headers, HttpStatus status, WebRequest request) {

                final String message = ex.getLocalizedMessage();

                Set<String> info = new HashSet<String>();

                ResponseException exception = new ResponseException(HttpStatus.BAD_REQUEST,
                                HttpStatus.BAD_REQUEST.value(), message, info);

                return handleExceptionInternal(ex, exception, headers, status, request);
        }*/

        // Parámetro no válido

        @ExceptionHandler({ MethodArgumentTypeMismatchException.class })
        public ResponseEntity<Object> handleMethodArgumentTypeMismatch(final MethodArgumentTypeMismatchException ex,
                        final WebRequest request) {

                final String message = "The request path parameter should be of type: "
                                + ex.getRequiredType().getSimpleName();

                ResponseException exception = new ResponseException(HttpStatus.BAD_REQUEST,
                                HttpStatus.BAD_REQUEST.value(), message);

                return new ResponseEntity<Object>(exception, new HttpHeaders(), exception.getStatus());
        }

        // Integridad de la petición (JSON)

        @Override
        protected ResponseEntity<Object> handleHttpMessageNotReadable(final HttpMessageNotReadableException ex,
                        final HttpHeaders headers, final HttpStatus status, final WebRequest request) {

                final String message = "The request is not readable";

                // final String cause = ex.getMostSpecificCause().getMessage()

                ResponseException exception = new ResponseException(HttpStatus.BAD_REQUEST,
                                HttpStatus.BAD_REQUEST.value(), message);

                return handleExceptionInternal(ex, exception, new HttpHeaders(), exception.getStatus(), request);
        }

        // Validacion del cuerpo de la petición form data

        /*@Override
        protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status,
                        WebRequest request) {
                Set<String> info = ex.getBindingResult().getFieldErrors().stream()
                                .map(error -> error.getField() + " : " + error.getDefaultMessage())
                                .collect(Collectors.toSet());

                final String message = "Errors were found when evaluating the request";

                ResponseException exception = new ResponseException(HttpStatus.BAD_REQUEST,
                                HttpStatus.BAD_REQUEST.value(), message, info);

                return handleExceptionInternal(ex, exception, new HttpHeaders(), exception.getStatus(), request);
        }*/

        // Validacion del cuerpo de la petición (@RequestBody)

        @Override
        protected ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException ex,
                        final HttpHeaders headers, final HttpStatus status, final WebRequest request) {

                Set<String> info = ex.getBindingResult().getFieldErrors().stream()
                                .map(error -> error.getField() + " : " + error.getDefaultMessage())
                                .collect(Collectors.toSet());

                final String message = "Errors were found when evaluating the request";

                ResponseException exception = new ResponseException(HttpStatus.BAD_REQUEST,
                                HttpStatus.BAD_REQUEST.value(), message, info);

                return handleExceptionInternal(ex, exception, headers, exception.getStatus(), request);

        }

        // Peticion por parámetro

        protected ResponseEntity<Object> handleMissingServletRequestParameter(
                        MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatus status,
                        WebRequest request) {

                final String message = "The request parameter: " + ex.getParameterName() + ", of type: "
                                + ex.getParameterType() + ", is missing";

                ResponseException exception = new ResponseException(HttpStatus.BAD_REQUEST,
                                HttpStatus.BAD_REQUEST.value(), message);

                return handleExceptionInternal(ex, exception, new HttpHeaders(), exception.getStatus(), request);
        }

        // Metodo no soportado

        protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
                        HttpHeaders headers, HttpStatus status, WebRequest request) {

                Set<String> info = ex.getSupportedHttpMethods().stream()
                                .map(method -> "Method supported: " + method.name()).collect(Collectors.toSet());

                final String message = ex.getLocalizedMessage();

                ResponseException exception = new ResponseException(HttpStatus.METHOD_NOT_ALLOWED,
                                HttpStatus.METHOD_NOT_ALLOWED.value(), message, info);

                return handleExceptionInternal(ex, exception, new HttpHeaders(), exception.getStatus(), request);
        }

        /* 404 */

        // Recursos no encontrados

        @ExceptionHandler(value = { ResourceNotFoundException.class })
        protected ResponseEntity<Object> handleNotFound(final RuntimeException ex, final WebRequest request) {

                final String message = ex.getLocalizedMessage();

                ResponseException exception = new ResponseException(HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND.value(),
                                message);
                return handleExceptionInternal(ex, exception, new HttpHeaders(), exception.getStatus(), request);
        }

        /* 409 */

        // Integridad de la base de datos

        @ExceptionHandler({ DataIntegrityViolationException.class })
        protected ResponseEntity<Object> handleConflict(final DataIntegrityViolationException ex,
                        final WebRequest request) {

                final String message = "Data integrity violation";

                Set<String> info = new HashSet<String>();

                info.add(ex.getMostSpecificCause().getMessage());
                // info.add(ex.getClass().getSimpleName());

                ResponseException exception = new ResponseException(HttpStatus.CONFLICT, HttpStatus.CONFLICT.value(),
                                message, info);

                return handleExceptionInternal(ex, exception, new HttpHeaders(), exception.getStatus(), request);
        }

        // 415

        // Métodos no soportados

        @Override
        protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(final HttpMediaTypeNotSupportedException ex,
                        final HttpHeaders headers, final HttpStatus status, final WebRequest request) {

                final String message = ex.getLocalizedMessage();
                /*
                 * Set<String> info = ex.getSupportedMediaTypes().stream().map(method ->
                 * "Media type supported : " + method.toString()) .collect(Collectors.toSet());
                 */
                ResponseException exception = new ResponseException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                                HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), message);

                return new ResponseEntity<Object>(exception, new HttpHeaders(), exception.getStatus());
        }

}
