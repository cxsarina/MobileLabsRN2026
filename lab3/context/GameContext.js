import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('light');
  const [themeChanges, setThemeChanges] = useState(0);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Зробити 10 кліків', target: 10, current: 0, completed: false, type: 'tap' },
    { id: 2, title: 'Зробити подвійний клік 5 разів', target: 5, current: 0, completed: false, type: 'doubleTap' },
    { id: 3, title: 'Утримувати об\'єкт 3 секунди', target: 1, current: 0, completed: false, type: 'longPress' },
    { id: 4, title: 'Перетягнути об\'єкт', target: 1, current: 0, completed: false, type: 'pan' },
    { id: 5, title: 'Зробити свайп вправо', target: 1, current: 0, completed: false, type: 'flingRight' },
    { id: 6, title: 'Зробити свайп вліво', target: 1, current: 0, completed: false, type: 'flingLeft' },
    { id: 7, title: 'Змінити розмір об\'єкта', target: 1, current: 0, completed: false, type: 'pinch' },
    { id: 8, title: 'Отримати 100 очок', target: 100, current: 0, completed: false, type: 'score' },
    { id: 9, title: 'Змінити тему 3 рази', target: 3, current: 0, completed: false, type: 'themeChange' },
  ]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      const newCount = themeChanges + 1;
      setThemeChanges(newCount);
      updateTasks('themeChange', newCount);
      return next;
    });
  };

  const addPoints = (amount, type) => {
    setScore(prev => {
      const newScore = prev + amount;
      updateTasks('score', newScore);
      return newScore;
    });
    updateTasks(type);
  };

  const updateTasks = (type, currentVal = null) => {
    setTasks(prev => prev.map(task => {
      if (task.completed) return task;
      if (task.type === type) {
        const next = currentVal !== null ? currentVal : task.current + 1;
        return { ...task, current: next, completed: next >= task.target };
      }
      return task;
    }));
  };

  const colors = {
  background: theme === 'light' ? '#F3F4F6' : '#111827',
  card: theme === 'light' ? '#FFFFFF' : '#1F2937',
  text: theme === 'light' ? '#111827' : '#F9FAFB',
  primary: '#8b5cf6', 
};

  return (
    <GameContext.Provider value={{ score, tasks, addPoints, theme, toggleTheme, colors }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);