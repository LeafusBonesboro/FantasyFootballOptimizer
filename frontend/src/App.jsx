import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';  // Topbar component
import Sidebar from './scenes/global/Sidebar';  // Sidebar component
import Dashboard from './scenes/dashboard';  // Main content (Dashboard)
import { ColorModeContext, useMode } from './theme';  // Theme and color mode

function App() {
  const [theme, colorMode] = useMode();  // useMode for theme and color mode toggle
  const [isSidebar, setIsSidebar] = useState(true);  // Sidebar state

  return (
    <ColorModeContext.Provider value={colorMode}>  {/* Provide color mode context */}
      <ThemeProvider theme={theme}>  {/* Apply theme */}
        <CssBaseline />  {/* Reset browser styles */}
        <div className="app">
          <Sidebar isSidebar={isSidebar} />  {/* Sidebar visibility control */}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />  {/* Topbar with sidebar toggle */}
            {/* Routes here */}
            <Dashboard />  {/* Example: Main dashboard content */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
