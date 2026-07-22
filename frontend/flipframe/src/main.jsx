import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WatchlistProvider } from './context/WatchlistContext.jsx'
import { HoldingsProvider } from './context/HoldingsContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <WatchlistProvider>
          <HoldingsProvider>
            <App className/>
          </HoldingsProvider>
        </WatchlistProvider>
    </QueryClientProvider>
)
