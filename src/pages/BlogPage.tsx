import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import productsCollection from "@/assets/products-collection.jpg";
import productSacolas from "@/assets/product-sacolas.jpg";
import finishHotStamping from "@/assets/finish-hot-stamping.jpg";

const featuredPost = {
  title: "Como escolher a embalagem ideal para valorizar sua marca",
  excerpt:
    "Critérios essenciais para alinhar material, acabamento, formato e experiência de compra em projetos de embalagem personalizados.",
  date: "Janeiro 2026",
  readTime: "6 min de leitura",
  category: "Estratégia de Embalagem",
  image: productsCollection,
  path: "/blog/como-escolher-a-embalagem-ideal",
};

const categories = [
  "Todos",
  "Estratégia de Embalagem",
  "Sacolas",
  "Acabamentos",
];

const posts = [
  featuredPost,
  {
    title: "Sacolas personalizadas: o que considerar antes de produzir",
    excerpt:
      "Um guia prático sobre gramatura, alças, impressão e volume para marcas que buscam qualidade e consistência no ponto de venda.",
    date: "Dezembro 2025",
    readTime: "5 min de leitura",
    category: "Sacolas",
    image: productSacolas,
    path: "/blog",
  },
  {
    title: "Acabamentos premium que aumentam a percepção de valor",
    excerpt:
      "Hot stamping, relevo, laminação e verniz localizado aplicados com propósito para criar embalagens mais memoráveis.",
    date: "Novembro 2025",
    readTime: "4 min de leitura",
    category: "Acabamentos",
    image: finishHotStamping,
    path: "/blog",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const filteredPosts = useMemo(
    () =>
      selectedCategory === "Todos"
        ? posts
        : posts.filter((post) => post.category === selectedCategory),
    [selectedCategory],
  );

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
            <div className="flex items-center gap-3 w-full max-w-md border border-primary-foreground/60 bg-background/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <Search className="w-5 h-5 text-primary-foreground/80" />
              <span className="text-sm text-primary-foreground/70">Pesquise por temas, materiais ou acabamentos</span>
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow"
              >
                <Link to={post.path} className="block h-full">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
                    <h3 className="text-xl font-heading font-bold text-foreground mt-3 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Ler publicação <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}