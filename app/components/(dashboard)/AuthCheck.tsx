import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/app/lib/context';

// Component's children only shown to logged-in users
export default function AuthCheck(props: any): JSX.Element {
    const { username } = useContext(UserContext);
    return username ? props.children : props.fallback || <Link href="/enter">
        <p>You must be signed in</p>
    </Link>;
}