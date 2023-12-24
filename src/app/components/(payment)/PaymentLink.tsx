
import Link from 'next/link';
import React from 'react';



const PaymentLink: React.FC = () => {
  return (
    <>
    {/* <Link href={'https://buy.stripe.com/dR6aIo6RL0fSd6U144'}>
      <p className="text-lg underline font-mono mb-4 text-purple-800 hover:animate-none hover:text-purple-800/75 animate-pulse">
        Pay
      </p>
    </Link> */}
    <Link href={'https://buy.stripe.com/dR6aIo6RL0fSd6U144'}>
      <div
        
        className='bg-purple-600/75 hover:bg-purple-800/75 text-white font-bold py-2 px-12 rounded-full'
       
      >
          Pay it Forward
      </div>
    </Link>
    </>
    );
};

export default PaymentLink;
