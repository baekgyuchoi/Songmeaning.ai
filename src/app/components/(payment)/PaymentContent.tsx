
import React from 'react';

const PaymentContent: React.FC = () => {
    const text = `The creators of Songmeaning.AI are dedicated to delivering our users the most deep and comprehensive song analysis without ads, and free of charge. `
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
