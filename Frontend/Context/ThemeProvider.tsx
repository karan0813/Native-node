import axios from 'axios';
import React, {createContext, useState, useContext} from 'react';

// Create a Theme Context
export const ThemeContext = createContext<any>(undefined);

export const ThemeProvider = ({children}: any) => {
  const [state, setstate] = useState({});
  const [count, setCount] = useState(0);

  const {token}: any = state;

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <ThemeContext.Provider value={[state, setstate, count, setCount]}>
      {children}
    </ThemeContext.Provider>
  );
};
