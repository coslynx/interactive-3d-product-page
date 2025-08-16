/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_3D_FEATURES: boolean;
  readonly VITE_THREEJS_ASSET_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface WebGLContextEvent extends Event {
  readonly gl: WebGLRenderingContext | null;
}

interface HTMLCanvasElementEventMap {
  webglcontextlost: WebGLContextEvent;
  webglcontextrestored: WebGLContextEvent;
}

interface HTMLCanvasElement {
    addEventListener<K extends keyof HTMLCanvasElementEventMap>(
        type: K,
        listener: (this: HTMLCanvasElement, ev: HTMLCanvasElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
        type: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof HTMLCanvasElementEventMap>(
        type: K,
        listener: (this: HTMLCanvasElement, ev: HTMLCanvasElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
        type: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
    ): void;
}