import React, { useState } from 'react';
import './Leaderboard.css';

interface UserScore {
    name: string;
    quizScore: number;
    codingScore: number;
    isCurrentUser: boolean;
    avatarUrl?: string;
}

const Leaderboard: React.FC<{ data: UserScore[] }> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'quizScore' | 'codingScore' | 'totalScore'>('totalScore');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // Calculate total score dynamically
    const computedData = data.map(user => ({
        ...user,
        totalScore: user.quizScore + user.codingScore,
    }));

    // Sorting the data based on current field and direction
    const sortedData = [...computedData].sort((a, b) => {
        const isAsc = sortDirection === 'asc';
        if (a[sortBy] < b[sortBy]) return isAsc ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return isAsc ? 1 : -1;
        return 0;
    });

    // Assigning position based on the sorted data
    const positionedData = sortedData.map((user, index) => ({
        ...user,
        position: index + 1,  // Assign position based on the current sort order
    }));

    // Filtering data based on search input
    const filteredData = positionedData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic based on clicked column
    const handleSort = (field: 'quizScore' | 'codingScore' | 'totalScore') => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        {/* Position column with sort arrow */}
                        <th onClick={() => handleSort('totalScore')}>
                            Position {sortBy === 'totalScore' && (sortDirection === 'asc' ? '⬇' : '⬆')}
                        </th>
                        <th>Name</th>
                        <th onClick={() => handleSort('quizScore')}>
                            Quiz Score {sortBy === 'quizScore' && (sortDirection === 'asc' ? '⬆' : '⬇')}
                        </th>
                        <th onClick={() => handleSort('codingScore')}>
                            Coding Score {sortBy === 'codingScore' && (sortDirection === 'asc' ? '⬆' : '⬇')}
                        </th>
                        <th>Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((user, index) => (
                        <tr key={index} className={user.isCurrentUser ? 'current-user' : ''}>
                            <td className="position">{user.position}</td>
                            <td>
                                <img src={user.avatarUrl} alt="Avatar" />
                                {user.name} {user.isCurrentUser && '(You)'}
                            </td>
                            <td className="points">{user.quizScore} points</td>
                            <td className="points">{user.codingScore} points</td>
                            <td className="points">{user.totalScore} points</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
