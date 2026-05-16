const API_BASE = "https://api.agrohealthai.com";

export async function apiCall(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("vetpractice_token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || err.message || "API error");
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const data = await apiCall("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("vetpractice_token", data.access_token);
  return data;
}

export async function getMe() {
  return apiCall("/api/v1/auth/me");
}

export async function getAnimals() {
  return apiCall("/api/v1/animals/?limit=200");
}

export async function createAnimal(data: Record<string, unknown>) {
  return apiCall("/api/v1/animals/", { method: "POST", body: JSON.stringify(data) });
}

export async function runDiagnosis(data: Record<string, unknown>) {
  return apiCall("/api/v1/diagnostics/assess", { method: "POST", body: JSON.stringify(data) });
}

export async function getKnowledgeStats() {
  return apiCall("/api/v1/knowledge/stats");
}

export async function getDashboard() {
  return apiCall("/api/v1/farms/dashboard");
}

export async function submitFeedback(data: Record<string, unknown>) {
  return apiCall("/api/v1/pilot/feedback", { method: "POST", body: JSON.stringify(data) });
}
