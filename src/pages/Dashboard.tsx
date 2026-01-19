import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, Button,
  Stack, Avatar, useTheme, useMediaQuery, Paper, Divider,
  IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Drawer, Chip, LinearProgress
} from '@mui/material';
import {
  TrendingUp, AccountTree, AutoAwesome, Logout, Menu as MenuIcon,
  Dashboard as DashboardIcon, Person, Settings, ChevronRight,
  AccountBalanceWallet, Stars
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

const DRAWER_WIDTH = 280;

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const stats = [
    { label: 'Skills Analyzed', value: '12', icon: <AccountTree />, color: '#3b82f6' },
    { label: 'Potential Income', value: '$4,200', icon: <AccountBalanceWallet />, color: '#10b981' },
    { label: 'Market Rank', value: 'Top 15%', icon: <Stars />, color: '#f59e0b' },
  ];

  const features = [
    {
      title: 'Skill Mapping',
      desc: 'Identify core competencies and gap areas with AI analysis.',
      icon: <AccountTree color="primary" fontSize="medium" />,
      link: '/skills',
      status: 'Updated'
    },
    {
      title: 'Income Streams',
      desc: 'Discover market opportunities tailored to your set.',
      icon: <TrendingUp color="primary" fontSize="medium" />,
      link: '/opportunities',
      status: 'Active'
    },
    {
      title: 'AI Insights',
      desc: 'Personalized paths to increase your hourly rate.',
      icon: <AutoAwesome color="primary" fontSize="medium" />,
      link: '/insights',
      status: 'New'
    }
  ];

  const sidebarContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a', color: 'white' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>S</Avatar>
        <Typography variant="h6" fontWeight="800" letterSpacing={1}>SKILLMAP AI</Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ px: 2, py: 4, flexGrow: 1 }}>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, active: true },
          { text: 'My Skills', icon: <AccountTree /> },
          { text: 'Opportunities', icon: <TrendingUp /> },
          { text: 'Profile', icon: <Person /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton sx={{ 
              borderRadius: 2, 
              bgcolor: item.active ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: item.active ? 'primary.light' : 'rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
            }}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<Logout />} 
          onClick={signOut}
          sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { borderColor: 'white' }}}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', border: 'none' },
          }}
        >
          {sidebarContent}
        </Drawer>
      </Box>
          
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        {/* Top Header */}
        <Paper elevation={0} sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
          <Container maxWidth="xl" sx={{ py: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}><MenuIcon /></IconButton>
              )}
              <Typography variant="h6" fontWeight="700" sx={{ display: { xs: 'none', sm: 'block' } }}>Overview</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" fontWeight="700">{user?.fullName || 'User'}</Typography>
                  <Typography variant="caption" color="text.secondary">Professional Plan</Typography>
                </Box>
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main' }}>{user?.fullName?.[0]}</Avatar>
              </Stack>
            </Stack>
          </Container>
        </Paper>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Welcome Text */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="800" gutterBottom color="#1e293b">
              Welcome back, {user?.fullName?.split(' ')[0] || 'User'}! 👋
            </Typography>
            <Typography color="text.secondary">Here is what's happening with your skill-to-income mapping today.</Typography>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${stat.color}15`, color: stat.color }}>
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="600">{stat.label}</Typography>
                      <Typography variant="h5" fontWeight="800">{stat.value}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Main Action Grid */}
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>Core Tools</Typography>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card elevation={0} sx={{ 
                      borderRadius: 4, 
                      border: '1px solid #e2e8f0',
                      '&:hover': { transform: 'translateY(-4px)', transition: '0.3s', boxShadow: '0 12px 20px rgba(0,0,0,0.05)' }
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                          <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 2, display: 'flex', color: 'white' }}>
                            {feature.icon}
                          </Box>
                          <Chip label={feature.status} size="small" sx={{ fontWeight: 700, fontSize: '0.65rem' }} color="primary" variant="outlined" />
                        </Stack>
                        <Typography variant="h6" fontWeight="700" gutterBottom>{feature.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{feature.desc}</Typography>
                        <Button fullWidth variant="contained" href={feature.link} disableElevation sx={{ borderRadius: 2, textTransform: 'none' }}>
                          Open Tool
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Profile Completion Card */}
            <Grid item xs={12} lg={4}>
              <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>Profile Strength</Typography>
              <Paper sx={{ p: 4, borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="800" color="primary">65%</Typography>
                  <Typography variant="body2" color="text.secondary">Completion Score</Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 5, mb: 4 }} />
                <Typography variant="body2" fontWeight="600" gutterBottom>Next Steps:</Typography>
                <List size="small">
                  {['Add 3 more technical skills', 'Connect LinkedIn Profile', 'Set income targets'].map((text, i) => (
                    <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}><ChevronRight fontSize="small" /></ListItemIcon>
                      <ListItemText primary={text} primaryTypographyProps={{ fontSize: '0.85rem' }} />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth variant="contained" color="secondary" sx={{ mt: 3, borderRadius: 2, py: 1.5 }}>
                  Finish Profile
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;