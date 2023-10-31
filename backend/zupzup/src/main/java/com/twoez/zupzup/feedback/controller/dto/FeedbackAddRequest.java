package com.twoez.zupzup.feedback.controller.dto;


import com.twoez.zupzup.feedback.domain.Feedback;

public record FeedbackAddRequest(String content) {

    public Feedback toEntity() {
        return new Feedback(content);
    }
}
