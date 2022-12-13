import { useEffect, useState } from 'react'
import './index.css'

const Puzzle = () => {
  const [data, setdata] = useState<number[][]>([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ])
  const [numberOfMoves, setnumberOfMoves] = useState<number>(0)
  useEffect(() => {
    const numbers = Array(9)
      .fill(0)
      .map((_, i) => i + 1)
    const splitedNumbers = [
      [],
      numbers.slice(0, 3),
      numbers.slice(3, 6),
      numbers.slice(6, 9),
      []
    ]
    setdata(splitedNumbers)
    console.log(splitedNumbers)
  }, [])

  const checkIsCornerTo9 = (rowIndex: number, colIndex: number) => {
    return data[rowIndex][colIndex] === 9
      ? { rowIndex, colIndex }
      : data[rowIndex + 1][colIndex] === 9
      ? { rowIndex: rowIndex + 1, colIndex }
      : data[rowIndex - 1][colIndex] === 9
      ? { rowIndex: rowIndex - 1, colIndex }
      : data[rowIndex][colIndex + 1] === 9
      ? { rowIndex, colIndex: colIndex + 1 }
      : data[rowIndex][colIndex - 1] === 9
      ? { rowIndex, colIndex: colIndex - 1 }
      : undefined
  }
  const columnOnClickHandler = (rowIndex: number, colIndex: number) => {
    if (checkIsCornerTo9(rowIndex, colIndex)) {
      const temp = data[rowIndex][colIndex]
      const info = checkIsCornerTo9(rowIndex, colIndex)
      data[rowIndex][colIndex] = 9
      data[info!.rowIndex][info!.colIndex] = temp
      setdata([...data])
      setnumberOfMoves(numberOfMoves + 1)
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
                onClick={() => columnOnClickHandler(i, j)}
                role="presentation"
                key={col.toString()}>
                {col === 9 ? '' : col}
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
