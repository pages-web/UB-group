"use client";

import { useQuery } from "@apollo/client/react";
import { queries } from "@/app/gql/queries";
import { IPostList } from "@/types/cmsPostType";

export type ContactInfo = {
  phone?: string;
  email?: string;
  location?: string;
  hours?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
};

export const useContactInfo = () => {
  const { loading, error, data } = useQuery<IPostList>(queries.CmsPosts, {
    variables: {
      type: "contact_information",
    },
  });

  const post = data?.cpPostList?.posts?.[0];
  const contactInfo = post?.customFieldsMap?.["contact-info"] as
    | ContactInfo
    | undefined;

  return { loading, error, contactInfo };
};
