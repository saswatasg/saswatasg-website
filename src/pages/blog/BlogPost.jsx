import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogLayout from '@/components/blog/BlogLayout';
import PageMeta from '@/components/PageMeta';
import { postsBySlug } from '@/data/blogPosts';
import { trackEvent } from '@/utils/analytics';

const BlogPost = () => {
  const { slug } = useParams();
  const post = postsBySlug[slug];

  useEffect(() => {
    if (post) trackEvent('blog', 'view_post', slug);
  }, [post, slug]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <PageMeta
          title="Post not found | Saswata S. Sengupta"
          description="This post doesn't exist or may have been moved."
          noindex={true}
        />
        <h1 className="text-3xl font-display font-black text-ink mb-4">Post not found</h1>
        <p className="text-sm font-semibold text-ink/60 mb-6">This post doesn't exist or may have been moved.</p>
        <Link to="/blog" className="inline-block bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold hover:bg-coral transition-colors">
          Back to the blog
        </Link>
      </div>
    );
  }

  const PostContent = post.component;

  return (
    <BlogLayout post={post}>
      <PostContent />
    </BlogLayout>
  );
};

export default BlogPost;
