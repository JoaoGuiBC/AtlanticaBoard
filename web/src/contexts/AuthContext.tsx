import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';

import {
  useRevalidateJwtLazyQuery,
  useSignInLazyQuery,
} from '@graphql/generated/graphql';

type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
};

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => void; // eslint-disable-line
  logOut: () => Promise<void>;
  revalidate: (loggedUser: User) => Promise<void>; // eslint-disable-line
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loadSignIn, { loading }] = useSignInLazyQuery();
  const [loadRevalidate, { error }] = useRevalidateJwtLazyQuery();

  const toast = useToast();

  async function signIn(email: string, password: string) {
    try {
      const { data: loadedData } = await loadSignIn({
        variables: { email, password },
      });

      setUser({
        ...loadedData?.signIn.user!,
        token: loadedData?.signIn.token!,
      });

      localStorage.setItem(
        '@atlanticaboard:user',
        JSON.stringify({
          ...loadedData?.signIn.user!,
          token: loadedData?.signIn.token!,
        }),
      );
    } catch (signInError: any) {
      toast({
        title: 'Erro ao fazer login',
        description: signInError.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  async function logOut() {
    localStorage.removeItem('@atlanticaboard:user');
    setUser({} as User);
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

  useEffect(() => {
    const foundUser = localStorage.getItem('@atlanticaboard:user');

    if (foundUser) {
      const parsedUser: User = JSON.parse(foundUser);

      revalidate(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro',
        description: error?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      if (error?.message === 'Autenticação inválida, por favor refaça login') {
        logOut();
      }
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut, revalidate }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
