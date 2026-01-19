import React from 'react';
import { Container, Grid, Typography, Box, Card, Stack, Button, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { RocketLaunch, AttachMoney, AssignmentOutlined, ArrowBack, TrendingUp } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const IncomeMap: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const skills = location.state?.skills || [];

  // Mocked AI output based on your Section 5.4 & 5.5 design
  const paths = [
    {
      title: 'Freelance Data Reporting',
      income: '$500–$2,000/month',
      time: '2–4 weeks',
      difficulty: 'Low–Medium',
      steps: ['Build Excel dashboards for small businesses', 'Apply to 5 gigs on Upwork']
    },
    {
      title: 'Technical Content Creator',
      income: '$1,000–$3,000/month',
      time: '4–6 weeks',
      difficulty: 'Medium',
      steps: ['Create a portfolio on Medium', 'Reach out to 3 tech blogs']
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/skills')} sx={{ mb: 4 }}>
        Back to Skills
      </Button>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>Your Income Roadmap</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Based on your skills: {skills.map((s: string) => <Chip key={s} label={s} sx={{ mr: 1 }} size="small" />)}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {paths.map((path, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                   <Chip icon={<TrendingUp />} label={path.difficulty} color="primary" variant="outlined" />
                   <Typography variant="h6" color="success.main" fontWeight="bold">{path.income}</Typography>
                </Stack>
                
                <Typography variant="h5" fontWeight={800} gutterBottom>{path.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Time-to-first-income: {path.time}</Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Action Plan Detail:</Typography>
                {path.steps.map((step, i) => (
                  <Stack key={i} direction="row" spacing={1} sx={{ mb: 1 }}>
                    <CheckCircle color="success" sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{step}</Typography>
                  </Stack>
                ))}
                
                <Button fullWidth variant="contained" sx={{ mt: 3, py: 1.5 }} endIcon={<RocketLaunch />}>
                  Start This Path
                </Button>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default IncomeMap;