import React from 'react';
import PaymentContent from './PaymentContent';
import LinksContainer from './LinksContainer';
import { Card } from '@/components/ui/card';

interface PaymentContainerProps {
    // Define your component props here 
    song_slug: string;
}

const PaymentContainer: React.FC<PaymentContainerProps> = (props) => {
  return (
    <Card className='w-full container p-4 border-1 border-b-2 border-purple-800/25 bg-gray-50'>
      <div className='flex flex-col justify-between items-center p-4'>
        {/* Your component code here */}
        <div className='w-full ml-3'>
          <PaymentContent />
        </div>
        <div className='w-full px-0 sm:px-12'>
          <LinksContainer song_slug={props.song_slug} />
        </div>
      </div>
    </Card>
  );
};

export default PaymentContainer;
