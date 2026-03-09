import { useParams } from "react-router-dom"

export default function GenrePage() {
  const { id } = useParams()

  return (
	<main className="min-h-screen text-white">
	  <h1>Genre Page</h1>
	  <p>Category ID: {id}</p>
	</main>
  )
}
