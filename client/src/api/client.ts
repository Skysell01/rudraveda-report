/// <reference types="vite/client" />
import axios from 'axios';
import { GenerateReportRequest, JobProgressResponse, LocationInput, SystemHealth } from '../types';

const rawBase = (import.meta as any).env?.VITE_API_BASE_URL || '';
const API_BASE = rawBase ? `${rawBase.replace(/\/$/, '')}/api` : '/api';

export async function fetchLocations(query: string): Promise<LocationInput[]> {
  const response = await axios.get<LocationInput[]>(`${API_BASE}/location/search`, {
    params: { q: query }
  });
  return response.data;
}

export async function requestReportGeneration(payload: GenerateReportRequest): Promise<{ jobId: string }> {
  const response = await axios.post<{ jobId: string }>(`${API_BASE}/reports/generate`, payload);
  return response.data;
}

export async function pollJobProgress(jobId: string): Promise<JobProgressResponse> {
  const response = await axios.get<JobProgressResponse>(`${API_BASE}/reports/status/${jobId}`);
  return response.data;
}

export function getDownloadUrl(jobId: string): string {
  return `${API_BASE}/reports/${jobId}/download`;
}

export function getPreviewUrl(jobId: string): string {
  return `${API_BASE}/reports/${jobId}/preview`;
}

export async function deleteReport(jobId: string): Promise<void> {
  await axios.delete(`${API_BASE}/reports/${jobId}`);
}

export async function checkSystemHealth(): Promise<SystemHealth> {
  const response = await axios.get<SystemHealth>(`${API_BASE}/reports/health`);
  return response.data;
}
