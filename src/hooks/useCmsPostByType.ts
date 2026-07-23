"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";
import { IPostList } from "@/types/cmsPostType";

interface CmsPostListByTypeData {
  cpPostList?: IPostList["cpPostList"];
}

/** Fetches published CMS posts for a custom post type name/code. */
export const useCmsPostByType = (typeName: string) => {
  const { loading, error, data } = useQuery<CmsPostListByTypeData>(
    queries.CmsPostsByType,
    {
    variables: {
      type: typeName,
      status: "published",
      sortField: "publishedDate",
    },
    skip: !typeName,
    },
  );

  const posts = data?.cpPostList?.posts || [];

  return { loading, error, posts };
};
