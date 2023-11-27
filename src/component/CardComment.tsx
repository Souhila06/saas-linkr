import React from 'react';
import { Card, CardContent, Avatar, Typography, Rating } from '@mui/material';

interface CardCommentsProps {
    avatarSrc: string;
    username: string;
    rating: number;
    comment: string;
  }
  
  const CardComments: React.FC<CardCommentsProps> = (props) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardContent className={"cardComment"}>
          <Avatar alt={props.username} src={props.avatarSrc} />
          <h4>{props.username}</h4>
          <Rating name="half-rating" defaultValue={props.rating} precision={0.5} />

          <Typography variant="body2" color="text.secondary">
            {props.comment}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default CardComments;