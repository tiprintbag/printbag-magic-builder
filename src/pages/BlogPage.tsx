import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
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
};

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
  },
  {
    title: "Acabamentos premium que aumentam a percepção de valor",
    excerpt:
      "Hot stamping, relevo, laminação e verniz localizado aplicados com propósito para criar embalagens mais memoráveis.",
    date: "Novembro 2025",
    readTime: "4 min de leitura",
    category: "Acabamentos",
    image: finishHotStamping,
  },
];

export default function BlogPage() {
  return (
    <Layout>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <span className="text-primary font-medium uppercase tracking-wider text-sm">
                Blog Printbag
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mt-4 mb-6">
                Conteúdos sobre embalagem, marca e mercado
              </h1>
              <p className="text-lg text-muted-foreground">
                Publicações mensais com tendências, boas práticas e referências para marcas que buscam embalagens personalizadas com mais estratégia.
              </p>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-medium"
            >
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-sm font-medium text-primary">Destaque do mês</span>
                <h2 className="text-2xl font-heading font-bold text-foreground mt-2 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-5">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{featuredPost.readTime}</span>
                </div>
                <Button variant="cta" asChild>
                  <Link to="/contato">Fale com um especialista <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">Histórico</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">
                Tudo que já foi publicado
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 md:min-w-80">
              <Search className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Novas publicações todo mês</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow"
              >
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
                  <h3 className="text-xl font-heading font-bold text-foreground mt-3 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}