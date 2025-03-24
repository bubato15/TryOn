import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { lighten, darken } from '@mui/material/styles';
import HomePage from './pages/HomePage';
import ModelSelectionPage from './pages/ModelSelectionPage';
import ModelUploadPage from './pages/ModelUploadPage';
import ModelListPage from './pages/ModelListPage';
import ClothSelectionPage from './pages/ClothSelectionPage';
import CameraCapturePage from './pages/CameraCapturePage';
import ClothUploadPage from './pages/ClothUploadPage';
import ImageCropPage from './pages/ImageCropPage';
import ClothPreviewPage from './pages/ClothPreviewPage';
import TryOnHistoryPage from './pages/TryOnHistoryPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

// Lazy load các component để tăng tốc độ tải trang
const HomePageLazy = lazy(() => import('./pages/HomePage'));
const ClothPreviewPageLazy = lazy(() => import('./pages/ClothPreviewPage'));

function App() {
  const [primaryColor, setPrimaryColor] = useState('#f37b4f');

  useEffect(() => {
    // Load saved theme color from localStorage
    const savedColor = localStorage.getItem('appThemeColor') || '#f37b4f';
    setPrimaryColor(savedColor);
    
    // Set CSS variable for primary color
    document.documentElement.style.setProperty('--primary-color', savedColor);

    // Add event listener for theme color changes
    const handleThemeColorChange = (event: CustomEvent) => {
      const newColor = event.detail.color;
      setPrimaryColor(newColor);
      localStorage.setItem('appThemeColor', newColor);
      document.documentElement.style.setProperty('--primary-color', newColor);
    };

    // @ts-ignore
    window.addEventListener('themeColorChanged', handleThemeColorChange);

    // Cleanup event listener
    return () => {
      // @ts-ignore
      window.removeEventListener('themeColorChanged', handleThemeColorChange);
    };
  }, []);

  // Modify theme creation to use the dynamically resolved color
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: lighten(primaryColor, 0.3),
        dark: darken(primaryColor, 0.3),
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#4ECDC4', // Keeping the teal as secondary
        light: '#7BDFD0',
        dark: '#3AA699',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f5f5f7',
        paper: '#ffffff',
      },
      text: {
        primary: '#1a1a1a',
        secondary: '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
        fontSize: '1.75rem',
        color: primaryColor,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        color: primaryColor,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.1rem',
        color: primaryColor,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 20px',
            boxShadow: 'none',
            color: primaryColor,
            borderColor: primaryColor,
            backgroundColor: 'white',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              backgroundColor: lighten(primaryColor, 0.9),
              borderColor: primaryColor,
            },
          },
          contained: {
            backgroundColor: primaryColor,
            color: 'white',
            '&:hover': {
              backgroundColor: darken(primaryColor, 0.3),
            }
          },
          outlined: {
            borderColor: primaryColor,
            color: primaryColor,
          }
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: '#666666',
            '&.Mui-selected': {
              color: primaryColor,
            },
          },
          label: {
            fontSize: '0.75rem',
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePageLazy />} />
          <Route path="/models" element={<ModelSelectionPage />} />
          <Route path="/models/upload" element={<ModelUploadPage />} />
          <Route path="/models/list" element={<ModelListPage />} />
          <Route path="/clothes" element={<ClothSelectionPage />} />
          <Route path="/clothes/camera" element={<CameraCapturePage />} />
          <Route path="/clothes/upload" element={<ClothUploadPage />} />
          <Route path="/clothes/crop" element={<ImageCropPage />} />
          <Route path="/clothes/preview" element={<ClothPreviewPageLazy />} />
          <Route path="/try-on-history" element={<TryOnHistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<HomePageLazy />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

