const API_BASE = "";

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  throw new Error(
    `Expected JSON but got non-JSON response (status ${response.status}). ` +
      `Response starts with: ${text.slice(0, 80)}`
  );
}

export async function getProviderProfile(token) {
  const response = await fetch(`${API_BASE}/api/providers/me`, {
    method: "GET",
    headers: authHeaders(token),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch provider profile");
  }
  return data;
}

export async function getProviderAppointments(token, query = "") {
  const response = await fetch(`${API_BASE}/api/appointments/provider/me${query}`, {
    method: "GET",
    headers: authHeaders(token),
    cache: "no-store",
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch provider appointments");
  }
  return data;
}

export async function searchOwnerPets(token, { email, phone }) {
  const params = new URLSearchParams();
  const emailValue = (email || "").trim().toLowerCase();
  const phoneValue = (phone || "").trim();

  if (emailValue) {
    params.set("email", emailValue);
  }
  if (phoneValue) {
    params.set("phone", phoneValue);
  }

  const response = await fetch(`${API_BASE}/api/pets/provider/search?${params.toString()}`, {
    method: "GET",
    headers: authHeaders(token),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to lookup owner and pets");
  }
  return data;
}

export async function createProviderBooking(token, payload) {
  const response = await fetch(`${API_BASE}/api/appointments/provider/me`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to create booking");
  }
  return data;
}

export async function createCustomerAndPetFromProvider(token, payload) {
  const response = await fetch(`${API_BASE}/api/pets/provider/intake`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to create customer and pet");
  }
  return data;
}

export async function cancelAppointment(token, appointmentId) {
  const response = await fetch(`${API_BASE}/api/appointments/${appointmentId}/cancel`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to cancel appointment");
  }
  return data;
}
