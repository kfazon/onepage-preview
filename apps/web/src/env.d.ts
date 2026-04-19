/// <reference types="astro/client" />

declare module '@onepage/generator' {
  export function generatePreview(input?: any): {
    ok: boolean;
    template: string;
    html: string;
    meta: {
      generatedAt: string;
      version: string;
      lang: string;
    };
  };
}

declare module '@onepage/generator/store' {
  export function createStore(kv?: any, env?: {
    KV_REST_BASE?: string;
    KV_REST_TOKEN?: string;
    CF_ACCOUNT_ID?: string;
  }): {
    getClaims(): Promise<any[]>;
    getOptouts(): Promise<any[]>;
    addClaim(businessName: string, email: string): Promise<{ ok: boolean }>;
    addOptout(businessName: string): Promise<{ ok: boolean }>;
    isOptedOut(businessName: string): Promise<boolean>;
  };
}
