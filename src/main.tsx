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
import SinglePerson from './components/person/SinglePerson.tsx'
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
import PopularPeople from './page/public/PopularPeople.tsx'
import SearchPage from './page/public/SearchPage.tsx'
import TopRatedMovie from './page/public/TopRatedMovie.tsx'
import Tv from './page/public/Tv.tsx'
import UpcomingMovie from './page/public/UpcomingMovie.tsx'
import Person from './page/public/person/Person.tsx'
import ProfilesPerson from './page/public/person/ProfilesPerson.tsx'
import TranslationPerson from './page/public/person/TranslationPerson.tsx'
import AiringTv from './page/public/tv/AiringTv.tsx'
import HomePageTvs from './page/public/tv/HomePageTvs.tsx'
import PopularTv from './page/public/tv/PopularTv.tsx'
import TopRatedTv from './page/public/tv/TopRatedTv.tsx'
import TvAlterTitle from './page/public/tv/TvAlterTitle.tsx'
import TvBackdrops from './page/public/tv/TvBackdrops.tsx'
import TvCastCrew from './page/public/tv/TvCastCrew.tsx'
import TvLogos from './page/public/tv/TvLogos.tsx'
import TvPosters from './page/public/tv/TvPosters.tsx'
import TvReviews from './page/public/tv/TvReviews.tsx'
import TvVideos from './page/public/tv/TvVideos.tsx'
import Tvs from './page/public/tv/Tvs.tsx'
import store from './redux/store.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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

        <Route path='tv/:id' element={<Tv />} >
          <Route index element={<SingleTv />} />
          <Route path='main' element={<SingleTv />} />
          <Route path='alternative-titles' element={<TvAlterTitle />} />
          <Route path='cast-crew' element={<TvCastCrew />} />
          <Route path='backdrops' element={<TvBackdrops />} />
          <Route path='logos' element={<TvLogos />} />
          <Route path='posters' element={<TvPosters />} />
          <Route path='videos' element={<TvVideos />} />
          <Route path='reviews' element={<TvReviews />} />

        </Route>

        <Route path='person/:id' element={<Person />}>
          <Route index element={<SinglePerson />} />
          <Route path='main' element={<SinglePerson />} />
          <Route path='translation' element={<TranslationPerson />} />
          <Route path='profile' element={<ProfilesPerson />} />

        </Route>

        <Route path='tvs' element={<Tvs />}>
          <Route index element={<HomePageTvs />} />
          <Route path='popular' element={<PopularTv />} />
          <Route path='airing' element={<AiringTv />} />
          <Route path='top-rated' element={<TopRatedTv />} />
        </Route>

        <Route path='search/:keyword' element={<SearchPage />} />
        <Route path='popular-people' element={<PopularPeople />} />
        
        <Route path="movies" element={<Movies />} >
          <Route index element={<HomePageMovies />} />
          <Route element={<PopularMovies />} path='popular' />
          <Route element={<UpcomingMovie />} path='upcoming' />
          <Route element={<TopRatedMovie />} path='toprated' />
        </Route>
      </Route>
      <Route path="*" element={<NotfoundTemporary />} />

    </>
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
