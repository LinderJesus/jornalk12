import { NextApiRequest, NextApiResponse } from 'next';
import { getNewsBySlug, updateNews, deleteNews } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ success: false, message: 'Invalid news ID' });
    }
    
    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        // Fetch news article by ID or slug
        const isNumeric = /^\d+$/.test(id);
        let news;
        
        if (isNumeric) {
          // This would be a database query to get by ID
          // For now, we'll just return a mock response
          news = { id: parseInt(id), title: 'Mock News Article' };
        } else {
          // Get by slug
          news = await getNewsBySlug(id);
        }
        
        if (!news) {
          return res.status(404).json({ success: false, message: 'News article not found' });
        }
        
        return res.status(200).json({ success: true, data: news });
      
      case 'PUT':
        // Check authentication (this would be replaced with proper auth middleware)
        // if (!req.session.user || !req.session.user.isAdmin) {
        //   return res.status(401).json({ success: false, message: 'Unauthorized' });
        // }
        
        // Update news article
        await updateNews(parseInt(id), req.body);
        return res.status(200).json({ success: true, message: 'News article updated successfully' });
      
      case 'DELETE':
        // Check authentication (this would be replaced with proper auth middleware)
        // if (!req.session.user || !req.session.user.isAdmin) {
        //   return res.status(401).json({ success: false, message: 'Unauthorized' });
        // }
        
        // Delete news article
        await deleteNews(parseInt(id));
        return res.status(200).json({ success: true, message: 'News article deleted successfully' });
      
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
