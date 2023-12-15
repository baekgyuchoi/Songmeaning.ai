
import React from 'react';

const PaymentContent: React.FC = () => {
    const text = `The creators of Songmeaning.AI are committed to delivering you the deepest and most comprehensive song meanings without ads cluttering your special introspective experience. 

    If we have enriched your life, please support our page by paying whatever makes you feel comfortable:) 
    
    Thank you for your support!  `
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
