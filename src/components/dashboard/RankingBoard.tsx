interface RankingBoardProps {
  rank2023: number;
  rank2025: number;
  score2023: string;
  score2025: string;
}

export function RankingBoard({ rank2023, rank2025, score2023, score2025 }: RankingBoardProps) {
  const rankDiff = rank2023 - rank2025;
  const scoreDiff = parseFloat(score2025) - parseFloat(score2023);

  return (
    <div className="ranking-gradient text-primary-foreground rounded-lg p-6 mb-8 shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <h3 className="text-sm font-medium opacity-90 mb-2">Global Rank 2023</h3>
          <div className="text-4xl font-bold">{rank2023}</div>
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-medium opacity-90 mb-2">Global Rank 2025</h3>
          <div className="text-4xl font-bold">{rank2025}</div>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-sm">
            {rankDiff > 0 ? (
              <span className="text-green-200">▲ {Math.abs(rankDiff)}</span>
            ) : rankDiff < 0 ? (
              <span className="text-red-200">▼ {Math.abs(rankDiff)}</span>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-medium opacity-90 mb-2">Score 2023</h3>
          <div className="text-4xl font-bold">{score2023}</div>
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-medium opacity-90 mb-2">Score 2025</h3>
          <div className="text-4xl font-bold">{score2025}</div>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-sm">
            {scoreDiff > 0 ? (
              <span className="text-green-200">▲ {Math.abs(scoreDiff).toFixed(2)}</span>
            ) : scoreDiff < 0 ? (
              <span className="text-red-200">▼ {Math.abs(scoreDiff).toFixed(2)}</span>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
