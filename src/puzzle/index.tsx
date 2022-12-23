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

  const solve = () => {
    const initialData = createChartData(length)

    const currentNode: NodeType = {
      diffrence: 0,
      pattern: '',
      puzzle: [...initialData],
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
    solvePuzzle(currentNode, goalNode)
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
      <div>
        <button onClick={solve}>Solve</button>
      </div>
    </div>
  )
}
export default Puzzle
