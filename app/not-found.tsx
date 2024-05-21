import { Button } from "@/components/ui/button";
import Link from "next/link";

 
export default function NotFound() {
  return (
    <div className="text-center"> 
      <h3>404 - Page Not Found</h3>
      <p className="mb-4">Could not find requested resource, make sure the URL is typed in correctly.</p>
      <Button variant="link" asChild>
        <Link href="/">
          <p>Go back home</p>
        </Link>
      </Button>
    </div>
  )
}