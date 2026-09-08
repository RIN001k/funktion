// Simple single-admin auth: on login we verify the password server-side,
// then set a cookie equal to a secret value only the server knows. This
// avoids using Node's `crypto` module, which isn't available in the Edge
// Runtime that middleware.ts runs in.
export const ADMIN_COOKIE_NAME = "admin_session";

export function expectedSessionValue(): string {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function checkPassword(input: string): boolean {
  return input === process.env.ADMIN_PASSWORD;
}
