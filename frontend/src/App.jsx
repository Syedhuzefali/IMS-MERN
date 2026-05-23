import './App.css';
import { useEffect, useState } from 'react';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct';
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('ims-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const rootElement = window.document.documentElement;
    rootElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('ims-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  return (

    <Router>

      <Navbar
        title="IMS"
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/insertproduct" element={<InsertProduct />} />

        <Route
          path="/updateproduct/:id"
          element={<UpdateProduct />}
        />

        <Route path="/about" element={<About />} />

      </Routes>

    </Router>

  );
}

export default App;