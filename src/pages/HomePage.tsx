import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Container,
  AppBar,
  Toolbar,
  Avatar,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Checkroom as CheckroomIcon, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  Home as HomeIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard = ({ icon, title, description, onClick }: FeatureCardProps) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        p: 2
      }}
      onClick={onClick}
    >
      <Box sx={{ 
        color: theme.palette.primary.main,
        mb: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        {React.cloneElement(icon as React.ReactElement, { 
          sx: { 
            fontSize: '3rem',
            color: 'inherit'
          } 
        })}
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        '&:last-child': { 
          paddingBottom: 2 
        }
      }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1rem', 
            mb: 1 
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.8rem',
            maxWidth: '80%'
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface TryOnHistoryItem {
  id: string;
  clothImage: string;
  modelImage: string;
  generatedImage: string;
  timestamp: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [currentUser] = useState({
    name: 'Người dùng',
    avatar: '/avatar-placeholder.png'
  });
  
  const [value, setValue] = useState(0);
  const [tryOnHistory, setTryOnHistory] = useState<TryOnHistoryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Lấy lịch sử thử đồ từ localStorage
    const tryOnHistoryStr = localStorage.getItem('tryOnHistory');
    if (tryOnHistoryStr) {
      setTryOnHistory(JSON.parse(tryOnHistoryStr));
    }
  }, []);

  const handleNavigate = (feature: string) => {
    switch(feature) {
      case 'models':
        navigate('/models');
        break;
      case 'clothes':
        navigate('/clothes');
        break;
      case 'history':
        navigate('/try-on-history');
        break;
      // Thêm các case khác khi có thêm trang
      default:
        console.log(`Navigating to ${feature}`);
    }
  };

  const handleViewImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const features = [
    {
      icon: <PersonIcon />,
      title: 'Chọn người mẫu',
      onClick: () => handleNavigate('models')
    },
    {
      icon: <CheckroomIcon />,
      title: 'Chọn trang phục',
      onClick: () => handleNavigate('clothes')
    },
    {
      icon: <HistoryIcon />,
      title: 'Lịch sử thử đồ',
      onClick: () => handleNavigate('history')
    },
    {
      icon: <SettingsIcon />,
      title: 'Cài đặt',
      onClick: handleOpenSettings
    }
  ];

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
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}>
            Ứng dụng thử đồ
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              alt={currentUser.name} 
              src={currentUser.avatar}
              sx={{ 
                width: 36, 
                height: 36,
                border: '2px solid #f0f0f0'
              }} 
            />
          </Box>
          <IconButton 
            color="inherit" 
            onClick={handleOpenSettings}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        pb: 7 
      }}>
        <Container sx={{ py: 3 }} maxWidth="sm">
          <Box sx={{ px: 1 }}>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item key={index} xs={6}>
                  <FeatureCard {...feature} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Phần hiển thị lịch sử thử đồ */}
          {tryOnHistory.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  mb: 2 
                }}
              >
                Lịch sử thử đồ gần đây
              </Typography>
              <Grid container spacing={2}>
                {tryOnHistory.slice(0, 4).map((item) => (
                  <Grid item xs={6} sm={3} key={item.id}>
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
              {tryOnHistory.length > 4 && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 2 
                  }}
                >
                  <Button 
                    variant="outlined" 
                    onClick={() => handleNavigate('history')}
                  >
                    Xem tất cả
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Container>
      </Box>
      
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

      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          zIndex: 1100,
          borderRadius: '16px 16px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ 
            height: 60,
            '& .MuiBottomNavigationAction-root': {
              maxWidth: 'none',
              py: 1
            }
          }}
        >
          <BottomNavigationAction label="Trang chủ" icon={<HomeIcon />} />
          <BottomNavigationAction label="Người mẫu" icon={<PersonIcon />} />
          <BottomNavigationAction label="Trang phục" icon={<CheckroomIcon />} />
          <BottomNavigationAction label="Lịch sử" icon={<HistoryIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default HomePage; 