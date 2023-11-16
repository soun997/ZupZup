package com.twoez.zupzup.item.domain;


import com.twoez.zupzup.global.audit.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer exp;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private String itemImgUrl;

    @Column(nullable = false)
    private Boolean isDeleted;

    @Builder
    public Item(
            Long id,
            String name,
            String description,
            Integer exp,
            Long price,
            String itemImgUrl,
            Boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.exp = exp;
        this.price = price;
        this.itemImgUrl = itemImgUrl;
        this.isDeleted = isDeleted;
    }
}
