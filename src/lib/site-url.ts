const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

export function resolveSiteUrl(value: string | undefined, production: boolean) {
  const candidate = value?.trim();

  if (!candidate) {
    if (production) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be set for production builds.");
    }

    return "http://localhost:3000";
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
  }

  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("NEXT_PUBLIC_SITE_URL must contain only the site origin, without credentials, a path, query, or hash.");
  }

  if (production && (url.protocol !== "https:" || LOCAL_HOSTS.has(url.hostname))) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a public HTTPS origin for production builds.");
  }

  return url.origin;
}
