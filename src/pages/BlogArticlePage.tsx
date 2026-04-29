import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import productsCollection from "@/assets/products-collection.jpg";
import productSacolas from "@/assets/product-sacolas.jpg";
import finishHotStamping from "@/assets/finish-hot-stamping.jpg";

const fallbackImages: Record<string, string> = {
  "como-escolher-a-embalagem-ideal": productsCollection,
  "sacolas-personalizadas-o-que-considerar-antes-de-produzir": productSacolas,
  "acabamentos-premium-que-aumentam-a-percepcao-de-valor": finishHotStamping,
};

type ContentBlock = {
  type: "paragraph" | "heading";
  text: string;
};

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  cover_image_url: string | null;
  cover_image_alt: string | null;
  read_time_minutes: number;
  published_at: string | null;
  blog_categories: { name: string } | null;
};

type BlogPostQueryBuilder = {
  select: (columns: string) => BlogPostQueryBuilder;
  eq: (column: string, value: string) => BlogPostQueryBuilder;
  lte: (column: string, value: string) => BlogPostQueryBuilder;
  maybeSingle: () => Promise<{ data: unknown | null; error: Error | null }>;
};

const blogClient = supabase as unknown as {
  from: (table: "blog_posts") => BlogPostQueryBuilder;
};

const formatDate = (date: string | null) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  })
    .format(new Date(date))
    .replace(/^./, (letter) => letter.toUpperCase());
};

const fetchBlogPost = async (slug: string) => {
  const { data, error } = await blogClient
    .from("blog_posts")
    .select(`
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      cover_image_alt,
      read_time_minutes,
      published_at,
      blog_categories(name)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;
  return data as BlogPost | null;
};

export default function BlogArticlePage() {
  const { slug = "como-escolher-a-embalagem-ideal" } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
  });

  const headings = (post?.content ?? []).filter((block) => block.type === "heading");
  const image = post?.cover_image_url || fallbackImages[slug] || productsCollection;

  return (
    <Layout>
      <article className="pt-32 md:pt-40 bg-background">
        <header className="container mx-auto px-4 pb-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog"><ArrowLeft className="w-4 h-4" /> Voltar para o Blog</Link>
          </Button>

          {isLoading ? (
            <div className="max-w-4xl space-y-4">
              <div className="h-4 w-52 bg-muted rounded animate-pulse" />
              <div className="h-14 w-full max-w-3xl bg-muted rounded animate-pulse" />
              <div className="h-6 w-full max-w-2xl bg-muted rounded animate-pulse" />
            </div>
          ) : !post ? (
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Publicação não encontrada
              </h1>
              <p className="text-muted-foreground mb-6">
                O conteúdo pode ter sido removido ou ainda não está publicado.
              </p>
              <Button variant="cta" asChild>
                <Link to="/blog">Ver publicações</Link>
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="text-primary font-medium uppercase tracking-wider text-sm">
                {post.blog_categories?.name ?? "Blog Printbag"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mt-4 mb-6">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(post.published_at)}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.read_time_minutes} min de leitura</span>
              </div>
            </motion.div>
          )}
        </header>

        {post && (
          <>
            <div className="container mx-auto px-4">
              <img
                src={image}
                alt={post.cover_image_alt || post.title}
                className="w-full max-h-[520px] object-cover rounded-xl shadow-medium"
              />
            </div>

            <section className="container mx-auto px-4 py-12 md:py-16">
              <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
                <div className="max-w-3xl space-y-10">
                  {(post.content ?? []).map((block, index) =>
                    block.type === "heading" ? (
                      <section key={`${block.text}-${index}`}>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                          {block.text}
                        </h2>
                      </section>
                    ) : (
                      <p key={`${block.text}-${index}`} className="text-muted-foreground leading-relaxed text-lg">
                        {block.text}
                      </p>
                    ),
                  )}

                  <section className="border-t border-border pt-10">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                      Quer transformar sua embalagem em valor de marca?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                      Fale com a equipe da Printbag para desenvolver projetos personalizados com qualidade, consistência e acabamento adequado ao seu posicionamento.
                    </p>
                    <Button variant="cta" asChild>
                      <Link to="/contato">Fale com um especialista</Link>
                    </Button>
                  </section>
                </div>

                <aside className="bg-muted border border-border rounded-xl p-6 sticky top-28">
                  <h3 className="font-heading font-bold text-foreground mb-4">Nesta publicação</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {headings.length ? headings.map((heading) => <li key={heading.text}>{heading.text.replace(/^\d+\.\s*/, "")}</li>) : <li>Conteúdo Printbag</li>}
                  </ul>
                </aside>
              </div>
            </section>
          </>
        )}
      </article>
    </Layout>
  );
}
