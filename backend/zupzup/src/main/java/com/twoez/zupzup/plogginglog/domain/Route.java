package com.twoez.zupzup.plogginglog.domain;


import java.util.List;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "route")
@Getter
public class Route {

    @Id private Long id;
    private List<Location> locations;

    public Route(Long id, List<Location> locations) {
        this.id = id;
        this.locations = locations;
    }
}
