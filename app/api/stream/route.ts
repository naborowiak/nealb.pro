import Stream from 'node-rtsp-stream';
import { NextResponse } from 'next/server';

let streams: Map<string, any> = new Map();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cameraId = searchParams.get('camera') || 'default';
  
  // Example Wyze RTSP URL format:
  // rtsp://username:password@ip_address/live
  const rtspUrl = `rtsp://${process.env.WYZE_USERNAME}:${process.env.WYZE_PASSWORD}@${process.env.WYZE_CAMERA_IP}/live`;
  
  if (!streams.has(cameraId)) {
    const stream = new Stream({
      name: `wyze-camera-${cameraId}`,
      streamUrl: rtspUrl,
      wsPort: 8082 + streams.size, // Increment port for each camera
      ffmpegOptions: {
        '-stats': '',
        '-r': 30,
        '-s': '640x480'
      }
    });
    streams.set(cameraId, stream);
  }

  return NextResponse.json({ 
    status: 'Stream started', 
    port: 8082 + Array.from(streams.keys()).indexOf(cameraId)
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const cameraId = searchParams.get('camera') || 'default';
  
  const stream = streams.get(cameraId);
  if (stream) {
    stream.stop();
    streams.delete(cameraId);
  }
  return NextResponse.json({ status: 'Stream stopped' });
} 