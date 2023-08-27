'use client';

import { useEffect, useState } from 'react';
import { useStateContext } from '@/context/StateContext';
import booksData from '@/public/books.json';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faBookOpen, faCircleQuestion, faPlus, faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../page';
import Link from 'next/link';

export async function generateStaticParams() {
  return booksData.library.map((item: { book: Book }) => (
    {
      ISBN: item.book.ISBN
    }
  ));
}

function getBook(isbn: string) {
  const book = booksData.library.find((item: { book: Book }) => item.book.ISBN === isbn);

  if (typeof book !== 'undefined') return book.book;

  throw new Error('Book not found');
}

export default function BookPage({ params }: { params: { ISBN: string } }) {
  const { readList, addToReadList, removeFromReadList, initialRender } = useStateContext();

  const [onList, setOnList] = useState(false);

  const toggleOnList = () => {
    if (!onList) {
      addToReadList(ISBN);
    } else {
      removeFromReadList(ISBN);
    }
    setOnList(prevOnList => !prevOnList);
  }

  const { ISBN } = params;
  const book = getBook(ISBN);

  useEffect(() => {
    if (!initialRender) {
      const bookOnList = readList.find(isbn => isbn === ISBN);
      if (bookOnList) setOnList(true);
    }
  }, [readList, initialRender]);

  return (
    <>
      <header className='relative pb-[50px] px-5 bg-gray-900 w-full pt-6 flex flex-col justify-center items-center'>
        <div className='relative min-w-[150px] w-[33vw] max-w-[280px] aspect-[2/3]'>
          <Image
            src={book && book.cover}
            alt='Portada'
            fill
            sizes='(max-width: 400px) 100vw, (max-width: 500px) 50vw, 33vw'
            priority
            className='rounded-lg'
          />
        </div>
        <h1 className='font-semibold text-xl text-center mt-4'>{book.title}</h1>
        <h2 className='text-gray-300 mt-1'>{book.author.name}</h2>
        <div className="custom-shape-divider-bottom overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill overflow-hidden w-full"></path>
          </svg>
        </div>
        <Link
          href={'/'}
          aria-label='Volver a inicio'
          title='Volver'
          className='absolute top-5 left-5 sm:top-10 sm:left-10 flex justify-between items-center gap-3 group'
        >
          <FontAwesomeIcon icon={faChevronLeft} size='xl' className='group-hover:translate-x-[-6px] transition-all duration-200' /><p className='hidden sm:inline-block'>Volver</p>
        </Link>
      </header>
      <main className='w-full pb-6 max-sm:px-5 max-lg:px-10 px-[300px] flex flex-col justify-center items-center'>
        <button type='button' onClick={toggleOnList} className={`w-[180px] py-2 flex justify-center items-center text-center rounded-full  transition-all duration-300 mt-2 ${onList ? 'bg-transparent border border-white text-white shadow-none' : 'bg-[length:100%_200%] bg-[center_-1px] bg-gradient-to-b from-gray-500 via-gray-300 via-[50%] to-white text-black shadow-lg shadow-gray-700 hover:bg-[center_99%] hover:shadow-gray-500 border border-transparent'}`}>
          <FontAwesomeIcon icon={faPlus} size='lg' className={`transition-all duration-300 mr-2 ${onList ? 'rotate-[225deg]' : 'rotate-0'}`} /> {onList ? 'Quitar de mi lista' : 'Añadir a mi lista'}
        </button>
        {onList && <p id='onListMsg' className='mt-2 text-sm text-gray-400'><FontAwesomeIcon icon={faCheck} /> Guardado</p>}
        <section className='w-full mt-12'>
          <h2 className='font-semibold mb-2 text-base lg:text-xl'><FontAwesomeIcon icon={faBookOpen} className='mr-1 text-gray-400' size='lg' /> Sinopsis</h2>
          <p className='text-sm lg:text-base text-gray-300'>{book.synopsis}</p>
        </section>
        <section className='mt-8 w-full'>
          <h2 id='details' className='font-semibold mb-2 text-base lg:text-xl'><FontAwesomeIcon icon={faCircleQuestion} className='mr-1 text-gray-400' size='lg' /> Más detalles</h2>
          <ul aria-labelledby='details' className='text-sm p-5 w-full bg-[rgb(12,12,12)] border border-gray-800 rounded-2xl'>
            <li className='mb-2 flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>Género</h4>
              <p className='text-gray-300 text-sm lg:text-base'>{book.genre}</p>
            </li>
            <li className='mb-2 flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>Año</h4>
              <p className='text-gray-300 text-sm lg:text-base'>{book.year}</p>
            </li>
            <li className='mb-2 flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>Páginas</h4>
              <p className='text-gray-300 text-sm lg:text-base'>{book.pages}</p>
            </li>
            <li className='flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>ISBN</h4>
              <p className='text-gray-300 text-sm lg:text-base'>{book.ISBN}</p>
            </li>
          </ul>
        </section>
        <section className='w-full mt-8'>
          <h2 className='font-semibold mb-2 text-base lg:text-xl'><FontAwesomeIcon icon={faFeather} className='mr-1 text-gray-400' size='lg' /> Otros libros de {book.author.name}</h2>
          <p className='text-sm lg:text-base text-gray-300'>{book?.author && book.author.otherBooks.join(', ')}</p>
        </section>
      </main>
    </>
  );
}
