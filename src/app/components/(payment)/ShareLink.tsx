import Link from 'next/link';
import React from 'react';

const ShareLink: React.FC = () => {
  return (
    <div>
      {/* Your component code here */}
      <Link href={''}>
        <p className="text-base underline font-mono mb-2 text-purple-800 hover:text-purple-800/75 ">
          Share
        </p>
      </Link>
    </div>
  );
};

export default ShareLink;
