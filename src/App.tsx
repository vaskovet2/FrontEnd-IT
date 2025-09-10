import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import { AuthProvider, useAuth } from './auth/AuthContext';
import NavBar from './components/NavBar';
import AnimatedBackground from './components/AnimatedBackground';
import ProfileMenu from './components/ProfileMenu';
import Footer from './components/Footer';

function NavbarContainer() {
  const { isAuthenticated, logout, userEmail } = useAuth();
  const actions = [
    { key: 'home', label: 'Home', to: '/' },
    { key: 'contact', label: 'Contact', to: '/contact' },
    { key: 'faq', label: 'FAQ', to: '/faq' },
    ...(!isAuthenticated ? [
      { key: 'login', label: 'Login', to: '/login' },
      { key: 'register', label: 'Register', to: '/register' },
    ] : [
      { key: 'logout', label: 'Logout', onClick: logout },
    ]),
  ];
  const right = isAuthenticated ? (
    <ProfileMenu email={userEmail} onLogout={logout} />
  ) : undefined;
  return <NavBar title="my-it-online" actions={actions} rightContent={right} />;
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <AnimatedBackground />
      <NavbarContainer />
      <Container maxW="container.lg" pb={16}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      <Footer />
    </AuthProvider>
  );
}



