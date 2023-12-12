'use client'
import Link from 'next/link';
import React from 'react';
import {Button} from "@nextui-org/react";


const PaymentLink: React.FC = () => {
  return (
    <>
    {/* <Link href={'https://buy.stripe.com/dR6aIo6RL0fSd6U144'}>
      <p className="text-lg underline font-mono mb-4 text-purple-800 hover:animate-none hover:text-purple-800/75 animate-pulse">
        Pay
      </p>
    </Link> */}
    <Link href={'https://buy.stripe.com/dR6aIo6RL0fSd6U144'}>
      <Button
        href={'https://buy.stripe.com/dR6aIo6RL0fSd6U144'}
        className='bg-gradient-to-tr from-purple-800 to-yellow-500 hover:bg-purple-800/75 text-white font-bold py-2 px-8 rounded-full'
        color="primary"
      >
          Pay   
      </Button>
    </Link>
    </>
    );
};

export default PaymentLink;
