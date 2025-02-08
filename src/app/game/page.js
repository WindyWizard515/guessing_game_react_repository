"use client"

// Import from react
import { useEffect, useState } from "react"

// Import our requests
import { startRoundWithRandomQuestion } from "../../requests/startRoundWithRandomQuestion"
import { getRoundAnswers } from "../../requests/getRoundAnswers"

// Import other modules
import { useRouter } from "next/navigation"

const ROUND_LENGTH = 30
const TIME_BEFORE_NEXT_ROUND = 10000 // In milliseconds

export default function Game() {
    const router = useRouter()

    const [prompt, setPrompt] = useState(undefined)
    const [timeLeft, setTimeLeft] = useState(ROUND_LENGTH)
    const [answersResponse, setAnswersResponse] = useState(undefined)

    useEffect(() => {
        startRoundWithRandomQuestion()
        .then((response) => {
            if (response.status === 410) {
                router.push("/gameover")
            }
            console.log("Response from starting random round", response)
            setPrompt(response.data.questions.prompt)
        })
        .catch((error) => {
            console.error("Error starting random round", error)
        })
    }, [])

    useEffect(() => {
        if (timeLeft <= 0) {
            return
        }
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        // Clean Interval
        return () => {
            clearInterval(interval)
        }
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft > 0) {
            return
        }

        getRoundAnswers()
            .then((response) => {
                console.log("Response from getRoundAnswers:", response)
                setAnswersResponse(response.data)
                // Refresh the page after a few seconds
                setTimeout(() => {
                    window.location.reload(false)
                }, TIME_BEFORE_NEXT_ROUND)
            })
            .catch((error) => {
                console.error("Error from getting round answers", error)
            })
    }, [timeLeft])
    
    const renderAnswers = () => {
        if (!answersResponse) {
            return null
        }
        if (!answersResponse.results) {
            return null
        }
        if (!answersResponse.overallGamePoints) {
            return null
        }
        if (!answersResponse.roundAnswer) {
            return null
        }

        console.log("hi", answersResponse)
        
        return (
            <div>
                <h1>Answer: <b>{answersResponse.roundAnswer}</b></h1>
                <h4>Here are the answers:</h4>
                { answersResponse.results.map((pointsObj, idx) => {
                    return (
                        <p key={idx}>{pointsObj.player} guessed {pointsObj.guess} -- {pointsObj.points} points ({pointsObj.difference} off)</p>
                    )
                }) }
                <h4>This brings the overall score to:</h4>
                { answersResponse.overallGamePoints.map((pointsObj, idx) => {
                    return(
                        <p key={idx}>{pointsObj.name}: {pointsObj.points}</p>
                    )
                }) }
            </div>
        )
    }

    return (
        <div>
            {timeLeft <= 0 ? renderAnswers()  : <div>
                <h1>Question!</h1>
                <p className="question">{prompt}</p>
                <p>Make a guess on your device! Time left: {timeLeft}</p>
                { timeLeft <= 0 ? null : <img src="images/secret_agent_guessing.jpg" alt="Secret Agent"/> }
            </div>}
            {timeLeft <= 0 ? <h4>New question soon!</h4> : null}
        </div>
    )
}