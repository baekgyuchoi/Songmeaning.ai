
import prisma from "@/lib/db";

const URL = "https://www.songmeaning.ai";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed

  const sitemaps = [];
  let cursor_pointer = 0;
  for (let i = 0; i <= 50 ; i++) {
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
      take: 25000,
      where: {
        id: {
          gte: 50000 * (id - 1),
        },
      },
      orderBy: {
        id: "asc",
      },
    })

    const songs_2 = await prisma.songs.findMany({
      take: 25000,
      where: {
        id: {
          gte: 50000 * (id-1) + 25000,
        },
      },
      orderBy: {
        id: "asc",
      },
    })

    const song_pages = songs.map(({ song_slug, }) => ({
        url: `${URL}/songs/${song_slug}`,
        lastModified: new Date().toISOString(),
    
    }))

    const song_pages_2 = songs_2.map(({ song_slug, }) => ({
        url: `${URL}/songs/${song_slug}`,
        lastModified: new Date().toISOString(),
    
    }))
 
  return [...song_pages, ...song_pages_2];
}