'use client';
import { useState, useEffect } from 'react'

import Card from '@/utils/components/card';
import SavedCard from '@/utils/components/savedCard';
import { makeClient } from '@/lib/apollo/ApolloWrapper';
import { GET_ALL_CARDS } from '@/utils/queries/cardQueries';

export default function Home() {

  const [cards, setCards] = useState([]);

  

  useEffect(() => {
    (async () => {
      const client = makeClient();

      const response = await client.query({
        query: GET_ALL_CARDS
      });

      if(response?.data?.allCards?.edges) {
        setCards(response.data.allCards.edges);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to Database Planner</h1>
      </div>
      <div className="flex justify-around">
        <Card />
      </div>
      <div className="flex justify-around">
        {cards.map((card, index ) => (
          <div key={index}>
            <SavedCard key={index} title={card.node.title} items={card.node.items.edges} />
          </div>
        ))}
      </div>
    </>
  )
}