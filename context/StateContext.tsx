'use client';

import React, { useState, useContext, createContext, FC, useEffect } from 'react';

interface ReadListContext {
  readList: string[]
  addToReadList: (isbn: string) => void
  removeFromReadList: (isbn: string) => void
  initialRender: boolean
}

const Context = createContext<ReadListContext>({
  readList: [],
  addToReadList: () => {},
  removeFromReadList: () => {},
  initialRender: true
});

const StateContext: FC<React.PropsWithChildren> = ({ children }) => {
  const [readList, setReadList] = useState<string[]>([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      localStorage.setItem('readList', JSON.stringify(readList));
    }
  }, [readList, initialRender]);

  useEffect(() => {
    const savedList = localStorage.getItem('readList');
    if (savedList && savedList !== '') {
      setReadList(JSON.parse(savedList));
    }
    setInitialRender(false);
  }, []);

  const addToReadList = (isbn: string) => {
    if (readList.indexOf(isbn) === -1) {
      setReadList([...readList, isbn]);
    }
  }

  const removeFromReadList = (isbn: string) => {
    if (readList.indexOf(isbn) !== -1) {
      setReadList(() => readList.filter(book => book !== isbn));
    }
  }

  return (
    <Context.Provider value={{
      readList,
      addToReadList,
      removeFromReadList,
      initialRender
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);

export default StateContext
