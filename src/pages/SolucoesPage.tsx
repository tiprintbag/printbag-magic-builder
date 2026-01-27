import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Package, 
  ShoppingBag, 
  Printer,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Box,
  FileText,
  Tag,
  Scissors,
  ChevronRight,
  Shirt,
  Footprints,
  Gem,
  Cookie,
  Utensils,
  Pill,
  Store,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import productsCollection from "@/assets/products-collection.jpg";

// Segments definition
const segments = [
  { id: "vestuario", label: "Vestuário", icon: Shirt },
  { id: "calcados", label: "Calçados", icon: Footprints },
  { id: "cosmeticos", label: "Cosméticos", icon: Sparkles },
  { id: "joias-acessorios", label: "Jóias / Acessórios", icon: Gem },
  { id: "alimentos", label: "Alimentos", icon: Cookie },
  { id: "food-service", label: "Food Service", icon: Utensils },
  { id: "farmacias", label: "Farmácias", icon: Pill },
  { id: "supermercados", label: "Supermercados", icon: Store },
  { id: "outros", label: "Outros", icon: MoreHorizontal }
];

// Products by segment
const segmentProducts: Record<string, { id: string; label: string; icon: React.ComponentType<any> }[]> = {
  vestuario: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "envelopes", label: "Envelopes", icon: FileText },
    { id: "papel-seda", label: "Papel de Seda", icon: Scissors },
    { id: "etiquetas", label: "Etiquetas", icon: Tag },
    { id: "tags", label: "Tags", icon: Tag }
  ],
  calcados: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "papel-seda", label: "Papel de Seda", icon: Scissors },
    { id: "etiquetas", label: "Etiquetas", icon: Tag },
    { id: "tags", label: "Tags", icon: Tag }
  ],
  cosmeticos: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "envelopes", label: "Envelopes", icon: FileText },
    { id: "papel-seda", label: "Papel de Seda", icon: Scissors },
    { id: "etiquetas", label: "Etiquetas", icon: Tag },
    { id: "tags", label: "Tags", icon: Tag }
  ],
  "joias-acessorios": [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "envelopes", label: "Envelopes", icon: FileText }
  ],
  alimentos: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "sacos", label: "Sacos", icon: Package },
    { id: "papel-barreira", label: "Papel Barreira", icon: Layers },
    { id: "etiquetas", label: "Etiquetas", icon: Tag }
  ],
  "food-service": [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "sacos", label: "Sacos", icon: Package },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "guardanapos", label: "Guardanapos", icon: Scissors },
    { id: "papel-barreira", label: "Papel Barreira", icon: Layers }
  ],
  farmacias: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "sacos", label: "Sacos", icon: Package }
  ],
  supermercados: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "sacos", label: "Sacos", icon: Package },
    { id: "caixas", label: "Caixas", icon: Box }
  ],
  outros: [
    { id: "sacolas", label: "Sacolas", icon: ShoppingBag },
    { id: "sacos", label: "Sacos", icon: Package },
    { id: "caixas", label: "Caixas", icon: Box },
    { id: "envelopes", label: "Envelopes", icon: FileText },
    { id: "etiquetas", label: "Etiquetas", icon: Tag },
    { id: "papel-seda", label: "Papel de Seda", icon: Scissors },
    { id: "papel-barreira", label: "Papel Barreira", icon: Layers },
    { id: "tags", label: "Tags", icon: Tag }
  ]
};

const finishes = [
  {
    icon: Sparkles,
    title: "Hot Stamping",
    description: "Acabamento metalizado em ouro, prata ou cores especiais"
  },
  {
    icon: Layers,
    title: "Laminação",
    description: "Proteção extra com acabamento fosco ou brilhante"
  },
  {
    icon: Printer,
    title: "Impressão Offset",
    description: "Alta definição com até 6 cores e tons especiais"
  },
  {
    icon: Box,
    title: "Relevo Seco",
    description: "Textura sofisticada que destaca elementos da marca"
  }
];

const advantages = [
  "Mínimo de 500 unidades por pedido",
  "Prova de cor digital ou física",
  "Equipe de design para auxiliar no desenvolvimento",
  "Entrega em todo o Brasil",
  "Sistema JIT para reposições rápidas",
  "Certificação FSC disponível"
];

export default function SolucoesPage() {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegment(segmentId);
    setSelectedProduct(null);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleReset = () => {
    setSelectedSegment(null);
    setSelectedProduct(null);
  };

  const handleBackToSegment = () => {
    setSelectedProduct(null);
  };

  const handleSolicitarOrcamento = () => {
    const segmentLabel = segments.find(s => s.id === selectedSegment)?.label || "";
    const productLabel = currentProducts.find(p => p.id === selectedProduct)?.label || "";
    
    const mensagem = `Segmento: ${segmentLabel}\nProduto: ${productLabel}`;
    
    navigate(`/contato?assunto=Fazer um orçamento&mensagem=${encodeURIComponent(mensagem)}`);
  };

  const currentProducts = selectedSegment ? segmentProducts[selectedSegment] || [] : [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-medium uppercase tracking-wider text-sm"
              >
                Nossas Soluções
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mt-4 mb-6"
              >
                Embalagens que{" "}
                <span className="text-gradient-primary">Encantam</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-8"
              >
                Do conceito à entrega, oferecemos uma linha completa de soluções 
                em embalagens personalizadas para transformar a experiência do seu cliente.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="cta" size="xl" asChild>
                  <Link to="/contato?assunto=Fazer um orçamento">
                    Solicite um Orçamento
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={productsCollection} 
                  alt="Coleção de sacolas e embalagens Printbag" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Selection Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Monte seu Orçamento
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-4 mb-6">
              Qual Produto Você Procura?
            </h2>
            <p className="text-lg text-muted-foreground">
              Selecione o segmento e o tipo de produto desejado.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Selection Area */}
            <div className="space-y-8">
              {/* Breadcrumb / Reset */}
              <AnimatePresence>
                {(selectedSegment || selectedProduct) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm flex-wrap"
                  >
                    <button 
                      onClick={handleReset}
                      className="text-primary hover:underline font-medium"
                    >
                      Segmentos
                    </button>
                    {selectedSegment && (
                      <>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <button 
                          onClick={handleBackToSegment}
                          className={`${selectedProduct ? 'text-primary hover:underline' : 'text-foreground'} font-medium`}
                        >
                          {segments.find(s => s.id === selectedSegment)?.label}
                        </button>
                      </>
                    )}
                    {selectedProduct && (
                      <>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground font-medium">
                          {currentProducts.find(p => p.id === selectedProduct)?.label}
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 1: Segment Selection */}
              <AnimatePresence mode="wait">
                {!selectedSegment && (
                  <motion.div
                    key="segments"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      Selecione o segmento:
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {segments.map((segment, index) => (
                        <motion.button
                          key={segment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSegmentSelect(segment.id)}
                          className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <segment.icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="font-medium text-foreground text-center text-sm">
                            {segment.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Product Selection */}
                {selectedSegment && !selectedProduct && currentProducts.length > 0 && (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      Selecione o produto:
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {currentProducts.map((product, index) => (
                        <motion.button
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleProductSelect(product.id)}
                          className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <product.icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="font-medium text-foreground text-center text-sm">
                            {product.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {selectedSegment && selectedProduct && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                        Resumo da sua seleção:
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span className="text-foreground">
                            <strong>Segmento:</strong> {segments.find(s => s.id === selectedSegment)?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span className="text-foreground">
                            <strong>Produto:</strong> {currentProducts.find(p => p.id === selectedProduct)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="cta" 
                      size="lg" 
                      className="w-full"
                      onClick={handleSolicitarOrcamento}
                    >
                      Solicitar Orçamento
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Image Placeholder Area */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted rounded-2xl p-8 md:p-12 aspect-square flex items-center justify-center sticky top-32"
            >
              <AnimatePresence mode="wait">
                {selectedSegment ? (
                  <motion.div
                    key={selectedSegment + (selectedProduct || "")}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    {(() => {
                      const SegmentIcon = segments.find(s => s.id === selectedSegment)?.icon || Package;
                      const ProductIcon = selectedProduct 
                        ? currentProducts.find(p => p.id === selectedProduct)?.icon || Package
                        : null;
                      return (
                        <div className="space-y-4">
                          <SegmentIcon className="w-24 h-24 text-primary/30 mx-auto" />
                          {ProductIcon && (
                            <ProductIcon className="w-16 h-16 text-primary/50 mx-auto" />
                          )}
                        </div>
                      );
                    })()}
                    <p className="text-muted-foreground mt-4">
                      {selectedProduct ? "Produto selecionado" : "Selecione um produto"}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    <Package className="w-32 h-32 text-primary/20 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Selecione um segmento para começar
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Finishes Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Acabamentos Premium
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-4 mb-6">
              Diferenciais que Encantam
            </h2>
            <p className="text-lg text-muted-foreground">
              Oferecemos diversos tipos de acabamentos para tornar sua embalagem única e memorável.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finishes.map((finish, index) => (
              <motion.div
                key={finish.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <finish.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {finish.title}
                </h3>
                <p className="text-muted-foreground">
                  {finish.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium uppercase tracking-wider text-sm">
                Por que Printbag?
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-4 mb-8">
                Vantagens de Trabalhar Conosco
              </h2>
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={advantage}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground"
            >
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                Pronto para Transformar sua Marca?
              </h3>
              <p className="text-primary-foreground/80 mb-8">
                Nossa equipe está pronta para desenvolver a embalagem perfeita para o seu negócio. 
                Entre em contato e receba um orçamento personalizado.
              </p>
              <Button variant="secondary" size="xl" asChild className="w-full md:w-auto">
                <Link to="/contato?assunto=Fazer um orçamento">
                  Fale com um Especialista
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
