import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';

import { useSignInLazyQuery } from '@graphql/generated/graphql';

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
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loadSignIn, { loading }] = useSignInLazyQuery();

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
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  async function logOut() {
    setUser({} as User);
  }

  useEffect(() => {
    const foundUser = localStorage.getItem('@atlanticaboard:user');

    if (foundUser) {
      const parsedUser: User = JSON.parse(foundUser);

      setUser(parsedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
