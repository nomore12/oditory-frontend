# 1단계: 의존성 설치 및 애플리케이션 빌드
FROM node:18.17.1 AS build

# 작업 디렉터리 설정
WORKDIR /app

# package.json, yarn.lock 및 기타 필요한 파일들을 컨테이너 내부로 복사
COPY package.json yarn.lock ./
RUN yarn install

# 소스 코드 및 기타 필요한 파일들을 컨테이너 내부로 복사
COPY . ./

# React 애플리케이션 빌드
RUN yarn build

# 2단계: Nginx를 사용하여 빌드된 애플리케이션을 서빙
FROM nginx:1.19

# 빌드된 애플리케이션을 Nginx로 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 포트 80에서 실행
EXPOSE 80

# Nginx를 시작
CMD ["nginx", "-g", "daemon off;"]
