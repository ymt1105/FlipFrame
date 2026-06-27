import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { MyPage } from './pages/MyPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { NavBar } from './components/NavBar';

import { WatchlistContext } from './context/WatchlistContext';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element = {<MainPage/>}></Route>
        <Route path="/current" element = {<MyPage/>}></Route>
        <Route path="/watchlist" element = {<WatchlistPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
