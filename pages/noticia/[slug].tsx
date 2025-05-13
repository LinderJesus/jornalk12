import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { FaClock, FaUser, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaBookmark, FaShare, FaEye, FaComment, FaHeart, FaEnvelope, FaRegNewspaper } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';

// Componente de loading simples
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-t-primary-500 border-r-primary-300 border-b-primary-200 border-l-primary-300 rounded-full animate-spin`}></div>
    </div>
  );
};

// Mock data for a single news article
const mockArticle = {
  id: 1,
  title: 'Gabriel Medina vence o Tahiti Pro 2025 em ondas gigantes',
  slug: 'gabriel-medina-vence-tahiti-pro-2025',
  location: 'Teahupoo, Taiti',
  content: `
    <p>Em uma final incrível contra o havaiano John John Florence, Gabriel Medina conquistou seu primeiro título no Tahiti Pro, dominando as gigantes ondas de Teahupoo e confirmando status de favorito.</p>
    
    <p>O brasileiro de 29 anos mostrou toda sua técnica e experiência nas ondas de Teahupoo, consideradas entre as mais perigosas do circuito mundial. Com tubos perfeitos e manobras de alto risco, Medina somou 18.50 pontos (de um máximo de 20) na bateria final, contra 15.75 de Florence.</p>
    
    <p>"Estou muito feliz com essa vitória. Teahupoo é um lugar especial para mim e conseguir vencer aqui, especialmente contra o John, que é um dos melhores surfistas do mundo, é realmente incrível", declarou Medina após a conquista.</p>
    
    <h2>Caminho até a final</h2>
    
    <p>O caminho de Medina até o título não foi fácil. Nas quartas de final, ele eliminou o atual campeão mundial Filipe Toledo em uma bateria emocionante. Na semifinal, superou o taitiano Kauli Vaast, que contava com o apoio da torcida local.</p>
    
    <p>Com essa vitória, Medina soma pontos importantes no ranking mundial e se coloca como um dos favoritos para a disputa do título da temporada 2023 da World Surf League (WSL).</p>
    
    <h2>Próximas etapas</h2>
    
    <p>O próximo desafio do circuito mundial será o Pro Bells Beach, na Austrália, previsto para acontecer entre os dias 18 e 28 de junho. Medina, que já venceu a etapa australiana em 2019, chega com moral elevado após a conquista em Teahupoo.</p>
  `,
  excerpt: 'Em uma final incrível contra o havaiano John John Florence, Gabriel Medina conquistou seu primeiro título no Tahiti Pro, dominando as gigantes ondas de Teahupoo e confirmando status de favorito.',
  imageUrl: '/images/featured-news.jpg',
  date: '10 maio, 2025',
  author: 'Ricardo Oliveira',
  category: 'Competições',
  tags: ['Gabriel Medina', 'Tahiti Pro', 'WSL', 'Teahupoo'],
};

// Mock data for related news
const relatedNews = [
  {
    id: 2,
    title: 'Novo sistema de monitoramento reduz ataques de tubarão em 40%',
    excerpt: 'Tecnologia australiana combina o uso de inteligência artificial com sensores subaquáticos para resultados promissores na prevenção de ataques.',
    imageUrl: '/images/news-1.jpg',
    date: '8 maio, 2025',
    category: 'Tecnologia',
    location: 'Gold Coast, Austrália',
    slug: 'novo-sistema-monitoramento-tubarao'
  },
  {
    id: 3,
    title: 'Tendências 2025: As pranchas que estão dominando as ondas',
    excerpt: 'Descubra os modelos que os profissionais estão usando e como eles podem melhorar seu desempenho nas ondas.',
    imageUrl: '/images/news-2.jpg',
    date: '5 maio, 2025',
    category: 'Equipamentos',
    location: 'Pipeline, Havaí',
    slug: 'tendencias-pranchas-2025'
  }
];

const NewsDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<typeof mockArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<typeof relatedNews>([]);
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState<Array<{id: number; author: string; date: string; content: string; avatar?: string;}>>([{
    id: 1,
    author: 'Ana Silva',
    avatar: '/images/avatar-1.jpg',
    date: '2 horas atrás',
    content: 'Incrível ver o Gabriel ganhando novamente! Ele está em outro nível.'
  }]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Mostrar/ocultar opções de compartilhamento
  const _toggleShareOptions = () => {  // Função renomeada com prefixo _ para indicar uso planejado futuro
    setShowShareOptions(!showShareOptions);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    if (!router.isReady) return;

    // In a real app, you would fetch the article data based on the slug
    // For now, we'll use mock data
    setArticle(mockArticle);
    setRelatedArticles(relatedNews);
    
    // Simulate likes count
    setLikes(Math.floor(Math.random() * 120) + 30);
    
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [router.isReady, slug]);
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Artigo removido dos favoritos' : 'Artigo salvo nos favoritos');
  };
  const handleLike = () => {
    setLikes(likes + 1);
    toast.success('Obrigado pelo seu apoio!');
  };
  
  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = article?.title || 'Artigo interessante';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Confira esse artigo: ' + url)}`);
        break;
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentRef.current?.value) {
      const newComment = {
        id: comments.length + 1,
        author: 'Usuário Anônimo',
        date: new Date().toLocaleDateString('pt-BR'),
        content: commentRef.current.value,
        avatar: '/images/avatar-placeholder.jpg'
      };
      setComments([...comments, newComment]);
      commentRef.current.value = '';
      toast.success('Comentário enviado com sucesso!');
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    setArticle(mockArticle);
    setRelatedArticles(relatedNews);
    
    setLikes(Math.floor(Math.random() * 120) + 30);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [router.isReady, slug]);

  const seoTitle = article ? `${article.title} | JornalK1` : 'Carregando... | JornalK1';
  const seoDescription = article ? article.excerpt : 'Carregando artigo...';
  const seoUrl = article ? `https://jornalk1.com.br/noticia/${article.slug}` : '';
  const seoImage = article ? `https://jornalk1.com.br${article.imageUrl}` : '';

  if (isLoading) {
    return (
      <>
        <NextSeo title="Carregando..." description="Carregando artigo..." />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-medium">Carregando artigo...</p>
          </div>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <NextSeo 
          title="Artigo não encontrado | JornalK1" 
          description="O artigo que você está procurando não existe ou foi removido."
        />
        <div className="bg-gray-50 dark:bg-dark-800 min-h-screen flex items-center justify-center transition-colors duration-200">
          <div className="text-center max-w-lg px-6">
            <div className="mb-8">
              <FaRegNewspaper className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Artigo não encontrado</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">O artigo que você está procurando não existe ou foi removido. Verifique o endereço ou tente novamente mais tarde.</p>
            <Link href="/" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-dark-800 min-h-screen transition-colors duration-200">
        <NextSeo 
          title={seoTitle} 
          description={seoDescription} 
          canonical={seoUrl} 
          openGraph={{
            title: article.title,
            description: article.excerpt,
            url: seoUrl,
            type: 'article',
            article: {
              publishedTime: article.date,
              authors: [article.author],
              tags: article.tags,
            },
            images: [{ url: seoImage, alt: article.title }]
          }}
        />
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center">
              <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
              <Link href={`/categoria/${article.category.toLowerCase()}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {article.category}
              </Link>
              <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
              <span className="text-gray-700 dark:text-gray-300 truncate max-w-[250px] md:max-w-md">{article.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.article 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden transition-colors duration-200"
              >
                {/* Featured Image */}
                <div className="relative h-64 md:h-[400px] w-full overflow-hidden group">
                  <Image
                    src={article?.imageUrl || '/images/placeholder.jpg'}
                    alt={article?.title || 'Artigo'}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    {/* Category Badge */}
                    <Link 
                      href={`/categoria/${article.category.toLowerCase()}`}
                      className="inline-block bg-primary-600 dark:bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-md mb-3 hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                    >
                      {article.category}
                    </Link>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-sm">{article.title}</h1>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-8">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mr-6 mb-2">
                      <FaClock className="mr-2 text-primary-500" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center mr-6 mb-2">
                      <FaUser className="mr-2 text-primary-500" />
                      <span>Por {article.author}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaEye className="mr-2 text-primary-500" />
                      <span>{Math.floor(Math.random() * 1000) + 500} visualizações</span>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex space-x-4">
                      <button 
                        onClick={handleLike} 
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        <FaHeart className={`mr-2 ${likes > 0 ? 'text-primary-500' : ''}`} />
                        <span>{likes}</span>
                      </button>
                      <button 
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        <FaComment className="mr-2" />
                        <span>{comments.length}</span>
                      </button>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleBookmark}
                        className={`p-2 rounded-full ${isBookmarked ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400'} hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors`}
                        aria-label="Salvar"
                      >
                        <FaBookmark size={16} />
                      </button>
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="p-2 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Compartilhar no Facebook"
                      >
                        <FaFacebook size={16} />
                      </button>
                      <button 
                        onClick={() => handleShare('twitter')}
                        className="p-2 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                        aria-label="Compartilhar no Twitter"
                      >
                        <FaTwitter size={16} />
                      </button>
                      <button 
                        onClick={() => handleShare('linkedin')}
                        className="p-2 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                        aria-label="Compartilhar no LinkedIn"
                      >
                        <FaLinkedin size={16} />
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="p-2 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        aria-label="Compartilhar no WhatsApp"
                      >
                        <FaWhatsapp size={16} />
                      </button>
                      <button
                        onClick={() => handleShare('email')}
                        className="p-2 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                        aria-label="Compartilhar por Email"
                      >
                        <FaEnvelope size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Tags */}
                  <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string, index: number) => (
                        <Link
                          key={index}
                          href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                          className="bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Compartilhar:</h3>
                    <div className="flex space-x-3">
                      <button onClick={() => handleShare('facebook')} className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors" aria-label="Compartilhar no Facebook">
                        <FaFacebook size={18} />
                      </button>
                      <button onClick={() => handleShare('twitter')} className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors" aria-label="Compartilhar no Twitter">
                        <FaTwitter size={18} />
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors" aria-label="Compartilhar no LinkedIn">
                        <FaLinkedin size={18} />
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        aria-label="Compartilhar no WhatsApp"
                      >
                        <FaWhatsapp size={18} />
                      </button>
                      <button
                        onClick={() => handleShare('email')}
                        className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                        aria-label="Compartilhar por Email"
                      >
                        <FaEnvelope size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  <div id="comments-section" className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Comentários ({comments.length})</h3>
                    
                    {/* Comment Form */}
                    <form onSubmit={handleSubmitComment} className="mb-8">
                      <textarea
                        ref={commentRef}
                        className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-600 text-gray-800 dark:text-gray-200"
                        rows={4}
                        placeholder="Deixe seu comentário..."
                        required
                      />
                      <button
                        type="submit"
                        className="mt-3 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
                      >
                        Enviar Comentário
                      </button>
                    </form>
                    
                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={comment.avatar || '/images/avatar-placeholder.jpg'}
                                  alt={comment.author}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium text-gray-800 dark:text-white mr-2">{comment.author}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">Seja o primeiro a comentar!</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Author Card */}
              <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
                <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-24"></div>
                <div className="p-6 -mt-12">
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-dark-700 overflow-hidden">
                      <Image
                        src="/images/avatar-placeholder.jpg"
                        alt={article?.author || 'Autor'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{article.author}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Jornalista & Editor</p>
                    <div className="flex justify-center mt-4 space-x-3">
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                        <FaTwitter size={16} />
                      </a>
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                        <FaLinkedin size={16} />
                      </a>
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                        <FaEnvelope size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white">
                Categorias
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/categorias/politica" className="flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1">
                    <span>Política</span>
                    <span className="bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">12</span>
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/economia" className="flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1">
                    <span>Economia</span>
                    <span className="bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">8</span>
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/tecnologia" className="flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1">
                    <span>Tecnologia</span>
                    <span className="bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">15</span>
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/esportes" className="flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1">
                    <span>Esportes</span>
                    <span className="bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">10</span>
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/entretenimento" className="flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1">
                    <span>Entretenimento</span>
                    <span className="bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">6</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                Assine nossa Newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Receba as últimas notícias diretamente no seu e-mail.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-600 text-gray-800 dark:text-gray-200"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white">
                Tags Populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Política', 'Economia', 'Tecnologia', 'Saúde', 'Educação', 'Esportes', 'Cultura', 'Meio Ambiente', 'Internacional', 'Ciência'].map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${tag.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`}
                    className={`bg-gray-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm transition-colors ${
                      index % 3 === 0 
                        ? 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-500'
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Articles */}
              <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md p-6 transition-colors duration-200">
                <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white">
                  Artigos Relacionados
                </h3>
                <div className="space-y-6">
                  {relatedArticles.map((news) => (
                    <div key={news.id} className="flex space-x-4 group">
                      <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                          <Link href={`/noticia/${news.slug}`}>
                            {news.title}
                          </Link>
                        </h4>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FaClock className="mr-1 text-xs" />
                          <span>{news.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link 
                    href="/noticias" 
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                  >
                    Ver todas as notícias
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default NewsDetailPage;
