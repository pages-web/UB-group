"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";
import { ICpPageDetail } from "@/types/cmsPostType";
import { useLocale } from "next-intl";

export const usePageBySlug = (slug: string) => {
  const locale = useLocale();
  const { loading, error, data } = useQuery<ICpPageDetail>(
    queries.pageDetail,
    {
      variables: {
        slug,
        language: locale,
      },
      skip: !slug,
    },
  );

  const page = data?.cpCmsPageDetail;

  return { loading, error, page };
};
