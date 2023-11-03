package com.twoez.zupzup.item.service;

import com.twoez.zupzup.global.exception.item.ItemNotFoundException;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemQueryService {

    private final ItemRepository itemRepository;

    public List<Item> searchAll() {
        return itemRepository.findAll();
    }

    public Item search(Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(ItemNotFoundException::new);
    }
}
