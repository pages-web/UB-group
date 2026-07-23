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

const CmsPostsByType = gql`
  query cpPostListByType($type: String, $status: PostStatus, $sortField: String) {
    cpPostList(type: $type, status: $status, sortField: $sortField) {
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

const CmsCategories = gql`
  query CpCategories($clientPortalId: String!, $language: String, $limit: Int) {
    cpCategories(
      clientPortalId: $clientPortalId
      language: $language
      limit: $limit
    ) {
      list {
        _id
        name
        parent {
          slug
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

export const queries = {
  CmsPosts,
  CmsPostsByType,
  CmsCategories,
  categories,
  pageDetail,
  postDetail,
};
