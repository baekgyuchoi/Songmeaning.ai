'use client'

import Image from 'next/image';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import Link from 'next/link';

// make 


interface Props {

}



const NordVPNCustom: React.FC<Props> = (props) => {
    // Define your component logic here
    
    

    return (
        <div className='sm:px-10'>
            <Link href="https://nordvpn.sjv.io/JzNbRQ" className=' w-full'>
            <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500/75 to-gray-100/75 rounded-lg p-4 mt-8 mb-8">
                <div className='flex w-full'>
                    <div className='w-1/3 flex  items-center justify-center p-3'>
                        <Image src="/NordVPNLogo.png" alt="Nord VPN" width={150} height={150} className='rounded-md' />  
                    </div>
                    
                    <div className="w-2/3 flex flex-col items-start justify-center text-center sm:text-base text-sm font-semibold">
                        
                        <CheckboxGroup isReadOnly={true} defaultValue={["1","2","3","4"]}>
                            <Checkbox value="1" isSelected={true} radius='full' color='secondary' size='lg'> Stay private and secure online </Checkbox>
                            <Checkbox value="2" isSelected={true} radius='full' color='secondary' size='lg'> Enjoy faster speeds for gaming and video streaming </Checkbox>
                            <Checkbox value="3" isSelected={true} radius='full' color='secondary' size='lg'> Get lower prices in online stores </Checkbox>
                            <Checkbox value="4" isSelected={true} radius='full' color='secondary' size='lg'> Change your location to anywhere you want </Checkbox>
                        </CheckboxGroup>                          
                                
                            
                
                    
                    </div>
                </div>
                <a href="https://nordvpn.sjv.io/JzNbRQ" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-2 text-sm sm:text-base sm:py-2 sm:px-4 sm:mt-0 mt-4 rounded hover:animate-none animate-pulse">
                    66% off NordVPN 
                </a>
            </div>
            </Link>
            
        </div>

    );
};

export default NordVPNCustom;
