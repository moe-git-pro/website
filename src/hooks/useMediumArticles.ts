import { useState, useEffect } from 'react';
import { logger } from '../utils/logger';

interface MediumArticle {
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const extractFirstImage = (content: string): string => {
  if (!content) return '';
  
  // Try to find image in figure > img tag (Medium's format)
  const figureImgRegex = /<figure>\s*<img[^>]+src=["']([^"'>]+)["'][^>]*>/i;
  const figureMatch = content.match(figureImgRegex);
  
  if (figureMatch && figureMatch[1]) {
    let imgUrl = figureMatch[1];
    // Ensure URL is absolute
    if (!imgUrl.startsWith('http')) {
      imgUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : `https://${imgUrl}`;
    }
    logger.debug('Extracted image from figure tag:', imgUrl);
    return imgUrl;
  }
  
  // Try to find any img tag
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/i;
  const imgMatch = content.match(imgRegex);
  
  if (imgMatch && imgMatch[1]) {
    let imgUrl = imgMatch[1];
    // Ensure URL is absolute
    if (!imgUrl.startsWith('http')) {
      imgUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : `https://${imgUrl}`;
    }
    logger.debug('Extracted image from img tag:', imgUrl);
    return imgUrl;
  }
  
  // Try to find Medium's CDN images
  const cdnRegex = /(https?:\/\/cdn(-\d+)?\.(?:medium\.com|miro\.medium\.com)\/[^\s"'>]+)/i;
  const cdnMatch = content.match(cdnRegex);
  
  if (cdnMatch && cdnMatch[1]) {
    let imgUrl = cdnMatch[1];
    // Ensure URL is properly formatted
    if (!imgUrl.startsWith('http')) {
      imgUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : `https://${imgUrl}`;
    }
    logger.debug('Found CDN image URL:', imgUrl);
    return imgUrl;
  }
  
  // Try to find any image URL in the content
  const anyImageRegex = /(https?:\/\/[^\s"'>]+\.(?:png|jpg|jpeg|gif|webp)(?:\?[^\s"'>]*)?)/i;
  const anyImageMatch = content.match(anyImageRegex);
  
  if (anyImageMatch && anyImageMatch[1]) {
    let imgUrl = anyImageMatch[1];
    if (!imgUrl.startsWith('http')) {
      imgUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : `https://${imgUrl}`;
    }
    logger.debug('Found generic image URL:', imgUrl);
    return imgUrl;
  }
  
  logger.debug('No image found in content');
  return '';
};

// Fallback articles data
const FALLBACK_ARTICLES: MediumArticle[] = [
  {
    title: "My First Blog Post",
    link: "https://medium.com/@moetezafif/my-first-post",
    thumbnail: "",
    pubDate: new Date().toISOString(),
    description: "This is a fallback article description.",
    categories: ["Technology", "Web Development"]
  },
  {
    title: "Another Interesting Article",
    link: "https://medium.com/@moetezafif/another-article",
    thumbnail: "",
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    description: "Another interesting article about web development.",
    categories: ["Web Development", "JavaScript"]
  }
];

export const useMediumArticles = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
    try {
      setLoading(true);
      
      // Try to get cached articles first
      const cached = localStorage.getItem('medium-articles-cache');
      if (cached) {
        try {
          const { timestamp, data } = JSON.parse(cached);
          // Cache for 1 hour
          if (Date.now() - timestamp < 60 * 60 * 1000) {
            console.log('Using cached articles');
            setArticles(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing cached articles:', e);
          // Continue to fetch fresh data if cache is corrupted
        }
      }

        const mediumUsername = 'moetezafif';
        const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedUrl)}`;
        
        console.log('Fetching articles from RSS feed');
        console.log('Medium Feed URL:', mediumFeedUrl);
        console.log('API URL:', apiUrl);
        
        const startTime = Date.now();
        let response;
        try {
          response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown network error';
          console.error('Network error when fetching articles:', error);
          throw new Error(`Network error: ${errorMessage}`);
        }
        const responseTime = Date.now() - startTime;
        
        logger.debug(`API response received in ${responseTime}ms`);
        logger.debug('Response status:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          logger.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        logger.debug('API Response Data:', {
          status: data.status,
          itemsCount: data.items?.length || 0,
          firstItemKeys: data.items?.[0] ? Object.keys(data.items[0]) : []
        });
        
        if (data.status === 'ok' && Array.isArray(data.items)) {
          const processedArticles = data.items.map((item: any) => {
            const content = item['content:encoded'] || item.content || item.description || '';
            const imageUrl = extractFirstImage(content);
            
            // Log detailed image information
            console.log('=== ARTICLE IMAGE DEBUG ===');
            console.log('Article Title:', item.title);
            console.log('Raw Content (first 500 chars):', content.substring(0, 500) + '...');
            console.log('Extracted Image URL:', imageUrl || 'NO IMAGE FOUND');
            
            if (!imageUrl) {
              console.log('No image found in content. Trying alternative methods...');
              // Try to find any image in the content using a more permissive regex
              const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
              console.log('Direct img tag match:', imgMatch ? imgMatch[1] : 'No match');
              
              // Look for any URL that might be an image
              const urlMatch = content.match(/(https?:\/\/[^\s"'>]+\.(?:png|jpg|jpeg|gif|webp))/i);
              console.log('Any image URL match:', urlMatch ? urlMatch[0] : 'No match');
            }
            
            return {
              title: item.title || 'No title',
              link: item.link || '#',
              thumbnail: imageUrl,
              pubDate: item.pubDate || new Date().toISOString(),
              description: content,
              categories: item.categories || []
            };
          });
          
          // Cache the articles
          localStorage.setItem('medium-articles-cache', JSON.stringify({
            timestamp: Date.now(),
            data: processedArticles
          }));
          
          setArticles(processedArticles);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        logger.error('Error fetching articles:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });
        
        // Use fallback articles if API fails
        logger.warn('Using fallback articles');
        setArticles(FALLBACK_ARTICLES);
        setError('Using fallback articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
