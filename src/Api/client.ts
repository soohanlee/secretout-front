import axios from 'axios';

export const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8888'
    : import.meta.env.VITE_BASE_SERVER_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 질문 생성중이라는 페이지를 오래 보여주기 위해 딜레이 시간을 2초로 설정
export const delayTime = 2000;
