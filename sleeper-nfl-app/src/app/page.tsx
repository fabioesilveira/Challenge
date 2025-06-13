"use client"

import axios from "axios"
import { useEffect, useState } from "react"

type Player = {
  player_id: string,
  full_name: string,
  position: string
}

export default function Home() {

  const [players, setPlayers] = useState<Player[]>([]);
  const [findPlayer, setFindPlayer] = useState("");

  useEffect(() => {
    async function fetchApi() {
      try {
        const req = await axios.get("https://api.sleeper.app/v1/players/nfl")
        const nflPlayers = Object.values(req.data) as Player[]
        const fifteenPlayers = nflPlayers.slice(0, 15)
        setPlayers(fifteenPlayers)
      } catch (error) {
        console.error("Error to Load Api", error)
      }
    }
    fetchApi()
  }, [])

  const searchPlayer = players.filter((e) => 
    `${e.full_name}`.toLowerCase().includes(findPlayer.toLowerCase()))

  return (
    <>
    <input
    type="text"
    placeholder="enter a player"
    value={findPlayer}
    onChange={(event) => setFindPlayer(event.target.value)}
    />
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {searchPlayer.map((e) => (
            <tr key={e.player_id}>
              <td>{e.full_name}</td>
              <td>{e.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}