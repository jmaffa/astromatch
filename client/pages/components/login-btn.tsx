import { useSession, signIn, signOut } from "next-auth/react"


export default function LoginButton() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <>
        <p className="text-white">
          Signed in as {session.user.email} <br />
        </p>
        <button
          onClick={() => signOut()}
          className="mx-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Sign out
        </button>
      </>
    )
  }

  return (
    <>
       <br />
      <button
        onClick={() => signIn()}
        className="px-4 py-2 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        Sign in
      </button>
    </>
  )
}
