"use client"

// Import modules from react
import { useEffect, useState } from "react"

// Import other modules
import * as cookieCutter from "cookie-cutter"

// Import our files
import { makeGuess } from "../../requests/makeGuess"
import { getCurrentRound } from "@/requests/getCurrentRound"

export default function Client() {

    const [guess, setGuess] = useState(undefined)
    const [madeGuess, setMadeGuess] = useState(undefined)
    const [roundId, setRoundId] = useState(undefined)

    const handleGuess = (event) => {
        setGuess(event.target.value)
    }

    const handleSubmitGuess = () => {
        console.log("Submitting guess", guess)
        const guessAsNumber = parseInt(guess)

        if (isNaN(guessAsNumber)) {
            console.error("Guess was not a number")
            return
        }

        const playerName = cookieCutter.get("playerName")

        if (!playerName) {
            console.error("No cookie playerName was defined")
            return
        }
        
        makeGuess(playerName, guessAsNumber)
        .then((response) => {
            console.log("Response after submitting", response)
            setMadeGuess(true)
        })
        .catch((error) => {
            console.log("Error after submitting", error)
            setMadeGuess(false)
        })
    }

    const makeAGuess = () => {
        return(<div>            <h1>Make a guess</h1>
            <p>
                <input type="text" onChange={handleGuess}/>
            </p>
            <p>
                <button onClick={handleSubmitGuess}>Submit answer</button>
            </p>
            </div>
    )}

    const madeAGuess = () => {
        return(<div>
            <h1>Thanks For Guessing</h1>
            <p>You guessed <b>{guess}</b></p>
            <p>Wait untill the end of the round to guess again</p>
            </div>
        )}

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentRound()
            .then((response) => {
                console.log("response from current round", response)
                if (roundId === undefined) {
                    setRoundId(response.data)
                } else if (roundId !== response.data) {
                    window.location.reload(false)
                }
            })
            .catch((error) => {
                console.error("error getting round", error)
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [roundId])

    return (
        <div>
            { madeGuess ? madeAGuess() : makeAGuess()}
        </div>

        
    )
}