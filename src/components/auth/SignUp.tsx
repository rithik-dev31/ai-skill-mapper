import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Button, Typography, Box, Alert, CircularProgress,
  Link as MuiLink, InputAdornment, IconButton, Fade, Stack, Grid, 
  useTheme, useMediaQuery, Container
} from '@mui/material';
import {
  Visibility, VisibilityOff, ArrowBack as ArrowBackIcon,
  CheckCircle, Psychology
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Must contain one lowercase letter')
      .matches(/[A-Z]/, 'Must contain one uppercase letter')
      .matches(/\d/, 'Must contain one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      try {
        const result = await signUp({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
        });

        if (result.success) {
          navigate('/skills', { replace: true });
        } else {
          setError(result.error || 'Sign up failed');
        }
      } catch (err) {
        setError('Connection failed. Please try again.');
      }
    },
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#fff' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        
        {/* --- LEFT SIDE: BRANDING (50% Width) --- */}
        {!isMobile && (
          <Grid item md={6} lg={7} sx={{ 
            position: 'relative',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            color: 'white'
          }}>
            <Box sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              width: '100%',
              maxWidth: '700px', height: '100%',
            }} />

            <Box sx={{ width: '100%', maxWidth: 700, position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/')}
                  sx={{ color: 'primary.light', mb: 8, textTransform: 'none' }}
                >
                  Back to home
                </Button>

                <Box>
                  <Psychology sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1.1, mb: 3 }}>
                    Start Your <br /> Journey.
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.7, fontWeight: 400, mb: 6 }}>
                    Join thousands of professionals mapping their expertise to high-growth income opportunities.
                  </Typography>

                  <Stack spacing={3}>
                    {['Full Skill Analysis', 'Monetization Roadmap', 'Privacy Guaranteed'].map((text, i) => (
                      <Stack key={i} direction="row" spacing={2} alignItems="center">
                        <CheckCircle sx={{ color: 'primary.main' }} />
                        <Typography variant="body1" fontWeight={500}>{text}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        )}

        {/* --- RIGHT SIDE: SIGNUP FORM (50% Width) --- */}
        <Grid item xs={12} md={6} sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: { xs: 4, sm: 8, md: 6, lg: 10 },
          background: isMobile ? 'radial-gradient(circle at 2% 10%, #f0f7ff 0%, #ffffff 100%)' : '#fff'
        }}>
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
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
                Already have an account? <MuiLink component={Link} to="/signin" sx={{ fontWeight: 700, textDecoration: 'none' }}>Log in</MuiLink>
              </Typography>

              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>
              </Fade>

              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                    InputProps={{ sx: { borderRadius: 2, height: 56 } }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{ sx: { borderRadius: 2, height: 56 } }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    InputProps={{
                      sx: { borderRadius: 2, height: 56 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{ 
                      mt: 2,
                      height: 56, 
                      borderRadius: 2, 
                      fontWeight: 700, 
                      textTransform: 'none',
                      boxShadow: '0 10px 20px rgba(25,118,210,0.2)'
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
                  By signing up, you agree to our Terms and Privacy Policy. <br />
                  © {new Date().getFullYear()} SkillMap AI
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;