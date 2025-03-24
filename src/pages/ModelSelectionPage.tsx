import React, { useState } from 'react';
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
  IconButton
} from '@mui/material';
import { 
  ArrowBack as BackIcon,
  CloudUpload as UploadIcon,
  Person as PersonIcon, 
  Home as HomeIcon
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

const ModelSelectionPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1); // Mặc định chọn tab Người mẫu

  const handleGoBack = () => {
    navigate('/');
  };

  const handleUploadModel = () => {
    navigate('/models/upload');
  };

  const handleSelectModel = () => {
    navigate('/models/list');
  };

  const features = [
    {
      icon: <PersonIcon />,
      title: 'Danh sách người mẫu',
      description: 'Chọn từ danh sách người mẫu đã lưu',
      onClick: handleSelectModel
    },
    {
      icon: <UploadIcon />,
      title: 'Tải ảnh lên',
      description: 'Tải ảnh người mẫu của riêng bạn',
      onClick: handleUploadModel
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
            Chọn người mẫu
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        pb: 7 
      }}>
        <Container sx={{ py: 3 }} maxWidth="sm">
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: '#1a1a1a'
            }}
          >
            Chọn phương thức người mẫu
          </Typography>
          
          <Box sx={{ px: 1 }}>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item key={index} xs={6}>
                  <FeatureCard {...feature} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      
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
          <BottomNavigationAction label="Trang chủ" icon={<HomeIcon />} onClick={handleGoBack} />
          <BottomNavigationAction label="Người mẫu" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default ModelSelectionPage; 