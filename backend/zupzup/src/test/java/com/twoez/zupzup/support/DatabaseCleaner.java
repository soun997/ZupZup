package com.twoez.zupzup.support;


import com.google.common.base.CaseFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.transaction.annotation.Transactional;

public class DatabaseCleaner implements InitializingBean {

    @PersistenceContext private EntityManager entityManager;
    private List<String> tableNames;

    @Override
    public void afterPropertiesSet() throws Exception {
        tableNames =
                entityManager.getMetamodel().getEntities().stream()
                        .filter(e -> e.getJavaType().getAnnotation(Entity.class) != null)
                        .map(
                                e ->
                                        CaseFormat.UPPER_CAMEL.to(
                                                CaseFormat.LOWER_UNDERSCORE,
                                                e.getName().replace("JpaEntity", "")))
                        .toList();
    }

    @Transactional
    public void execute() {
        entityManager.flush();
        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY FALSE").executeUpdate();

        tableNames.forEach(
                tableName -> {
                    entityManager.createNativeQuery("TRUNCATE TABLE " + tableName).executeUpdate();
                });

        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate();
    }
}
