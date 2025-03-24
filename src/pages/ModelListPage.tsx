import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ArrowBack as BackIcon,
  Delete as DeleteIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SavedModel {
  id: string;
  image: string;
  dateAdded: number;
}

const ModelListPage = () => {
  const navigate = useNavigate();
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<SavedModel | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Lấy danh sách ảnh từ localStorage
    const models = localStorage.getItem('savedModels');
    if (models) {
      setSavedModels(JSON.parse(models));
    }
  }, []);

  const handleGoBack = () => {
    navigate('/models');
  };

  const handleSelectModel = (model: SavedModel) => {
    // Lưu ID người mẫu được chọn vào localStorage
    localStorage.setItem('selectedModelId', model.id);
    
    // Hiển thị thông báo
    setSnackbarMessage('Đã chọn người mẫu thành công!');
    setOpenSnackbar(true);
    navigate('/clothes/preview');
  };

  const handleDeleteModel = () => {
    if (selectedModel) {
      // Xóa ảnh khỏi danh sách
      const updatedModels = savedModels.filter(model => model.id !== selectedModel.id);
      
      // Cập nhật localStorage
      localStorage.setItem('savedModels', JSON.stringify(updatedModels));
      setSavedModels(updatedModels);

      // Đóng dialog và reset selected model
      setOpenDeleteDialog(false);
      setSelectedModel(null);

      // Hiển thị thông báo
      setSnackbarMessage('Đã xóa người mẫu thành công!');
      setOpenSnackbar(true);
    }
  };

  const handleOpenDeleteDialog = (model: SavedModel) => {
    setSelectedModel(model);
    setOpenDeleteDialog(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            Danh sách người mẫu
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container 
        sx={{ 
          py: 3, 
          flexGrow: 1,
          overflow: 'auto'
        }}
      >
        {savedModels.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%' 
          }}>
            <Typography variant="body1" color="text.secondary">
              Chưa có người mẫu nào được lưu
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {savedModels.map((model) => (
              <Grid item xs={6} key={model.id}>
                <Card 
                  sx={{ 
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={model.image}
                    alt="Saved model"
                    onClick={() => handleSelectModel(model)}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                    onClick={() => handleOpenDeleteDialog(model)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Xóa người mẫu</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa người mẫu này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button 
            onClick={handleDeleteModel} 
            color="error" 
            startIcon={<DeleteIcon />}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ModelListPage; 