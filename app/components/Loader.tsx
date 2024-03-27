import { CircularProgress } from "@nextui-org/react";

// Loading Spinner
export default function Loader({ show }: { show: boolean }) {
    return show ? <CircularProgress label="Loading..." /> : null;
}