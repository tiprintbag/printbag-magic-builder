import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import productsCollection from "@/assets/products-collection.jpg";
import productSacolas from "@/assets/product-sacolas.jpg";
import finishHotStamping from "@/assets/finish-hot-stamping.jpg";

const fallbackCategories = ["Estratégia de Embalagem", "Sacolas", "Acabamentos"];

const fallbackImages: Record<string, string> = {
  "como-escolher-a-embalagem-ideal": productsCollection,
  "sacolas-personalizadas-o-que-considerar-antes-de-produzir": productSacolas,
  "acabamentos-premium-que-aumentam-a-percepcao-de-valor": finishHotStamping,
};

type BlogCategory = {
  name: string;
  slug: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  read_time_minutes: number;
  published_at: string | null;
  is_featured: boolean;
  keywords: string[] | null;
  blog_categories: BlogCategory | null;
};

type BlogQueryBuilder = {
  select: (columns: string) => BlogQueryBuilder;
  eq: (column: string, value: string | boolean) => BlogQueryBuilder;
  lte: (column: string, value: string) => BlogQueryBuilder;
  order: (column: string, options?: { ascending: boolean }) => Promise<{ data: unknown[] | null; error: Error | null }> & BlogQueryBuilder;
};

type BlogSupabaseClient = {
  from: (table: "blog_posts" | "blog_categories") => BlogQueryBuilder;
};

const blogClient = supabase as unknown as BlogSupabaseClient;

const formatDate = (date: string | null) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  })
    .format(new Date(date))
    .replace(/^./, (letter) => letter.toUpperCase());
};

const fetchBlogPosts = async () => {
  const { data, error } = await blogClient
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image_url,
      cover_image_alt,
      read_time_minutes,
      published_at,
      is_featured,
      keywords,
      blog_categories(name, slug)
    `)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as BlogPost[];
};

const fetchBlogCategories = async () => {
  const { data, error } = await blogClient
    .from("blog_categories")
    .select("name, slug")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as BlogCategory[];
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const { data: databaseCategories = [] } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: fetchBlogCategories,
  });

  const categories = useMemo(
    () => ["Todos", ...(databaseCategories.length ? databaseCategories.map((category) => category.name) : fallbackCategories)],
    [databaseCategories],
  );

  const filteredPosts = useMemo(() => {
    const normalizedSearch = activeSearch.trim().toLowerCase();

    return posts.filter((post) => {
      const categoryName = post.blog_categories?.name ?? "";
      const matchesCategory = selectedCategory === "Todos" || categoryName === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        [
          post.title,
          post.excerpt,
          categoryName,
          formatDate(post.published_at),
          ...(post.keywords ?? []),
        ].some((content) => content.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });
  }, [activeSearch, posts, selectedCategory]);

  const handleSearch = () => {
    setActiveSearch(searchTerm);
  };

  return (
    <Layout>
      <section className="relative min-h-[560px] pt-32 pb-16 md:pt-40 md:pb-20 bg-foreground overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full scale-125 opacity-45 pointer-events-none"
          src="https://www.youtube.com/embed/yb2-u6E3wqU?autoplay=1&mute=1&controls=0&loop=1&playlist=yb2-u6E3wqU&playsinline=1&modestbranding=1&start=1"
          title="Vídeo institucional Printbag"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl pt-10 md:pt-16"
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Blog Printbag
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mt-5 mb-6">
              Conteúdos sobre embalagem, marca e mercado
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mb-8">
              Tendências, boas práticas e referências para marcas que querem transformar embalagens personalizadas em experiência, presença e valor no ponto de venda.
            </p>
            <form
              className="flex items-center gap-3 w-full max-w-md border border-primary-foreground/60 bg-background/10 backdrop-blur-sm rounded-lg px-4 py-3"
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
              }}
            >
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Pesquise por temas, materiais ou acabamentos"
                className="min-w-0 flex-1 bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/70 outline-none"
                aria-label="Pesquisar publicações do blog"
              />
              <button type="submit" aria-label="Pesquisar" className="shrink-0 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`px-5 py-3 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">Histórico</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">
                Tudo que já foi publicado
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md md:text-right">
              Todo mês, um novo conteúdo para apoiar decisões de embalagem, acabamento e posicionamento de marca.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-96 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => {
                const categoryName = post.blog_categories?.name ?? "Conteúdo";
                const image = post.cover_image_url || fallbackImages[post.slug] || productsCollection;

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow"
                  >
                    <Link to={`/blog/${post.slug}`} className="block h-full">
                      <img src={image} alt={post.cover_image_alt || post.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{categoryName}</span>
                        <h3 className="text-xl font-heading font-bold text-foreground mt-3 mb-3">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">{post.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-5">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.published_at)}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.read_time_minutes} min de leitura</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                          Ler publicação <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-12 border border-border rounded-xl bg-card">
              <p className="text-foreground font-medium">Nenhum conteúdo encontrado.</p>
              <p className="text-sm text-muted-foreground mt-2">Tente pesquisar por outro tema, material ou acabamento.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
