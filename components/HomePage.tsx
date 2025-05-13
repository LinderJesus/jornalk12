import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import CategoriasSurf from './CategoriasSurf';
import PrevisaoOndas from './PrevisaoOndas';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaSearch, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Dados corrigidos para notícias de surf
const noticiasDestaque = [
  {
    id: 1,
    titulo: 'Gabriel Medina conquista etapa histórica no Taiti com tubo perfeito',
    slug: 'gabriel-medina-conquista-etapa-taiti',
    resumo: 'Brasileiro impressionou os juízes com manobras de alto grau de dificuldade e garantiu sua posição no ranking mundial.',
    imagem: '/images/news-1.jpg',
    categoria: 'Competições',
    local: 'Teahupoo, Taiti',
    data: '2025-05-10',
    autor: 'Ricardo Almeida',
    visualizacoes: 3245
  },
  {
    id: 2,
    titulo: 'Nova tecnologia de pranchas promete revolucionar o big wave surfing',
    slug: 'nova-tecnologia-pranchas-big-wave',
    resumo: 'Material desenvolvido por engenheiros australianos oferece maior estabilidade e controle em ondas gigantes.',
    imagem: '/images/news-2.jpg',
    categoria: 'Equipamentos',
    local: 'Gold Coast, Austrália',
    data: '2025-05-09',
    autor: 'Ana Oliveira',
    visualizacoes: 2187
  },
  {
    id: 3,
    titulo: 'Circuito mundial anuncia inclusão de nova etapa no Brasil para 2026',
    slug: 'circuito-mundial-nova-etapa-brasil',
    resumo: 'Fernando de Noronha será palco de uma das etapas mais aguardadas do próximo calendário da WSL.',
    imagem: '/images/news-3.jpg',
    categoria: 'Competições',
    local: 'Fernando de Noronha, Brasil',
    data: '2025-05-08',
    autor: 'Carlos Silva',
    visualizacoes: 1876
  }
];

// Notícias recentes
const noticiasRecentes = [
  {
    id: 4,
    titulo: 'Como escolher a melhor prancha para iniciantes',
    slug: 'como-escolher-prancha-iniciantes',
    resumo: 'Guia completo para quem está começando no surf e precisa de orientação.',
    imagem: '/images/news-4.jpg',
    categoria: 'Equipamentos',
    data: '2025-05-07'
  },
  {
    id: 5,
    titulo: 'As 10 praias mais desafiadoras para surfistas experientes',
    slug: 'praias-desafiadoras-surfistas-experientes',
    resumo: 'Conheça os destinos que oferecem as ondas mais radicais do planeta.',
    imagem: '/images/news-5.jpg',
    categoria: 'Destinos',
    data: '2025-05-06'
  },
  {
    id: 6,
    titulo: 'Projetos de sustentabilidade limpam 15 praias brasileiras',
    slug: 'projetos-sustentabilidade-praias-brasileiras',
    resumo: 'Iniciativas voluntárias removeram toneladas de lixo do litoral em 2025.',
    imagem: '/images/news-6.jpg',
    categoria: 'Sustentabilidade',
    data: '2025-05-05'
  },
  {
    id: 7,
    titulo: 'Técnicas avançadas para melhorar seu desempenho no surf',
    slug: 'tecnicas-avancadas-melhorar-desempenho',
    resumo: 'Aprenda como aprimorar suas manobras e se tornar um surfista melhor.',
    imagem: '/images/news-7.jpg',
    categoria: 'Técnicas',
    data: '2025-05-04'
  }
];

// Função para formatar data
const formatarData = (data: string) => {
  const dataObj = new Date(data);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(dataObj);
};

const HomePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Alternar entre as notícias em destaque automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % noticiasDestaque.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Função para alternar a exibição da barra de pesquisa
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };
  
  // Função para lidar com a pesquisa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Aqui implementaríamos a lógica de pesquisa real
      console.log('Pesquisando por:', searchQuery);
      // Redirecionar para página de resultados
      window.location.href = `/pesquisa?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <>
      {/* Banner Hero Visual */}
      <section className="relative bg-gradient-to-b from-blue-900/90 to-dark-bg-primary overflow-hidden">
        <div className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Bem-vindo ao <span className="text-blue-300">JornalK1 Surf</span>
            </h1>
            <p className="text-lg text-blue-100/80 mb-6 max-w-lg">
              O seu portal de notícias, dicas e previsões sobre o mundo do surf. Fique por dentro das melhores ondas, campeonatos e novidades do esporte!
            </p>
            
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative mt-4 w-full max-w-md"
                  onSubmit={handleSearch}
                >
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar notícias..."
                    className="w-full py-2 pl-4 pr-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
                    <FaSearch />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            
            <button 
              onClick={toggleSearch}
              className="mt-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Buscar"
            >
              <FaSearch className="mr-2" /> Buscar no site
            </button>
          </div>
        </div>
        
        {/* Ondas decorativas */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-10">
          <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-dark-bg-primary"
              opacity="0.8"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-dark-bg-primary"
              opacity="0.5"
            ></path>
          </svg>
        </div>
        
        {/* Conteúdo do Hero */}
        <div className="container mx-auto px-4 pt-32 pb-40 md:pt-40 md:pb-52 relative z-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="relative mb-6">
                <div className="absolute -top-6 -left-6 h-20 w-20 border-t-4 border-l-4 border-blue-accent opacity-50"></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  O seu portal de <span className="text-blue-accent">surf</span> completo
                </h1>
                <div className="absolute -bottom-6 -right-6 h-20 w-20 border-b-4 border-r-4 border-blue-accent opacity-50"></div>
              </div>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Acompanhe as últimas notícias, previsões de ondas, competições e dicas para surfistas de todos os níveis
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/noticias" 
                  className="px-6 py-3 bg-blue-accent text-white font-medium rounded-lg hover:bg-blue-accent-hover transition-colors shadow-lg hover-float"
                >
                  Últimas Notícias
                </Link>
                <Link 
                  href="/previsao" 
                  className="px-6 py-3 bg-transparent border border-blue-accent text-blue-accent font-medium rounded-lg hover:bg-blue-accent hover:text-white transition-colors hover-float"
                >
                  Previsão de Ondas
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-12 md:mt-0 relative">
              <div className="relative w-full h-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-blue-accent/20 blur-3xl rounded-full"></div>
                <Image 
                  src="/images/hero-surf.png" 
                  alt="Surfista em onda" 
                  width={600}
                  height={400}
                  className="relative z-10 w-full h-auto object-cover drop-shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
          
          {/* Stats rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 bg-dark-card-bg/30 backdrop-blur-lg p-5 rounded-xl border border-white/10">
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-blue-accent mb-1">15+</div>
              <div className="text-sm text-blue-100">Destinos de Surf</div>
            </div>
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-blue-accent mb-1">24/7</div>
              <div className="text-sm text-blue-100">Previsão Atualizada</div>
            </div>
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-blue-accent mb-1">100+</div>
              <div className="text-sm text-blue-100">Dicas Profissionais</div>
            </div>
            <div className="text-center p-3">
              <div className="text-3xl font-bold text-blue-accent mb-1">5K+</div>
              <div className="text-sm text-blue-100">Surfistas Conectados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <CategoriasSurf />

      {/* Notícias em Destaque */}
      <section className="py-16 bg-dark-bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Destaques do Surf</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">As notícias mais importantes do mundo do surf</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Notícia principal em destaque */}
            <motion.div 
              className="lg:col-span-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[16/9] shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={noticiasDestaque[activeIndex].imagem} 
                      alt={noticiasDestaque[activeIndex].titulo}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradiente de sobreposição */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Conteúdo da notícia */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                          {noticiasDestaque[activeIndex].categoria}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {noticiasDestaque[activeIndex].titulo}
                      </h2>
                      <p className="text-gray-200 mb-4 max-w-2xl">
                        {noticiasDestaque[activeIndex].resumo}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{noticiasDestaque[activeIndex].local}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatarData(noticiasDestaque[activeIndex].data)}</span>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-1" />
                          <span>{noticiasDestaque[activeIndex].autor}</span>
                        </div>
                      </div>
                      <Link 
                        href={`/noticias/${noticiasDestaque[activeIndex].slug}`}
                        className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
                      >
                        Ler matéria completa <FaArrowRight className="ml-2" />
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Controles de navegação */}
                <div className="absolute bottom-6 right-6 flex space-x-2">
                  {noticiasDestaque.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-blue-500' : 'bg-white/50 hover:bg-white/80'}`}
                      aria-label={`Ver notícia ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Notícias secundárias */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              {noticiasDestaque.filter((_, index) => index !== activeIndex).map((noticia, index) => (
                <motion.article 
                  key={noticia.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  className="bg-dark-card-bg rounded-lg overflow-hidden shadow-md border border-gray-800/40 flex flex-col hover:shadow-lg transition-all duration-300 hover:border-blue-800/60 group"
                >
                  <div className="flex flex-col md:flex-row lg:flex-col">
                    <div className="relative overflow-hidden aspect-video md:w-1/3 lg:w-full">
                      <Image 
                        src={noticia.imagem} 
                        alt={noticia.titulo}
                        width={400}
                        height={250}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-blue-800/50 text-blue-200 text-xs font-medium rounded-md">
                          {noticia.categoria}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col md:w-2/3 lg:w-full">
                      <Link href={`/noticias/${noticia.slug}`}>
                        <h3 className="text-base font-bold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                          {noticia.titulo}
                        </h3>
                      </Link>
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatarData(noticia.data)}</span>
                        </div>
                        <Link 
                          href={`/noticias/${noticia.slug}`}
                          className="text-blue-400 hover:text-blue-300 flex items-center text-xs font-medium"
                        >
                          Ler <FaChevronRight className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/noticias"
              className="inline-flex items-center px-6 py-3 bg-blue-accent hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
            >
              Ver todas as notícias <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Previsão de Ondas */}
      <PrevisaoOndas />

      {/* Notícias Recentes */}
      <section className="py-16 bg-dark-bg-primary relative overflow-hidden">
        {/* Padrão de ondas no fundo */}
        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Notícias <span className="text-blue-300">Recentes</span></h2>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">Fique por dentro dos últimos acontecimentos do mundo do surf</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {noticiasRecentes.map((noticia, index) => (
              <motion.article 
                key={noticia.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-dark-card-bg rounded-lg overflow-hidden shadow-md border border-gray-800/40 flex flex-col hover:shadow-lg transition-all duration-300 hover:border-blue-800/60 group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <Image 
                    src={noticia.imagem || '/images/news-7.jpg'} 
                    alt={noticia.titulo}
                    width={400}
                    height={250}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-blue-800/50 text-blue-200 text-xs font-medium rounded-md">
                      {noticia.categoria}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <Link href={`/noticias/${noticia.slug}`}>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {noticia.titulo}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-400 mb-3 flex-1 line-clamp-3">
                    {noticia.resumo}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{formatarData(noticia.data)}</span>
                    </div>
                    <Link 
                      href={`/noticias/${noticia.slug}`}
                      className="text-blue-400 hover:text-blue-300 flex items-center text-xs font-medium"
                    >
                      Ler <FaChevronRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="/noticias" 
              className="inline-flex items-center px-6 py-3 border-2 border-blue-500 text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-medium rounded-full transition-colors"
            >
              Ver todas as notícias <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
