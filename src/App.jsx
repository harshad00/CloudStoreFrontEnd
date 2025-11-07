import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Navbar, Footer } from './components';
import Home from './pages/Home.jsx';
import {ProtectedRoute} from './components';
import User from './pages/User.jsx';
import Form from './pages/Form.jsx';
import Media from './pages/Media.jsx';
import MediaById from './pages/MediaById.jsx';

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
      <Route
        path='/form'
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
      />
      <Route
        path='/media'
          element={
            <ProtectedRoute>
            <Media />
            </ProtectedRoute>
          }
      />
      <Route
        path='/media-by-id'
          element={
            <ProtectedRoute>
            <MediaById/>
            </ProtectedRoute>
          }
      />
        
      </Routes>
      <Footer />
    </Router>
      
   

    
  )
}