import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Navbar, Footer } from './components';
import Home from './pages/Home.jsx';
import {ProtectedRoute} from './components';
import User  from './pages/User.jsx';

export default function App() {
  return (
    <Router>
       <Navbar />
    <Routes>
      
      <Route
        path='/'
        element={<Home />}
      />
      
      <Route
        path='/user'
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
      />
        
      </Routes>
      <Footer />
    </Router>
      
   

    
  )
}