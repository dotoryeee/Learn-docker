const express = require("express");
const redis = require("redis");

const EXPRESS_PORT = 7070;
const REDIS_PORT = 6379;

//redis
const client = redis.createClient({
    //host값에 도커가 아닌 일반 환경에서는 https://redis-server.com 을 입력
    //compose를 사용할 경우 docker-compose.yml에 명시한 컨테이너 이름을 입력
    host: "redis-server",
    port: REDIS_PORT
})

client.set("number", 0);

//express
const app = express();
app.get('/', (req, res) => {
    client.get("number", (err, Number) => { //에러가 발생하지 않는다면
        //숫자를 1씩 증가
        client.set("number", parseInt(Number) + 1);
        res.send(`현재 새로고침 카운트 : ${Number}`);
    })
})

app.listen(EXPRESS_PORT);
console.log('server is running');
