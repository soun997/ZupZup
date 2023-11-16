package com.twoez.zupzup.item.repository;


import com.twoez.zupzup.item.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {}
