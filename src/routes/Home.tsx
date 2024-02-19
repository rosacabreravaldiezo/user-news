import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h5" component="div">
        Rosa Cabrera
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        rosacabreravaldiviezo@gmail.com
      </Typography>
    </>
  );
}
export default Home;