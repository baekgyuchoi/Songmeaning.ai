
import prisma from "@/lib/db";

const URL = "https://www.songmeaning.ai";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed

  const sitemaps = [];
  for (let i = 0; i <= 2500 ; i++) {
    sitemaps.push({
      id: i
    });
  }
  return sitemaps
}
 
export default async function sitemap(
  { id }: { id: number }
) {
    if (id === 0) {
      const artists = await prisma.artist.findMany({})
      const artist_pages = artists.map(({ artist_slug }) => ({
        url: `${URL}/artists/${artist_slug}`,
        lastModified: new Date().toISOString(),
      }))
      const routes = ["", "/media"].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
      }));
      return [...routes, ...artist_pages];
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
        url: `${URL}/songs/${song_slug}`,
        lastModified: song_meaning_preview?.createdAt || new Date().toISOString(),
    
    }))

  
 
  return [...song_pages ];
}