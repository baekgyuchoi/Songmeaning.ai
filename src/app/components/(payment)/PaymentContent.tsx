
import React from 'react';

const PaymentContent: React.FC = () => {
    const text = `The creators of Songmeaning.AI are dedicated to delivering our users the most deep and comprehensive song analysis without ads, and free of charge. \n\n If Songmeaning.ai has brought value to you, please show support by sharing the page or paying what you think it's worth. \n\n Thank you for your support! `
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
