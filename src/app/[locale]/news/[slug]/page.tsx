import NewsDetailClient from "./NewsDetailClient";

const newsCategorySlug = "medee-medeelel";
const locales = ["mn", "en"];

type CategoryResponse = {
  cpCmsCategoryDetail?: {
    _id?: string;
  } | null;
};

type NewsSlugsResponse = {
  cpPostList?: {
    posts?: {
      slug?: string | null;
    }[];
  } | null;
};

const requestCms = async <T,>(
  query: string,
  variables: Record<string, unknown>,
) => {
  const endpoint = process.env.NEXT_PUBLIC_ERXES_ENDPOINT;
  const appToken =
    process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? process.env.ERXES_APP_TOKEN;

  if (!endpoint) return null;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(appToken ? { "x-app-token": appToken } : {}),
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) return null;

    const json = (await response.json()) as { data?: T };
    return json.data ?? null;
  } catch {
    return null;
  }
};

const getNewsSlugs = async () => {
  const categoryData = await requestCms<CategoryResponse>(
    `
      query CategoryBySlug($slug: String) {
        cpCmsCategoryDetail(slug: $slug) {
          _id
        }
      }
    `,
    { slug: newsCategorySlug },
  );

  const categoryId = categoryData?.cpCmsCategoryDetail?._id;
  if (!categoryId) return [];

  const postsData = await requestCms<NewsSlugsResponse>(
    `
      query NewsSlugs($categoryIds: [String], $status: PostStatus) {
        cpPostList(categoryIds: $categoryIds, status: $status) {
          posts {
            slug
          }
        }
      }
    `,
    { categoryIds: [categoryId], status: "published" },
  );

  return (
    postsData?.cpPostList?.posts
      ?.map((post) => post.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? []
  );
};

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <NewsDetailClient locale={locale} slug={slug} />;
}
