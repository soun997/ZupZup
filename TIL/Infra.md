## UFW Docker 적용기

### 1. ufw-docker를 사용해서 특정 컨티에너의 외부 접속 허용

```yaml
sudo ufw-docker allow redis 6379/tcp
sudo ufw-docker allow {컨테이너이름} {포트번호}/{tcp or udp}
```

### 2. 적용 후  ufw-staus 확인
```yaml
ubuntu@ip-172-26-6-115:~/redis$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
22                         ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22/tcp                     ALLOW       Anywhere
22 (v6)                    ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)
22/tcp (v6)                ALLOW       Anywhere (v6)

172.18.0.2 3306/tcp        ALLOW FWD   Anywhere                   # allow mariadb 3306/tcp deploy
172.18.0.6 6379/tcp        ALLOW FWD   Anywhere                   # allow redis 6379/tcp deploy
```

- Allow FWD

### 3. 외부 접속 차단

Remove all rules related to the container `httpd`

```bash
ufw-docker delete allow httpd
```

Remove the rule which port is `443` and protocol is `tcp` for the container `httpd`

```bash
ufw-docker delete allow httpd 443/tcp
```