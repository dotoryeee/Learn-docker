FROM node:alpine as builder
#이곳(as)부터 다음 FROM이 나올 떄 까지는 builder stage임을 명시
WORKDIR '/usr/src/app'
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
#생성된 빌드 파일은 /usr/src/app/build에 위치하게 됩니다

FROM nginx
#nginx 베이스 이미지
EXPOSE 80
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#--from=builder : 다른 stage에 있는 파일을 복사할 때, 다른 stage 이름을 명시
#/usr/src/app/build , /usr/share/nginx/html : builder stage에서 생성된 파일을 nginx 폴더에 복사