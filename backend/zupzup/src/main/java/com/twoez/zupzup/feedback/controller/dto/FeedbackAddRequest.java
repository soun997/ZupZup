package com.twoez.zupzup.feedback.controller.dto;


import com.twoez.zupzup.feedback.domain.Feedback;
import jakarta.validation.constraints.NotBlank;

public record FeedbackAddRequest(@NotBlank String content) {

    public Feedback toEntity() {
        return new Feedback(content);
    }
}
