import { Link } from "@nextui-org/react";

 
export default function NotFound() {
  return (
    <div>
      <h3>404 - Page Not Found</h3>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/">
        <p>Go back home</p>
      </Link>
    </div>
  )
}