// components/Footer.tsx
import React from 'react';
import { AiOutlineHome, AiOutlineProfile } from 'react-icons/ai';
import { MdLocalOffer } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-white border-t fixed bottom-0 w-full max-w-[400px]">
            <div className="flex flex-col items-center">
                <AiOutlineHome size={24} />
                <span>Home</span>
            </div>
            <div className="flex flex-col items-center">
                <MdLocalOffer size={24} />
                <span>Courses</span>
            </div>
            <div className="flex flex-col items-center">
                <AiOutlineProfile size={24} />
                <span>About</span>
            </div>
        </div>
    );
};

export default Footer;