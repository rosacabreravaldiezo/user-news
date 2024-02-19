import { Grid } from '@mui/material';
import { useLoaderData, useNavigate } from "react-router-dom";
import { getDetailNews, News, getDateFormat } from "../../models";
import type { Params } from "react-router-dom";
import { Avatar, Button, CardMedia, Typography, Card, CardHeader, CardContent} from '@mui/material';
import { grey } from '@mui/material/colors';


export async function loader({ params }: { params: Params<"newsId"> }) {
  const news = await getDetailNews(params.newsId || '');
  return { news };
}

const NewsDetail = () => {
  const nav = useNavigate();
  const { news } = useLoaderData() as { news: News };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={() => nav(-1)}>&larr; Go back</Button>
        </Grid>
      </Grid>

      <br />

      <Card >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
              {news.author.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={news.author}
          subheader={getDateFormat(news.published_at)}
        />
        <CardMedia
          component="img"
          height="500"
          image={news.imageUrl}
          alt={news.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {news.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {news.content}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default NewsDetail;