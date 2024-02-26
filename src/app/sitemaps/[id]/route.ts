import { headers } from 'next/headers';
import prisma from '@/lib/db';

const root_URL = "https://www.songmeaning.ai";

async function fetchProducts(pageNumber: number) {
    const id = pageNumber;
    if (id === 0) {
        const artists = await prisma.artist.findMany({})
        const artist_pages = artists.map(({ artist_slug }) => ({
          url: `${root_URL}/artists/${artist_slug}`,
          lastModified: new Date().toISOString(),
        }))
      
        return [ ...artist_pages];
      }
  
      const songs = await prisma.songs.findMany({
        take: 10000,
        where: {
          id: {
            gte: 10000 * (id - 1),
          },
        },
        orderBy: {
          id: "asc",
        },
        include: {
          song_meaning_preview: true,
        },
      })
      
      
  
      const song_pages = songs.map(({ song_slug, song_meaning_preview }) => ({
          url: `${root_URL}/songs/${song_slug}`,
          lastModified: song_meaning_preview?.createdAt || new Date().toISOString(),
      
      }))
  
    
   
    return [...song_pages ];
}



export async function GET(request: Request) {
        
    try {
      const url = new URL(request.url)
      const currentPage = url.pathname

      const pageNumber = parseInt(currentPage.split('/').pop() || '0');
      
      if (pageNumber < 0 || pageNumber > 300) {
        return new Response('Invalid page number', { status: 400 });
      }
  
      const data = await fetchProducts(pageNumber);
  
      if (!data.length) {
        throw new Error('No items found for the given page number');
      }
  
      const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${data
            .map((item) => {
                return `
                <url>
                    <loc>${item.url}</loc>
                    <lastmod>${item.lastModified}</lastmod>
                </url>`;
            })
            .join('')} 
      </urlset>`;
  
      return new Response(sitemapXML, {
        headers: { 'Content-Type': 'text/xml' },
      });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }