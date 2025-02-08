"use client"

// Import other modules
import Link from "next/link"

// Import from react
import { useEffect, useState } from "react"

// Import our requests
import { getPlayers } from "../requests/getPlayers.js"

// This is the function that runs our app
export default function Home() {
  const [players, setPlayers]= useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers().then((response) => {
        console.warn("Response from backend", response.data)
        setPlayers(response.data)
      })
    }, 1000)

    return() => {
      clearInterval(interval)
    }
  }, [])

  // What is displayed on the webpage
  return (
    <div>
      <h1>Guessing Game</h1>
      <Link href="/game"><button>Start game</button></Link>
      <p> Waiting for players. Currently joined:</p>
      {
        players.map((player, index) => {
          return(
            <p key={index}>{player.name}</p>
          )
        })
      }
      <h2>Join</h2>
      <p>Navigate to <Link href="/join">/join</Link> on your phone to join the game!</p>
      <img src="images/palm_tree.jpg" alt="Palm Tree"/>
    </div>
  )
}

/**
 *
 */