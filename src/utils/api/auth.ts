export async function login(email: string, password: string) {
  const res = await fetch("/api/endpoints/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { status: res.status, ...data };
}

export async function register(
  fullname: string,
  email: string,
  password: string
) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname, email, password }),
  });
  const data = await res.json();
  return { status: res.status, ...data };
}
