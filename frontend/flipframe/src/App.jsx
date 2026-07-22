import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { MyPage } from './pages/MyPage';
import { ItemDetailPage } from './pages/ItemDetailPage'
import { WatchlistPage } from './pages/WatchlistPage';
import { NavBar } from './components/NavBar';
import { RivenPage } from './pages/RivenPage';
import { ContractsPage } from './pages/ContractsPage';

import { WatchlistContext } from './context/WatchlistContext';
import './App.css'
import { HoldingsPage } from './pages/HoldingsPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <div className="w-[95vw] max-w-[1200px] mx-auto pt-6">
        <Routes>
          <Route path="/" element = {<MainPage/>}></Route>
          <Route path="/item/:slug" element = {<ItemDetailPage/>}></Route>
          <Route path="/current" element = {<MyPage/>}></Route>
          <Route path="/holdings" element = {<HoldingsPage/>}></Route>
          <Route path="/watchlist" element = {<WatchlistPage/>}></Route>
          <Route path="/riven" element = {<RivenPage/>}></Route>
          <Route path="/riven/contracts/:slug" element = {<ContractsPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
