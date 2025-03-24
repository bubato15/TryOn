import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Slider
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  Check as ConfirmIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Point, Area } from 'react-easy-crop/types';

const ImageCropPage = () => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [image, setImage] = useState<string | null>(null);

  React.useEffect(() => {
    // Lấy ảnh từ localStorage (ưu tiên ảnh chụp, sau đó mới lấy ảnh upload)
    const capturedImage = localStorage.getItem('capturedClothImage');
    const uploadedImage = localStorage.getItem('uploadedClothImage');
    
    setImage(capturedImage || uploadedImage || null);
  }, []);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleGoBack = () => {
    navigate('/clothes');
  };

  const getCroppedImg = async () => {
    if (!image || !croppedAreaPixels) return null;

    try {
      const img = await createImage(image);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return null;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      return canvas.toDataURL('image/jpeg');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> => 
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.src = url;
    });

  const handleConfirmCrop = async () => {
    const croppedImage = await getCroppedImg();
    if (croppedImage) {
      // Lưu ảnh đã cắt
      localStorage.setItem('croppedClothImage', croppedImage);
      
      // Chuyển sang trang tiếp theo (ví dụ: preview hoặc thử đồ)
      navigate('/clothes/preview');
    }
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
            Cắt ảnh trang phục
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        flexGrow: 1, 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                height: 'calc(100vh - 200px)',
                position: 'relative',
                width: '100%',
                maxWidth: 500,
                margin: '0 auto'
              }
            }}
          />
        )}

        <Container sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          py: 2 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%', 
            maxWidth: 500,
            gap: 2 
          }}>
            <ZoomOutIcon />
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, newZoom) => setZoom(newZoom as number)}
            />
            <ZoomInIcon />
          </Box>

          <Button 
            variant="contained" 
            color="success"
            startIcon={<ConfirmIcon />}
            onClick={handleConfirmCrop}
            sx={{ mt: 2 }}
          >
            Xác nhận
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ImageCropPage; 