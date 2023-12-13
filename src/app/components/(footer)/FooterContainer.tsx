
import React from 'react';

const FooterContainer: React.FC = () => {
  return (
    <div>
        <footer className="text-gray-500 relative text-sm">
            <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col items-center py-6 md:flex-row-reverse md:items-start md:justify-between md:pt-6'>
                    <div className='text-center md:text-right'>
                        <p className='mb-4 text-xs'>
                            Song Meaning Artificial Intelligence LLC
                        </p>
                    </div>
                    <div className='mt-5  flex items-center gap-4 text-xs text-tertiary md:mt-0'>
                        <a hidden href="media.songmeaning.ai">Blog</a>
                        <a href="mailto:admin@songmeaning.ai">Contact Us</a>
                        <a href="/TOS_songmeaning_ai.pdf">Terms of Service</a>
                        <a href="/privacy_policy_songmeaning_ai.pdf">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default FooterContainer;
