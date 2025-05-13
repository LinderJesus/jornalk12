import { NextApiRequest, NextApiResponse } from 'next';
import { getAllNews, createNews } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        // Get query parameters with defaults
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
        
        // Fetch news articles
        const news = await getAllNews(limit, offset, categoryId);
        return res.status(200).json({ success: true, data: news });
      
      case 'POST':
        // Check authentication (this would be replaced with proper auth middleware)
        // if (!req.session.user || !req.session.user.isAdmin) {
        //   return res.status(401).json({ success: false, message: 'Unauthorized' });
        // }
        
        // Create new news article
        const newsId = await createNews(req.body);
        return res.status(201).json({ success: true, data: { id: newsId } });
      
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
