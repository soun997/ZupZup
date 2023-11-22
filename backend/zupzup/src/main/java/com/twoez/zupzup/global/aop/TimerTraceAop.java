package com.twoez.zupzup.global.aop;

import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.StoreManager;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.util.StopWatch;

@Slf4j
@Aspect
public class TimerTraceAop {

    @Around("execution(* com.twoez.zupzup..*(..)) && !execution(* com.twoez.zupzup.config..*(..))") //aop를 실행할 pointCut 전달
//    @Around("execution(* com.twoez.zupzup.trashcan..*(..))") //aop를 실행할 pointCut 전달
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable{
        StopWatch stopWatch = new StopWatch();

        try{
            stopWatch.start();
            return joinPoint.proceed(); // 타겟 메소드 실행

        } finally {
            stopWatch.stop();
            log.info(
                    "[EXECUTION TIME] {} : {} ms",
                    joinPoint.getTarget().getClass(),
                    stopWatch.getTotalTimeMillis()
            );

        }
    }
}
