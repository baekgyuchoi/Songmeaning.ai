'use client'

import Image from 'next/image';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import Link from 'next/link';

// make 


interface Props {

}



const MusiciansFriendStupidDeal: React.FC<Props> = (props) => {
    // Define your component logic here
    
    

    return (

        <div className="w-full mx-auto my-8 p-6 bg-purple-200 text-gray-500 rounded-lg shadow-lg cursor-pointer hover:bg-purple-300 transition duration-300 ease-in-out" >
            <h2 className="text-xl font-bold mb-2">Stupid Deal of the Day</h2>
            <p className="text-base mb-4">{"Grab today's exclusive offer before its gone!"}</p>
            <div className="py-2 px-4 bg-blue-800 hover:bg-blue-900 rounded-full font-semibold transition duration-200">Shop Now</div>
        </div>

        // <div className='sm:px-10'>
        //     <Link href="https://musicians-friend.pxf.io/c/5301800/1970667/14291" className=' w-full'>
        //     <div className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-500 to-gray-100/75 rounded-lg p-4 mt-8 mb-8">
        //         <div className='flex w-full'>
        //             <div className='w-1/3 flex  items-center justify-center p-3'>
        //                 <Image src="/musiciansfriendlogo.jpeg" alt="Nord VPN" width={150} height={150} className='rounded-md' />  
        //             </div>
                    
        //             <div className="w-2/3 flex flex-col items-start justify-center text-center sm:text-base text-sm font-semibold">
                        
        //                 <CheckboxGroup isReadOnly={true} defaultValue={["1","2","3","4"]}>
        //                     <Checkbox value="1" isSelected={true} radius='full' color='secondary' size='lg'> Stay private and secure online </Checkbox>
        //                     <Checkbox value="2" isSelected={true} radius='full' color='secondary' size='lg'> Enjoy faster speeds for gaming and video streaming </Checkbox>
        //                     <Checkbox value="3" isSelected={true} radius='full' color='secondary' size='lg'> Get lower prices in online stores </Checkbox>
        //                     <Checkbox value="4" isSelected={true} radius='full' color='secondary' size='lg'> Change your location to anywhere you want </Checkbox>
        //                 </CheckboxGroup>                          
                                
                            
                
                    
        //             </div>
        //         </div>
        //         <a href="https://musicians-friend.pxf.io/c/5301800/1970667/14291" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-2 text-sm sm:text-base sm:py-2 sm:px-4 sm:mt-0 mt-4 rounded hover:animate-none animate-pulse">
        //             66% off NordVPN 
        //         </a>
        //     </div>
        //     </Link>
            
        // </div>

    );
};

export default MusiciansFriendStupidDeal;
