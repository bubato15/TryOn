import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  Check as ConfirmIcon,
  Person as PersonIcon,
  Checkroom as ClothIcon,
  Share as ShareIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Link as LinkIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const REMOVE_BG_API_KEY = 'MPCL2feUpFNiUfL686XdbDVk';
const GEMINI_API_KEY = 'AIzaSyAQYbMv776R52W-qz-80ywInejsHkxNUIU';

const ClothPreviewPage = () => {
  const navigate = useNavigate();
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [processedClothImage, setProcessedClothImage] = useState<string | null>(null);
  const [processedModelImage, setProcessedModelImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openGeneratedImageDialog, setOpenGeneratedImageDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    const croppedClothImage = localStorage.getItem('croppedClothImage');
    setClothImage(croppedClothImage);

    const savedModelImages = localStorage.getItem('savedModels');
    const selectedModelId = localStorage.getItem('selectedModelId');

    if (savedModelImages && selectedModelId) {
      const models = JSON.parse(savedModelImages);
      const selectedModel = models.find((model: any) => model.id === selectedModelId);
      
      if (selectedModel) {
        setModelImage(selectedModel.image);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            setIsCooldown(false);
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldownTime]);

  const removeBackground = async (imageUrl: string, type: 'cloth' | 'model') => {
    if (!imageUrl) {
      setError(`Không tìm thấy ảnh ${type === 'cloth' ? 'trang phục' : 'người mẫu'}`);
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      const base64Response = await fetch(imageUrl);
      const blob = await base64Response.blob();
      formData.append('image_file', blob, `${type}.jpg`);
      formData.append('size', 'auto');

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': REMOVE_BG_API_KEY
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Không thể xóa phông nền cho ${type === 'cloth' ? 'trang phục' : 'người mẫu'}`);
      }

      const result = await response.blob();
      const processedImageUrl = URL.createObjectURL(result);
      
      // Lưu ảnh đã xử lý vào localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(`processed${type === 'cloth' ? 'ClothImage' : 'ModelImage'}`, reader.result as string);
      };
      reader.readAsDataURL(result);

      return processedImageUrl;

    } catch (err) {
      console.error(`Lỗi xóa phông nền cho ${type === 'cloth' ? 'trang phục' : 'người mẫu'}:`, err);
      setError(`Không thể xóa phông nền cho ${type === 'cloth' ? 'trang phục' : 'người mẫu'}. Vui lòng thử lại.`);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTryOn = async () => {
    setGeneratedImages([]); // Reset generated images
    setIsProcessing(true);
    
    // Set cooldown for 45 seconds
    setIsCooldown(true);
    setCooldownTime(75);

    try {
      // Type guard to ensure non-null values
      if (!clothImage || !modelImage) {
        throw new Error('Thiếu ảnh trang phục hoặc người mẫu');
      }

      // Create an array of 3 API calls
      //const _clothImage = await removeBackground(clothImage, "cloth")
      const _clothImage = clothImage
      const apiCalls = [
        callGeminiAPI(_clothImage, modelImage),
        callGeminiAPI(_clothImage, modelImage),
        callGeminiAPI(_clothImage, modelImage),
        callGeminiAPI(_clothImage, modelImage),
      ];

      // Run all calls concurrently
      const results = await Promise.all(apiCalls);

      // Check if any of the calls were successful
      const successfulAttempt = results.some(result => result);

      // If no successful attempt, show error
      if (!successfulAttempt) {
        setError('Không thể tạo ảnh thử đồ. Vui lòng thử lại sau.');
        setIsProcessing(false);
        setIsCooldown(false);
        setCooldownTime(0);
      }
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API:', error);
      // Reset cooldown if there's an error
      setIsCooldown(false);
      setCooldownTime(0);
      setError('Không thể tạo ảnh thử đồ. Vui lòng thử lại sau.');
    }
  };

  const handleGoBack = () => {
    navigate('/clothes/crop');
  };

  const handleCloseError = () => {
    setError(null);
  };

  const callGeminiAPI = async (processedClothImage: string, processedModelImage: string): Promise<boolean> => {
    if (!processedClothImage || !processedModelImage) {
      setError('Vui lòng xóa phông cả trang phục và người mẫu trước');
      return false;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Convert images to base64
      const clothBase64 = await fetchImageAsBase64(processedClothImage);
      const modelBase64 = await fetchImageAsBase64(processedModelImage);

      const prompt = `
Hãy tự phát hiện và gán hai hình ảnh như sau:

Ảnh 1: Trang phục
Đặc điểm: Bức ảnh không có người, chỉ có trang phục hoặc có người mặc nhưng không hiển thị đủ đầu, tay, chân của người mặc. Trang phục có thể được đặt trên một bề mặt phẳng (như bàn, sàn) hoặc treo trên mắc áo.
Cách nhận biết: Tìm bức ảnh không có người mẫu xuất hiện hoàn chỉnh. Nếu chỉ thấy quần áo mà không có ai mặc hoặc có người mặc nhưng không hiển thị đủ đầu, tay, chân, đó chính là ảnh trang phục.
Ảnh 2: Người mẫu
Đặc điểm: Bức ảnh có người mẫu hiển thị đủ đầu, tay, chân, nhưng người mẫu không mặc trang phục giống với trang phục trong ảnh trang phục. Người mẫu có thể mặc trang phục khác (như đồ lót, trang phục nền) hoặc không mặc gì (tùy ngữ cảnh, thường là trang phục tối giản trong ứng dụng thử đồ ảo).
Cách nhận biết: Sau khi xác định ảnh trang phục, trong hai bức ảnh còn lại, tìm bức ảnh có người mẫu nhưng trang phục trên người mẫu khác với trang phục trong ảnh trang phục. Đó là ảnh người mẫu.
Mô tả các bước ghép trang phục từ ảnh 2 vào người mẫu của ảnh 1:

Bước 1: Xác định vị trí và kích thước của người mẫu trong ảnh 1.
Bước 2: Cắt trang phục từ ảnh 2.
Bước 3: Điều chỉnh kích thước và vị trí của trang phục sao cho phù hợp với người mẫu trong ảnh 1.
Bước 4: Ghép trang phục đã cắt vào người mẫu trong ảnh 1.
Bước 5: Điều chỉnh màu sắc và ánh sáng của trang phục để hòa hợp tự nhiên với ảnh 1.
Tạo ảnh dựa trên mô tả:

Thực hiện các bước ghép ảnh theo hướng dẫn trên để tạo ra một bức ảnh mới, trong đó người mẫu trong ảnh 1 mặc trang phục từ ảnh 2.
`;

      let response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inlineData: { mimeType: 'image/png', data: clothBase64 } },
                { inlineData: { mimeType: 'image/png', data: modelBase64 } }
              ]
            }],
            generationConfig: { 
              temperature: 0.1,
              topK: 10,
              topP: 0.9,
              maxOutputTokens: 10000,
              responseModalities: ["Text", "Image"] 
            }
          })
        }
      );

      let result = await response.json();
      // const answer = result.candidates[0].content.parts[0].text;

      // response = await fetch(
      //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       contents: [{
      //         parts: [
      //           { text: `Hãy tạo một ảnh mới với cách yêu cầu sau: ${answer}` },
      //           { inlineData: { mimeType: 'image/png', data: clothBase64 } },
      //           { inlineData: { mimeType: 'image/png', data: modelBase64 } }
      //         ]
      //       }],
      //       generationConfig: { 
      //         temperature: 0.1,
      //         topK: 10,
      //         topP: 0.9,
      //         maxOutputTokens: 10000,
      //         responseModalities: ["Text", "Image"] 
      //       }
      //     })
      //   }
      // );
      
      // Extract generated image
      // result = await response.json();
      const imageData = result.candidates[0].content.parts.find((part: any) => part.inlineData).inlineData.data;
      const generatedImageUrl = `data:image/png;base64,${imageData}`;
      
      const prompt1 = `
Hãy tự động gán nhãn cho ba hình ảnh theo các vai trò sau: Ảnh Trang phục, Ảnh Người mẫu, và Ảnh Kết quả.

Mô tả các loại ảnh
Ảnh Trang phục
Đặc điểm: Bức ảnh chỉ có trang phục, không có người mẫu hoàn chỉnh (hoặc có người nhưng không hiển thị đủ đầu, tay, chân). Trang phục có thể được đặt trên bề mặt phẳng (như bàn, sàn) hoặc treo trên mắc áo.
Cách nhận biết: Tìm bức ảnh không có người mẫu đầy đủ. Nếu chỉ thấy quần áo hoặc người mặc thiếu các bộ phận cơ thể (đầu, tay, chân), đó là Ảnh Trang phục.
Ảnh Người mẫu
Đặc điểm: Bức ảnh có người mẫu hiển thị đầy đủ đầu, tay, chân, nhưng không mặc trang phục giống với Ảnh Trang phục. Người mẫu có thể mặc trang phục khác (như đồ lót, trang phục nền) hoặc trang phục tối giản (tùy ngữ cảnh).
Cách nhận biết: Trong hai bức ảnh có người mẫu đầy đủ, ảnh nào có trang phục khác với Ảnh Trang phục, đó là Ảnh Người mẫu.
Ảnh Kết quả
Đặc điểm: Bức ảnh có người mẫu mặc trang phục giống hệt với Ảnh Trang phục, và trang phục được ghép vào bằng chỉnh sửa ảnh.
Cách nhận biết: Trong hai bức ảnh có người mẫu đầy đủ, ảnh nào có trang phục trùng khớp với Ảnh Trang phục, đó là Ảnh Kết quả. (Nếu cần, có thể kiểm tra dấu hiệu chỉnh sửa như viền không tự nhiên hoặc ánh sáng không đồng đều, nhưng không bắt buộc nếu trang phục đã rõ ràng giống nhau).
Quy trình gán nhãn
Bước 1: Xác định bức ảnh không có người mẫu hoàn chỉnh (hoặc thiếu đầu, tay, chân) – đó là Ảnh Trang phục.
Bước 2: Với hai bức ảnh còn lại (có người mẫu đầy đủ), so sánh trang phục:
Nếu trang phục khác với Ảnh Trang phục, đó là Ảnh Người mẫu.
Nếu trang phục giống với Ảnh Trang phục, đó là Ảnh Kết quả.
Kết quả gán nhãn: Xác định rõ vai trò của từng ảnh theo thứ tự: Ảnh 1 là Trang phục, Ảnh 2 là Người mẫu, Ảnh 3 là Kết quả.
Đánh giá Ảnh Kết quả
Sau khi gán nhãn, hãy kiểm tra xem Ảnh Kết quả có thỏa mãn tất cả các điều kiện sau không:

Người trong Ảnh Kết quả có mặc trang phục giống y hệt với Ảnh Trang phục hay không.
Người trong Ảnh Kết quả có phải là cùng một người với người trong Ảnh Người mẫu hay không.
Trang phục trong Ảnh Kết quả có được mặc một cách tự nhiên và hài hòa hay không (không có dấu hiệu ghép ảnh quá lộ liễu).
Trả lời:
"Đúng" nếu tất cả ba điều kiện đều được thỏa mãn.
"Sai" nếu bất kỳ điều kiện nào không được thỏa mãn.`;

      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt1 },
                { inlineData: { mimeType: 'image/png', data: clothBase64 } },
                { inlineData: { mimeType: 'image/png', data: modelBase64 } },
                { inlineData: { mimeType: 'image/png', data: imageData } }
              ]
            }],
            generationConfig: { 
              temperature: 0.1,
              topK: 10,
              topP: 0.9,
              maxOutputTokens: 10000,
              responseModalities: ["Text", "Image"] 
            }
          })
        }
      );

      result = await response.json();
      const answer1 = result.candidates[0].content.parts[0].text;

      if (answer1.includes('Đúng')) {
        setGeneratedImages(prev => [...prev, generatedImageUrl]);
        setOpenGeneratedImageDialog(true);
        setIsProcessing(false);
        return true;
      }

      // If not "Đúng", return false
      return false;

    } catch (err) {
      console.error('Lỗi gọi Gemini API:', err);
      return false;
    }
  };

  const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleShareGeneratedImage = (generatedImage: string) => {
    // Lấy danh sách lịch sử thử đồ từ localStorage
    const tryOnHistoryStr = localStorage.getItem('tryOnHistory');
    const tryOnHistory: TryOnHistoryItem[] = tryOnHistoryStr 
      ? JSON.parse(tryOnHistoryStr) 
      : [];

    // Tạo mục lịch sử mới
    const newHistoryItem: TryOnHistoryItem = {
      id: `tryOn_${Date.now()}`,
      clothImage: processedClothImage || '',
      modelImage: processedModelImage || '',
      generatedImage: generatedImage,
      timestamp: Date.now()
    };

    // Thêm mục mới vào đầu danh sách
    tryOnHistory.unshift(newHistoryItem);

    // Giới hạn số lượng mục lịch sử (ví dụ: tối đa 20 mục)
    const limitedHistory = tryOnHistory.slice(0, 20);

    // Lưu lại vào localStorage
    localStorage.setItem('tryOnHistory', JSON.stringify(limitedHistory));

    // Hiển thị thông báo đã lưu
    setOpenSnackbar(true);
    setSnackbarMessage('Ảnh đã được lưu vào lịch sử thử đồ');
  };

  const handleCloseGeneratedImageDialog = () => {
    setOpenGeneratedImageDialog(false);
  };

  const handleChangeClothes = () => {
    navigate('/clothes');
  };

  const handleChangeModel = () => {
    navigate('/models');
  };

  // Thêm interface cho lịch sử thử đồ
  interface TryOnHistoryItem {
    id: string;
    clothImage: string;
    modelImage: string;
    generatedImage: string;
    timestamp: number;
  }

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
            Xem trước thử đồ
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
        <Grid container spacing={2} sx={{ maxWidth: 600, width: '100%' }}>
          <Grid item xs={6}>
            <Paper 
              elevation={3}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 2,
                borderRadius: 3
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                <ClothIcon sx={{ mr: 1 }} /> Trang phục
              </Typography>
              {processedClothImage ? (
                <img 
                  src={processedClothImage} 
                  alt="Processed cloth" 
                  style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', 
                    objectFit: 'cover',
                    borderRadius: 16 
                  }} 
                />
              ) : clothImage ? (
                <img 
                  src={clothImage} 
                  alt="Cropped cloth" 
                  style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', 
                    objectFit: 'cover',
                    borderRadius: 16 
                  }} 
                />
              ) : (
                <Typography color="text.secondary">Chưa có ảnh</Typography>
              )}
              <IconButton 
                color="inherit" 
                aria-label="change clothes" 
                onClick={handleChangeClothes}
              >
                <RefreshIcon />
              </IconButton>
            </Paper>
          </Grid>
          
          <Grid item xs={6}>
            <Paper 
              elevation={3}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 2,
                borderRadius: 3
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                <PersonIcon sx={{ mr: 1 }} /> Người mẫu
              </Typography>
              {processedModelImage ? (
                <img 
                  src={processedModelImage} 
                  alt="Processed model" 
                  style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', 
                    objectFit: 'cover',
                    borderRadius: 16 
                  }} 
                />
              ) : modelImage ? (
                <img 
                  src={modelImage} 
                  alt="Selected model" 
                  style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', 
                    objectFit: 'cover',
                    borderRadius: 16 
                  }} 
                />
              ) : (
                <Typography color="text.secondary">Chưa chọn người mẫu</Typography>
              )}
              <IconButton 
                color="inherit" 
                aria-label="change clothes" 
                onClick={handleChangeModel}
              >
                <RefreshIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        {isProcessing && (
          <Box 
            sx={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: 'rgba(0,0,0,0.5)', 
              zIndex: 9999 
            }}
          >
            <CircularProgress/>
            <Typography 
              variant="h6" 
              sx={{ color: 'white', mt: 2 }}
            >
              Đang mặc thử đồ...
            </Typography>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
          >
            Trang chủ
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleTryOn}
            disabled={isProcessing || isCooldown}
            sx={{ ml: 2 }}
          >
            {isCooldown 
              ? `Thử đồ (${cooldownTime}s)` 
              : 'Thử đồ'}
          </Button>
        </Box>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={handleCloseError}
        >
          <Alert 
            onClose={handleCloseError} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>

      {/* Dialog hiển thị ảnh được tạo */}
      <Dialog
        open={openGeneratedImageDialog}
        onClose={handleCloseGeneratedImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Đã thử đồ xong ^^
          <IconButton
            aria-label="close"
            onClick={handleCloseGeneratedImageDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {generatedImages.map((image, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <img 
                  src={image} 
                  alt={`AI Generated ${index + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }} 
                />
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button 
                    startIcon={<LinkIcon />}
                    size="small"
                  >
                    Chia sẻ
                  </Button>
                  <Button 
                    startIcon={<SaveIcon />}
                    onClick={() => handleShareGeneratedImage(image)}
                    size="small"
                  >
                    Lưu
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGeneratedImageDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClothPreviewPage; 