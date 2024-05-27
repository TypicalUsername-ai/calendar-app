import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from '@utils/routes'
import Axios from './utils/axiosContext'
import Auth from './utils/authContext'
import axios from 'axios'
import GoTrue from 'gotrue-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter(routes)
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})
const gotrue = new GoTrue({
    APIUrl: 'http://localhost:9999',
    setCookie: true,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <Axios.Provider value={axiosInstance}>
                <Auth.Provider value={gotrue}>
                    <RouterProvider router={router} />
                </Auth.Provider>
            </Axios.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
)
