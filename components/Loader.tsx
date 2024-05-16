// Loading text
export default function Loader({ show }: { show: boolean }) {
    return show ? <p>Loading...</p> : null;
}