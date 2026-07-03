import { gql } from "@apollo/client";

const CmsPosts = gql`
  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      totalCount
      posts {
        _id
        slug
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        customFieldsMap
        videoUrl
        thumbnail {
          url
        }
        categories {
          _id
          name
          slug
        }
        images {
          url
          type
          name
        }
      }
    }
  }
`;

export const postDetail = gql`
  query cpPost($id: String, $slug: String, $language: String) {
    cpPost(_id: $id, slug: $slug, language: $language) {
      _id
      slug
      title
      content
      excerpt
      featured
      status
      createdAt
      updatedAt
      customFieldsMap
      videoUrl
      thumbnail {
        url
      }
      categories {
        _id
        name
        slug
      }
      images {
        url
        type
        name
      }
    }
  }
`;

export const pageDetail = gql`
  query CpCmsPageDetail($id: String, $slug: String, $language: String) {
    cpCmsPageDetail(_id: $id, slug: $slug, language: $language) {
      _id
      clientPortalId
      name
      parentId
      description
      coverImage
      type
      slug
      content
      status
      createdUserId
      createdAt
      updatedAt
      customFieldsData
      customFieldsMap
      thumbnail {
        url
      }
      pageImages {
        url
      }
      video {
        url
      }
      videoUrl
      translations {
        _id
        objectId
        language
        title
        content
        excerpt
        customFieldsData
        type
      }
    }
  }
`;

export const categories = gql`
  query CpCmsCategoryDetail($id: String, $slug: String, $language: String) {
    cpCmsCategoryDetail(_id: $id, slug: $slug, language: $language) {
      _id
      name
      slug
      description
      parentId
      status
      createdAt
      updatedAt
      customFieldsData
      customFieldsMap
    }
  }
`;

export const queries = { CmsPosts, categories, pageDetail, postDetail };
