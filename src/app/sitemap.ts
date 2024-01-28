
import prisma from "@/lib/db";

const URL = "https://www.songmeaning.ai";
 
export default async function sitemap() {
    const songs = await prisma.songs.findMany({
      include: {
        song_meaning_preview: true,
      }
    })
    const artists = await prisma.artist.findMany({})
    const song_pages = songs.map(({ song_slug, song_meaning_preview }) => ({
        url: `${URL}/songs/${song_slug}`,
        lastModified: song_meaning_preview?.createdAt || new Date().toISOString(),
    
    }))


    const artist_pages = artists.map(({ artist_slug }) => ({
        url: `${URL}/artists/${artist_slug}`,
        lastModified: new Date().toISOString(),
    }))



 
  const routes = ["", "/media"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));
 
  return [...routes, ...song_pages, ...artist_pages];
}