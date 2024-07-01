/**
 *  An array of accessible routes, no auth required
 * @type string
 *
 */
export const publicRoutes = ["/"];

/**
 *  An array of auth routes,
 * redirects login users to homepage
 * @type {string[]}
 *
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  //   "/withdrawal",
];

/**
 *  the prefix for api auth routes,
 * routes with this prefix are used for api auth
 * @type {string}
 *
 */
export const apiAuthPrefix = "/api/auth";

/**
 *  the default redirect path
 * routes with this prefix are used for api auth
 * @type {string}
 *
 */

export const DEFAULT_LOGIN_REDIRECT = "/home";
