'use client'
import React, { useEffect } from 'react';
import {ThumbsDown, ThumbsUp } from 'lucide-react';
import ShareButton from './ShareButton';
import { useState } from 'react';
import { set } from 'zod';


interface LikeAndShareContainerProps {
    song_slug: string;
}

const LikeAndShareContainer: React.FC<LikeAndShareContainerProps> = (props) => {

  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [likeLoading, setLikeLoading] = useState(false)
  const [dislikeLoading, setDislikeLoading] = useState(false)
  const fetchData = async () => {
    const response = await fetch(`/api/song_likes/get_song_likes?q=${props.song_slug}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    setLikeCount(data.like_count)
  }


  useEffect(() => {
    fetchData()
  }, [isLiked, isDisliked])  
  

  async function handleLike() {

    let payload = {}
    if (!isLiked) {
      payload = {
        song_slug: props.song_slug,
        like_delta: 1
      }
    }else {
      payload = {
        song_slug: props.song_slug,
        like_delta: -1
      }
    }
    setLikeLoading(true)

    const response = await fetch(`/api/song_likes/update_song_like`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        }, 
      body: JSON.stringify(payload)
    })
    setIsLiked(!isLiked)
    setLikeLoading(false)
    if (!response.ok) {
      throw new Error('failed to fetch data');
    }
  
  
    console.log('button clicked')
  }

  async function handleDislike() {
    let payload = {}
    if (!isDisliked) {
      payload = {
        song_slug: props.song_slug,
        like_delta: -1
      }
    }else {
      payload = {
        song_slug: props.song_slug,
        like_delta: 1
      }
    }
    setDislikeLoading(true)
    const response = await fetch(`/api/song_likes/update_song_dislike`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        }, 
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new Error('failed to fetch data');
    }
    setIsDisliked(!isDisliked)
    setDislikeLoading(false)
  }
 

  return (
    <div className='w-full container p-4  '>
      <div className='flex flex-col justify-between items-center p-4'>

        <div className='w-full  px-0 sm:px-12'>

          <div className='flex items-center justify-between w-full '>
            {isLiked? (
              <button 
              onClick={handleLike}
              disabled={isDisliked || likeLoading}
              className='mr-2 w-full  border-gray-600 border-2 bg-purple-800/25 text-white font-bold py-2 px-8 flex  items-center justify-center rounded-lg'
              >
                <ThumbsUp className='text-black' />
                <p className='ml-1 text-black'>{likeCount}</p>
              </button>
              
            ):(
            <button 
              onClick={handleLike}
              disabled={isDisliked || likeLoading}
              className='mr-2 w-full  border-gray-600 border-2 hover:bg-purple-800/25 text-white font-bold py-2 px-8 flex  items-center justify-center rounded-lg'
            >
                <ThumbsUp className='text-black' />
                <p className='ml-1 text-black'>{(likeCount > 999)? (Math.round(likeCount/100)/10 + "k"): (likeCount)}</p>
            </button>
            )
            }
            {isDisliked? (
              <button 
              onClick={handleDislike}
              disabled={isLiked || dislikeLoading}
              className='mr-2 w-full  border-gray-600 border-2 bg-purple-800/25 text-white font-bold py-2 px-8 flex  items-center justify-center rounded-lg'
              >
                <ThumbsDown className='text-black' />
              </button>
            ):(
            <button 
              onClick={handleDislike}
              disabled={isLiked || dislikeLoading}
              className='mr-2 w-full  border-gray-600 border-2 hover:bg-purple-800/25 text-white font-bold py-2 px-8 flex  items-center justify-center rounded-lg'
            >
                <ThumbsDown className='text-black' />
            </button>)
            }
           
            <ShareButton song_slug={props.song_slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeAndShareContainer;
