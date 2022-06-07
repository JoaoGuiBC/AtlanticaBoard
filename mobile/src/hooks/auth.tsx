import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRevalidateJwtLazyQuery, useSignInLazyQuery } from '@graphql/generated/graphql';
import { useToast } from 'native-base';

type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>; // eslint-disable-line
  revalidate: (loggedUser: User) => Promise<void>; // eslint-disable-line
  signOut: () => Promise<void>;
  isLoggingIn: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@atlanticaboard:user';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadSignIn, { loading }] = useSignInLazyQuery();
  const [loadRevalidate, { error }] = useRevalidateJwtLazyQuery();

  const toast = useToast();

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return toast.show({ title: 'Por favor informe as credenciais' });
    }

    try {
      const { data: loadedData } = await loadSignIn({
        variables: { email, password },
      });

      if (loadedData) {
        setUser({
          ...loadedData?.signIn.user!,
          token: loadedData?.signIn.token!,
        });

        await AsyncStorage.setItem(
          USER_COLLECTION,
          JSON.stringify({
            ...loadedData?.signIn.user!,
            token: loadedData?.signIn.token!,
          }),
        );
      } else {
        toast.show({
          title: 'Erro ao fazer login',
          description: 'Credenciais incorretas',
        });
      }
    } catch (signInError: any) {
      toast.show({
        title: 'Erro ao fazer login',
        description: signInError.message,
      });
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(USER_COLLECTION);

    setUser(null);
  }

  async function revalidate(loggedUser: User) {
    const { data } = await loadRevalidate({
      context: {
        headers: {
          Authorization: loggedUser.token,
        },
      },
      variables: {
        userId: loggedUser.id,
      },
    });

    loggedUser.token = data?.revalidateJWT!;

    setUser(loggedUser);
  }

  async function loadUserStorageData() {
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      revalidate(userData);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.show({
        title: 'Login',
        description: error?.message,
      });
      if (error?.message === 'Autenticação inválida, por favor refaça login') {
        signOut();
      }
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        revalidate,
        isLoggingIn: loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, UseAuth };