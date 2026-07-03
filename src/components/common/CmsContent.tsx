"use client";

import createDOMPurify from "dompurify";
import React, { useMemo } from "react";
import { cn } from "@/utils/utils";

type CmsContentProps = {
  html?: string | null;
  as?: React.ElementType;
} & Omit<React.HTMLAttributes<HTMLElement>, "dangerouslySetInnerHTML">;

export const CmsContent = ({
  html,
  as: Component = "div",
  className,
  ...props
}: CmsContentProps) => {
  const sanitizedHtml = useMemo(() => {
    if (typeof window === "undefined") return "";

    const purifier = createDOMPurify(window);
    return purifier.sanitize(html || "", {
      ADD_ATTR: ["data-level"],
    });
  }, [html]);

  return (
    <Component
      {...props}
      className={cn(
        "cms-html text-gray-600",
        "[&_h1]:mb-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-current",
        "[&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-current",
        "[&_h3]:mb-3 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-current",
        "[&_p]:mb-2.5 [&_p]:text-sm [&_p]:leading-[1.65] [&_p]:text-current",
        "[&_a]:text-[var(--brand-orange)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[var(--brand-orange)]/40 hover:[&_a]:decoration-[var(--brand-orange)]",
        "[&_ul]:mb-3 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:text-sm [&_ul]:text-current",
        "[&_ol]:mb-3 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:text-sm [&_ol]:text-current",
        "[&_li]:leading-[1.65]",
        "[&_blockquote]:my-4 [&_blockquote]:rounded-r-md [&_blockquote]:border-l-[3px] [&_blockquote]:border-[var(--brand-orange)] [&_blockquote]:bg-orange-50/60 [&_blockquote]:px-4 [&_blockquote]:py-2.5 [&_blockquote]:text-sm [&_blockquote]:italic [&_blockquote]:text-current",
        "[&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-gray-700",
        "[&_pre]:mb-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-950 [&_pre]:p-4 [&_pre]:text-xs",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-gray-200",
        "[&_hr]:my-5 [&_hr]:border-gray-200",
        "[&_strong]:font-semibold [&_strong]:text-current",
        "[&_em]:italic [&_em]:text-current",
        "[&_:empty]:hidden",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
