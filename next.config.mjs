import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ERXES_ENDPOINT:
      "https://ubgroupnext.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IjNWR25pQ0ZrU1RodVdwemQ5SmZhSCIsImlhdCI6MTc4MDU0Nzg4OX0.SvnmO5GEXDm5_3dJFNnVnhxvd5v3wQhx_nH_flwiGv8",
    ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IjNWR25pQ0ZrU1RodVdwemQ5SmZhSCIsImlhdCI6MTc4MDU0Nzg4OX0.SvnmO5GEXDm5_3dJFNnVnhxvd5v3wQhx_nH_flwiGv8",
  },
};

export default withNextIntl(nextConfig);
