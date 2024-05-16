import Link from "next/link";

 
export default function NotFound() {
  return (
    <div className="relative flex flex-col"> 
    {/* h-screen */}
      <h3>404 - Page Not Found</h3>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/">
        <p>Go back home</p>
      </Link>
    </div>
  )
}