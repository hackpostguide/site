import { useContext, useState } from 'react';
import { UserContext } from '@/app/lib/context';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AuthCheck(props: any): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { username } = useContext(UserContext);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!username) {
        setIsAuthenticated(false);
      }
      else{
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  });

  if (!isAuthenticated) {
    return <p>You must be signed in</p>;
  }

  if (!username) {
    return <p>You must sign in</p>;
  }

  return props.children;
}