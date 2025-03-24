import React, { useRef, useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  Camera as CameraIcon,
  Replay as RetakeIcon,
  Check as ConfirmIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CameraCapturePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera", err);
      alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 400, 400);
      const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      localStorage.setItem('capturedClothImage', capturedImage);
      navigate('/clothes/crop');
    }
  };

  const handleGoBack = () => {
    navigate('/clothes');
  };

  React.useEffect(() => {
    startCamera();
  }, []);

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
            Chụp trang phục
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
        {!capturedImage ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              style={{ 
                width: '100%', 
                maxWidth: 400, 
                aspectRatio: '1/1', 
                objectFit: 'cover',
                borderRadius: 16 
              }} 
            />
            <Button 
              variant="contained" 
              startIcon={<CameraIcon />} 
              sx={{ mt: 3 }}
              onClick={captureImage}
            >
              Chụp ảnh
            </Button>
          </>
        ) : (
          <>
            <img 
              src={capturedImage} 
              alt="Captured" 
              style={{ 
                width: '100%', 
                maxWidth: 400, 
                aspectRatio: '1/1', 
                objectFit: 'cover',
                borderRadius: 16 
              }} 
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button 
                variant="outlined" 
                startIcon={<RetakeIcon />}
                onClick={() => setCapturedImage(null)}
              >
                Chụp lại
              </Button>
              <Button 
                variant="contained" 
                color="success"
                startIcon={<ConfirmIcon />}
                onClick={handleConfirm}
              >
                Xác nhận
              </Button>
            </Box>
          </>
        )}

        <canvas 
          ref={canvasRef} 
          style={{ display: 'none' }} 
          width={400} 
          height={400} 
        />
      </Container>
    </Box>
  );
};

export default CameraCapturePage; 