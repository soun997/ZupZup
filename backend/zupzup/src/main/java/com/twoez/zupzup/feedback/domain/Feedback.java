package com.twoez.zupzup.feedback.domain;


import com.twoez.zupzup.global.audit.BaseTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feedback extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean isDeleted;

    public Feedback(String content) {
        this.content = content;
        this.isDeleted = false;
    }

    public Feedback(Long id, String content) {
        this.id = id;
        this.content = content;
        this.isDeleted = false;
    }

    public Feedback(Long id, String content, Boolean isDeleted) {
        this.id = id;
        this.content = content;
        this.isDeleted = isDeleted;
    }
}
