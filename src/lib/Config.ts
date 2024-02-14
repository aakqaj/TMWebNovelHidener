interface HotKeyConfig {
  [key: string]: string;
  hiden: string;
  search: string;
  next: string;
  pre: string;
}

interface CONFIG {
  hidenMode: 'hiden' | 'replace';
  replaceText: string;
  width: number;
  height: number;
  position: [number, number];
  TitleSize: number;
  ContentSize: number;
  Theme: 'light' | 'dark';
  HotKey: HotKeyConfig;
  Mask: boolean;
}

const DEFAULT_CONFIG: CONFIG = {
  hidenMode: 'hiden',
  replaceText: `【华为客服】尊敬的华为用户，感谢您的来电，
    在电脑默认浏览器地址栏（最上面的搜索栏）输入以下网址
    https://app.huawei.com/pc（注：不要使用微信打开此链接，微信会拦截链接）
    如您有任何疑问欢迎随
    时致电950800，我们会一直为您提供温暖服务，感谢您的支持，祝您生活愉快！`,
  Mask: false,
  width: 360,
  height: 500,
  position: [230, 150],
  TitleSize: 14,
  ContentSize: 12,
  Theme: 'light',
  HotKey: {
    hiden: 'ShiftLeft+Space',
    search: 'ShiftLeft+KeyF',
    next: 'ArrowRight',
    pre: 'ArrowLeft',
  },
};

const CONFIG_KEY = 'webHidenerConfig';

class Config {
  config = DEFAULT_CONFIG;

  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    const storedConfig = localStorage.getItem(CONFIG_KEY);
    if (storedConfig) {
      this.config = JSON.parse(storedConfig);
    } else {
      this.saveConfig();
    }
  }

  updateConfig(con: {
    hidenMode?: 'hiden' | 'replace';
    width?: number;
    height?: number;
    position?: [number, number];
    TitleSize?: number;
    ContentSize?: number;
    Theme?: 'light' | 'dark';
    HotKey?: HotKeyConfig;
    Mask?: boolean;
    replaceText?: string;
  }) {
    this.config = { ...this.config, ...con };
    this.saveConfig();
  }

  saveConfig() {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(this.config));
  }
}
export const config = new Config();
