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

  const [data, setdata] = useState<number[][]>([[]])
  const [numberOfMoves, setnumberOfMoves] = useState<number>(0)
  const [diffrence, setdiffrence] = useState<number>(0)
  const [isStarted, setisStarted] = useState<boolean>(false)

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
    rerull(goalNode, setdata, length)
  }, [])

  useEffect(() => {
    const currentNode: NodeType = {
      diffrence: 0,
      pattern: '',
      puzzle: [...data.slice(1, 4)],
      turn: 0
    }

    setdiffrence(calculateDiffrence(currentNode, goalNode))
  }, [data])

  const applyAnswer = (answer: string) => {
    let moves = answer.split('-').slice(1)

    const job = setInterval(() => {
      const move = moves[0].split('=>')

      const firstPlace = move[0].split(',').map((item) => Number(item))
      const secondPlace = move[1].split(',').map((item) => Number(item))

      const temp = data[firstPlace[0] + 1][firstPlace[1]]
      data[firstPlace[0] + 1][firstPlace[1]] =
        data[secondPlace[0] + 1][secondPlace[1]]

      data[secondPlace[0] + 1][secondPlace[1]] = temp

      setdata([...data])
      setnumberOfMoves((value) => value + 1)

      if (moves.length === 1 || !isStarted) {
        clearInterval(job)
      }
      moves = moves.slice(1)
    }, 100)
  }
  const solve = () => {
    const answer = getAnswer(data)
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
      <div className="chart">
        {data.map((row, i) => (
          <div className="chart_row" key={row.toString() + i.toString()}>
            {row.map((col, j) => (
              <div
                className="chart_col"
                onClick={() => {
                  if (isStarted) {
                    columnOnClickHandler(
                      i,
                      j,
                      data,
                      length * length,
                      setdata,
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
      <div className="data-box">
        <div className="data-box-part">
          G: <span>{numberOfMoves}</span>
        </div>
        <div className="data-box-part">
          H:
          <span>{diffrence}</span>
        </div>
        <div className="data-box-part">
          F: <span>{numberOfMoves + diffrence}</span>
        </div>
      </div>
      <div className="button-conatiner">
        {!isStarted && (
          <button
            onClick={() => rerull(goalNode, setdata, length)}
            className="rerull-button">
            Rerull
          </button>
        )}
        <button
          onClick={() => setisStarted(!isStarted)}
          className="start-button">
          {isStarted ? 'Stop' : 'Start'}
        </button>
        <button onClick={solve} className="solve-button" disabled={!isStarted}>
          Solve
        </button>
      </div>
    </div>
  )
}
export default Puzzle
