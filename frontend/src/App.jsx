import RootView from './pages/rootView'
import LoginView from './pages/loginView'
import SignupView from './pages/signupView'
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoutes from './PublicRoutes'
import WizardsView from './pages/wizardsView'
import { Route, Routes } from 'react-router-dom'
import './App.css'


function App() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='wizards' element={<WizardsView />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<RootView />} />
          <Route path='login' element={<LoginView />} />
          <Route path='signup' element={<SignupView />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App