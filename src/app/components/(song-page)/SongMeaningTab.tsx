'use client'
import React, { useEffect } from "react";

import { Info, Loader2 } from "lucide-react";
import SongMeaningContent from "./SongMeaningContent";
import { SongInfo } from "@/lib/validators/song_info";
import SongPreviewContentv2 from "./SongPreviewContentv2";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import { set } from "zod";


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
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isProInfo, setIsProInfo] = React.useState(false);

 

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


  const buttonClick = (e: React.MouseEvent, num:number) => {
    if (num == 0) {
      setIsProInfo(true)
    }
    if (num == 1) {
      setIsProInfo(false)
    }
    e.stopPropagation();
    onOpen()

  }
  


    
  return (
    <Tabs defaultValue={defaultKey} >
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <div className="font-bold relative">
          <TabsTrigger value="basic" className="w-full" disabled={tabs_disabled}>
            Quick Meaning
          </TabsTrigger>
          <button onClick={(e) =>{buttonClick(e,0)}} className="absolute top-0 right-0 z-20">
            <Info size={16} className="text-gray-500" />
          </button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            
                <ModalContent className='bg-white border rounded-md'>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div className=''>
                            
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                              {
                                isProInfo ? (
                                  <p className='text-center font-mono text-sm'>
                                    {"Get an instant overview of your favorite song! Our Quick Meaning feature offers a speedy, basic interpretation that highlights the key themes and messages of the song. Ideal for a fast, surface-level understanding, this feature is perfect for those curious about a song's general context. It's quick, easy, and gives you a basic grasp of the song's meaning in seconds!"}
                                  </p>
                                ):(
                                  <p className='text-center font-mono text-sm'>
                                    {"Dive deep into the essence of your favorite songs with our Pro Meaning analysis! This premium feature meticulously dissects every lyric, melody, and beat to provide you with the world's highest quality song interpretation. Tailored for the patient and passionate music enthusiast, it takes about a minute to load but reveals unparalleled depth and insight. Experience the song like never before, understanding its every nuance and subtlety with Pro Meaning."}
                                  </p>
                                )
                              }
                              
                            </div>
                            
                            
                    
                        </ModalBody>
                        <ModalFooter>
                            <Button className='font-mono underline text-xs' onPress={onClose}>
                                close
                            </Button>
                        </ModalFooter>
                    </>
                )}
                </ModalContent>
            
            </Modal>
          </div>
          <div className="font-bold relative">
          <TabsTrigger value="pro" className={`w-full`} disabled={tabs_disabled}>

            {is_meaning_valid? (<></>) : (<Loader2 size={16} className="mr-2 text-gray-500 animate-spin" />)}
            Pro Meaning

          </TabsTrigger>
          <button onClick={(e) =>{buttonClick(e,1)}} className="absolute top-0 right-0 z-20">
            <Info size={16} className="text-gray-500" />
          </button>
         
          </div>
        
        
        
      </TabsList>
        <TabsContent value="basic" className="font-bold">
            {is_preview_valid ? (
              <div className="font-normal">
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


            </div>
            ):(
              <div className="font-normal">
                <SongMeaningContent song_info={props.song_info} />
              </div>
            )}
            
       
        </TabsContent>
        <TabsContent value="pro" className="font-bold">
          {is_meaning_valid ? (
            <div className="font-normal">
              <div className='text-gray-800 '>
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
            </div>
          ):(
            <>
              <div className="flex items-center justify-center mt-14">
                <Loader2 size={54} className="text-purple-800 animate-spin" />
              </div>
              <div className="h-80 flex flex-col  items-center justify-center text-black font-normal">
                
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
          
            

        </TabsContent>
      </Tabs>
  
      // <Tabs aria-label="Options" variant="solid" color="default" defaultSelectedKey={defaultKey} isDisabled={tabs_disabled} className=" border-1 border-double border-b-4 border-purple-800 rounded-md">
      //   <Tab key="basic" title="Quick Meaning" className="font-bold">
      //       {is_preview_valid ? (
      //         <div className="font-normal">
      //           <div className='text-gray-800'>
      //               <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
      //                   {meaning_preview.summary}
      //               </p>
      //           </div>
      //           <div className='text-gray-800 mt-10'>
      //               <div className='w-full flex justify-start border-b border-gray-300 py-2'>
      //                   <h1 className='text-xl font-semibold ml-2'>Song Meaning</h1>
      //               </div>
      //               <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
      //                   {meaning_preview.emotional_journey}
      //               </p>
      //           </div>
      //           <div className='text-gray-800 mt-10'>
      //               <div className='w-full flex justify-start border-b border-gray-300 py-2'>
      //                   {(meaning_preview.quotes == null) ? (<></>):(<h1 className='text-xl font-semibold ml-2'>Quotes</h1>)}
      //               </div>
      //               <div className="mx-2 mt-4">
      //                 {meaning_preview.quotes.split("\n").map((item,index)=>{
      //                         return(
      //                             <p key={index} className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
      //                                 {item}
      //                             </p>
      //                         )
      //                 })}
      //               </div>
      //           </div>


      //       </div>
      //       ):(
      //         <div className="font-normal">
      //           <SongMeaningContent song_info={props.song_info} />
      //         </div>
      //       )}
            
       
      //   </Tab>
      //   <Tab key="pro" title="Pro Meaning" className="font-bold">
      //     {is_meaning_valid ? (
      //       <div className="font-normal">
      //         <div className='text-gray-800 '>
      //             <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
      //                 {meaning.summary}
                      
      //             </p>
      //         </div>
      //         <div className='text-gray-800 mt-10'>
      //             <div className='w-full flex justify-start border-b border-gray-300 py-2'>
      //                 <h1 className='text-xl font-semibold ml-2'>Song Meaning</h1>
      //             </div>
      //             {emotional_journey_content.map((item, i) => (
      //                 item.trim() && (
      //                     <p key={i} className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
      //                         {item}
      //                     </p>
      //                 )
      //             ))}
      //         </div>
      //         <div className='text-gray-800 mt-10'>
      //             <div className='w-full flex justify-start border-b border-gray-300 py-2'>
      //                 {(meaning.quotes == null) ? (<></>):(<h1 className='text-xl font-semibold ml-2'>Quotes</h1>)}
      //             </div>
      //             <div className="mx-2 mt-4">
      //                 {meaning.quotes.map((item, i) => (
      //                     <div key={i} className='mt-6'>
      //                         <p className='italic text-lg'>{`"${item.quote}"`}</p>
      //                         <p className='mt-2 text-base sm:text-lg leading-relaxed'>{item.explanation}</p>
      //                     </div>
      //                 ))}
      //             </div>
      //         </div>
      //       </div>
      //     ):(
      //       <>
      //         <div className="h-80 flex flex-col mt-10 items-center justify-center text-black font-normal">
                
      //           <div className="text-center mt-10 px-4 py-8 bg-gradient-to-r from-blue-200 to-purple-200 text-black rounded-lg shadow-lg transform transition-all ">
      //           <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
      //           <p className="text-base leading-relaxed mb-1">
      //               {"You are the first to explore this song\'s meaning, so we have not analyzed this song yet."}
      //           </p>
      //           <p className="text-base leading-relaxed mb-1">
      //               {"In roughly 45 seconds, we will present you with by far the world\'s highest quality song meaning."}
      //           </p>
      //           <p className="text-base leading-relaxed">
      //               {"Your patience unveils unparalleled depth. Thank you for being the first."}
      //           </p>
      //       </div>
      //         </div>
      //       </>
      //     )}
          
            

      //   </Tab>
      // </Tabs>
   
  );
}

export default SongMeaningTab