package com.twoez.zupzup.config.security.filter;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.util.ExceptionResponseWriter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // 이후 필터들에서 발생한 예외를 잡아서 처리한다.
            filterChain.doFilter(request, response);
        } catch (ApplicationException e) {
            logRequestInfo(request);
            log.info("[ERROR - security filter] {}", e.getExceptionCode().getMessage());
            e.printStackTrace();
            ExceptionResponseWriter.writeException(response, e.getExceptionCode());
        } catch (Exception e) {
            logRequestInfo(request);
            log.info("[ERROR - security filter] {}", e.getMessage());
            e.printStackTrace();
            ExceptionResponseWriter.writeException(response, e.getMessage());
        }
    }

    private void logRequestInfo(HttpServletRequest request) {
        log.info(
                "[Request] {} {} by memberId {}",
                request.getMethod(),
                request.getRequestURI(),
                HttpRequestUtils.getRequestMemberIdFromHeader(request));
    }
}
