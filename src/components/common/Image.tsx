"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";

const PLACEHOLDER = "/images/placeholder.svg";

const getImageUrl = (src?: string | null) => {
  if (!src) return PLACEHOLDER;
  if (src.startsWith("http") || src.startsWith("/")) return src;

  const endpoint =
    process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    "";
  const gatewayUrl = endpoint.replace(/\/graphql\/?$/, "").replace(/\/$/, "");

  return gatewayUrl
    ? `${gatewayUrl}/read-file?key=${encodeURIComponent(src)}`
    : PLACEHOLDER;
};

type ImageProps = Omit<NextImageProps, "src"> & {
  src?: string | null;
};

export default function Image({
  src,
  alt = "",
  ...props
}: ImageProps) {
  return <NextImage {...props} src={getImageUrl(src)} alt={alt} />;
}
