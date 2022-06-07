import { useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Toast } from '@components/Toast';
import { useRevalidateJwtLazyQuery, useSignInLazyQuery } from '@graphql/generated/graphql';

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
      return toast.show({
        render: () => (
          <Toast
            title="Login"
            description="Por favor informe as credenciais"
          />
        ),
        placement: 'top-right',
      });
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
          render: () => (
            <Toast
              title="Erro ao fazer login"
              description="Credenciais incorretas"
              type="error"
            />
          ),
          placement: 'top-right',
        });
      }
    } catch (signInError: any) {
      toast.show({
        render: () => (
          <Toast
            title="Erro ao fazer login"
            description={signInError.message}
            type="error"
          />
        ),
        placement: 'top-right',
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
        render: () => (
          <Toast
            title="Login"
            description={error?.message}
            type="error"
          />
        ),
        placement: 'top-right',
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
