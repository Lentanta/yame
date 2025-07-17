import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import "./index.css";
import { AuthProvider } from '@/context/AuthContext.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

import App from './App.tsx'
import Notes from './pages/Notes.tsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RedirectIfAuthenticated />,
        children: [{ path: "", element: <App /> }]
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/notes", element: <Notes /> }]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
