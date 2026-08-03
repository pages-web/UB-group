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

export const useCmsCategories = (language: string) => {
  const { loading, error, data } = useQuery<CmsCategoriesData>(
    queries.CmsCategories,
    {
      variables: { language, limit: 30 },
    },
  );

  return { loading, error, categories: data?.cpCategories?.list || [] };
};
