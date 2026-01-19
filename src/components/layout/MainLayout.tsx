import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { EmojiObjects as SkillIcon } from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuth'

const MainLayout: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <SkillIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SkillMapper
            </Typography>
          </Box>
          
          <Button color="inherit" href="/dashboard">Dashboard</Button>
          <Button color="inherit" href="/skills">Skills</Button>
          <Button color="inherit" onClick={signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default MainLayout