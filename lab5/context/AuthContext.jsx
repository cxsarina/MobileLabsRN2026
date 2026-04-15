import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Поточний залогінений користувач
  const [registeredUsers, setRegisteredUsers] = useState([]); // Наша "база даних"

  const login = (email, password) => {
    // Шукаємо користувача в нашому масиві
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      return true; // Повертаємо успіх
    } else {
      Alert.alert("Помилка", "Невірний email або пароль");
      return false;
    }
  };

  const register = (email, password, name) => {
    // Перевіряємо, чи такий email вже існує
    if (registeredUsers.some((u) => u.email === email)) {
      Alert.alert("Помилка", "Користувач з таким email вже існує");
      return false;
    }

    const newUser = { email, password, name };
    // Додаємо нового користувача в масив (імітація збереження в БД)
    setRegisteredUsers([...registeredUsers, newUser]);
    
    Alert.alert("Успіх", "Реєстрація завершена! Тепер ви можете увійти.");
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);