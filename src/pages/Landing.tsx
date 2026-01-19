import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, Container, Typography, Box, Grid, Card, 
  Avatar, Stack, TextField, useTheme, Paper, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { 
  Bolt, Security, Insights, Send, ArrowForward, 
  CheckCircle, Psychology, TrendingUp, Timeline, Groups
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Landing: React.FC = () => {
  const theme = useTheme();
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-content", { opacity: 0, y: 30, duration: 1, stagger: 0.2 });
      
      // Floating Animation for the AI Bubble
      gsap.to(".floating-ai", {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "power1.inOut"
      });

      // Scroll reveals for sections
      const sections = [".reveal-1", ".reveal-2", ".reveal-3"];
      sections.forEach((s) => {
        gsap.from(s, {
          scrollTrigger: { trigger: s, start: "top 85%" },
          opacity: 0,
          y: 40,
          duration: 0.8
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={rootRef} sx={{ bgcolor: '#fff', color: '#0f172a' }}>
      
      {/* --- 1. HERO SECTION --- */}
      <Box sx={{ 
        pt: { xs: 12, md: 20 }, pb: { xs: 8, md: 12 },
        background: 'radial-gradient(circle at 90% 10%, #f0f7ff 0%, #fff 40%)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={7} className="hero-content">
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'primary.main', borderRadius: 5 }}>
                  <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>NEW V1.0</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Trusted by 2,000+ Career Switchers</Typography>
              </Stack>
              <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '3rem', md: '4.5rem' }, lineHeight: 1, mb: 3 }}>
                Stop Guessing.<br /><span style={{ color: theme.palette.primary.main }}>Start Earning.</span>
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: 550, lineHeight: 1.6 }}>
                The world's first AI-powered skill-to-income engine. We turn your "hobbies" and "side-skills" into professional monetization roadmaps.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={Link} to="/signup" variant="contained" size="large" sx={{ height: 56, px: 4, borderRadius: 2, fontSize: '1.1rem', textTransform: 'none' }}>
                  Analyze My Skills — It's Free
                </Button>
                <Button component={Link} to="/signin" variant="contained" size="large" sx={{ height: 56, px: 4, borderRadius: 2, fontSize: '1.1rem', textTransform: 'none' }}>
                    Signin
                </Button>
                <Button variant="text" size="large" endIcon={<ArrowForward />} sx={{ height: 56, textTransform: 'none', fontWeight: 700 }}>
                  How it works
                </Button>
                
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} className="floating-ai">
                <Paper elevation={0} sx={{ 
                  p: 4, borderRadius: 8, bgcolor: 'aliceblue', border: '2px solid #e3f2fd',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, bgcolor: 'primary.light', opacity: 0.1, borderRadius: '50%' }} />
                  <Psychology sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" fontWeight={800}>AI Processing</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Analyzing market gaps for "UI Design" + "Teaching"...</Typography>
                  <Box sx={{ width: '100%', height: 8, bgcolor: '#d1e9ff', borderRadius: 4, mb: 1 }}>
                    <Box sx={{ width: '70%', height: '100%', bgcolor: 'primary.main', borderRadius: 4 }} />
                  </Box>
                  <Typography variant="caption" fontWeight={700} color="primary">7 monetization paths found</Typography>
                </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- 2. THE PROBLEM (WHY US) --- */}
      <Box sx={{ py: 12, bgcolor: '#f8fafc' }} className="reveal-1">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight={800} gutterBottom>Generic advice is killing your potential.</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Most people fail to monetize because they follow "hustle culture" instead of data. SkillMap AI bridges the gap between your talent and actual market demand.
              </Typography>
              <List>
                {[
                  { text: "Stop applying to generic jobs you hate", icon: <CheckCircle color="primary"/> },
                  { text: "Identify high-paying niches in minutes", icon: <CheckCircle color="primary"/> },
                  { text: "Get a Week-by-Week action plan", icon: <CheckCircle color="primary"/> }
                ].map((item, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight={800}>140%</Typography>
                  <Typography variant="caption" color="text.secondary">Avg. Income Increase</Typography>
                </Card>
                <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
                  <Timeline sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight={800}>14 Days</Typography>
                  <Typography variant="caption" color="text.secondary">Time to First Client</Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- 3. THE STEP-BY-STEP FLOW --- */}
      <Container maxWidth="lg" sx={{ py: 15 }} className="reveal-2">
        <Typography variant="h3" textAlign="center" fontWeight={800} mb={10}>From Zero to Action in 3 Steps</Typography>
        <Grid container spacing={4}>
          {[
            { step: "01", title: "Input Skills", desc: "List what you know—from Excel to Origami. No skill is too small." },
            { step: "02", title: "AI Clarification", desc: "Our engine asks 3-4 smart questions to find your unique value prop." },
            { step: "03", title: "Execute Plan", desc: "Get a downloadable 4-week roadmap with specific gigs and tools." }
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{ position: 'relative', p: 4, height: '100%', borderRadius: 4, border: '1px solid #f1f5f9' }}>
                <Typography variant="h1" sx={{ position: 'absolute', top: -20, left: 20, opacity: 0.05, fontWeight: 900 }}>{item.step}</Typography>
                <Typography variant="h5" fontWeight={800} mb={2}>{item.title}</Typography>
                <Typography color="text.secondary">{item.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* --- 4. THE MINDS (SUBTLE TEAM SECTION) --- */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', color: '#fff' }} className="reveal-3">
        <Container maxWidth="lg">
          <Stack alignItems="center" textAlign="center" mb={8}>
            <Groups sx={{ fontSize: 40, mb: 2, color: 'primary.light' }} />
            <Typography variant="h4" fontWeight={800}>Engineering Human Capital</Typography>
            <Typography sx={{ opacity: 0.7, maxWidth: 600 }}>
              SkillMap was designed by a specialized team to ensure your data is safe and your results are mathematically accurate.
            </Typography>
          </Stack>
          <Grid container spacing={3} justifyContent="center">
            {[
              { name: 'Rithik', role: 'Frontend Lead', skill: 'React/GSAP' },
              { name: 'Rithis', role: 'UI/UX Designer', skill: 'User Psychology' },
              { name: 'Sharwin', role: 'Backend Architect', skill: 'AI Orchestration' }
            ].map((member, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 800 }}>{member.name[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>{member.name}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>{member.role} • {member.skill}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* --- 5. CALL TO ACTION --- */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={800} mb={3}>Ready to see your true value?</Typography>
        <Typography variant="h6" color="text.secondary" mb={5}>Join 2,000+ others who stopped guessing and started building.</Typography>
        <Button component={Link} to="/signup" variant="contained" size="large" sx={{ py: 2, px: 6, borderRadius: 3, fontSize: '1.2rem', boxShadow: '0 20px 40px rgba(25,118,210,0.2)' }}>
          Get My Free Income Map
        </Button>
      </Container>

      {/* --- FOOTER --- */}
      <Box sx={{ py: 6, borderTop: '1px solid #f1f5f9' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">© 2026 SkillMap AI. All rights reserved.</Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Privacy</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Terms</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Contact</Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;