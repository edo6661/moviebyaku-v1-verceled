import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="container min-h-screen">
        <Outlet />
      </main >
    </>
  )
}

export default App
