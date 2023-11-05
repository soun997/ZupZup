package com.twoez.zupzup.global.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Base64;

/**
 * Jwt로부터 Header와 Payload를 가져옵니다. 주의) 검증없이 값만 읽어오는 것이므로 token의 출처에 대해 주의하셔야 합니다.
 * dependency - jackson
 */
public class JwtUtils {

    public static int HEADER_INDEX = 0;
    public static int PAYLOAD_INDEX = 1;
    private static String DELIMITER_REGEX = "\\.";
    private static String SUBJECT_KEY = "sub";

    public static String getHeader(String jwt) {
        return getDecodedContent(jwt, HEADER_INDEX);
    }

    public static JsonNode getHeaderValue(String jwt, String key) throws JsonProcessingException {
        return getContentValue(jwt, key, HEADER_INDEX);
    }

    public static String getPayLoad(String jwt) {
        return getDecodedContent(jwt, PAYLOAD_INDEX);
    }

    public static JsonNode getPayloadValue(String jwt, String key) throws JsonProcessingException {
        return getContentValue(jwt, key, PAYLOAD_INDEX);
    }

    public static JsonNode getSubject(String jwt) throws JsonProcessingException {
        return getPayloadValue(jwt, SUBJECT_KEY);
    }

    private static JsonNode getContentValue(String jwt, String key, int contentIndex)
            throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = getDecodedContent(jwt, contentIndex);
        return objectMapper.readTree(content).get(key);
    }

    private static String getDecodedContent(String jwt, int contentIndex) {
        return new String(Base64.getDecoder().decode(jwt.split(DELIMITER_REGEX)[contentIndex]));
    }


}
