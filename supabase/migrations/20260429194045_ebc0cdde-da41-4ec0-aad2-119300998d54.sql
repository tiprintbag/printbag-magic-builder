CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  author_name TEXT NOT NULL DEFAULT 'Printbag',
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active blog categories"
ON public.blog_categories
FOR SELECT
USING (is_active = true);

CREATE POLICY "Service role can manage blog categories"
ON public.blog_categories
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Service role can manage blog posts"
ON public.blog_posts
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_blog_categories_slug ON public.blog_categories(slug);
CREATE INDEX idx_blog_categories_active_order ON public.blog_categories(is_active, sort_order);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status_published_at ON public.blog_posts(status, published_at DESC);
CREATE INDEX idx_blog_posts_category_id ON public.blog_posts(category_id);
CREATE INDEX idx_blog_posts_featured ON public.blog_posts(is_featured) WHERE is_featured = true;
CREATE INDEX idx_blog_posts_keywords ON public.blog_posts USING GIN(keywords);

CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_updated_at();

INSERT INTO public.blog_categories (name, slug, description, sort_order) VALUES
('Estratégia de Embalagem', 'estrategia-de-embalagem', 'Conteúdos sobre posicionamento, experiência de compra e valor de marca aplicado a embalagens.', 1),
('Sacolas', 'sacolas', 'Guias sobre sacolas de papel, formatos, gramaturas, alças e produção personalizada.', 2),
('Acabamentos', 'acabamentos', 'Referências sobre hot stamping, relevo, laminação, verniz localizado e acabamentos premium.', 3);

INSERT INTO public.blog_posts (
  category_id,
  title,
  slug,
  excerpt,
  content,
  cover_image_alt,
  read_time_minutes,
  published_at,
  status,
  is_featured,
  seo_title,
  seo_description,
  keywords
)
SELECT
  c.id,
  'Como escolher a embalagem ideal para valorizar sua marca',
  'como-escolher-a-embalagem-ideal',
  'Critérios essenciais para alinhar material, acabamento, formato e experiência de compra em projetos de embalagem personalizados.',
  '[{"type":"paragraph","text":"A embalagem é uma extensão da marca. Ela aparece no momento da compra, circula com o consumidor e pode continuar comunicando valor depois que o produto sai da loja."},{"type":"heading","text":"1. Comece pelo papel da embalagem na jornada de compra"},{"type":"paragraph","text":"Antes de definir material ou acabamento, identifique onde a embalagem será vista, carregada e reutilizada."},{"type":"heading","text":"2. Escolha materiais compatíveis com uso, volume e percepção"},{"type":"paragraph","text":"Gramatura, formato, alça e estrutura precisam conversar com o peso do produto e com a experiência esperada pelo cliente."},{"type":"heading","text":"3. Use acabamentos com intenção estratégica"},{"type":"paragraph","text":"Hot stamping, relevo, verniz localizado e laminações devem reforçar atributos da marca, não apenas decorar."},{"type":"heading","text":"4. Planeje produção, prazo e recorrência"},{"type":"paragraph","text":"Projetos de embalagem funcionam melhor quando já nascem com previsão de demanda, calendário comercial e reposição."}]'::jsonb,
  'Coleção de embalagens personalizadas Printbag',
  6,
  '2026-01-01 09:00:00+00',
  'published',
  true,
  'Como escolher a embalagem ideal | Printbag',
  'Guia para alinhar material, acabamento, formato e experiência de compra em embalagens personalizadas.',
  ARRAY['embalagem personalizada', 'estratégia de embalagem', 'marca', 'acabamentos']
FROM public.blog_categories c
WHERE c.slug = 'estrategia-de-embalagem';

INSERT INTO public.blog_posts (
  category_id,
  title,
  slug,
  excerpt,
  content,
  cover_image_alt,
  read_time_minutes,
  published_at,
  status,
  seo_title,
  seo_description,
  keywords
)
SELECT
  c.id,
  'Sacolas personalizadas: o que considerar antes de produzir',
  'sacolas-personalizadas-o-que-considerar-antes-de-produzir',
  'Um guia prático sobre gramatura, alças, impressão e volume para marcas que buscam qualidade e consistência no ponto de venda.',
  '[]'::jsonb,
  'Sacolas de papel personalizadas Printbag',
  5,
  '2025-12-01 09:00:00+00',
  'published',
  'Sacolas personalizadas: guia para produção | Printbag',
  'Veja pontos importantes sobre gramatura, alças, impressão e volume antes de produzir sacolas personalizadas.',
  ARRAY['sacolas personalizadas', 'sacolas de papel', 'gramatura', 'impressão']
FROM public.blog_categories c
WHERE c.slug = 'sacolas';

INSERT INTO public.blog_posts (
  category_id,
  title,
  slug,
  excerpt,
  content,
  cover_image_alt,
  read_time_minutes,
  published_at,
  status,
  seo_title,
  seo_description,
  keywords
)
SELECT
  c.id,
  'Acabamentos premium que aumentam a percepção de valor',
  'acabamentos-premium-que-aumentam-a-percepcao-de-valor',
  'Hot stamping, relevo, laminação e verniz localizado aplicados com propósito para criar embalagens mais memoráveis.',
  '[]'::jsonb,
  'Acabamento hot stamping em embalagem Printbag',
  4,
  '2025-11-01 09:00:00+00',
  'published',
  'Acabamentos premium para embalagens | Printbag',
  'Entenda como hot stamping, relevo, laminação e verniz localizado aumentam a percepção de valor.',
  ARRAY['acabamentos premium', 'hot stamping', 'relevo', 'verniz localizado']
FROM public.blog_categories c
WHERE c.slug = 'acabamentos';