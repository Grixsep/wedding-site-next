// src/app/photos/[category]/page.tsx
import ClientGallery from "./ClientGallery";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Next13 now gives you a Promise-style params
  const { category } = await params;

  return <ClientGallery category={category} />;
}
