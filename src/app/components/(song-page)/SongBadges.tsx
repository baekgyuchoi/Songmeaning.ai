
import { Badge } from '@/components/ui/badge';
import { SongData } from '@/lib/validators/song_data_response';
import prisma from '@/lib/db';
import React from 'react';
import OpenAI from 'openai';
import Link from 'next/link';

interface SongBadgesProps {
  // Define your component props here
  songData: SongData
}


// Set up your OpenAI API credentials

async function AddSongToBadge(badge_id: number, song_id: number) {
  
  const badge = await prisma.badges.findUnique({
    where: {
      id: badge_id
    }
  })

  if (badge == null) {
    return null
  }

  
  await prisma.badges.update({
    where: {
      id: badge_id
    },
    data: {
      songs_count: badge.songs_count + 1 ,
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
}


async function IsBadgeInDB(badge_name: string) {
  const badge = await prisma.badges.findUnique({
    where: {
      badge_name: badge_name
    }
  })
  if (badge != null) {
    return badge
  }else{
    return null
  }
}

async function QueueBadges(badge_name:string, song_slug: string, song_id: number) {
  const badge = await prisma.badges.create({
    data: {
      badge_name: badge_name,
      first_song: song_slug,
      songs_count: 1,
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
              badge_id: badge.id,
              song_id: song_id
            } 
          }
        ]
      }
    }
  })

  
  return null
}

async function GenerateTwoWord(songData: SongData) {
  // Your code here
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Given a passage of song lyrics, you are to return the two words - in this format: word1/word2 -  that describe the lyric's tone and mood the most accurately" },
      { role: "user", content: "return 2 tone/mood words for these lyrics:" + songData.lyrics },
  ],
    model: "ft:gpt-3.5-turbo-1106:personal::8Ozv43OJ",
  });
  const two_badges = completion.choices[0].message.content?.split('/')
  if (two_badges == null || two_badges.length != 2) {

    return null
  }
  for (let i = 0; i < two_badges.length; i++) {
    const badge = two_badges[i]
    const badge_in_db = await IsBadgeInDB(badge)

    if (badge_in_db == null) {
      await QueueBadges(badge, songData.song_slug, songData.id)
    }
    else{
      //badge in db, add song to badge

      await AddSongToBadge(badge_in_db.id, songData.id)
    }
  }
  await prisma.songs.update({
    where: {
      id: songData.id
    },
    data: {
      two_word_description: two_badges[0] + "/" + two_badges[1]
    }
  })

 
 
}


const SongBadges: React.FC<SongBadgesProps> = async (props) => {

  if (props.songData.lyrics == null) {
    return (
      <></>
    )
  }
  
  if (props.songData.two_word_description == "default/default") {
    await GenerateTwoWord(props.songData)
  }

  const songData1 = await prisma.songs.findUnique({
    where: {
      song_slug: props.songData.song_slug
    }
  })
  
  const badges = songData1?.two_word_description.split("/")

  return (
    <div>
      {/* Your component code here */}
      {badges?.map((badge, index) => {
        return (
          <div key={index} className="inline-block m-2">
            <Link href={`/badges/${badge}`}>
              <Badge>{badge}</Badge>
            </Link>
          </div>
        )
      })}
    </div>
  );
};

export default SongBadges
