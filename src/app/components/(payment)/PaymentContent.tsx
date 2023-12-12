
import React from 'react';

const PaymentContent: React.FC = () => {
    const text = `Songmeaning.AI is dedicated to delivering in-depth interpretations of your favorite songs, free of charge. If we have enriched your life, please support us by either sharing with your community or paying whatever makes your feel comfortable :)`
  return (
    <div>
      {/* Your component content goes here */}
      {text.split('. ').map((sentence, index) => {
        return(<div key={index}>
            <p className="text-base font-mono mb-4">{sentence}</p>
        </div>)
      })}
     
    </div>
  );
};

export default PaymentContent;
