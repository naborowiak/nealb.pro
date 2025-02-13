import { NextResponse } from 'next/server';
import { WyzeAPI } from '@/lib/api/wyze';

const wyzeApi = new WyzeAPI();

export async function POST(req: Request) {
  try {
    const { action, token, deviceMac } = await req.json();

    if (action === 'google_login') {
      const auth = await wyzeApi.loginWithGoogle(token);
      return NextResponse.json(auth);
    }

    if (action === 'get_devices') {
      const devices = await wyzeApi.getDevices();
      return NextResponse.json(devices);
    }

    if (action === 'livestream' && deviceMac) {
      const stream = await wyzeApi.getLivestream(deviceMac);
      return NextResponse.json(stream);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Wyze API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 