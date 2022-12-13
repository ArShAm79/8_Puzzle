/* eslint-disable @typescript-eslint/no-loop-func */
const checkIsCornerTo9 = (
  rowIndex: number,
  colIndex: number,
  data: number[][],
  target: number
) => {
  return data[rowIndex][colIndex] === target
    ? { rowIndex, colIndex }
    : data[rowIndex + 1][colIndex] === target
    ? { rowIndex: rowIndex + 1, colIndex }
    : data[rowIndex - 1][colIndex] === target
    ? { rowIndex: rowIndex - 1, colIndex }
    : data[rowIndex][colIndex + 1] === target
    ? { rowIndex, colIndex: colIndex + 1 }
    : data[rowIndex][colIndex - 1] === target
    ? { rowIndex, colIndex: colIndex - 1 }
    : undefined
}
export const columnOnClickHandler = (
  rowIndex: number,
  colIndex: number,
  data: number[][],
  target: number,
  setdata: (value: number[][]) => void,
  setnumberOfMoves: React.Dispatch<React.SetStateAction<number>>
) => {
  const info = checkIsCornerTo9(rowIndex, colIndex, data, target)
  if (info) {
    const temp = data[rowIndex][colIndex]
    data[rowIndex][colIndex] = target
    data[info!.rowIndex][info!.colIndex] = temp
    setdata([...data])
    setnumberOfMoves((value) => value + 1)
  }
}
export const createChartData = (length: number) => {
  let initialData = Array(length * length)
    .fill(null)
    .map((_, i) => i + 1)

  let data: number[] = []

  while (initialData.length > 0) {
    const randomIndex = Math.floor(initialData.length * Math.random())

    data = [...data, initialData[randomIndex]]

    initialData = initialData.filter(
      (item) => item !== initialData[randomIndex]
    )
  }

  let finalData: number[][] = []

  while (data.length > 0) {
    const partData = data.slice(0, length)
    finalData = [...finalData, partData]
    data = data.slice(length)
  }

  return finalData
}
