// src/lib/validators.ts

import type { User } from "./session";

export function isValidUser(user: User | null): user is User {
  return (
    !!user &&
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

// --- Aliases for routes that import validateUser / validatePartialUser ---
// Quick compatibility exports so existing route files keep working.

export { isValidUser as validateUser };

/**
 * validatePartialUser:
 * For now aliasing to isValidUser so the build won't fail.
 * If you need partial validation (e.g., validate only some fields),
 * replace this implementation with appropriate partial-check logic.
 */
export const validatePartialUser = (data: any): data is Partial<User> => {
  // If you want to accept null as invalid, keep current behavior:
  // Use isValidUser when full user check is acceptable; otherwise implement partial checks.
  return isValidUser(data as User);
};
