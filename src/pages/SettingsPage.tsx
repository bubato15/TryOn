import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
  Paper,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar
} from '@mui/material';
import { 
  ArrowBack as BackIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Define color palette with more descriptive details
const COLOR_PALETTE = [
  {
    name: 'Soft Coral',
    hex: '#FF6B6B',
    displayName: 'San hô mềm',
    description: 'Năng động, tươi trẻ'
  },
  {
    name: 'Lavender Bloom',
    hex: '#9C27B0',
    displayName: 'Tím hoa oải hương',
    description: 'Quyến rũ, sang trọng'
  },
  {
    name: 'Mint Fresh',
    hex: '#4CAF50',
    displayName: 'Bạc hà tươi',
    description: 'Tươi mát, tự nhiên'
  },
  {
    name: 'Rose Quartz',
    hex: '#E91E63',
    displayName: 'Hồng thạch anh',
    description: 'Dịu dàng, nữ tính'
  },
  {
    name: 'Sky Azure',
    hex: '#2196F3',
    displayName: 'Xanh trời',
    description: 'Trong trẻo, rộng mở'
  },
  {
    name: 'Peach Blush',
    hex: '#FF5722',
    displayName: 'Đào hồng',
    description: 'Ấm áp, năng động'
  },
  {
    name: 'Deep Orchid',
    hex: '#673AB7',
    displayName: 'Tím lan sâu',
    description: 'Huyền bí, mạnh mẽ'
  },
  {
    name: 'Emerald Green',
    hex: '#009688',
    displayName: 'Xanh lục bảo',
    description: 'Tươi mát, phong phú'
  },
  {
    name: 'Warm Terracotta',
    hex: '#FF9800',
    displayName: 'Đất nung ấm',
    description: 'Ấm áp, mộc mạc'
  },
  {
    name: 'Berry Crush',
    hex: '#D32F2F',
    displayName: 'Đỏ mọng',
    description: 'Sôi động, quyết liệt'
  },
  {
    name: 'Pastel Turquoise',
    hex: '#00BCD4',
    displayName: 'Xanh ngọc pastel',
    description: 'Nhẹ nhàng, mát mẻ'
  },
  {
    name: 'Magenta Dream',
    hex: '#9C27B0',
    displayName: 'Hồng tím mơ',
    description: 'Sáng tạo, táo bạo'
  },
  {
    name: 'Forest Pine',
    hex: '#388E3C',
    displayName: 'Xanh thông',
    description: 'Sâu lắng, bình yên'
  },
  {
    name: 'Sunset Orange',
    hex: '#F57C00',
    displayName: 'Cam hoàng hôn',
    description: 'Ấm áp, rực rỡ'
  },
  {
    name: 'Royal Purple',
    hex: '#7B1FA2',
    displayName: 'Tím hoàng gia',
    description: 'Sang trọng, quý phái'
  },
  {
    name: 'Ocean Blue',
    hex: '#1976D2',
    displayName: 'Xanh đại dương',
    description: 'Sâu thẳm, bao la'
  }
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Load saved theme color from localStorage
    const savedColor = localStorage.getItem('appThemeColor');
    if (savedColor) {
      setSelectedColor(savedColor);
    }
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    
    // Save selected color to localStorage
    localStorage.setItem('appThemeColor', color);
    
    // Dispatch a custom event to notify App about color change
    const event = new CustomEvent('themeColorChanged', { 
      detail: { color } 
    });
    window.dispatchEvent(event);
  };

  const handleResetApp = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmReset = () => {
    // Xóa toàn bộ dữ liệu trong localStorage
    localStorage.clear();
    
    // Reset màu theme
    setSelectedColor(null);
    
    // Hiển thị thông báo
    setOpenSnackbar(true);
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleGoBack = () => {
    navigate('/');
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
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="back" 
            sx={{ mr: 2 }}
            onClick={handleGoBack}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cài đặt
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Chọn màu chủ đạo
        </Typography>

        <Grid 
          container 
          spacing={2} 
          justifyContent="center"
          alignItems="center"
        >
          {COLOR_PALETTE.map((color) => (
            <Grid item key={color.name}>
              <Tooltip title={color.displayName} placement="top">
                <Paper 
                  onClick={() => handleColorSelect(color.hex)}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: selectedColor === color.hex 
                      ? '5px solid white' 
                      : '5px solid transparent',
                    boxShadow: selectedColor === color.hex 
                      ? `0 0 10px ${color.hex}` 
                      : 'none',
                    transform: selectedColor === color.hex 
                      ? 'scale(1.1)' 
                      : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: `0 0 8px ${color.hex}`
                    }
                  }}
                />
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleResetApp}
            startIcon={<DeleteIcon />}
          >
            Xóa toàn bộ dữ liệu
          </Button>
        </Box>

        {/* Dialog xác nhận reset */}
        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
        >
          <DialogTitle>Xác nhận xóa dữ liệu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa toàn bộ dữ liệu ứng dụng? Hành động này không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Hủy</Button>
            <Button onClick={handleConfirmReset} color="error" autoFocus>
              Xóa dữ liệu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar thông báo */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Đã xóa toàn bộ dữ liệu ứng dụng"
        />
      </Container>
    </Box>
  );
};

export default SettingsPage; 