import { createHttpHealthSysApi } from './httpClient';
import { createMockHealthSysApi } from './mockClient';
import type { HealthSysApi } from './types';

const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const runtimeHostname = typeof window === 'undefined' ? '' : window.location.hostname;
const isVercelRuntime = runtimeHostname === 'comp-dist-fronted.vercel.app' || runtimeHostname.endsWith('.vercel.app');
const configuredBaseUrl = isVercelRuntime ? '/api/proxy.cjs?targetPath=' : envBaseUrl !== undefined ? envBaseUrl : import.meta.env.DEV ? 'http://localhost:8080' : '';
const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

export const apiClient: HealthSysApi = useMockApi ? createMockHealthSysApi() : createHttpHealthSysApi(configuredBaseUrl);

export const apiEnvironment = {
  mode: apiClient.mode,
  baseUrl: useMockApi ? 'local-storage' : configuredBaseUrl,
  isMock: useMockApi
};
