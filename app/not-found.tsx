import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      {/* <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="360"
        height="271.5"
        allowFullScreen
      ></iframe> */}
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}