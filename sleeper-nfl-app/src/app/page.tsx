"use client"

import axios from "axios"
import { useEffect, useState } from "react"

type Player = {
  player_id: string;
  last_name: string;
  first_name: string;
  position: string;
  team: string;
}

export default function Home() {

  const [players, setPlayers] = useState<Player[] | null>(null)
  const [searchPlayer, setSearchPlayer] = useState("")

  useEffect(() => {
    async function fetchApi() {
      try {
        const req = await axios.get("https://api.sleeper.app/v1/players/nfl");
        const allPlayers = Object.values(req.data) as Player[];
        const mainPlayers = allPlayers.slice(0, 15);
        setPlayers(mainPlayers)
      } catch (error) {
        console.error("Error loading", error);
      }
    }
    fetchApi();
  }, [])

  const filteredPlayers = players?.filter((player) => `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchPlayer.toLowerCase())
);

  return (
    <>
    <input
      type="text"
      placeholder="enter a player"
      value={searchPlayer}
      onChange={(e) => setSearchPlayer(e.target.value)}
     />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {!players ?
            <tr>
              <td colSpan={3}>Loading..</td>
            </tr> :
            filteredPlayers?.map((player) => (
              <tr key={player.player_id}>
                <td>{player.first_name} {player.last_name}</td>
                <td>{player.position || "N/A"}</td>
                <td>{player.team || "Free Agent"}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}