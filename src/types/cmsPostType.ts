export interface IPostList {
  cpPostList: {
    totalCount: number;
    posts: CmsPost[];
  };
}

export interface ICpPageDetail {
  cpCmsPageDetail?: CmsPage | null;
}

export interface ICpPostDetail {
  cpPost?: CmsPost | null;
}

export interface CmsPost {
  _id: string;
  slug?: string;
  title: string;
  content?: string;
  excerpt?: string;
  featured?: boolean;
  status?: string;
  customFieldsMap?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  videoUrl?: string;
  thumbnail?: {
    url: string;
  } | null;
  categories?: {
    _id: string;
    name: string;
    slug?: string;
  }[];
  images?: {
    url: string;
    type?: string;
    name?: string;
  }[];
}

export interface CmsPage {
  _id: string;
  clientPortalId?: string;
  name: string;
  parentId?: string | null;
  description?: string | null;
  coverImage?: string | null;
  type?: string | null;
  slug?: string;
  content?: string | null;
  status?: string;
  createdUserId?: string;
  customFieldsData?: unknown[];
  customFieldsMap?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  thumbnail?: {
    url: string;
  } | null;
  pageImages?: {
    url: string;
  }[];
  video?: {
    url: string;
  } | null;
  videoUrl?: string;
  translations?: {
    _id: string;
    objectId: string;
    language: string;
    title?: string | null;
    content?: string | null;
    excerpt?: string | null;
    customFieldsData?: unknown[];
    type?: string | null;
  }[];
}
