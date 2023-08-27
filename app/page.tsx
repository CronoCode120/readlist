'use client';

import { useEffect, useState } from 'react';
import { LoadingItem, Readlist } from '@/components';
import booksData from '@/public/books.json';
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

type Author = {
  name: string
  otherBooks: string[]
}

export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: Author
}

const enum Genre {
  Fantasy = 'Fantasía',
  SciFi = 'Ciencia Ficción',
  Horror = 'Terror',
  Zombies = 'Zombies',
  Any = ''
}

enum Sort {
  MorePages = 0,
  LessPages = 1,
  Recent = 2,
  Older = 3
}

type Filter = {
  genre: Genre
  sorting: Sort
}

export default function Home() {
  const { readList, addToReadList, initialRender } = useStateContext();
  const library = booksData.library.filter(bookObj => !readList.includes(bookObj.book.ISBN));
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filter>({
    genre: Genre.Any,
    sorting: Sort.MorePages
  })

  const [showList, setShowList] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.currentTarget.value;
    setQuery(newQuery);
  }

  const search = (bookObj: {book: Book}) => {
    const searchQuery = new RegExp(query, 'ig');
    const checkTitle = searchQuery.test(bookObj.book.title);
    const checkAuthor = searchQuery.test(bookObj.book.author.name);
    const checkGenre = searchQuery.test(bookObj.book.genre);

    if (checkTitle || checkAuthor || checkGenre) return true;
    return false;
  }

  const changeGenreFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as unknown as Genre;
    setFilters(prevFilters => ({ ...prevFilters, genre: value }));
  }

  const changeSortFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as unknown as Sort;
    setFilters(prevFilters => ({ ...prevFilters, sorting: value }));
  }

  const genreRegex = new RegExp(filters.genre, 'i');
  const searchResults = library.filter(book => genreRegex.test(book.book.genre)).filter(book => search(book));

  const sortResults = () => {
    let sortedArr;
    if (filters.sorting == Sort.MorePages) {
      sortedArr = searchResults.sort((book1, book2) => book2.book.pages - book1.book.pages);
    } else if (filters.sorting == Sort.LessPages) {
      sortedArr = searchResults.sort((book1, book2) => book1.book.pages - book2.book.pages);
    } else if (filters.sorting == Sort.Recent) {
      sortedArr = searchResults.sort((book1, book2) => book2.book.year - book1.book.year);
    } else if (filters.sorting == Sort.Older) {
      sortedArr = searchResults.sort((book1, book2) => book1.book.year - book2.book.year);
    }
    if (typeof sortedArr !== 'undefined') return sortedArr;
    throw new Error('Unexpected error in sorting');
  }

  const finalResults = sortResults();

  const toggleList = () => {
    if (!showList) {
      setShowList(true);
      document.body.style.overflow = 'hidden';
      const btn = document.getElementById('listBtn');
      if (btn instanceof HTMLButtonElement) btn.style.opacity = '0';
      setTimeout(() => {
        const wrapper = document.getElementById('list-wrapper');
        const container = document.getElementById('list-container');
        if (wrapper instanceof HTMLDivElement) wrapper.style.backgroundColor = 'rgba(0,0,0,.7)';
        if (container instanceof HTMLElement) {
          container.style.right = '0';
          container.style.boxShadow = '0 0 20px 1px gray';
        }
      }, 100);
    } else {
      const wrapper = document.getElementById('list-wrapper');
      const container = document.getElementById('list-container');
      const btn = document.getElementById('listBtn');
      if (wrapper instanceof HTMLDivElement) wrapper.style.backgroundColor = 'rgba(0,0,0,0)';
      if (container instanceof HTMLElement) {
        container.style.right = '-100%';
        container.style.boxShadow = '0 0 0 0';
      }
      if (btn instanceof HTMLButtonElement) btn.style.opacity = '1';
      document.body.style.overflow = 'auto';
      setTimeout(() => setShowList(false), 600);
    }
  }

  const handleAddBook = (isbn: string) => {
    const bookElement = document.getElementById(isbn);
    if (bookElement instanceof HTMLLIElement) {
      bookElement.style.height = '0';
      bookElement.style.opacity = '0';
      bookElement.style.marginBottom = '0';
    }

    setTimeout(() => {
      addToReadList(isbn);
    }, 500);
  }

  return (
    <>
      <Navbar handleSearch={handleSearch} changeGenreFilter={changeGenreFilter} changeSortFilter={changeSortFilter} />
      <main className='relative w-full'>
        <section className='w-full'>
        {finalResults.length
          ? (
            <ul className='w-full grid grid-cols-[repeat(auto-fill,150px)] gap-[0_32px] justify-center px-10 pb-10 mt-6'>
            {finalResults.map((obj, idx) => initialRender
              ? (
                <LoadingItem key={idx}/>
                )
              : (
                <li key={obj.book.ISBN} id={obj.book.ISBN} className='relative w-full mb-12 opacity-1 transition-all duration-[400ms] group'>
                  <div className='rounded-lg hover:bg-white hover:text-black transition-all duration-300'>
                    <Link href={`/${obj.book.ISBN}`}>
                      <div className='relative w-full aspect-[2/3]'>
                        <Image
                          src={obj.book.cover}
                          alt={obj.book.title}
                          fill
                          sizes='(max-width: 411px) 100vw, (max-width: 594px) 50vw, 33vw'
                          priority
                          className='rounded-lg w-full h-auto'
                        />
                      </div>
                      <p className='font-semibold text-center text-md py-2'>{obj.book.title}</p>
                    </Link>
                    <button
                      type='button'
                      aria-label='Añadir a mi lista'
                      title='Añadir a mi lista'
                      onClick={() => handleAddBook(obj.book.ISBN)}
                      className='peer group/addBtn absolute top-1 right-1 bg-white w-[40px] h-[40px] rounded-full shadow-lg shadow-gray-300 lg:hidden lg:group-hover:block'
                    >
                      <FontAwesomeIcon icon={faBookmark} size='xl' color='black' className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]' />
                      <FontAwesomeIcon icon={faSolidBookmark} size='xl' color='black' className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] hidden group-hover/addBtn:inline' />
                    </button>
                  </div>
                </li>
                )
            )}
            </ul>
            )
          : (
              library.length
                ? (
                <div className='h-[50vh] px-10 flex flex-col items-center justify-center'>
                  <p className='font-bold text-3xl mb-3'>Vaya...</p>
                  <p className='text-sm text-center font-semibold'>No hay resultados {query && <span>para <span className='italic'>&quot;{query}&quot;</span></span>} {filters.genre !== Genre.Any && <span>en el género &quot;{filters.genre}&quot;</span>}
                  .</p>
                  <span className='mt-4'><FontAwesomeIcon icon={faCircleXmark} size='2xl' /></span>
                </div>)
                : (
                  <div className='h-[50vh] px-10 flex flex-col items-center justify-center'>
                    <p className='font-bold text-3xl mb-3'>No hay libros disponibles</p>
                    <p className='text-sm text-center font-semibold'>Ya has agregado todos los libros disponibles a tu lista de lectura.</p>
                  </div>)
            )
        }
          <button
            type='button'
            id='listBtn'
            onClick={toggleList}
            className={`fixed bottom-6 left-[50%] translate-x-[-50%] bg-gray-200 hover:bg-white text-black font-medium rounded-lg py-2 px-4 shadow-xl shadow-gray-500 transition-all duration-300 flex justify-between items-center gap-[0_6px] ${initialRender && 'opacity-0'}`}
          >
            Mi lista <span className='inline-block text-sm text-white bg-black w-[20px] h-[20px] flex justify-center items-center aspect-square rounded-full'>{readList.length}</span>
          </button>
        </section>
        {showList && <Readlist toggleList={toggleList} />}
      </main>
    </>
  );
}

interface NavbarProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  changeGenreFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
  changeSortFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Navbar = ({ handleSearch, changeGenreFilter, changeSortFilter }: NavbarProps) => {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilters = () => {
    setShowFilter(prevState => !prevState);
  }

  useEffect(() => {
    const container = document.getElementById('filter-container');
    if (container instanceof HTMLDivElement) {
      if (!showFilter) {
        container.style.height = '0';
        container.style.padding = '0 40px';
        container.style.opacity = '0';
        setTimeout(() => {
          container.inert = true;
        }, 100);
      } else {
        container.inert = false;
        setTimeout(() => {
          container.style.height = '176px';
          container.style.padding = '16px 40px';
          container.style.opacity = '1';
        }, 100);
      }
    }
  }, [showFilter]);

  return (
    <header className='w-full'>
      <nav className='flex flex-col justify-center items-center'>
        <div className='flex items-center h-[45px] w-[260px] border border-gray-400 rounded-xl mt-4 focus-within:shadow-[inset_0_0_1px_2px_rgb(209,213,219)] transition-all duration-200'>
          <input
            type='text'
            placeholder='Buscar'
            aria-label='Buscar'
            onChange={handleSearch}
            className='bg-transparent rounded-l-full px-3 w-[80%] h-full outline-none'
          />

          <span className='h-[45px] w-[20%] rounded-full flex justify-center items-center'>
            <FontAwesomeIcon icon={faSearch} size='lg' className='text-gray-300' />
          </span>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <button
            type='button'
            onClick={toggleFilters}
            className='text-sm text-gray-900 font-medium bg-[length:100%_200%] bg-[center_-1px] bg-gradient-to-b from-gray-500 via-gray-300 via-[50%] to-white text-black shadow-lg shadow-gray-700 hover:bg-[center_99%] hover:shadow-gray-500 p-2 rounded-full mt-3 transition-all duration-300'
          >
            <FontAwesomeIcon icon={faFilter} size='lg' /> {showFilter ? 'Ocultar' : 'Mostrar'} filtros
          </button>
          <div id='filter-container' className='px-10 opacity-0 h-0 transition-all duration-300'>
            <div className='w-full mb-4'>
              <label htmlFor='genre-filter' className='block mb-1'>Género</label>
              <select
                id='genre-filter'
                defaultValue={Genre.Any}
                onChange={changeGenreFilter}
                className='bg-[rgb(12,12,12)] border border-gray-800 rounded-lg p-2 text-sm'
              >
                <option value={Genre.Any}>Cualquiera</option>
                <option value={Genre.Fantasy}>Fantasía</option>
                <option value={Genre.Horror}>Terror</option>
                <option value={Genre.SciFi}>Ciencia ficción</option>
                <option value={Genre.Zombies}>Zombies</option>
              </select>
            </div>
            <div className='w-full'>
              <label htmlFor='sort-order' className='block mb-1'>Ordenar por</label>
              <select
                id='sort-order'
                defaultValue={Sort.MorePages}
                onChange={changeSortFilter}
                className='bg-[rgb(12,12,12)] border border-gray-800 rounded-lg p-2 text-sm'
              >
                <option value={Sort.MorePages}>Mayor a menor número de pag.</option>
                <option value={Sort.LessPages}>Menor a mayor número de pag.</option>
                <option value={Sort.Recent}>Más reciente a más antiguo</option>
                <option value={Sort.Older}>Más antiguo a más reciente</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
