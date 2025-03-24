import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  CloudUpload as UploadIcon,
  Check as ConfirmIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ClothUploadPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGoBack = () => {
    navigate('/clothes');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      localStorage.setItem('uploadedClothImage', selectedImage);
      navigate('/clothes/crop');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ 
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
            Tải ảnh trang phục
          </Typography>
        </Toolbar>
      </AppBar>

      <Container 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 3 
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />

        {!selectedImage ? (
          <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            onClick={triggerFileInput}
          >
            Chọn ảnh từ thiết bị
          </Button>
        ) : (
          <>
            <img 
              src={selectedImage} 
              alt="Uploaded" 
              style={{ 
                width: '100%', 
                maxWidth: 400, 
                aspectRatio: '1/1', 
                objectFit: 'cover',
                borderRadius: 16,
                mb: 3 
              }} 
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button 
                startIcon={<UploadIcon />}
                onClick={triggerFileInput}
              >
                Chọn lại
              </Button>
              <Button 
                variant="outlined" 
                color="info"
                startIcon={<ConfirmIcon />}
                onClick={handleConfirm}
              >
                Xác nhận
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ClothUploadPage; 