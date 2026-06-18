export function saveToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function getToken() {
  return localStorage.getItem("admin_token");
}

export async function logout() {
  try {
    await fetch("/api/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Logout request failed", error);
  } finally {
    localStorage.removeItem("admin_token");
  }
}

export function saveVoterToken(token: string) {
  localStorage.setItem("voter_token", token);
}

export function getVoterToken() {
  return localStorage.getItem("voter_token");
}

export function logoutVoter() {
  localStorage.removeItem("voter_token");
}
