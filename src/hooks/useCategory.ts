"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";

interface CategoryDetailData {
  cpCmsCategoryDetail?: {
    _id?: string;
  };
}

export const useCategories = (slug: string) => {
  const { loading, error, data } = useQuery<CategoryDetailData>(
    queries.categories,
    {
      variables: {
        slug,
      },
      skip: !slug,
    },
  );
  const categoryId = data?.cpCmsCategoryDetail?._id;

  return { loading, error, categoryId };
};
