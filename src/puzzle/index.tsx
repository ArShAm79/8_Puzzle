import { useEffect, useState } from 'react'
import { columnOnClickHandler, createChartData } from './functions'
import './index.css'

const length = 5
const Puzzle = () => {
  const [data, setdata] = useState<number[][]>([])
  const [numberOfMoves, setnumberOfMoves] = useState<number>(0)
  useEffect(() => {
    const initialData = createChartData(length)
    const splitedNumbers = [[], ...initialData, []]
    setdata(splitedNumbers)
  }, [])

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
    </div>
  )
}
export default Puzzle
