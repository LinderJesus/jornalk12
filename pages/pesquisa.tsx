import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { OptimizedImage, SmartLink } from '../components';
import { FaCalendarAlt, FaUser, FaEye, FaSearch, FaTimes, FaFilter } from 'react-icons/fa';

// Dados de exemplo para notícias
const noticias = [
  {
    id: 1,
    titulo: 'Novo satélite captura as primeiras imagens em alta resolução do fundo do oceano',
    slug: 'novo-satelite-imagens-fundo-oceano',
    resumo: 'Tecnologia inovadora permite visualizar detalhes nunca antes observados das profundezas marinhas, revolucionando a oceanografia.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-1.jpg',
    categoriaId: 3,
    categoria: 'Tecnologia',
    data: '2025-05-10',
    visualizacoes: 3245,
    comentarios: 42,
    autor: 'Ricardo Almeida',
    tipo: 'noticia'
  },
  {
    id: 2,
    titulo: 'Nova tecnologia de dessalinização pode resolver crises hídricas em regiões costeiras',
    slug: 'tecnologia-dessalinizacao-crise-hidrica',
    resumo: 'Pesquisadores desenvolveram um método mais eficiente e econômico para transformar água do mar em água potável.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-2.jpg',
    categoriaId: 3,
    categoria: 'Tecnologia',
    data: '2025-05-09',
    visualizacoes: 2187,
    comentarios: 28,
    autor: 'Ana Oliveira',
    tipo: 'noticia'
  },
  {
    id: 3,
    titulo: 'Métodos de estudo eficazes para concursos públicos',
    slug: 'metodos-estudo-concursos',
    resumo: 'Confira as melhores técnicas para otimizar seu tempo de estudo e aumentar suas chances de aprovação.',
    conteudo: 'Conteúdo completo da dica...',
    imagem: '/images/news-3.jpg',
    categoriaId: 5,
    categoria: 'Educação',
    data: '2025-05-01',
    visualizacoes: 1243,
    comentarios: 18,
    autor: 'Carlos Silva',
    tipo: 'dica'
  },
  {
    id: 4,
    titulo: 'Como economizar na hora de fazer compras no supermercado',
    slug: 'economia-supermercado',
    resumo: 'Dicas práticas para reduzir seus gastos mensais com alimentação sem abrir mão da qualidade.',
    conteudo: 'Conteúdo completo da dica...',
    imagem: '/images/news-4.jpg',
    categoriaId: 2,
    categoria: 'Economia',
    data: '2025-04-28',
    visualizacoes: 2156,
    comentarios: 32,
    autor: 'Ana Oliveira',
    tipo: 'dica'
  },
  {
    id: 5,
    titulo: 'Cuidados essenciais com a saúde mental durante períodos de estresse',
    slug: 'saude-mental-estresse',
    resumo: 'Saiba como manter o equilíbrio emocional e prevenir problemas de ansiedade em momentos desafiadores.',
    conteudo: 'Conteúdo completo da dica...',
    imagem: '/images/news-5.jpg',
    categoriaId: 6,
    categoria: 'Saúde',
    data: '2025-04-25',
    visualizacoes: 1876,
    comentarios: 27,
    autor: 'Dra. Mariana Santos',
    tipo: 'dica'
  },
  {
    id: 6,
    titulo: 'Inteligência artificial prevê com 95% de precisão riscos de doenças cardíacas',
    slug: 'ia-previsao-doencas-cardiacas',
    resumo: 'Sistema desenvolvido por cientistas brasileiros analisa diversos fatores para identificar pacientes com maior risco de problemas cardíacos.',
    conteudo: 'Conteúdo completo da notícia...',
    imagem: '/images/news-6.jpg',
    categoriaId: 3,
    categoria: 'Tecnologia',
    data: '2025-05-08',
    visualizacoes: 1876,
    comentarios: 31,
    autor: 'Carlos Silva',
    tipo: 'noticia'
  }
];

// Categorias disponíveis
const categorias = [
  { id: 1, nome: 'Política', slug: 'politica' },
  { id: 2, nome: 'Economia', slug: 'economia' },
  { id: 3, nome: 'Tecnologia', slug: 'tecnologia' },
  { id: 4, nome: 'Esportes', slug: 'esportes' },
  { id: 5, nome: 'Educação', slug: 'educacao' },
  { id: 6, nome: 'Saúde', slug: 'saude' }
];

// Tipos de conteúdo
const tipos = [
  { id: 'noticia', nome: 'Notícias' },
  { id: 'dica', nome: 'Dicas' }
];

const formatarData = (dataString: string) => {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const PesquisaPage = () => {
  const router = useRouter();
  
  // Parâmetros da URL
  const { q: queryParam, categoria: categoriaParam, tipo: tipoParam } = router.query;
  
  // Estados para filtros e resultados
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);
  const [tipoFiltro, setTipoFiltro] = useState<string | null>(null);
  const [resultados, setResultados] = useState<typeof noticias>([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Função para realizar a busca
  const realizarBusca = useCallback(() => {
    let resultadosFiltrados = [...noticias];
    
    // Filtrar por termo de busca
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter(item => 
        item.titulo.toLowerCase().includes(termo) || 
        item.resumo.toLowerCase().includes(termo) || 
        item.conteudo.toLowerCase().includes(termo)
      );
    }
    
    // Filtrar por categoria
    if (categoriaFiltro) {
      resultadosFiltrados = resultadosFiltrados.filter(item => 
        item.categoria.toLowerCase() === categoriaFiltro.toLowerCase()
      );
    }
    
    // Filtrar por tipo
    if (tipoFiltro) {
      resultadosFiltrados = resultadosFiltrados.filter(item => 
        item.tipo === tipoFiltro
      );
    }
    
    // Ordenar por data (mais recentes primeiro)
    resultadosFiltrados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    
    setResultados(resultadosFiltrados);
    setCarregando(false);
  }, [termoBusca, categoriaFiltro, tipoFiltro]);
  
  // Inicializar os filtros com base nos parâmetros da URL
  useEffect(() => {
    // Se vier um termo de busca na URL, realizar a busca
    if (router.isReady && router.query.q) {
      setTermoBusca(router.query.q as string);
    }
  }, [router.isReady, router.query]);
  
  useEffect(() => {
    if (queryParam) setTermoBusca(queryParam as string);
    if (categoriaParam) setCategoriaFiltro(categoriaParam as string);
    if (tipoParam) setTipoFiltro(tipoParam as string);
  }, [queryParam, categoriaParam, tipoParam]);
  
  // Realizar a busca quando os filtros mudarem
  useEffect(() => {
    realizarBusca();
    
    // Atualizar a URL com os parâmetros de busca
    const params = new URLSearchParams();
    if (termoBusca) params.append('q', termoBusca);
    if (categoriaFiltro) params.append('categoria', categoriaFiltro);
    if (tipoFiltro) params.append('tipo', tipoFiltro);
    
    const url = `/pesquisa${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url, undefined, { shallow: true });
  }, [termoBusca, categoriaFiltro, tipoFiltro, realizarBusca, router]);
  
  // Manipulador para o formulário de busca
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    realizarBusca();
  };
  
  // Limpar todos os filtros
  const limparFiltros = () => {
    setTermoBusca('');
    setCategoriaFiltro(null);
    setTipoFiltro(null);
  };

  return (
    <Layout>
      <NextSeo
        title={`Pesquisa${termoBusca ? ` - ${termoBusca}` : ''} | JornalK1`}
        description="Pesquise notícias, dicas e conteúdos no JornalK1"
        noindex={true}
      />

      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pesquisa
        </motion.h1>

        {/* Formulário de busca */}
        <motion.div 
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="O que você está procurando?"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full py-4 px-6 pl-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            
            {termoBusca && (
              <button
                type="button"
                onClick={() => setTermoBusca('')}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Limpar busca"
              >
                <FaTimes />
              </button>
            )}
            
            <button
              type="button"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
              aria-label="Filtros"
            >
              <FaFilter />
            </button>
          </form>
          
          {/* Filtros */}
          {mostrarFiltros && (
            <motion.div 
              className="mt-4 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="text-sm text-primary-600 hover:text-primary-800 dark:hover:text-primary-400"
                >
                  Limpar filtros
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="categoria-select" className="block text-sm font-medium mb-2">Categoria</label>
                  <select
                    id="categoria-select"
                    value={categoriaFiltro || ''}
                    onChange={(e) => setCategoriaFiltro(e.target.value || null)}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-900"
                  >
                    <option value="">Todas as categorias</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.slug}>
                        {categoria.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tipo-select" className="block text-sm font-medium mb-2">Tipo de conteúdo</label>
                  <select
                    id="tipo-select"
                    value={tipoFiltro || ''}
                    onChange={(e) => setTipoFiltro(e.target.value || null)}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-900"
                  >
                    <option value="">Todos os tipos</option>
                    {tipos.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Filtros ativos */}
          {(categoriaFiltro || tipoFiltro) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {categoriaFiltro && (
                <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1 text-sm">
                  <span>Categoria: {categorias.find(c => c.slug === categoriaFiltro)?.nome}</span>
                  <button
                    onClick={() => setCategoriaFiltro(null)}
                    className="ml-2 text-primary-600 hover:text-primary-800 dark:hover:text-primary-400"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              
              {tipoFiltro && (
                <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1 text-sm">
                  <span>Tipo: {tipos.find(t => t.id === tipoFiltro)?.nome}</span>
                  <button
                    onClick={() => setTipoFiltro(null)}
                    className="ml-2 text-primary-600 hover:text-primary-800 dark:hover:text-primary-400"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Resultados da busca */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {carregando ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Carregando resultados...
                {termoBusca && <span> para &quot;{termoBusca}&quot;</span>}
              </p>
            </div>
          ) : resultados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resultados.map((item, index) => (
                <motion.article
                  key={item.id}
                  className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-48">
                    <OptimizedImage
                      src={item.imagem}
                      alt={item.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        item.tipo === 'noticia' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}>
                        {item.tipo === 'noticia' ? 'Notícia' : 'Dica'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2">
                        {item.categoria}
                      </span>
                      <FaCalendarAlt className="mr-1" />
                      <span>{formatarData(item.data)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{item.titulo}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{item.resumo}</p>
                  </div>
                  <div className="px-4 pb-4 mt-auto">
                    <div className="flex justify-between items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FaUser className="mr-1" />
                        <span>{item.autor}</span>
                      </div>
                      <div className="flex items-center">
                        <FaEye className="mr-1" />
                        <span>{item.visualizacoes.toLocaleString()}</span>
                      </div>
                    </div>
                    <SmartLink
                      href={`/${item.tipo === 'noticia' ? 'noticia' : 'dicas'}/${item.slug}`}
                      className="inline-block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Ler mais
                    </SmartLink>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : termoBusca ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Não encontramos resultados para sua busca. Tente outros termos ou navegue pelas categorias.
              </p>
              <SmartLink
                href="/categorias"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded transition-colors"
              >
                Ver categorias
              </SmartLink>
            </div>
          ) : termoBusca === '' ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Digite um termo de busca para encontrar notícias, dicas e outros conteúdos.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <h3 className="w-full text-lg font-semibold mb-2">Sugestões de busca</h3>
                {['tecnologia', 'saúde', 'economia', 'educação', 'concursos', 'investimentos'].map(termo => (
                  <button
                    key={termo}
                    onClick={() => setTermoBusca(termo)}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-full transition-colors"
                  >
                    {termo}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nenhum resultado encontrado.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default PesquisaPage;
