import React from 'react';
import Leaderboard from './Leaderboard';

const App = () => {
    const leaderboardData = [
        { name: "John Doe", quizScore: 45, codingScore: 9, isCurrentUser: false },
        { name: "Tatvam Jain", quizScore: 50, codingScore: 100, isCurrentUser: true },
        { name: "Alex Smith", quizScore: 40, codingScore: 90, isCurrentUser: false },
        { name: "Jane Roe", quizScore: 45, codingScore: 95, isCurrentUser: false }
    ];

    return (
        <div>
            <Leaderboard data={leaderboardData} />
        </div>
    );
};

export default App;
