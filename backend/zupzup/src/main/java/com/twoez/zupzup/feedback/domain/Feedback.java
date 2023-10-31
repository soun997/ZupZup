package com.twoez.zupzup.feedback.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feedback {

    @Id private Long id;

    private String content;

    public Feedback(String content) {
        this.content = content;
    }

    public Feedback(Long id, String content) {
        this.id = id;
        this.content = content;
    }
}
