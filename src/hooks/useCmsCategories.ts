"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";

interface CmsCategoriesData {
  cpCategories?: {
    list: {
      _id: string;
      name: string;
      parent?: {
        slug?: string;
      } | null;
    }[];
  };
}

export const useCmsCategories = (clientPortalId: string, language: string) => {
  const { loading, error, data } = useQuery<CmsCategoriesData>(
    queries.CmsCategories,
    {
      variables: { clientPortalId, language, limit: 30 },
    },
  );

  return { loading, error, categories: data?.cpCategories?.list || [] };
};
