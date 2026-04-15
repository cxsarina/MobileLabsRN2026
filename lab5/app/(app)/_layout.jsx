import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  // Якщо не авторизований — відправляємо на логін
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Якщо авторизований — показуємо внутрішні екрани
  return <Stack />;
}