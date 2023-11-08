package com.twoez.zupzup.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

/**
 *
 * @param <T>
 */
@JsonInclude(Include.NON_NULL)
public class HttpResponse<T> extends ResponseEntity<ApiContent<T>> {

    public record HttpResponseBuilder(HttpStatusCode status) {
        public <T> HttpResponse<T> body(T body) {
            return new HttpResponse<T>(status, body);
        }

        public <T> HttpResponse<T> build() {
            return new HttpResponse<>(status);
        }
    }

    public static HttpResponseBuilder status(HttpStatus status) {
        return new HttpResponseBuilder(status);
    }

    public static HttpResponseBuilder okBuilder() {
        return new HttpResponseBuilder(HttpStatus.OK);
    }

    public static HttpResponseBuilder noContentBuilder() {
        return new HttpResponseBuilder(HttpStatus.NO_CONTENT);
    }

    public static HttpResponseBuilder notFoundBuilder() {
        return new HttpResponseBuilder(HttpStatus.NOT_FOUND);
    }

    public static HttpResponseBuilder badRequestBuilder() {
        return new HttpResponseBuilder(HttpStatus.BAD_REQUEST);
    }

    public static HttpResponseBuilder createdBuilder() {
        return new HttpResponseBuilder(HttpStatus.CREATED);
    }

    public static <T> HttpResponse<T> notFoundBuild(T body) {
        return new HttpResponse<>(HttpStatus.NOT_FOUND, body);
    }

    public static <T> HttpResponse<T> okBuild(T body) {
        return new HttpResponse<>(HttpStatus.OK, body);
    }

    public static <T> HttpResponse<T> badRequestBuild(T body) {
        return new HttpResponse<>(HttpStatus.BAD_REQUEST, body);
    }

    public static <T> HttpResponse<T> createdBuild(T body) {
        return new HttpResponse<>(HttpStatus.CREATED, body);
    }

    public static <T> HttpResponse<T> internalServerErrorBuild(T body) {
        return new HttpResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, body);
    }

    public HttpResponse(HttpStatusCode status) {
        super(status);
    }

    public HttpResponse(HttpStatusCode status, T results) {
        super(new ApiContent<>(status.value(), results), status);
    }
}
