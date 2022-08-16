import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ICard } from "../../interfaces/ICard";
import { IColumn } from "../../interfaces/IColumn";
import CardItem from "../CardItem";
import DeleteIcon from '@mui/icons-material/Delete';

interface CardColumnProps {
  cardColumn: IColumn;
  moveItem: (item: ICard, cardColumn: IColumn) => void;
  newColumn?: boolean
  handleAddCard: (cardColumn: IColumn) => void;
  handleDeleteCard: (item: ICard) => void;
  handleDeleteColumn: (cardColumn: IColumn) => void;
}

const CardColumn = ({ cardColumn, moveItem, newColumn, handleAddCard, handleDeleteCard, handleDeleteColumn }: CardColumnProps) => {
  const [isEditting, setIsEditting] = useState(newColumn);
  const [columnName, setColumnName] = useState('');
  const [, drop] = useDrop(
    () => ({
      accept: 'cardItem',
      drop: (cardItem: ICard) => moveItem(cardItem, cardColumn)
    }),
    [cardColumn]
  )
  const handleColumnNameChange = (e: any) => {
    setColumnName(e.target.value);
  }

  const handleSave = () => {
    cardColumn.title = columnName;
    setIsEditting(false);
  }
  return (
    <Card className="min-w-[300px] min-h-[100%] !bg-[#e6eeff] flex flex-col p-[20px] gap-[10px]" >
      {!isEditting ?
        <>
          <div className="flex w-[100%]">
            <h3 className="flex-1">{cardColumn.title}</h3>
            <DeleteIcon color="primary" className="cursor-pointer" onClick={() => handleDeleteColumn(cardColumn)}></DeleteIcon>
          </div>
          <div ref={drop} className="flex flex-col min-w-[100%] min-h-[100%] gap-[10px]">
            {cardColumn.items?.map(i => (
              <CardItem cardItem={i} key={i.id} newCard={!i.title} handleDeleteCard={handleDeleteCard}></CardItem>
            ))}
            <Button variant="outlined" color="primary" onClick={() => handleAddCard(cardColumn)}>Add Card</Button>
          </div>
        </>
        :
        <>
          <TextField
            onChange={handleColumnNameChange}
            value={columnName}
            label="Title"
          />
          <Button variant="outlined" color="primary" onClick={handleSave}>Save</Button>
        </>
      }
    </Card>
  );
}
export default CardColumn;