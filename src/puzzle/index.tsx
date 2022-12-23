import { useEffect, useState } from 'react'
import { NodeType } from '../types/node'
import { columnOnClickHandler, createChartData, solvePuzzle } from './functions'
import './index.css'

const length = 3
const Puzzle = () => {
  const [data, setdata] = useState<number[][]>([])
  const [numberOfMoves, setnumberOfMoves] = useState<number>(0)

  useEffect(() => {
    const initialData = createChartData(length)
    const splitedNumbers = [[], ...initialData, []]
    setdata(splitedNumbers)
  }, [])

  const getAnswer = () => {
    const currentNode: NodeType = {
      diffrence: 0,
      pattern: '',
      puzzle: [...data.slice(1, 4)],
      turn: 0
    }
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
    return solvePuzzle(currentNode, goalNode)
  }

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

      if (moves.length === 1) {
        clearInterval(job)
      }
      moves = moves.slice(1)
    }, 100)
  }
  const solve = () => {
    const answer = getAnswer()
    if (!answer) {
      alert('Ridi')
    } else {
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
                onClick={() =>
                  columnOnClickHandler(
                    i,
                    j,
                    data,
                    length * length,
                    setdata,
                    setnumberOfMoves
                  )
                }
                role="presentation"
                key={col.toString()}>
                {col === length * length ? '' : col}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h3>Number of moves: {numberOfMoves}</h3>
      </div>
      <div className="button-conatiner">
        <button onClick={solve} className="solve-button">
          Solve
        </button>
      </div>
    </div>
  )
}
export default Puzzle
