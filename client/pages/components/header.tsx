import LoginButton from "./login-btn"


export default function Header() {
  return (
    <header className="sticky flex justify-center">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <LoginButton />
      </div>
    </header>
  )
}
