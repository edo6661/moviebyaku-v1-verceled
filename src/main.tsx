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

import NotfoundTemporary from './components/NotfoundTemporary.tsx'
import SingleMovie from './components/movie/SingleMovie.tsx'
import SingleTv from './components/tv/SingleTv.tsx'
import { ContextProvider } from './context/Provider.tsx'
import HomePage from './page/public/HomePage.tsx'
import HomePageMovies from './page/public/HomePageMovies.tsx'
import Movie from './page/public/Movie.tsx'
import MovieAlterTitle from './page/public/MovieAlterTitle.tsx'
import MovieBackdrops from './page/public/MovieBackdrops.tsx'
import MovieCastCrew from './page/public/MovieCastCrew.tsx'
import MovieLogos from './page/public/MovieLogos.tsx'
import MoviePosters from './page/public/MoviePosters.tsx'
import MovieRelease from './page/public/MovieRelease.tsx'
import MovieReviews from './page/public/MovieReviews.tsx'
import MovieVideos from './page/public/MovieVideos.tsx'
import Movies from './page/public/Movies.tsx'
import PopularMovies from './page/public/PopularMovies.tsx'
import SearchPage from './page/public/SearchPage.tsx'
import TopRatedMovie from './page/public/TopRatedMovie.tsx'
import Tv from './page/public/Tv.tsx'
import UpcomingMovie from './page/public/UpcomingMovie.tsx'
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
        <Route path='main' element={<SingleMovie />} />
        <Route path='alternative-titles' element={<MovieAlterTitle />} />
        <Route path='cast-crew' element={<MovieCastCrew />} />
        <Route path='release-dates' element={<MovieRelease />} />
        <Route path='backdrops' element={<MovieBackdrops />} />
        <Route path='logos' element={<MovieLogos />} />
        <Route path='posters' element={<MoviePosters />} />
        <Route path='videos' element={<MovieVideos />} />
        <Route path='reviews' element={<MovieReviews />} />

      </Route>

      <Route path='tv/:id' element={<Tv />}>
        <Route index element={<SingleTv />} />
      </Route>

      <Route path='search/:keyword' element={<SearchPage />} />
      <Route path="*" element={<NotfoundTemporary />} />

      <Route path="movies" element={<Movies />} >
        <Route index element={<HomePageMovies />} />
        <Route element={<PopularMovies />} path='popular' />
        <Route element={<UpcomingMovie />} path='upcoming' />
        <Route element={<TopRatedMovie />} path='toprated' />
      </Route>
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
