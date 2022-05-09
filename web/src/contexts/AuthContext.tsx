import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';

import { auth, firestore } from '@services/firebase';

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
  isAuthLoading: boolean;
  signIn: (email: string, password: string) => void; // eslint-disable-line
  logOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

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
    } else {
      throw new Error('Não foi possivel recuperar os dados do usuário');
    }
  }

  async function signIn(email: string, password: string) {
    setIsAuthLoading(true);

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

        setIsAuthLoading(false);
        return;
      }

      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });

      setIsAuthLoading(false);
    }
  }

  async function logOut() {
    setIsAuthLoading(true);
    await signOut(auth);

    setUser({} as User);
    setIsAuthLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, isAuthLoading, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
