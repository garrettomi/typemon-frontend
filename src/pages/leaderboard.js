import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/games");
        setLeaderboardData(response.data.data);
      } catch (error) {
        console.error("Error getting leaderboard data:", error);
      }
    };
    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const sortedLeaderboardData = leaderboardData.sort(
    (a, b) => b.score - a.score
  );

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeaderboardData.map((data) => (
            <tr key={data.id}>
              <td>{data.username}</td>
              <td>{data.score}</td>
              <td>{formatTimestamp(data.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}