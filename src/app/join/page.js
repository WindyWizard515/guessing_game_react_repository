"use client"

// Import modules from react
import { useEffect, useState } from "react"

// Import other modules
import * as cookieCutter from "cookie-cutter"
import { useRouter } from "next/navigation"

// Import our files
import { addPlayer } from "../../requests/addPlayer"
import { getCurrentRound } from "../../requests/getCurrentRound.js"
import { Router } from "next/router"

export default function Join() {
    const router = useRouter()

    const [playerName, setPlayerName] = useState(undefined)
    const [addPlayerSuccess, setAddPlayerSuccess] = useState(undefined)

    const handlePlayerNameInputChange = (event) => {
        setPlayerName(event.target.value)
    }
    
    const submitPlayerName = () => {
        console.log("Called submitPlayerName", playerName)
        addPlayer(playerName).then((response) => {
            console.log("response after addPlayer", response)
            setAddPlayerSuccess(true)
            cookieCutter.set("playerName", playerName)
        }).catch((error) => {
            console.error("Error after addPlayer", error)
            setAddPlayerSuccess(false)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentRound()
            .then((response) => {
                console.log("Response from current round", response)
                router.push("/client")
            })
            .catch((error) => {
                console.log("Error from getting current round", error)
            })
        }, 1000)

        // Cleanup after page is destroyed
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div>
            <h1>Submit your player name</h1>
            { addPlayerSuccess === true ? null : <div>
                <p>
                    <input type="text" onChange={handlePlayerNameInputChange}/>
                </p>
                <p>
                    <button type="submit" onClick={submitPlayerName}>Join game</button>
                </p>
            </div> }
            { addPlayerSuccess === true ? <p>You threw your hat into the ring! the page will redirect when the game
                starts.</p> : null }
            { addPlayerSuccess === false ? <p>An error occured.</p> : null }
        </div>
    )
}