import React, { FC } from 'react';
import Image from 'next/image';

type BookProps = {
  idx: number
  src: string
  title: string
}

const Book: FC<BookProps> = ({ idx, src, title }) => {
  return (
    <li id={idx.toString()} className='absolute w-[120px] h-[180px] transition-all duration-[500ms] opacity-0 z-[-20] rounded-lg overflow-hidden'>
      <Image
        src={src}
        alt={title}
        fill
        sizes='(max-width: 411px) 100vw, (max-width: 594px) 50vw, 33vw'
      />
    </li>
  );
};

export default Book;
