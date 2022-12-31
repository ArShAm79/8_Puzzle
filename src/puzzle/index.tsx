import { useEffect, useState } from 'react'
import { NodeType } from '../types/node'
import {
  calculateDiffrence,
  columnOnClickHandler,
  rerull,
  solvePuzzle
} from './functions'
import './index.css'

const length = 3
const Puzzle = () => {
  const goalNode: NodeType = {
    diffrence: 0,
    pattern: '',
    puzzle: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    turn: 0
  }

  const [botdata, setbotData] = useState<number[][]>([[]])
  const [userdata, setuserData] = useState<number[][]>([[]])
  const [numberOfMoves, setnumberOfMoves] = useState(0)
  const [userNumberOfMoves, setusernumberOfMoves] = useState(0)
  const [botDiffrence, setbotDiffrence] = useState(0)
  const [userDiffrence, setuserDiffrence] = useState(0)
  const [isStarted, setisStarted] = useState(false)
  const [isChallenge, setisChallenge] = useState(false)

  const getAnswer = (cartData: number[][]) => {
    const currentNode: NodeType = {
      diffrence: 0,
      pattern: '',
      puzzle: [...cartData.slice(1, 4)],
      turn: 0
    }

    return solvePuzzle(currentNode, goalNode)
  }

  useEffect(() => {
    rerull(goalNode, setbotData, setuserData, length)
  }, [])

  useEffect(() => {
    const botCurrentNode: NodeType = {
      diffrence: 0,
      pattern: '',
      puzzle: [...botdata.slice(1, 4)],
      turn: 0
    }
    const userCurrentNode: NodeType = {
      diffrence: 0,
      pattern: '',
      puzzle: [...botdata.slice(1, 4)],
      turn: 0
    }

    setbotDiffrence(calculateDiffrence(botCurrentNode, goalNode))
    setuserDiffrence(calculateDiffrence(userCurrentNode, goalNode))
  }, [botdata, userdata])

  const startChallege = () => {
    if (!isChallenge) {
      setisChallenge(!isChallenge)
      setisStarted(!isStarted)
      setusernumberOfMoves(0)
    } else {
      setisChallenge(!isStarted)
      setisStarted(!isStarted)
    }
  }

  const applyAnswer = (answer: string) => {
    let moves = answer.split('-').slice(1)

    const job = setInterval(() => {
      const move = moves[0].split('=>')

      const firstPlace = move[0].split(',').map((item) => Number(item))
      const secondPlace = move[1].split(',').map((item) => Number(item))

      const temp = botdata[firstPlace[0] + 1][firstPlace[1]]
      botdata[firstPlace[0] + 1][firstPlace[1]] =
        botdata[secondPlace[0] + 1][secondPlace[1]]

      botdata[secondPlace[0] + 1][secondPlace[1]] = temp

      setbotData([...botdata])
      setnumberOfMoves((value) => value + 1)

      if (moves.length === 1 || !isStarted) {
        clearInterval(job)
      }
      moves = moves.slice(1)
    }, 100)
  }
  const solve = () => {
    const answer = getAnswer(botdata)
    if (answer) {
      applyAnswer(answer.pattern)
    }
  }

  return (
    <div>
      <header className="header">
        <h2>8 Puzzle</h2>
        <h4>Have fun</h4>
      </header>
      <div className="chart-conatiner">
        <div className="chart">
          {botdata.map((row, i) => (
            <div
              className="chart_row"
              key={row.toString() + i.toString() + 'bot'}>
              {row.map((col, j) => (
                <div
                  className="chart_col"
                  onClick={() => {
                    if (isStarted && !isChallenge) {
                      columnOnClickHandler(
                        i,
                        j,
                        botdata,
                        length * length,
                        setbotData,
                        setnumberOfMoves
                      )
                    }
                  }}
                  role="presentation"
                  key={col.toString()}>
                  {col === length * length ? '' : col}
                </div>
              ))}
            </div>
          ))}
        </div>
        {isChallenge && (
          <div className="chart">
            {userdata.map((row, i) => (
              <div
                className="chart_row"
                key={row.toString() + i.toString() + 'user'}>
                {row.map((col, j) => (
                  <div
                    className="chart_col"
                    onClick={() => {
                      if (isStarted) {
                        columnOnClickHandler(
                          i,
                          j,
                          userdata,
                          length * length,
                          setuserData,
                          setusernumberOfMoves
                        )
                      }
                    }}
                    role="presentation"
                    key={col.toString()}>
                    {col === length * length ? '' : col}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="data-box-cotainer">
        <div className="data-box">
          <div className="data-box-part">
            G: <span>{numberOfMoves}</span>
          </div>
          <div className="data-box-part">
            H:
            <span>{botDiffrence}</span>
          </div>
          <div className="data-box-part">
            F: <span>{numberOfMoves + botDiffrence}</span>
          </div>
        </div>
        {isChallenge && (
          <div className="data-box">
            <div className="data-box-part">
              G: <span>{userNumberOfMoves}</span>
            </div>
            <div className="data-box-part">
              H:
              <span>{userDiffrence}</span>
            </div>
            <div className="data-box-part">
              F: <span>{userNumberOfMoves + userDiffrence}</span>
            </div>
          </div>
        )}
      </div>
      <div className="button-conatiner">
        {!isStarted && (
          <button
            onClick={() => rerull(goalNode, setbotData, setuserData, length)}
            disabled={isChallenge}
            className="rerull-button">
            Rerull
          </button>
        )}
        <button className="challenge-button" onClick={startChallege}>
          {isChallenge ? 'Hide' : 'Challenge'}
        </button>
        <button
          onClick={() => setisStarted(!isStarted)}
          className="start-button">
          {isStarted ? 'Stop' : 'Start'}
        </button>
        <button onClick={solve} className="solve-button" disabled={!isStarted}>
          Solve IDA*
        </button>
        <button onClick={solve} className="solve-button" disabled={!isStarted}>
          Solve RBFS
        </button>
      </div>
    </div>
  )
}
export default Puzzle
