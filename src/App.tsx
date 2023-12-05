import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from "./components/Header";
function App() {
  const toastStyle = {
    background: 'transparent', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', border: 0, boxShadow: "none"
  }
  return (
    <>
      <ToastContainer
        className="toastContainer"
        position="bottom-right"
        toastStyle={toastStyle}
        autoClose={1500}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Header />
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main >
      <Footer />
    </>
  )
}

export default App
