import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { ICard } from "../../interfaces/ICard";
import { useDrag } from 'react-dnd'
import DeleteIcon from '@mui/icons-material/Delete';

interface CardItemProps {
  cardItem: ICard;
  newCard?: boolean;
  handleDeleteCard: (citem: ICard) => void;
}

const CardItem = ({ cardItem, newCard, handleDeleteCard }: CardItemProps) => {
  const [isEditting, setIsEditting] = useState(newCard);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "cardItem",
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: cardItem
  }))

  const handleCardTitleChange = (e: any) => {
    setCardTitle(e.target.value);
  }

  const handleCardDescriptionChange = (e: any) => {
    setCardDescription(e.target.value);
  }

  const handleSave = () => {
    if (cardTitle && cardDescription) {
      cardItem.title = cardTitle;
      cardItem.description = cardDescription;
      setIsEditting(false);
    }
  }
  return (
    <Card className="min-w-[100%] flex flex-col p-[10px]" ref={drag}>
      {!isEditting ?
        <>
          <div className="flex w-[100%]">
            <h3 className="flex-1">{cardItem.title}</h3>
            <DeleteIcon color="primary" className="cursor-pointer" onClick={() => handleDeleteCard(cardItem)}></DeleteIcon>
          </div>
          <div>{cardItem.description}</div>
        </>
        :
        <>
          <TextField
            onChange={handleCardTitleChange}
            value={cardTitle}
            label="Title"
          />
          <TextField
            onChange={handleCardDescriptionChange}
            value={cardDescription}
            label="Description"
          />
          <Button variant="outlined" color="primary" onClick={handleSave}>Save</Button>
        </>
      }
    </Card>
  );
}
export default CardItem;