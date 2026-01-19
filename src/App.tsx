import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

// Stores and Layouts
import { useAuthStore } from './stores/auth.store'
import MainLayout from './components/layout/MainLayout'

// Pages
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SkillInput from './pages/SkillInput'
import IncomeMap from './pages/IncomeMap'

// Auth Components
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'

// Industry-ready Theme Configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#0f172a', // Trust-inspiring Deep Blue
    },
    secondary: {
      main: '#0d9488', // Growth-oriented Teal
    },
    background: {
      default: '#f8fafc', // Minimalist light gray
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif', // Modern SaaS typography
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
  },
  shape: {
    borderRadius: 12,
  },
})

const queryClient = new QueryClient()

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Auth */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected SaaS Ecosystem */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route 
                path="/dashboard" 
                element={<Dashboard />} 
              />
              <Route 
                path="/skills" 
                element={<SkillInput />} 
              />
              {/* Core Income Mapping Result Page */}
              <Route 
                path="/income-map" 
                element={<IncomeMap />} 
              />
            </Route>

            {/* Global Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App