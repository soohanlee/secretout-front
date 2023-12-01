import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// config 함수를 비동기로 만들고, loadEnv를 사용하여 환경 변수를 로드합니다.
export default ({ mode }: { mode: string }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    resolve: {
      alias: [
        { find: '@src', replacement: resolve(__dirname, 'src') },
        {
          find: '@Components',
          replacement: resolve(__dirname, 'src/Components'),
        },
        {
          find: '@Layouts',
          replacement: resolve(__dirname, 'src/Layouts'),
        },
        {
          find: '@Pages',
          replacement: resolve(__dirname, 'src/Pages'),
        },
        {
          find: '@Store',
          replacement: resolve(__dirname, 'src/Store'),
        },
        {
          find: '@Api',
          replacement: resolve(__dirname, 'src/Api'),
        },
        {
          find: '@Config',
          replacement: resolve(__dirname, '@Configure'),
        },
      ],
    },
    plugins: [
      react(),
      tsconfigPaths(),
      sentryVitePlugin({
        org: 'secretout',
        project: 'javascript-react',
        authToken: env.VITE_SENTRY_AUTH_TOKEN, // env 객체에서 로드된 값을 사용합니다.
        telemetry: false,
      }),
    ],
    build: {
      sourcemap: true,
    },
  });
};
