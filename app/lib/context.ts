import { User } from 'firebase/auth';
import { createContext } from 'react';

interface UserContextProps {
    username: string | null;
}

export const UserContext = createContext<UserContextProps>({ username: null });