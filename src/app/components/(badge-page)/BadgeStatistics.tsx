import { PrismaClient } from '@prisma/client';
import React from 'react';

async function getBadgeSongCount(badge_name: string) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  const badge = await prisma.badges.findUnique({
    where: {
      badge_name: badge_name
    }
  })
  const badgesOnSongs = await prisma.badgesOnSongs.count({
    where: {
      badge_id: badge?.id
    },
  });
  await prisma.$disconnect()
  return badgesOnSongs

}

async function getBadgeCreatedDate(badge_name: string) {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const badge = await prisma.badges.findUnique({
        where: {
            badge_name: badge_name
        }
    })
    

    await prisma.$disconnect()
    
    return badge?.created_at
}

interface BadgeStatisticsProps {
    badge_name: string;
}


const BadgeStatistics: React.FC<BadgeStatisticsProps> = async (props) => {
    const song_count = await getBadgeSongCount(props.badge_name)
    const badge_created_at = await getBadgeCreatedDate(props.badge_name)
    const creation_date = badge_created_at?.toLocaleDateString()
  return (
    <div className='flex flex-col w-4/5 md:w-full pt-8 md:pt-0'>
      {/* Your component code here */}
      <div className='flex justify-between'>
        <p className='p-4'>
            Entries: 
        </p>
        <p className='p-4'>
            {song_count}
        </p>
      </div>
      <div className='flex justify-between'>
        <p className='p-4'>
            Created at: 
        </p>
        <p className='p-4'>
            {creation_date}
        </p>
      </div>

    </div>
  );
};

export default BadgeStatistics;
