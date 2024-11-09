import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import { ColorModeContext, useMode } from './theme';
import MyTeam from './components/MyTeam';
import MyAccount from './scenes/myaccount';  // Existing Yahoo MyAccount
import SiteAccessModal from './components/SiteAccessModal';  // New site-specific login modal

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isSiteAuthenticated, setIsSiteAuthenticated] = useState(false); // Site-specific auth state
  const [showSiteAccessModal, setShowSiteAccessModal] = useState(false); // Site access modal state

  // Show the site-specific access modal
  const handleSiteAccess = () => {
    setShowSiteAccessModal(true);
  };

  // Handle site logout (for the new auth flow)
  const handleSiteLogout = () => {
    setIsSiteAuthenticated(false);
  };

  // ProtectedRoute for site-specific authentication
  const SiteProtectedRoute = ({ element }) => {
    return isSiteAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar
              setIsSidebar={setIsSidebar}
              onLogin={handleSiteAccess}  // Pass handleSiteAccess to Topbar
              onLogout={handleSiteLogout}
            />
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/MyTeam" element={<SiteProtectedRoute element={<MyTeam />} />} />
              <Route path="/myaccount" element={<MyAccount />} /> {/* Keep this as-is */}
            </Routes>

            <SiteAccessModal
              isVisible={showSiteAccessModal}
              onClose={() => setShowSiteAccessModal(false)}
              onLoginSuccess={() => {
                setIsSiteAuthenticated(true); // Set site-specific auth state
                setShowSiteAccessModal(false);
              }}
            />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
