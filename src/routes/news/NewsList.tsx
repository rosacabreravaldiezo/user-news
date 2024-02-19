import React from 'react';
import { Link, useLoaderData } from "react-router-dom";
import { ImageList, ImageListItem, IconButton, ImageListItemBar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { News, getNews } from "../../models";

export async function loader() {
  const news = await getNews();
  return { news };
}

const NewsList: React.FC = () => {
  const { news } = useLoaderData() as { news: News[] };


  return (
    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <div style={{width: '80%'}}>
        <ImageList cols={3} >
          {news.map((item) => (
            <ImageListItem key={item.imageUrl}>
              <img
                srcSet={`${item.imageUrl}?r=${item.id}`}
                src={`${item.imageUrl}?r=${item.id}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <Link to={`/news/${item.id}`}>
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`} >
                      <InfoIcon />
                    </IconButton>
                  </Link>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>

      </div>

    </div>
  );
};

export default NewsList;