import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, TextField, Chip, Stack, 
  Paper, Grid, Button, IconButton, Divider, Card, 
  List, ListItem, ListItemText, ListItemIcon, LinearProgress 
} from '@mui/material';
import { 
  Add as AddIcon, 
  AutoAwesome, 
  WorkOutline, 
  TrendingUp, 
  InfoOutlined,
  DeleteOutline 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const SkillInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample skills for quick selection
  const suggestions = ['React', 'Excel', 'Writing', 'Graphic Design', 'Public Speaking', 'Data Analysis'];

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInputValue('');
      triggerAIAnalysis();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const triggerAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1500); // Simulate AI delay
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* --- LEFT SIDE: INPUT SECTION --- */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" color="primary" fontWeight="bold">Step 1 of 3</Typography>
              <Typography variant="h3" fontWeight="800" gutterBottom>What are your skills?</Typography>
              <Typography color="text.secondary">
                Don’t overthink it. List anything you’re decent at—work, hobbies, or education.
              </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
              <Stack spacing={3}>
                <Box>
                  <TextField
                    fullWidth
                    placeholder="e.g. Photoshop, teaching, Python..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(inputValue)}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => handleAddSkill(inputValue)} color="primary">
                          <AddIcon />
                        </IconButton>
                      ),
                      sx: { borderRadius: 3, bgcolor: '#fcfcfc' }
                    }}
                  />
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, ml: 1, opacity: 0.7 }}>
                    Press Enter or click (+) to add
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <AnimatePresence>
                    {skills.map((skill) => (
                      <motion.div 
                        key={skill} 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }}
                      >
                        <Chip
                          label={skill}
                          onDelete={() => removeSkill(skill)}
                          color="primary"
                          variant="filled"
                          sx={{ fontWeight: 600, borderRadius: 2, height: 40, px: 1 }}
                          deleteIcon={<DeleteOutline />}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="body2" fontWeight="700" gutterBottom>Try these suggestions:</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {suggestions.map((s) => (
                      <Chip 
                        key={s} 
                        label={s} 
                        onClick={() => handleAddSkill(s)} 
                        disabled={skills.includes(s)}
                        sx={{ borderRadius: 2 }} 
                      />
                    ))}
                  </Stack>
                </Box>

                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large" 
                  disabled={skills.length === 0}
                  sx={{ py: 2, borderRadius: 3, fontWeight: 'bold' }}
                >
                  Generate My Income Map
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* --- RIGHT SIDE: AI LIVE PREVIEW --- */}
          <Grid item xs={12} md={5}>
            <Card sx={{ 
              borderRadius: 4, 
              border: '1px solid #e2e8f0', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              position: 'sticky',
              top: 40
            }}>
              <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AutoAwesome fontSize="small" />
                <Typography variant="subtitle1" fontWeight="700">AI Preview Engine</Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                {isAnalyzing ? (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Analyzing market niches...</Typography>
                    <LinearProgress sx={{ borderRadius: 5, height: 6 }} />
                  </Box>
                ) : skills.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: 'center', opacity: 0.5 }}>
                    <WorkOutline sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2">Enter skills to see <br />potential market paths</Typography>
                  </Box>
                ) : (
                  <Stack spacing={3}>
                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                      Potential Opportunities based on your list:
                    </Typography>
                    
                    <List sx={{ p: 0 }}>
                      {[
                        { title: 'Freelance Consultant', rate: '$45-60/hr', difficulty: 'Low' },
                        { title: 'Niche Content Creator', rate: '$500/project', difficulty: 'Medium' }
                      ].map((job, i) => (
                        <ListItem key={i} sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <TrendingUp color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={job.title} 
                            secondary={`Potentail: ${job.rate} • Effort: ${job.difficulty}`}
                            primaryTypographyProps={{ fontWeight: 700 }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Alert icon={<InfoOutlined />} severity="info" sx={{ borderRadius: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        The more skills you add, the more high-paying cross-functional paths we can find.
                      </Typography>
                    </Alert>
                  </Stack>
                )}
              </Box>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default SkillInput;