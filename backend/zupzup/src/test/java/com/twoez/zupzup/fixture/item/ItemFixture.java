package com.twoez.zupzup.fixture.item;


import com.twoez.zupzup.item.domain.Item;

public enum ItemFixture {
    DEFAULT(1L, "아이템", "아이템 설명", 10, 30L, "https://image.com", false);

    private Long id;
    private String name;
    private String description;
    private Integer exp;
    private Long price;
    private String itemImgUrl;
    private Boolean isDeleted;

    ItemFixture(
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

    public Item getItem(Long id, String name) {
        return Item.builder()
                .id(id)
                .name(name)
                .description(description)
                .exp(exp)
                .price(price)
                .itemImgUrl(itemImgUrl)
                .isDeleted(isDeleted)
                .build();
    }

    public Item getItem(Long id, String name, Integer exp, Long price) {
        return Item.builder()
                .id(id)
                .name(name)
                .description(description)
                .exp(exp)
                .price(price)
                .itemImgUrl(itemImgUrl)
                .isDeleted(isDeleted)
                .build();
    }
}
