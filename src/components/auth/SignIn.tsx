import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Button, Typography, Box, Alert, CircularProgress,
  Checkbox, FormControlLabel, Link as MuiLink, InputAdornment,
  IconButton, Fade, Stack, Grid, useTheme, useMediaQuery
} from '@mui/material';
import {
  Visibility, VisibilityOff, ArrowBack as ArrowBackIcon,
  CheckCircle, Psychology
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Too short').required('Required'),
    }),
    onSubmit: async (values) => {
      setError('');
      try {
        const result = await signIn(values);
        if (result.success) navigate(from, { replace: true });
        else setError(result.error || 'Invalid credentials');
      } catch (err) {
        setError('Connection error');
      }
    },
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#fff', width: '100%' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        
        {/* --- LEFT SIDE: BRANDING --- */}
        {!isMobile && (
          <Grid item md={6} lg={7} sx={{ 
            position: 'relative',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
            color: 'white'
          }}>
           <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 900,
              height: '100%',
              opacity: 0.1,
              backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ color: 'primary.light', mb: 8, textTransform: 'none', position: 'relative', zIndex: 1 }}
              >
                Back to home
              </Button>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Psychology sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1.1, mb: 3 }}>
                  The Intelligence <br /> Behind Your Career.
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.7, fontWeight: 400, mb: 6, maxWidth: 500 }}>
                  Log in to access your personalized income roadmaps and AI-driven skill gap analysis.
                </Typography>

                <Stack spacing={3}>
                  {['Verified Income Paths', 'AI Roadmap Generator', 'Skill Mapping Engine'].map((text, i) => (
                    <Stack key={i} direction="row" spacing={2} alignItems="center">
                      <CheckCircle sx={{ color: 'primary.main' }} />
                      <Typography variant="body1" fontWeight={500}>{text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        )}

        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <Grid item xs={12} md={6}  sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', // Horizontal Center (Flex)
          alignItems: 'center',     // Vertical Center (Flex)
          p: { xs: 4, sm: 8, md: 6, lg: 10 }, // Increased padding on large screens
          background: isMobile ? 'radial-gradient(circle at 2% 10%, #f0f7ff 0%, #ffffff 100%)' : '#fff'
        }}>
          {/* Centered container with fixed maxWidth to prevent stretching */}
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {isMobile && (
                 <IconButton onClick={() => navigate('/')} sx={{ mb: 2, ml: -1 }}>
                    <ArrowBackIcon />
                 </IconButton>
              )}

              <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: '#0f172a' }}>
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
                New to SkillMap? <MuiLink component={Link} to="/signup" sx={{ fontWeight: 700, textDecoration: 'none' }}>Create an account</MuiLink>
              </Typography>

              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>
              </Fade>

              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{ sx: { borderRadius: 2, height: 56 } }}
                  />

                  <Box>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={{
                        sx: { borderRadius: 2, height: 56 },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ textAlign: 'right', mt: 1 }}>
                      <MuiLink component={Link} to="/forgot-password" variant="body2" sx={{ fontWeight: 600, textDecoration: 'none' }}>
                        Forgot password?
                      </MuiLink>
                    </Box>
                  </Box>

                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" sx={{ borderRadius: 1 }} />}
                    label={<Typography variant="body2">Keep me signed in</Typography>}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{ 
                      height: 56, 
                      borderRadius: 2, 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 10px 20px rgba(25,118,210,0.2)'
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
                  © {new Date().getFullYear()} SkillMap AI <br />
                  Rithik • Rithis • Sharwin
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;