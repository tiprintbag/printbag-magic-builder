import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import productsCollection from "@/assets/products-collection.jpg";

const sections = [
  {
    title: "1. Comece pelo papel da embalagem na jornada de compra",
    body: "Antes de definir material ou acabamento, identifique onde a embalagem será vista, carregada e reutilizada. Uma sacola para varejo premium exige presença visual e resistência; uma embalagem para food service precisa equilibrar barreira, higiene e praticidade operacional.",
  },
  {
    title: "2. Escolha materiais compatíveis com uso, volume e percepção",
    body: "Gramatura, formato, alça e estrutura precisam conversar com o peso do produto e com a experiência esperada pelo cliente. A embalagem ideal protege, comunica e mantém consistência mesmo em grandes volumes de produção.",
  },
  {
    title: "3. Use acabamentos com intenção estratégica",
    body: "Hot stamping, relevo, verniz localizado e laminações devem reforçar atributos da marca, não apenas decorar. Quando aplicados com propósito, os acabamentos ajudam a destacar lançamentos, linhas especiais e experiências de presente.",
  },
  {
    title: "4. Planeje produção, prazo e recorrência",
    body: "Projetos de embalagem funcionam melhor quando já nascem com previsão de demanda, calendário comercial e reposição. Isso reduz urgências, melhora a padronização e facilita campanhas sazonais ao longo do ano.",
  },
];

export default function BlogArticlePage() {
  return (
    <Layout>
      <article className="pt-32 md:pt-40 bg-background">
        <header className="container mx-auto px-4 pb-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog"><ArrowLeft className="w-4 h-4" /> Voltar para o Blog</Link>
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Estratégia de Embalagem
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mt-4 mb-6">
              Como escolher a embalagem ideal para valorizar sua marca
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Um guia prático para alinhar material, acabamento, formato e experiência de compra em projetos de embalagem personalizados.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />Janeiro 2026</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />6 min de leitura</span>
            </div>
          </motion.div>
        </header>

        <div className="container mx-auto px-4">
          <img
            src={productsCollection}
            alt="Coleção de embalagens personalizadas Printbag"
            className="w-full max-h-[520px] object-cover rounded-xl shadow-medium"
          />
        </div>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div className="max-w-3xl space-y-10">
              <p className="text-lg leading-relaxed text-foreground">
                A embalagem é uma extensão da marca. Ela aparece no momento da compra, circula com o consumidor e pode continuar comunicando valor depois que o produto sai da loja. Por isso, a escolha ideal combina função, estética, operação e posicionamento.
              </p>

              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{section.body}</p>
                </section>
              ))}

              <section className="border-t border-border pt-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  Conclusão
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  A melhor embalagem é aquela que resolve o uso, valoriza o produto e traduz a marca com consistência. Ao envolver especialistas desde o início, o projeto ganha mais precisão técnica, impacto visual e previsibilidade de produção.
                </p>
                <Button variant="cta" asChild>
                  <Link to="/contato">Fale com um especialista</Link>
                </Button>
              </section>
            </div>

            <aside className="bg-muted border border-border rounded-xl p-6 sticky top-28">
              <h3 className="font-heading font-bold text-foreground mb-4">Nesta publicação</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Jornada de compra</li>
                <li>Materiais e formatos</li>
                <li>Acabamentos premium</li>
                <li>Planejamento de produção</li>
              </ul>
            </aside>
          </div>
        </section>
      </article>
    </Layout>
  );
}