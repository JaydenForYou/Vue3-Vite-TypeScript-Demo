/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：Vue3-Vite-TypeScript-Demo
 * 文件名称：viteBuild.ts
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */

// vite 打包相关
import dotenv from 'dotenv';

export interface ViteEnv {
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_PUBLIC_PATH: string;
}

export function loadEnv(): ViteEnv {
  const env = process.env.NODE_ENV;
  const ret: any = {};
  const envList = [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'];
  envList.forEach((e) => {
    dotenv.config({path: e});
  });
  for (const envName of Object.keys(process.env)) {
    let realName = (process.env as any)[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    if (envName === 'VITE_OPEN') realName = Boolean(realName);
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
