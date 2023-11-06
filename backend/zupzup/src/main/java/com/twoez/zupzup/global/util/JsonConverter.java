package com.twoez.zupzup.global.util;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twoez.zupzup.global.exception.common.RedisParsingException;

public class JsonConverter {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T toObject(String str, Class<T> clazz) {
        try {
            return objectMapper.readValue(str, clazz);
        } catch (JsonProcessingException e) {
            throw new RedisParsingException(
                    String.format("Cannot convert %s to %s", str, clazz.getName()));
        }
    }

    public static <T> String toJson(T value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new RedisParsingException(String.format("Cannot convert %s to Json", value));
        }
    }
}
