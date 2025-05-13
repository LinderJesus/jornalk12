import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaClock, FaUser } from 'react-icons/fa';

type Article = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  slug: string;
  author?: string;
};

type NewsCardProps = {
  article?: Article;
  id?: number;
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  date?: string;
  category?: string;
  slug?: string;
  author?: string;
};

const NewsCard = (props: NewsCardProps) => {
  // Se recebemos um objeto article, usamos ele. Caso contrário, usamos as propriedades individuais
  const article = props.article || props;
  const { title, excerpt, imageUrl, date, category, slug, author } = article;
  
  if (!title || !imageUrl || !category || !slug) {
    return null; // Não renderiza se estiver faltando dados essenciais
  }
  
  return (
    <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        <Link 
          href={`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="absolute top-3 left-3 bg-primary-600 dark:bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-md"
        >
          {category}
        </Link>
      </div>
      <div className="p-5">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
          {date && (
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{date}</span>
            </div>
          )}
          {author && (
            <div className="flex items-center">
              <FaUser className="mr-1" />
              <span>{author}</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
          <Link href={`/noticia/${slug}`}>
            {title}
          </Link>
        </h3>
        {excerpt && <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{excerpt}</p>}
        <Link 
          href={`/noticia/${slug}`} 
          className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
        >
          Ler mais
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
