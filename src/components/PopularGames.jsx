import GameCard from './GameCard';

export default function PopularGames({ games }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Popular Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.slice(0, 4).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}