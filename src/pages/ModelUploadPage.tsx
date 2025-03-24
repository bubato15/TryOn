import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Paper
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  CloudUpload as UploadIcon,
  Save as SaveIcon,
  Checkroom as ClothIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SavedModel {
  id: string;
  image: string;
  dateAdded: number;
}

const ModelUploadPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openChooseClothDialog, setOpenChooseClothDialog] = useState(false);
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<SavedModel | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    // Lấy danh sách người mẫu đã lưu từ localStorage
    const storedModels = localStorage.getItem('savedModels');
    if (storedModels) {
      setSavedModels(JSON.parse(storedModels));
    }
  }, []);

  const handleGoBack = () => {
    navigate('/models');
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

  const handleSaveImage = () => {
    if (selectedImage) {
      // Tạo một mảng các model đã lưu
      const modelList: SavedModel[] = savedModels.length > 0 ? savedModels : [];

      // Tạo model mới
      const newModel: SavedModel = {
        id: `model_${Date.now()}`, // Tạo ID duy nhất
        image: selectedImage,
        dateAdded: Date.now()
      };

      // Thêm model mới vào danh sách
      modelList.push(newModel);

      // Lưu danh sách models vào localStorage
      localStorage.setItem('savedModels', JSON.stringify(modelList));
      
      // Lưu ID model vừa tạo để có thể chọn sau này
      localStorage.setItem('selectedModelId', newModel.id);
      
      setOpenSnackbar(true);
      setOpenChooseClothDialog(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChooseCloth = () => {
    // Chuyển đến trang chọn trang phục
    navigate('/clothes');
  };

  const handleSkipCloth = () => {
    // Đóng dialog và quay về trang models
    setOpenChooseClothDialog(false);
    navigate('/models');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleModelSelect = (model: SavedModel) => {
    setSelectedModel(model);
    setOpenConfirmDialog(true);
  };

  const handleConfirmTryOn = () => {
    if (selectedModel) {
      // Lưu ID người mẫu được chọn vào localStorage
      localStorage.setItem('selectedModelId', selectedModel.id);
      
      // Chuyển đến trang preview
      navigate('/cloth-preview');
    }
    setOpenConfirmDialog(false);
  };

  const handleCancelTryOn = () => {
    setOpenConfirmDialog(false);
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
            Tải ảnh người mẫu
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container 
        sx={{ 
          py: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          flexGrow: 1 
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />
        
        {selectedImage ? (
          <Box sx={{ 
            width: '100%', 
            maxWidth: 400, 
            aspectRatio: '1/1', 
            bgcolor: 'background.paper',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            mb: 3
          }}>
            <img 
              src={selectedImage} 
              alt="Uploaded model" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </Box>
        ) : (
          <Box sx={{ 
            width: '100%', 
            maxWidth: 400, 
            aspectRatio: '1/1', 
            bgcolor: 'background.paper',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px dashed',
            borderColor: 'primary.main',
            mb: 3
          }}>
            <UploadIcon 
              sx={{ 
                fontSize: '4rem', 
                color: 'primary.main',
                mb: 2 
              }} 
            />
            <Typography variant="body1" color="text.secondary">
              Chưa có ảnh được chọn
            </Typography>
          </Box>
        )}
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2,
          width: '100%',
          maxWidth: 400
        }}>
          <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            onClick={triggerFileInput}
            sx={{ flexGrow: 1 }}
          >
            Chọn ảnh
          </Button>
          
          {selectedImage && (
            <Button 
              variant="contained" 
              color="success"
              startIcon={<SaveIcon />}
              onClick={handleSaveImage}
              sx={{ flexGrow: 1 }}
            >
              Lưu ảnh
            </Button>
          )}
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Ảnh đã được lưu thành công!
        </Alert>
      </Snackbar>

      {/* Dialog chọn trang phục */}
      <Dialog
        open={openChooseClothDialog}
        onClose={handleSkipCloth}
        aria-labelledby="choose-cloth-dialog-title"
        aria-describedby="choose-cloth-dialog-description"
      >
        <DialogTitle id="choose-cloth-dialog-title">
          Chọn trang phục
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="choose-cloth-dialog-description">
            Bạn có muốn chọn trang phục ngay bây giờ không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipCloth} color="primary">
            Bỏ qua
          </Button>
          <Button 
            onClick={handleChooseCloth} 
            color="primary" 
            startIcon={<ClothIcon />} 
            autoFocus
          >
            Chọn trang phục
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận thử đồ */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelTryOn}
      >
        <DialogTitle>Xác nhận thử đồ</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có muốn thử đồ với người mẫu này ngay bây giờ không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelTryOn} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmTryOn} color="primary" variant="contained">
            Thử đồ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModelUploadPage; 