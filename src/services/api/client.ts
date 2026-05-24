import { createHttpHealthSysApi } from './httpClient';
import { createMockHealthSysApi } from './mockClient';
import type { HealthSysApi } from './types';

const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const configuredBaseUrl = envBaseUrl !== undefined ? envBaseUrl : 'http://localhost:8080';
const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

export const apiClient: HealthSysApi = useMockApi ? createMockHealthSysApi() : createHttpHealthSysApi(configuredBaseUrl);

export const apiEnvironment = {
  mode: apiClient.mode,
  baseUrl: useMockApi ? 'local-storage' : configuredBaseUrl,
  isMock: useMockApi
};
