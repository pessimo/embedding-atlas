// Copyright (c) 2025 Apple Inc. Licensed under MIT License.

import { writable, type Writable } from "svelte/store";

/**
 * 外部传入的参数类型
 */
export interface ExternalParams {
  [key: string]: any;
}

/**
 * 存储外部传入参数的 store
 */
export const externalParamsStore: Writable<ExternalParams> = writable({});

/**
 * 初始化 postMessage 监听器
 * 监听来自父窗口的消息，用于接收外部参数
 */
export function initPostMessageListener() {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener("message", (event: MessageEvent) => {
    console.log("message", event);
    // 安全检查：只接受来自父窗口的消息
    // 注意：在生产环境中，应该验证 event.origin
    if (event.data && typeof event.data === "object") {
      // 处理 selectedCategory 参数（直接读取 event.data.selectedCategory）
      if (event.data.selectedCategory !== undefined) {
        externalParamsStore.update((current) => {
          return {
            ...current,
            select_category: event.data.selectedCategory,
          };
        });
      }
    }
  });

  // 通知父窗口 iframe 已准备就绪
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "IFRAME_READY",
        source: "embedding-atlas-viewer",
      },
      "*",
    );
  }
}
