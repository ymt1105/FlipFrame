import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WatchlistProvider } from './context/WatchlistContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <WatchlistProvider>
            <App />
        </WatchlistProvider>
    </QueryClientProvider>
  </StrictMode>
)
