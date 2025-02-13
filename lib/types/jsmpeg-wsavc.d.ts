declare module 'jsmpeg-wsavc' {
  interface JSMpegOptions {
    canvas: HTMLCanvasElement;
    audio?: boolean;
    video?: boolean;
    videoBufferSize?: number;
    preserveDrawingBuffer?: boolean;
    onPlay?: () => void;
    onError?: (error: Error) => void;
    [key: string]: any;
  }

  interface JSMpegStatic {
    Player: new (url: string, options: JSMpegOptions) => any;
  }

  const JSMpeg: JSMpegStatic;
  export default JSMpeg;
} 