import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CardInfoProps {
    urlImage: string;
    title: string;
    description: string;
  }
  
  const CardInfo: React.FC<CardInfoProps> = ({ urlImage, title, description }) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={urlImage}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Voir plus</Button>
        </CardActions>
      </Card>
    );
  };
  
  export default CardInfo;