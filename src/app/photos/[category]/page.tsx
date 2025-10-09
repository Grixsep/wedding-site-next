// app/photos/[category]/page.tsx
import ClientGallery from "./ClientGallery";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Next.js 13+ gives you a Promise-style params
  const { category } = await params;

  return <ClientGallery category={category} />;
}
