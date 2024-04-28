import { User } from 'firebase/auth';
import { createContext } from 'react';

interface UserContextProps {
    username: string;
}

export const UserContext = createContext<UserContextProps>({ username: '' });