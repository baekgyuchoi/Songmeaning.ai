
import prisma from "@/lib/db";

const URL = "https://www.songmeaning.ai";
 
export default async function sitemap() {
    const songs = await prisma.songMeaning.findMany({})
    const artists = await prisma.artist.findMany({})
    const song_pages = songs.map(({ slug, createdAt }) => ({
        url: `${URL}/song/${slug}`,
        lastModified: createdAt,
    
    }))

    const artist_pages = artists.map(({ artist_slug }) => ({
        url: `${URL}/artist/${artist_slug}`,
        lastModified: new Date().toISOString(),
    }))



 
  const routes = ["", "/media"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));
 
  return [...routes, ...song_pages, ...artist_pages];
}