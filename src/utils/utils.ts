import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortPostsByNewest<T extends { createdAt: string }>(posts: T[]) {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getCmsFileUrl(url?: string | null): string {
  if (!url) return "";
  if (
    url.startsWith("http") ||
    url.startsWith("/") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  const endpoint =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
    "";
  const gatewayUrl = endpoint.replace(/\/graphql\/?$/, "").replace(/\/$/, "");

  return gatewayUrl
    ? `${gatewayUrl}/read-file?key=${encodeURIComponent(url)}`
    : url;
}
