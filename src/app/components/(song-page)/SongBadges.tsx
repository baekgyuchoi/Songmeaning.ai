
import { Badge } from '@/components/ui/badge';
import { SongData } from '@/lib/validators/song_data_response';
import { BadgesOnSongs, PrismaClient } from '@prisma/client';
import React from 'react';
import OpenAI from 'openai';

interface SongBadgesProps {
  // Define your component props here
  songData: SongData
}


// Set up your OpenAI API credentials

async function AddSongToBadge(badge_id: number, song_id: number) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  const badge = await prisma.badges.findUnique({
    where: {
      id: badge_id
    }
  })
  
  await prisma.badges.update({
    where: {
      id: badge_id
    },
    data: {
      songs: {
        create: [
          {
            song_id: song_id,
            
          }
        ]
      }
    }
  })
  

  await prisma.songs.update({
    where: {
      id: song_id
    },
    data: {
      badges: {
        connect: [
          {
            badge_id_song_id: {
              badge_id: badge_id,
              song_id: song_id
            } 
          }
        ]
      }
    }
  })
  console.log("song added to badge")
  await prisma.$disconnect()
}

async function PostBadge(badge_name: string) {}

async function IsBadgeInDB(badge_name: string) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  const badge = await prisma.badges.findUnique({
    where: {
      badge_name: badge_name
    }
  })
  await prisma.$disconnect()
  if (badge != null) {
    return badge
  }else{
    return null
  }
}

async function QueueBadges(badge_name:string, song_slug: string, song_id: number) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  await prisma.badges.create({
    data: {
      badge_name: badge_name,
      first_song: song_slug,
      songs: {
        create: [
          {
            song_id: song_id,
            
          }
        ]
      } 
    }
  })

  
  await prisma.$disconnect()
  return null
}

async function GenerateTwoWord(songData: SongData) {
  // Your code here
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Given a passage of song lyrics, you are to return the two words that describe the lyric's tone and mood the most accurately" },
      { role: "user", content: songData.lyrics },
  ],
    model: "ft:gpt-3.5-turbo-1106:personal::8Ozv43OJ",
  });
  const two_badges = completion.choices[0].message.content?.split('/')
  if (two_badges == null) {
    console.log("two badges error")
    return null
  }
  for (let i = 0; i < two_badges.length; i++) {
    const badge = two_badges[i]
    const badge_in_db = await IsBadgeInDB(badge)
    console.log(badge_in_db)
    if (badge_in_db == null) {
      console.log("badge not in db")
      await QueueBadges(badge, songData.song_slug, songData.id)
    }
    else{
      //badge in db, add song to badge
      console.log("badge in db")
      await AddSongToBadge(badge_in_db.id, songData.id)
    }
  }

  const prisma = new PrismaClient()
  await prisma.$connect()
  await prisma.songs.update({
    where: {
      id: songData.id
    },
    data: {
      two_word_description: two_badges[0] + "/" + two_badges[1]
    }
  })
  console.log ("two word description added to song")

 
  await prisma.$disconnect()

 
  console.log(two_badges)
}


const SongBadges: React.FC<SongBadgesProps> = async (props) => {

  if (props.songData.lyrics == null) {
    return (
      <div> 
        <Badge>default</Badge>
      </div>
    )
  }
  
  if (props.songData.two_word_description == "default/default") {
    await GenerateTwoWord(props.songData)
  }
  
  const prisma = new PrismaClient()
  await prisma.$connect()

  const songData1 = await prisma.songs.findUnique({
    where: {
      song_slug: props.songData.song_slug
    }
  })
  
  const badges = songData1?.two_word_description.split("/")
  console.log(badges)

  await prisma.$disconnect()
  return (
    <div>
      {/* Your component code here */}
      {badges?.map((badge, index) => {
        return (
          <div key={index} className="inline-block">
            <Badge>{badge}</Badge>
          </div>
        )
      })}
    </div>
  );
};

export default SongBadges
