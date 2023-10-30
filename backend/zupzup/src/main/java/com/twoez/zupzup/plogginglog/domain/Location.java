package com.twoez.zupzup.plogginglog.domain;


import lombok.Getter;

@Getter
public class Location {

    private Double latitude;
    private Double longitude;

    public Location(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static Location of(Double latitude, Double longitude) {
        return new Location(latitude, longitude);
    }
}
