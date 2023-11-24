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
import HomePage from './page/public/HomePage.tsx'
import Movie from './page/public/Movie.tsx'
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
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
