'use client';

import React, { useEffect, useState } from 'react';
import { Book } from '.';
import booksData from '@/public/books.json';
import { useStateContext } from '@/context/StateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

const Readlist = ({ toggleList }: {toggleList: () => void}) => {
  const [listIndex, setListIndex] = useState(0);

  const library = booksData.library;
  const { readList, initialRender, removeFromReadList } = useStateContext();
  const listBooks = library.filter(bookObj => readList.includes(bookObj.book.ISBN));

  const actionCooldown = () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn instanceof HTMLButtonElement && nextBtn instanceof HTMLButtonElement) {
      prevBtn.style.pointerEvents = 'none';
      nextBtn.style.pointerEvents = 'none';
      setTimeout(() => {
        prevBtn.style.pointerEvents = 'auto';
        nextBtn.style.pointerEvents = 'auto';
      }, 300);
    }
  }

  const handleNextBook = () => {
    actionCooldown();
    setListIndex(prevIndex => {
      if (prevIndex < listBooks.length - 1) {
        return ++prevIndex;
      }
      return 0;
    });
  }

  const handlePrevBook = () => {
    actionCooldown();
    setListIndex(prevIndex => {
      if (prevIndex > 0) {
        return --prevIndex;
      }
      return listBooks.length - 1;
    });
  }

  useEffect(() => {
    if (!initialRender) {
      const curBook = listBooks.length > 1
        ? document.getElementById(`${listIndex}`)
        : document.getElementById('0')
      ;

      let prevBook, nextBook;
      if (listBooks.length > 2) {
        prevBook = listIndex > 0
          ? document.getElementById(`${listIndex - 1}`)
          : document.getElementById(`${listBooks.length - 1}`)
        ;

        nextBook = listIndex < listBooks.length - 1
          ? document.getElementById(`${listIndex + 1}`)
          : document.getElementById('0')
        ;
      } else {
        if (listIndex === 0) {
          nextBook = document.getElementById('1');
          prevBook = null;
        } else {
          prevBook = document.getElementById('0');
          nextBook = null;
        }
      }

      const beforePrev = listIndex > 1
        ? document.getElementById(`${listIndex - 2}`)
        : document.getElementById(`${listBooks.length - (2 - listIndex)}`)
      ;

      const afterNext = listIndex < listBooks.length - 2
        ? document.getElementById(`${listIndex + 2}`)
        : document.getElementById(`${2 - (listBooks.length - listIndex)}`)
      ;

      if (beforePrev instanceof HTMLLIElement && listBooks.length > 3) {
        beforePrev.style.left = '-20%';
        beforePrev.style.top = '45%';
        beforePrev.style.transform = 'translateX(-50%) rotate(-30deg)';
        beforePrev.style.opacity = '0';
      }

      if (prevBook instanceof HTMLLIElement) {
        prevBook.style.left = '0';
        prevBook.style.top = '30%';
        prevBook.style.transform = 'translateX(-50%) rotate(-25deg)';
        prevBook.style.opacity = '0.75';
        prevBook.style.zIndex = '10';
      }

      if (curBook instanceof HTMLLIElement) {
        curBook.style.left = '50%';
        curBook.style.top = '0';
        curBook.style.transform = 'translateX(-50%)';
        curBook.style.opacity = '1';
        curBook.style.zIndex = '20';
      }

      if (nextBook instanceof HTMLLIElement) {
        nextBook.style.left = '100%';
        nextBook.style.top = '30%';
        nextBook.style.transform = 'translateX(-50%) rotate(25deg)';
        nextBook.style.opacity = '0.75';
        nextBook.style.zIndex = '10';
      }

      if (afterNext instanceof HTMLLIElement && listBooks.length > 3) {
        afterNext.style.left = '120%';
        afterNext.style.top = '45%';
        afterNext.style.transform = 'translateX(-50%) rotate(30deg)';
        afterNext.style.opacity = '0';
      }
    }
  }, [listIndex, initialRender, readList]);

  const handleRemoveBook = () => {
    removeFromReadList(listBooks[listIndex].book.ISBN);
    if (listIndex === listBooks.length - 1) setListIndex(prevIndex => prevIndex - 1);
  }

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target;
    if (target instanceof HTMLDivElement) {
      const targetId = target.id;
      if (targetId === 'list-wrapper') {
        toggleList();
      }
    }
  }

  return (
    <div id='list-wrapper' onClick={e => handleClick(e)} className='fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0)] transition-all duration-300'>
      <section id='list-container' className='fixed top-1/2 -translate-y-1/2 right-[-100%] w-full max-w-[400px] h-full max-h-[1000px] bg-[rgba(20,20,20,.8)] backdrop-blur-[10px] z-40 border-[2px] border-r-0 border-gray-500 rounded-l-2xl overflow-y-hidden transition-all duration-[500ms] flex flex-col justify-evenly items-center overscroll-none'>
        <button
          type='button'
          onClick={toggleList}
          className='bg-gray-200 hover:bg-white text-black rounded-lg py-2 px-4 shadow-xl shadow-gray-500 transition-all duration-200'
        >
          Explorar
        </button>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='relative h-fit w-full flex flex-col justify-center items-center mb-4'>
            {listBooks.length > 0 && listBooks[listIndex]
              ? (<h2 className='w-fit max-w-[80vw] h-[60px] text-center font-semibold text-xl flex justify-center items-end'>{listBooks[listIndex].book.title}</h2>)
              : (<h2 className='w-fit max-w-[80vw] h-[60px] text-center text-xl font-semibold flex justify-center items-end'>Tu lista está vacía</h2>)
            }
            {listBooks.length > 0
              ? (<ul className='relative w-full h-[330px] flex justify-center items-center overflow-x-hidden overflow-y-hidden mt-6'>
                  {listBooks.map((item, idx) => (
                    <Book key={item.book.ISBN} idx={idx} src={item.book.cover} title={item.book.title} />
                  ))}
                </ul>)
              : (<p className='text-center px-10 text-sm text-gray-300'>Aún no has añadido libros a tu lista de lectura.</p>)
            }
          </div>
          {listBooks.length > 0 && (
          <div className='flex flex-col items-center'>
            <ul className='w-[280px] flex justify-center items-center mb-4 gap-x-1.5'>
              {listBooks.map((book, idx) => (
                <li
                  key={idx}
                  className={`
                    ${idx === listIndex
                      ? 'w-[16px] bg-white'
                      : 'w-[9px] bg-gray-500'
                    }
                    h-[9px] rounded-full transition-all duration-300
                  `}
                ></li>
              ))}
            </ul>

            <div className='w-full flex justify-between'>
              <button
                id='prev-btn'
                type='button'
                aria-label='Previous book'
                title='Previous book'
                className='group bg-gradient-to-br from-gray-500 to-gray-300 w-[60px] h-[45px] rounded-full active:bg-gradient-to-r active:from-white active:to-white transition-all duration-300'
                onClick={handlePrevBook}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} size='2xl' color='black' aria-labelledby='prev-btn' className=' transition-all duration-300' />
              </button>

              <Link
                href={listBooks[listIndex] ? `/${listBooks[listIndex].book.ISBN}` : '/'}
                onClick={toggleList}
                className='text-md flex justify-center gap-x-1.5 items-center bg-black hover:bg-white hover:text-black px-2 py-2 rounded-full border-[1px] transition-all duration-200'
              >
                <FontAwesomeIcon icon={faCircleInfo} size='lg' /> Ver detalles
              </Link>

              <button
                id='next-btn'
                type='button'
                aria-label='Next book'
                title='Next book'
                className='group bg-gradient-to-bl from-gray-500 to-gray-300 w-[60px] h-[45px] rounded-full active:bg-gradient-to-r active:from-white active:to-white transition-all duration-300'
                onClick={handleNextBook}
              >
                <FontAwesomeIcon icon={faArrowRightLong} size='2xl' color='black' aria-labelledby='next-btn' className='transition-all duration-300' />
              </button>
            </div>
            <button
              type='button'
              onClick={handleRemoveBook}
              className='bg-transparent font-medium px-2 py-1 rounded-full mt-4 text-red-400 border border-transparent hover:border-red-400 transition-all duration-300'
            >
              <FontAwesomeIcon icon={faCircleXmark} size='lg' className='text-red-400' /> Quitar de mi lista
            </button>
          </div>)
          }
        </div>
      </section>
    </div>
  );
};

export default Readlist;
