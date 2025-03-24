import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface TryOnHistoryItem {
  id: string;
  clothImage: string;
  modelImage: string;
  generatedImage: string;
  timestamp: number;
}

const TryOnHistoryPage = () => {
  const navigate = useNavigate();
  const [tryOnHistory, setTryOnHistory] = useState<TryOnHistoryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Lấy lịch sử thử đồ từ localStorage
    const tryOnHistoryStr = localStorage.getItem('tryOnHistory');
    if (tryOnHistoryStr) {
      setTryOnHistory(JSON.parse(tryOnHistoryStr));
    }
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleDeleteHistory = () => {
    // Xóa toàn bộ lịch sử
    localStorage.removeItem('tryOnHistory');
    setTryOnHistory([]);
  };

  const handleViewImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      bgcolor: '#f5f5f7'
    }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar sx={{ minHeight: { xs: '56px' } }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="back" 
            sx={{ mr: 2 }}
            onClick={handleGoBack}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}>
            Lịch sử thử đồ
          </Typography>
          <IconButton 
            color="inherit" 
            aria-label="delete" 
            onClick={handleDeleteHistory}
            disabled={tryOnHistory.length === 0}
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ py: 3, flexGrow: 1, overflow: 'auto' }}>
        {tryOnHistory.length === 0 ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%' 
            }}
          >
            <Typography variant="h6" color="text.secondary" align="center">
              Chưa có lịch sử thử đồ
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {tryOnHistory.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.id}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    position: 'relative',
                    '&:hover .overlay': { 
                      opacity: 1 
                    }
                  }}
                >
                  <img 
                    src={item.generatedImage} 
                    alt="Ảnh thử đồ" 
                    style={{ 
                      width: '100%', 
                      aspectRatio: '1/1', 
                      objectFit: 'cover' 
                    }} 
                  />
                  <Box 
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleViewImage(item.generatedImage)}
                  >
                    <ViewIcon sx={{ color: 'white', fontSize: 40 }} />
                  </Box>
                  <Typography 
                    variant="caption" 
                    display="block" 
                    align="center" 
                    sx={{ p: 1 }}
                  >
                    {new Date(item.timestamp).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Dialog xem ảnh chi tiết */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Chi tiết ảnh" 
              style={{ 
                width: '100%', 
                maxHeight: '80vh', 
                objectFit: 'contain' 
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TryOnHistoryPage; 