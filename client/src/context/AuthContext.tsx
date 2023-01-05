/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services';
import { IContext } from '../interfaces';

export const AuthContext = createContext <IContext | null>(null);

export const AuthProvider = ({ children } : {children : ReactNode}) => {
  const [user, setUser] = useState<IContext['user'] | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await ApiService.get('/api/v1/user/me');
      setUser(data);
    } catch (error) {
      setUser(null);
      navigate('/sign-in');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
