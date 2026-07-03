"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";
import { ICpPostDetail } from "@/types/cmsPostType";
import { useLocale } from "next-intl";

export const usePostDetail = (slug: string) => {
  const locale = useLocale();
  const { loading, error, data } = useQuery<ICpPostDetail>(queries.postDetail, {
    variables: {
      slug,
      language: locale,
    },
    skip: !slug,
  });

  const post = data?.cpPost;

  return { loading, error, post };
};
