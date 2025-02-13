const WYZE_API_URL = 'https://api.wyze.com/app/v2';
const WYZE_AUTH_URL = 'https://auth-prod.api.wyze.com/api/v1/user/login';

interface WyzeAuthResponse {
  access_token: string;
  refresh_token: string;
}

interface WyzeDeviceInfo {
  mac: string;
  nickname: string;
  product_model: string;
  device_params: {
    camera_img_url?: string;
    // Add other params as needed
  };
}

export class WyzeAPI {
  private accessToken: string | null = null;
  
  async loginWithGoogle(googleToken: string) {
    const response = await fetch(WYZE_AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_type: 'google',
        id_token: googleToken,
        app_name: 'wyze_web',
        app_ver: '2.0.0',
      }),
    });

    const data: WyzeAuthResponse = await response.json();
    this.accessToken = data.access_token;
    return data;
  }

  async getDevices(): Promise<WyzeDeviceInfo[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await fetch(`${WYZE_API_URL}/device/get_device_list`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    const data = await response.json();
    return data.data.device_list;
  }

  async getDeviceInfo(deviceMac: string): Promise<WyzeDeviceInfo> {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await fetch(`${WYZE_API_URL}/device/get_device_info`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_mac: deviceMac,
      }),
    });

    const data = await response.json();
    return data.data;
  }

  async getLivestream(deviceMac: string) {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await fetch(`${WYZE_API_URL}/device/get_livestream`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_mac: deviceMac,
      }),
    });

    const data = await response.json();
    return data.data;
  }
} 