import { User } from 'firebase/auth';
import { createContext } from 'react';

interface UserContextProps {
    user: User | null | undefined;
    username: string | null;
}

export const UserContext = createContext<UserContextProps>({ user: null, username: null });