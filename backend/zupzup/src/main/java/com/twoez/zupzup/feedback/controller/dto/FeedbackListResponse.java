package com.twoez.zupzup.feedback.controller.dto;


import com.twoez.zupzup.feedback.domain.Feedback;

public record FeedbackListResponse(Long id, String content) {

    public static FeedbackListResponse of(Feedback feedback) {

        return new FeedbackListResponse(feedback.getId(), feedback.getContent());
    }
}
