import { useState, useEffect } from 'react';

const facts = [
  "The first video game was created in 1958.",
  "The gaming industry is larger than the movie and music industries combined.",
  "The longest video game marathon lasted 138 hours and 34 seconds.",
  "The term 'Easter Egg' for a hidden video game feature originated from the game Adventure on Atari 2600.",
  "The most expensive video game ever developed was Grand Theft Auto V, with a budget of $265 million.",
];

export default function GamingFactOfTheDay() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const getFact = () => {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem('factDate');
      const storedFact = localStorage.getItem('dailyFact');

      if (storedDate === today && storedFact) {
        setFact(storedFact);
      } else {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setFact(randomFact);
        localStorage.setItem('factDate', today);
        localStorage.setItem('dailyFact', randomFact);
      }
    };

    getFact();
  }, []);

  if (!fact) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg my-8">
      <h3 className="text-xl font-bold mb-2">Gaming Fact of the Day</h3>
      <p>{fact}</p>
    </div>
  );
}