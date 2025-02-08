"use client"


// Import from react
import { useEffect, useState } from "react"

// Import our requests
import { getPlayers } from "../../requests/getPlayers.js"

export default function Game() {
    const [players, setPlayers] = useState(undefined)

    const getThePlayers = () => {
        getPlayers()
        .then((response) => {
            console.log("Response from getPlayers:", response)
            setPlayers(response.data)
        })
        .catch((error) => {
            console.error("Error from getting players", error)
        })
    }

    useEffect(() => {
        getThePlayers()
    }, [])
    
    const renderResults = () => {
        return(
            <div>
                {players.map((player, idx) => {
                        return(
                            <h3 key={idx}><b>{player.name}</b>: {player.points}</h3>
                        )
                    }) }
            </div>
        )
    }

    return(
        <div>
            <h1>Thanks for Playing!</h1>
            { players ? renderResults() : null}
            <img src="images/results.jpg" alt="Results Dinosaur"/>
        </div>
    )
}