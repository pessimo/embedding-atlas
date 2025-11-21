// Copyright (c) 2025 Apple Inc. Licensed under MIT License.

import { mount } from "svelte";

import "../app.css";
import { initPostMessageListener } from "../utils/postmessage.js";

import App from "./Entrypoint.svelte";

// 初始化 postMessage 监听器，用于接收外部参数
initPostMessageListener();

const app = mount(App, { target: document.getElementById("app")! });

export default app;
