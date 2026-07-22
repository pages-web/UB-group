"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";
import { useCategories } from "./useCategory";
import { IPostList } from "@/types/cmsPostType";

export const useCmsPostsBySlug = (slug: string) => {
  const {
    loading: categoryLoading,
    error: categoryError,
    categoryId,
  } = useCategories(slug);
  const shouldWaitForCategory = Boolean(slug && !categoryId);
  const {
    loading,
    error,
    data: CmsPosts,
  } = useQuery<IPostList>(queries.CmsPosts, {
    variables: {
      categoryIds: categoryId ? [categoryId] : undefined,
      status: "published",
        sortField: "publishedDate",
    },
    skip: shouldWaitForCategory,
  });

  const posts = CmsPosts?.cpPostList?.posts || [];

  return { loading: categoryLoading || loading, error: categoryError || error, posts };
};
