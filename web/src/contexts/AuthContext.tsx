import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';

import { auth, firestore } from '../services/firebase';

type User = {
  email: string;
  name: string;
  isAdmin: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  user: User;
  signIn: (email: string, password: string) => void; // eslint-disable-line
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const toast = useToast();

  async function getUserInfo(userEmail: string) {
    const userDocRef = doc(firestore, 'funcionarios', userEmail);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      setUser({
        email: userEmail,
        name: userData.name,
        isAdmin: userData.isAdmin,
      });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        if (authUser.email) {
          await getUserInfo(authUser.email);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      await getUserInfo(email);
    } catch (error: any) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        toast({
          title: 'Erro ao fazer login',
          description: 'Credenciais incorretas.',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });

        return;
      }

      toast({
        title: 'Erro ao fazer login',
        description: 'Erro interno, por favor tente novamente mais tarde.',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
