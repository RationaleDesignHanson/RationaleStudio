import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';
import { getPost, listPosts } from '@/content/writing/posts';

export const alt = 'Matt Hanson — writing on rationale.work';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

// Drives static generation. When POSTS is empty, the array is empty too —
// Next.js skips static prebuild and falls back to dynamic rendering, which
// is fine: the route is cheap.
export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

// dynamicParams = true (default) means Next.js renders unknown slugs on
// demand. We return the fallback brand card when there's no matching post
// rather than throwing, so the route never 500s.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return renderOgImage({
      eyebrow: 'rationale.work',
      title: 'Matt Hanson',
      tagline: 'Writing on building solo, AI as a coding partner, and the chapters that led here.',
    });
  }
  const published = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  return renderOgImage({
    eyebrow: `Essay · ${published}`,
    title: post.title,
    tagline: post.description,
    accent: '#A85A40',
  });
}
