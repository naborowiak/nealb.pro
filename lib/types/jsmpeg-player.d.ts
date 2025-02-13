declare module 'jsmpeg-player' {
  export default class JSMpeg {
    constructor(url: string, options: {
      canvas: HTMLCanvasElement;
      autoplay?: boolean;
      audio?: boolean;
      video?: boolean;
      [key: string]: any;
    });
    
    play(): void;
    pause(): void;
    stop(): void;
    destroy(): void;
  }
} 