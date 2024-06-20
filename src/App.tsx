import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router';
import useStore from './hooks/useStore';

const App = () => {
  const { darkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !darkMode) {
      toggleDarkMode();
    }
  }, []);
  
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
};

export default App;
