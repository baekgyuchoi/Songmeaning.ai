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
    <div className='flex justify-between items-center'>
      {/* Your component code here */}
      <div className='w-2/3 ml-3'>
        <PaymentContent />
      </div>
      <div className='w-1/3'>
        <LinksContainer song_slug={props.song_slug} />
      </div>
    </div>
    </Card>
  );
};

export default PaymentContainer;
