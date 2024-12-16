import { useState, useEffect } from 'react';
import { articleCache } from '../utils/articleCache';

interface MediumArticle {
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const extractFirstImageFromDescription = (description: string): string | null => {
  // Prioritize extracting the first image from the content:encoded section
  const contentImageRegex = /https:\/\/cdn-images-1\.medium\.com\/max\/(?:\d+)\/([^"\s]+\.(?:png|jpg|jpeg|gif|webp))/i;
  const contentImageMatch = description.match(contentImageRegex);
  
  if (contentImageMatch) {
    const fullUrl = contentImageMatch[0];
    console.log('Extracted Content Image URL:', fullUrl);
    return fullUrl;
  }

  // Fallback to Miro Medium URLs
  const miroImageRegex = /https:\/\/miro\.medium\.com\/[^"\s]+\.(?:png|jpg|jpeg|gif|webp)/i;
  const miroImageMatch = description.match(miroImageRegex);
  
  if (miroImageMatch) {
    const fullUrl = miroImageMatch[0];
    console.log('Extracted Miro Image URL:', fullUrl);
    return fullUrl;
  }

  // Fallback to direct HTML img tag extraction
  const htmlImgTagRegex = /<img[^>]+src="(https:\/\/[^"]+\.(?:png|jpg|jpeg|gif|webp))"[^>]*>/i;
  const htmlImgTagMatch = description.match(htmlImgTagRegex);
  
  if (htmlImgTagMatch) {
    const fullUrl = htmlImgTagMatch[1];
    console.log('Extracted HTML Img Tag URL:', fullUrl);
    return fullUrl;
  }

  // Last resort: generic image URL matching
  const genericImageRegex = /https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp)/i;
  const genericImageMatch = description.match(genericImageRegex);
  
  if (genericImageMatch) {
    const fullUrl = genericImageMatch[0];
    console.log('Extracted Generic Image URL:', fullUrl);
    return fullUrl;
  }

  console.log('No image found in description');
  return null;
};

const parseRSSFeed = async (xmlString: string): Promise<MediumArticle[]> => {
  // Log the entire XML string for debugging
  console.log('Raw XML Feed:', xmlString);

  console.log('Full Received XML:', xmlString);

  return new Promise((resolve, reject) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      console.log('Parsed XML Document:', xmlDoc);

      const items = xmlDoc.getElementsByTagName('item');
      const articles: MediumArticle[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        console.log(`Item ${i} XML:`, new XMLSerializer().serializeToString(item));

        const title = item.getElementsByTagName('title')[0]?.textContent || '';
        const link = item.getElementsByTagName('link')[0]?.textContent || '';
        const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';
        const description = item.getElementsByTagName('description')[0]?.textContent || '';
        const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent || '';
        const categories = Array.from(item.getElementsByTagName('category')).map(cat => cat.textContent || '');

        const descriptionToUse = contentEncoded || description;
        const thumbnail = extractFirstImageFromDescription(descriptionToUse) || '';

        console.log(`Article ${i} Details:`, {
          title,
          link,
          thumbnail,
          pubDate,
          description: descriptionToUse.substring(0, 200) + '...', 
          categories
        });

        articles.push({
          title,
          link,
          thumbnail,
          pubDate,
          description: descriptionToUse,
          categories
        });
      }

      resolve(articles);
    } catch (error) {
      console.error('Full Parsing Error:', error);
      reject(error);
    }
  });
};


export const useMediumArticles = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        const cachedArticles = articleCache.get();
        if (cachedArticles) {
          setArticles(cachedArticles);
          setLoading(false);
          return;
        }

        const corsProxyUrl = 'https://api.allorigins.win/raw';
        const mediumFeedUrl = `https://medium.com/feed/@moetezafif`;
        const fullUrl = `${corsProxyUrl}?url=${encodeURIComponent(mediumFeedUrl)}`;

        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Origin': window.location.origin, // Dynamically set origin
            'X-Requested-With': 'XMLHttpRequest' // Some CORS proxies require this
          }
        });

        if (!response.ok) {
          console.error('Fetch Response:', response);
          const errorText = await response.text();
          console.error('Response Error Text:', errorText);
          throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
        }

        const xmlText = await response.text();
        console.log('Received XML Text Length:', xmlText.length);
        console.log('First 500 characters of XML:', xmlText.slice(0, 500));

        if (!xmlText || xmlText.trim().length === 0) {
          throw new Error('Received empty XML string');
        }

        const parsedArticles = await parseRSSFeed(xmlText);

        console.log('Parsed Articles:', parsedArticles);

        articleCache.set(parsedArticles);
        
        setArticles(parsedArticles);
      } catch (err) {
        console.error('Fetch Articles Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
