import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { OptimizedImage } from '../../components';
import { FaCalendarAlt, FaUser, FaEye, FaComment, FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';

// Dados de exemplo para categorias relacionadas ao surf
const categorias = [
  {
    id: 1, 
    nome: 'Competições', 
    slug: 'competicoes', 
    descricao: 'Acompanhe as disputas mundiais de surf', 
    imagem: '/images/news-1.svg',
    cor: 'bg-blue-600'
  },
  { 
    id: 2, 
    nome: 'Equipamentos', 
    slug: 'equipamentos', 
    descricao: 'Pranchas, wetsuits e acessórios para surfistas', 
    imagem: '/images/news-2.svg',
    cor: 'bg-teal-600'
  },
  { 
    id: 3, 
    nome: 'Destinos', 
    slug: 'destinos', 
    descricao: 'Melhores praias para surf pelo mundo', 
    imagem: '/images/news-3.svg',
    cor: 'bg-purple-600'
  },
  { 
    id: 4, 
    nome: 'Técnicas', 
    slug: 'tecnicas', 
    descricao: 'Aprenda novas manobras e aprimore seu surf', 
    imagem: '/images/news-4.svg',
    cor: 'bg-green-600'
  },
  { 
    id: 5, 
    nome: 'Sustentabilidade', 
    slug: 'sustentabilidade', 
    descricao: 'Proteção dos oceanos e praias', 
    imagem: '/images/news-5.svg',
    cor: 'bg-yellow-600'
  },
  { 
    id: 6, 
    nome: 'Cultura', 
    slug: 'cultura', 
    descricao: 'A história e o estilo de vida do surf', 
    imagem: '/images/news-6.svg',
    cor: 'bg-orange-600'
  }
];

// Dados de exemplo para notícias de surf
const noticias = [
  {
    id: 1,
    titulo: 'Gabriel Medina conquista etapa histórica no Taiti com tubo perfeito',
    slug: 'gabriel-medina-conquista-etapa-taiti',
    resumo: 'Brasileiro impressionou os juízes com manobras de alto grau de dificuldade e garantiu sua posição no ranking mundial.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-1.svg',
    categoriaId: 1, // Competições
    data: '2025-05-10',
    visualizacoes: 3245,
    comentarios: 42,
    autor: 'Ricardo Almeida',
    destaque: true
  },
  {
    id: 2,
    titulo: 'Nova tecnologia de pranchas promete revolucionar o big wave surfing',
    slug: 'nova-tecnologia-pranchas-big-wave',
    resumo: 'Material desenvolvido por engenheiros australianos oferece maior estabilidade e controle em ondas gigantes.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-2.svg',
    categoriaId: 2, // Equipamentos
    data: '2025-05-09',
    visualizacoes: 2187,
    comentarios: 28,
    autor: 'Ana Oliveira',
    destaque: false
  },
  {
    id: 3,
    titulo: 'Circuito mundial anuncia inclusão de nova etapa no Brasil para 2026',
    slug: 'circuito-mundial-nova-etapa-brasil',
    resumo: 'Fernando de Noronha será palco de uma das etapas mais aguardadas do próximo calendário da WSL.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-3.svg',
    categoriaId: 1, // Competições
    data: '2025-05-08',
    visualizacoes: 1876,
    comentarios: 31,
    autor: 'Carlos Silva',
    destaque: false
  },
  {
    id: 4,
    titulo: 'Como escolher a melhor prancha para iniciantes',
    slug: 'como-escolher-prancha-iniciantes',
    resumo: 'Guia completo para quem está começando no surf e precisa de orientação na escolha do equipamento ideal.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-4.svg',
    categoriaId: 2, // Equipamentos
    data: '2025-05-07',
    visualizacoes: 2543,
    comentarios: 37,
    autor: 'Mariana Santos',
    destaque: false
  },
  {
    id: 5,
    titulo: 'As 10 praias mais desafiadoras para surfistas experientes',
    slug: 'praias-desafiadoras-surfistas-experientes',
    resumo: 'Conheça os destinos que oferecem as ondas mais radicais do planeta e os desafios de cada local.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-5.svg',
    categoriaId: 3, // Destinos
    data: '2025-05-05',
    visualizacoes: 1654,
    comentarios: 19,
    autor: 'Juliana Costa',
    destaque: false
  },
  {
    id: 6,
    titulo: 'Projetos de sustentabilidade limpam 15 praias brasileiras',
    slug: 'projetos-sustentabilidade-praias-brasileiras',
    resumo: 'Iniciativas voluntárias removeram toneladas de lixo do litoral em 2025, melhorando condições para surfistas e vida marinha.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-6.svg',
    categoriaId: 5, // Sustentabilidade
    data: '2025-05-04',
    visualizacoes: 1432,
    comentarios: 25,
    autor: 'Paulo Oliveira',
    destaque: false
  },
  {
    id: 7,
    titulo: 'Técnicas avançadas para melhorar seu desempenho no surf',
    slug: 'tecnicas-avancadas-melhorar-desempenho',
    resumo: 'Aprenda como aprimorar suas manobras e se tornar um surfista melhor com estas dicas de profissionais.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-4.svg',
    categoriaId: 4, // Técnicas
    data: '2025-05-03',
    visualizacoes: 1876,
    comentarios: 29,
    autor: 'Ana Oliveira',
    destaque: false
  }
];

const formatarData = (dataString: string) => {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

interface CategoriaProps {
  categoria: typeof categorias[0];
  noticias: typeof noticias;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categorias.map(categoria => ({
    params: { slug: categoria.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const categoria = categorias.find(c => c.slug === slug);

  if (!categoria) {
    return {
      notFound: true
    };
  }

  // Filtrar notícias por categoria
  const noticiasDaCategoria = noticias.filter(noticia => noticia.categoriaId === categoria.id);

  return {
    props: {
      categoria,
      noticias: noticiasDaCategoria
    }
  };
};

const CategoriaDetalhePage: React.FC<CategoriaProps> = ({ categoria, noticias }: CategoriaProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrar notícias com base na pesquisa
  const noticiasFiltradas = noticias.filter(noticia => 
    noticia.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    noticia.resumo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Separar notícia em destaque (a primeira) das demais
  const noticiaDestaque = noticiasFiltradas[0];
  const noticiasRegulares = noticiasFiltradas.slice(1);
  
  // Se não houver notícias após filtragem
  const semResultados = noticiasFiltradas.length === 0;

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Layout>
      <NextSeo 
        title={`${categoria.nome} | JornalK1 Surf`}
        description={categoria.descricao}
        openGraph={{
          title: `${categoria.nome} | JornalK1 Surf`,
          description: categoria.descricao,
          images: [
            {
              url: `https://jornalk1surf.com.br${categoria.imagem}`,
              width: 1200,
              height: 630
            }
          ]
        }}
      />
      <motion.div 
        className="container mx-auto p-4 pt-6 md:p-6 lg:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        variants={containerVariants}
      >
        <div className="flex flex-wrap justify-between mb-12">
          <div className="w-full md:w-1/2 xl:w-1/3 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              {categoria.nome}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              {categoria.descricao}
            </p>
          </div>
          {/* Campo de busca */}
          <div className="w-full md:w-auto mt-6 md:mt-0">
            <div className="relative max-w-md mx-auto md:mx-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar nesta categoria..."
                className="pl-10 pr-4 py-3 w-full md:w-80 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors"
              />
              <button 
                className="absolute inset-y-0 right-0 px-4 text-blue-600 hover:text-blue-800 transition-colors"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
              >
                {searchQuery && <FaTimes />}
              </button>
            </div>
          </div>
        </div>
        {semResultados ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Nenhuma notícia encontrada</h2>
            <p className="text-gray-600 dark:text-gray-400">Tente outro termo de busca ou volte mais tarde para novas notícias.</p>
          </div>
        ) : (
          <>
            {/* Notícia em destaque */}
            {noticiaDestaque && (
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Em Destaque</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={noticiaDestaque.imagem}
                      alt={noticiaDestaque.titulo}
                      width={600}
                      height={400}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <FaCalendarAlt className="mr-1" />
                      <span>{formatarData(noticiaDestaque.data)}</span>
                      <span className="mx-2">•</span>
                      <FaUser className="mr-1" />
                      <span>{noticiaDestaque.autor}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{noticiaDestaque.titulo}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{noticiaDestaque.resumo}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaEye className="mr-1" />
                      <span>{noticiaDestaque.visualizacoes.toLocaleString()}</span>
                      <span className="mx-2">•</span>
                      <FaComment className="mr-1" />
                      <span>{noticiaDestaque.comentarios}</span>
                    </div>
                    <Link 
                      href={`/noticias/${noticiaDestaque.slug}`}
                      className="inline-block mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      Ler mais <FaArrowRight className="inline ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Lista de notícias regulares */}
            {noticiasRegulares.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Últimas Notícias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {noticiasRegulares.map((noticia) => (
                    <motion.article 
                      key={noticia.id}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      variants={itemVariants}
                    >
                      <div className="relative h-48">
                        <OptimizedImage
                          src={noticia.imagem}
                          alt={noticia.titulo}
                          width={400}
                          height={250}
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatarData(noticia.data)}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{noticia.titulo}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{noticia.resumo}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <FaEye className="mr-1" />
                            <span>{noticia.visualizacoes.toLocaleString()}</span>
                          </div>
                          <Link 
                            href={`/noticias/${noticia.slug}`}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center"
                          >
                            Ler mais <FaArrowRight className="ml-1 text-xs" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </Layout>
  );
};
export default CategoriaDetalhePage;
