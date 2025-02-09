export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
}
export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status === 403) {
      throw new Error(data.message);
    }
    if (!data.token) {
      throw new Error("token is not provided in this response");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function logout() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("token is not provided, please sign in");
    }
    const response = await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    localStorage.removeItem("authToken");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
