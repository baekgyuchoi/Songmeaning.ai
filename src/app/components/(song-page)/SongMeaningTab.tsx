'use client'
import React, { useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import SongMeaningContent from "./SongMeaningContent";
import { SongInfo } from "@/lib/validators/song_info";
import SongPreviewContentv2 from "./SongPreviewContentv2";
import { useRouter } from "next/navigation";


type song_meaning = {
  summary: string,
  emotional_journey: String[],
  background: String[],
  quotes: any[],
}

type song_preview = {
  summary: string,
  emotional_journey: string,
  quotes: string
}



interface SongMeaningContentProps {
    // Define your component props here
    song_meaning: song_meaning
    song_meaning_preview: song_preview
    song_info: SongInfo
    is_meaning_flagged: boolean
    is_preview_flagged: boolean
}



function isMeaningValid(song_meaning: song_meaning) {

  if (song_meaning.summary == "" && song_meaning.background.length == 0 && song_meaning.emotional_journey.length == 0 && song_meaning.quotes.length == 0){

    return false
  }
  if (song_meaning.summary == "" || song_meaning.background.length < 2 || song_meaning.emotional_journey.length <= 2 || song_meaning.quotes.length < 3){
    console.log("flagged")
    //flag the meaning
  }
  return true
}

function isPreviewValid(song_meaning: song_preview) {

  if (song_meaning.summary == ""  && song_meaning.emotional_journey == "" && song_meaning.quotes == ""){

    return false
  }
  if (song_meaning.summary == ""  || song_meaning.emotional_journey == "" || song_meaning.quotes == ""){
    console.log("flagged")
    //flag the meaning
  }
  return true
}



const SongMeaningTab: React.FC<SongMeaningContentProps> = (props) => {
  // if there is meaning but no preview, then load in preview
  // if there is no meaning but preview, then load in meaning
  let defaultKey = "basic"
  const meaning = props.song_meaning
  const meaning_preview = props.song_meaning_preview
  let emotional_journey_content = meaning.emotional_journey
  let background_content = meaning.background

  if (typeof(emotional_journey_content) == "string"){
      emotional_journey_content = [emotional_journey_content]
  }

  if (typeof(background_content) == "string"){
      background_content = [background_content]
  }
  const is_meaning_valid = isMeaningValid(props.song_meaning)
  const is_preview_valid = isPreviewValid(props.song_meaning_preview)
  let tabs_disabled = false
  if (!is_meaning_valid && !is_preview_valid) {
    defaultKey = "basic"
    tabs_disabled = true
  }

  if(is_meaning_valid == true){
   
    defaultKey = "pro"
  }
  


  


    
  return (
  
      <Tabs aria-label="Options" variant="solid" color="default" defaultSelectedKey={defaultKey} isDisabled={tabs_disabled}>
        <Tab key="basic" title="Basic">
            {is_preview_valid ? (
              <>
                <div className='text-gray-800'>
                    <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                        {meaning_preview.summary}
                    </p>
                </div>
                <div className='text-gray-800 mt-10'>
                    <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                        <h1 className='text-xl font-semibold ml-2'>Song Meaning</h1>
                    </div>
                    <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                        {meaning_preview.emotional_journey}
                    </p>
                </div>
                <div className='text-gray-800 mt-10'>
                    <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                        {(meaning_preview.quotes == null) ? (<></>):(<h1 className='text-xl font-semibold ml-2'>Quotes</h1>)}
                    </div>
                    <div className="mx-2 mt-4">
                      {meaning_preview.quotes.split("\n").map((item,index)=>{
                              return(
                                  <p key={index} className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                                      {item}
                                  </p>
                              )
                      })}
                    </div>
                </div>


            </>
            ):(
              <SongMeaningContent song_info={props.song_info} />
            )}
            
       
        </Tab>
        <Tab key="pro" title="Pro">
          {is_meaning_valid ? (
            <>
              <div className='text-gray-800'>
                  <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                      {meaning.summary}
                      
                  </p>
              </div>
              <div className='text-gray-800 mt-10'>
                  <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                      <h1 className='text-xl font-semibold ml-2'>Song Meaning</h1>
                  </div>
                  {emotional_journey_content.map((item, i) => (
                      item.trim() && (
                          <p key={i} className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                              {item}
                          </p>
                      )
                  ))}
              </div>
              <div className='text-gray-800 mt-10'>
                  <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                      {(meaning.quotes == null) ? (<></>):(<h1 className='text-xl font-semibold ml-2'>Quotes</h1>)}
                  </div>
                  <div className="mx-2 mt-4">
                      {meaning.quotes.map((item, i) => (
                          <div key={i} className='mt-6'>
                              <p className='italic text-lg'>{`"${item.quote}"`}</p>
                              <p className='mt-2 text-base sm:text-lg leading-relaxed'>{item.explanation}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </>
          ):(
            <>
              <div className="h-80 flex flex-col mt-10 items-center justify-center text-black">
                
                <div className="text-center mt-10 px-4 py-8 bg-gradient-to-r from-blue-200 to-purple-200 text-black rounded-lg shadow-lg transform transition-all ">
                <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
                <p className="text-base leading-relaxed mb-1">
                    {"You are the first to explore this song\'s meaning, so we have not analyzed this song yet."}
                </p>
                <p className="text-base leading-relaxed mb-1">
                    {"In roughly 45 seconds, we will present you with by far the world\'s highest quality song meaning."}
                </p>
                <p className="text-base leading-relaxed">
                    {"Your patience unveils unparalleled depth. Thank you for being the first."}
                </p>
            </div>
              </div>
            </>
          )}
          
            

        </Tab>
      </Tabs>
   
  );
}

export default SongMeaningTab