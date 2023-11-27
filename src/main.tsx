import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import App from './App.tsx'
import './index.css'

import SingleMovie from './components/movie/SingleMovie.tsx'
import SingleTv from './components/tv/SingleTv.tsx'
import { ContextProvider } from './context/Provider.tsx'
import HomePage from './page/public/HomePage.tsx'
import Movie from './page/public/Movie.tsx'
import SearchPage from './page/public/SearchPage.tsx'
import Tv from './page/public/Tv.tsx'
import store from './redux/store.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        index
        element={<HomePage />} />
      <Route
        path='movie/:id'
        element={<Movie />}>
        <Route index element={<SingleMovie />} />
      </Route>
      <Route path='tv/:id' element={<Tv />}>
        <Route index element={<SingleTv />} />
      </Route>
      <Route path='/:keyword' element={<SearchPage />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
)
