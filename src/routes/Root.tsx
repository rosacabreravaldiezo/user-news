import { Outlet, Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, Typography, Button } from '@mui/material';
import { useTranslation } from "react-i18next";



const Root = () => {
  const { t } = useTranslation();
  const navItems = [{ name: t('home'), url: '/' }, { name: t('users'), url: '/users' }, { name: t('news'), url: '/news' }];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Rosa Cabrera
          </Typography>
          {navItems.map((item, i) => (
            <Link to={item.url} key={i}>
              <Button key={item.name} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Root;