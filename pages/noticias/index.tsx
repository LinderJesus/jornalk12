import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTags, FaCalendarAlt, FaArrowUp } from 'react-icons/fa';
import NewsCard from '../../components/NewsCard';

// Mock data for news articles
const mockArticles = [
  // Política
  {
    id: 1,
    title: 'Governo anuncia novo pacote de medidas econômicas',
    excerpt: 'Pacote inclui redução de impostos e incentivos para pequenas empresas afetadas pela crise econômica.',
    imageUrl: '/images/news-1.jpg',
    date: '10 maio, 2023',
    author: 'Carlos Silva',
    category: 'Política',
    slug: 'governo-anuncia-novo-pacote-medidas-economicas'
  },
  {
    id: 2,
    title: 'Congresso aprova reforma tributária em primeiro turno',
    excerpt: 'Proposta simplifica o sistema tributário e promete reduzir a carga de impostos para empresas e consumidores.',
    imageUrl: '/images/news-2.jpg',
    date: '8 maio, 2023',
    author: 'Ana Oliveira',
    category: 'Política',
    slug: 'congresso-aprova-reforma-tributaria'
  },
  // Economia
  {
    id: 3,
    title: 'Banco Central mantém taxa de juros em 10,5% ao ano',
    excerpt: 'Decisão foi unânime e reflete preocupação com pressões inflacionárias no segundo semestre.',
    imageUrl: '/images/news-3.jpg',
    date: '12 maio, 2023',
    author: 'Fernando Santos',
    category: 'Economia',
    slug: 'banco-central-mantem-taxa-juros'
  },
  {
    id: 4,
    title: 'Inflação recua pelo terceiro mês consecutivo, aponta IBGE',
    excerpt: 'Índice de preços ao consumidor ficou em 0,3% em abril, menor taxa para o mês desde 2018.',
    imageUrl: '/images/news-4.jpg',
    date: '10 maio, 2023',
    author: 'Camila Ferreira',
    category: 'Economia',
    slug: 'inflacao-recua-terceiro-mes'
  },
  // Tecnologia
  {
    id: 5,
    title: 'Nova geração de chips promete revolucionar inteligência artificial',
    excerpt: 'Processadores especializados podem aumentar em até 10 vezes a velocidade de modelos de IA.',
    imageUrl: '/images/news-5.jpg',
    date: '15 maio, 2023',
    author: 'Thiago Mendes',
    category: 'Tecnologia',
    slug: 'nova-geracao-chips-inteligencia-artificial'
  },
  {
    id: 6,
    title: 'Startup brasileira recebe investimento de R$ 200 milhões',
    excerpt: 'Empresa de tecnologia financeira atraiu atenção de fundos internacionais com solução inovadora.',
    imageUrl: '/images/news-6.jpg',
    date: '13 maio, 2023',
    author: 'Patrícia Lima',
    category: 'Tecnologia',
    slug: 'startup-brasileira-investimento'
  },
  // Esportes
  {
    id: 7,
    title: 'Brasil vence Argentina em clássico sul-americano',
    excerpt: 'Seleção brasileira superou rivais por 3x1 em partida válida pelas eliminatórias da Copa do Mundo.',
    imageUrl: '/images/news-7.jpg',
    date: '16 maio, 2023',
    author: 'José Silva',
    category: 'Esportes',
    slug: 'brasil-vence-argentina-classico'
  },
  {
    id: 8,
    title: 'Atleta brasileiro quebra recorde mundial nos 100m rasos',
    excerpt: 'Com tempo de 9,78 segundos, velocista se torna o mais rápido da história do país.',
    imageUrl: '/images/news-8.jpg',
    date: '14 maio, 2023',
    author: 'André Santos',
    category: 'Esportes',
    slug: 'atleta-brasileiro-recorde-mundial'
  },
  // Entretenimento
  {
    id: 9,
    title: 'Filme brasileiro é premiado em festival internacional',
    excerpt: 'Longa-metragem conquistou o prêmio de melhor direção no Festival de Cannes.',
    imageUrl: '/images/news-9.jpg',
    date: '18 maio, 2023',
    author: 'Luísa Campos',
    category: 'Entretenimento',
    slug: 'filme-brasileiro-premiado-festival'
  },
  {
    id: 10,
    title: 'Cantora anuncia turnê mundial com passagem pelo Brasil',
    excerpt: 'Artista internacional fará shows em São Paulo, Rio de Janeiro e Belo Horizonte em 2023.',
    imageUrl: '/images/news-10.jpg',
    date: '17 maio, 2023',
    author: 'Gabriel Costa',
    category: 'Entretenimento',
    slug: 'cantora-anuncia-turne-mundial'
  },
  // Mais artigos
  {
    id: 11,
    title: 'Pesquisa revela aumento no consumo de produtos orgânicos',
    excerpt: 'Estudo mostra que brasileiros estão mais preocupados com alimentação saudável e sustentabilidade.',
    imageUrl: '/images/news-11.jpg',
    date: '9 maio, 2023',
    author: 'Mariana Alves',
    category: 'Saúde',
    slug: 'aumento-consumo-produtos-organicos'
  },
  {
    id: 12,
    title: 'Nova vacina contra dengue mostra 95% de eficácia em testes',
    excerpt: 'Resultados promissores podem levar à aprovação do imunizante ainda este ano.',
    imageUrl: '/images/news-12.jpg',
    date: '7 maio, 2023',
    author: 'Rafael Souza',
    category: 'Saúde',
    slug: 'nova-vacina-dengue-eficacia'
  }
];

// Available categories for filter
const categories = [
  'Todas', 'Política', 'Economia', 'Tecnologia', 'Esportes', 'Entretenimento', 'Saúde'
];

// Animações
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const itemsPerPage = 6;

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Filter and sort articles
  useEffect(() => {
    let result = [...mockArticles];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'Todas') {
      result = result.filter(article => article.category === selectedCategory);
    }
    
    // Sort articles
    result = result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    
    setFilteredArticles(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  // Get current articles
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="bg-gray-50 dark:bg-dark-800 min-h-screen transition-colors duration-200">
      <NextSeo 
        title="Notícias | JornalK1"
        description="Acompanhe as últimas notícias sobre política, economia, tecnologia, esportes e mais no portal JornalK1."
        canonical="https://jornalk1.com.br/noticias"
        openGraph={{
          title: 'Notícias | JornalK1',
          description: 'Acompanhe as últimas notícias sobre política, economia, tecnologia, esportes e mais.',
          url: 'https://jornalk1.com.br/noticias',
        }}
      />
      
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Notícias</h1>
            <p className="text-lg text-white/90 max-w-3xl">
              Acompanhe as últimas notícias e fique por dentro de tudo que acontece no Brasil e no mundo.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-700 dark:text-gray-300">Notícias</span>
          </nav>
        </div>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 bg-white dark:bg-dark-700 rounded-xl shadow-md p-6 transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Buscar notícias..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-600 dark:text-white transition-colors"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaTags />
                  <span>Categoria:</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-500'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaFilter />
                  <span>Ordenar por:</span>
                </div>
                <select
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm dark:text-white transition-colors"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Mais recentes</option>
                  <option value="oldest">Mais antigos</option>
                  <option value="alphabetical">Alfabética</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles */}
        {currentArticles.length > 0 ? (
          <>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              <AnimatePresence>
                {currentArticles.map((article) => (
                  <motion.div 
                    key={article.id} 
                    variants={fadeInUp}
                    exit={{ opacity: 0, y: 20 }}
                    className="transition-all duration-300"
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button 
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Anterior
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-2 rounded-md transition-colors ${
                        currentPage === number
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Próxima
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md p-8 text-center transition-colors duration-200">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-600 dark:text-gray-400">Não encontramos notícias que correspondam à sua busca. Tente outros termos ou remova os filtros.</p>
            {selectedCategory !== 'Todas' && (
              <button 
                onClick={() => setSelectedCategory('Todas')} 
                className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 font-medium"
              >
                Limpar filtros
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-primary-600 dark:bg-primary-700 rounded-xl overflow-hidden"
        >
          <div className="p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 max-w-xl">
                <h3 className="text-2xl font-bold mb-2">Assine nossa newsletter</h3>
                <p className="text-white/80">
                  Receba as últimas notícias e atualizações diretamente na sua caixa de entrada.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 min-w-[250px]"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-white/90 transition-colors"
                  >
                    Inscrever-se
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors z-50"
              aria-label="Voltar ao topo"
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewsPage;
