'use client';
import { useState } from 'react'

import Card from './components/card'

export default function Home() {

  const [cards, setCards] = useState([]);

  return (
    <>
      <div>
        <h1>Welcome to Database Planner</h1>
      </div>
      <div className="flex justify-around">
        {cards.map((card, index) => (
          <Card key={index} />
        ))}
        <button onClick={() => {
          setCards(prevState => [...prevState, { title: 'New Card', items: [] }]);
        }}>Add Card</button>
      </div>
    </>
  )
}