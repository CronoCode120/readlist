import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCircleQuestion, faFeather } from '@fortawesome/free-solid-svg-icons';

export default function BookPage() {
  return (
    <>
      <header className='relative pb-[50px] px-5 bg-gray-900 w-full pt-6 flex flex-col justify-center items-center'>
        <div className='min-w-[150px] w-[33vw] max-w-[280px] aspect-[2/3] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg'></div>
        <span className='mt-4 h-[28px] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide w-[90%] sm:w-[45%] rounded-lg'></span>
        <span className='mt-1 h-[24px] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide w-[200px] rounded-lg'></span>
        <div className="custom-shape-divider-bottom overflow-x-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill"></path>
          </svg>
        </div>
      </header>
      <main className='w-full pb-6 max-sm:px-5 max-lg:px-10 px-[300px] flex flex-col justify-center items-center'>
        <span className='w-[180px] h-[40px] py-2 bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-full mt-2'></span>
        <section className='w-full mt-12'>
          <h2 className='font-semibold mb-2 text-base lg:text-xl'><FontAwesomeIcon icon={faBookOpen} className='mr-1 text-gray-400' size='lg' /> Sinopsis</h2>
          <span className='inline-block w-full h-[20px] lg:h-[24px] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg'></span>
        </section>
        <section className='mt-8 w-full'>
          <h2 id='details' className='font-semibold mb-2 text-base lg:text-xl'><FontAwesomeIcon icon={faCircleQuestion} className='mr-1 text-gray-400' size='lg' /> Más detalles</h2>
          <ul aria-labelledby='details' className='text-sm p-5 w-full bg-[rgb(12,12,12)] border border-gradient-to-l from-gray-800 via-gray-500 to-gray-800 bg-size-200 animate-slide rounded-2xl'>
            <li className='mb-2 flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>Género</h4>
              <span className='bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg w-[95px]'></span>
            </li>
            <li className='mb-2 flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>Año</h4>
              <span className='bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg w-[95px]'></span>
            </li>
            <li className='mb-2 flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>Páginas</h4>
              <span className='bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg w-[95px]'></span>
            </li>
            <li className='flex justify-between'>
              <h4 className='font-semibold text-sm lg:text-base'>ISBN</h4>
              <span className='bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg w-[95px]'></span>
            </li>
          </ul>
        </section>
        <section className='w-full mt-8'>
          <h2 className='flex items-center font-semibold mb-2 text-md lg:text-xl'><FontAwesomeIcon icon={faFeather} className='mr-1 text-gray-400' size='lg' /> Otros libros de <span className='inline-block w-[120px] rounded-lg h-[24px] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide ml-1'></span></h2>
          <span className='inline-block w-[250px] rounded-lg h-[20px] lg:h-[24px] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide'></span>
        </section>
      </main>
    </>
  );
}
