"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";
import { getCmsFileUrl } from "@/utils/utils";

const PLACEHOLDER = "/images/placeholder.png";

type ImageProps = Omit<NextImageProps, "src"> & {
  src?: string | null;
  fallback?: string;
};

export default function Image({
  src,
  fallback = PLACEHOLDER,
  alt = "",
  ...props
}: ImageProps) {
  const resolved = getCmsFileUrl(src) || fallback;
  const [imgSrc, setImgSrc] = useState(resolved);

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
