import { Button, Card } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CardColumn from '../components/CardColumn'
import { ICard } from '../interfaces/ICard'
import { IColumn } from '../interfaces/IColumn'
import styles from '../styles/Home.module.css'
import { v4 as uuidv4 } from 'uuid';
import { cardColumns } from '../data'

const Home: NextPage = () => {
  const [columns, setColumns] = useState<IColumn[]>(cardColumns);

  const moveItem = (item: ICard, cardColumn: IColumn) => {
    setColumns(columns?.map(c => {
      if (c.items.indexOf(item) > -1) {
        return { ...c, items: c.items.filter(i => i.id !== item.id) }
      } else if (c.id === cardColumn.id) {
        return { ...c, items: [...c.items, item] }
      }
      return c;
    }));
  }

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: uuidv4(), title: '', items: [] }
    ])
  }

  const handleAddCard = (cardColumn: IColumn) => {
    setColumns(columns.map(c => {
      if (cardColumn.id === c.id) {
        return { ...c, items: [...c.items, { id: uuidv4(), title: '', description: '' }] }
      }
      return c;
    }))
  }

  const handleDeleteCard = (item: ICard) => {
    setColumns(columns?.map(c => {
      if (c.items.indexOf(item) > -1) {
        return { ...c, items: c.items.filter(i => i.id !== item.id) }
      }
      return c;
    }));
  }

  const handleDeleteColumn = (cardColumn: IColumn) => {
    setColumns(columns.filter(c => c.id !== cardColumn.id));
  }

  return (
    <div className="w-[100vw] min-h-[100vh] p-[10px] flex bg-[#0080ff] gap-[10px]">
      {columns?.map(c => (
        <CardColumn
          cardColumn={c}
          moveItem={moveItem}
          key={c.id}
          newColumn={!c.title}
          handleAddCard={handleAddCard}
          handleDeleteCard={handleDeleteCard}
          handleDeleteColumn={handleDeleteColumn}
        ></CardColumn>))}
      <Button variant="contained" onClick={handleAddColumn}>Add Column</Button>
    </div>
  )
}

export default Home
