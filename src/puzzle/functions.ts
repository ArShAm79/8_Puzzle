/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-loop-func */

import { NodeType } from '../types/node'

export const checkIsFinished = (data: number[][]) => {
  const arrayData = data
    .join(',')
    .replaceAll(',', ' ')
    .trim()
    .split(' ')
    .map((item) => Number(item))
  for (let i = 0; i < arrayData.length; i++) {
    if (arrayData[i] !== i + 1) {
      return false
    }
  }
  return true
}

const findEmptyPlace = (currentNode: NodeType, length: number) => {
  for (let i = 0; i < currentNode.puzzle.length; i++) {
    for (let j = 0; j < currentNode.puzzle[i].length; j++) {
      if (length * length === currentNode.puzzle[i][j]) return { i, j }
    }
  }
}

const checkIsCornerTo9 = (
  rowIndex: number,
  colIndex: number,
  data: number[][],
  target: number
) => {
  return data[rowIndex + 1][colIndex] === target
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

const createOptions = (length: number, i: number, j: number) => {
  if (i === 0 && j === 0) {
    return [
      { i, j: j + 1 },
      { i: i + 1, j }
    ]
  } else if (i === 0 && j === length - 1) {
    return [
      { i, j: j - 1 },
      { i: i + 1, j }
    ]
  } else if (i === length - 1 && j === 0) {
    return [
      { i, j: j + 1 },
      { i: i - 1, j }
    ]
  } else if (i === length - 1 && j === length - 1) {
    return [
      { i, j: j - 1 },
      { i: i - 1, j }
    ]
  } else if (i === 0) {
    return [
      { i, j: j + 1 },
      { i, j: j - 1 },
      { i: i + 1, j }
    ]
  } else if (j === 0) {
    return [
      { j, i: i + 1 },
      { j, i: i - 1 },
      { j: j + 1, i }
    ]
  } else if (i === length - 1) {
    return [
      { i, j: j + 1 },
      { i, j: j - 1 },
      { i: i - 1, j }
    ]
  } else if (j === length - 1) {
    return [
      { j, i: i + 1 },
      { j, i: i - 1 },
      { j: j - 1, i }
    ]
  } else {
    return [
      { i, j: j + 1 },
      { i, j: j - 1 },
      { i: i - 1, j },
      { i: i + 1, j }
    ]
  }
}
export const createChartData = (length: number) => {
  let initialData = Array(length * length)
    .fill(null)
    .map((_, i) => i + 1)

  let finalData: number[][] = []

  while (initialData.length > 0) {
    const partData = initialData.slice(0, length)
    finalData = [...finalData, partData]
    initialData = initialData.slice(length)
  }
  const node: NodeType = {
    diffrence: 0,
    pattern: '',
    puzzle: finalData,
    turn: 0
  }

  for (let i = 0; i < 50; i++) {
    const emptyPlace = findEmptyPlace(node, node.puzzle.length)
    const options = createOptions(
      node.puzzle.length,
      emptyPlace!.i,
      emptyPlace!.j
    )

    const randomIndex = Math.floor(Math.random() * options.length)

    const randomOption = options[randomIndex]
    const temp = node.puzzle[emptyPlace!.i][emptyPlace!.j]

    node.puzzle[emptyPlace!.i][emptyPlace!.j] =
      node.puzzle[randomOption.i][randomOption.j]

    node.puzzle[randomOption.i][randomOption.j] = temp
  }

  return node.puzzle
}

const calculateDiffrence = (currentNode: NodeType, goalNode: NodeType) => {
  const currentNodeData = currentNode.puzzle
    .join(',')
    .replaceAll(',', ' ')
    .trim()
    .split(' ')

  const goalNodeData = goalNode.puzzle
    .join(',')
    .replaceAll(',', ' ')
    .trim()
    .split(' ')

  let count = 0
  for (let i = 0; i < currentNodeData.length; i++) {
    if (currentNodeData[i] !== goalNodeData[i]) count++
    else if (
      currentNodeData[i] === goalNodeData[i] &&
      Number(currentNodeData[i]) === currentNodeData.length
    ) {
      count++
    }
  }

  return count - 1
}

const createNewNode = (
  options: { i: number; j: number }[],
  currentNode: NodeType
) => {
  const length = currentNode.puzzle.length
  const emptyPlace = findEmptyPlace(currentNode, length)

  const newOption = options.map((item) => {
    let puzzle = [...currentNode.puzzle.map((numbers) => [...numbers])]
    const temp = puzzle[item.i][item.j]
    puzzle[item.i][item.j] = puzzle[emptyPlace!.i][emptyPlace!.j]

    puzzle[emptyPlace!.i][emptyPlace!.j] = temp

    const option: NodeType = {
      turn: currentNode.turn + 1,
      pattern:
        currentNode.pattern +
        `-${item.i},${item.j}=>${emptyPlace?.i},${emptyPlace?.j}`,
      puzzle,
      diffrence: 0
    }

    return option
  })

  return newOption
}

export const solvePuzzle = (currentNode: NodeType, goalNode: NodeType) => {
  const length = currentNode.puzzle.length
  let options: NodeType[] = [currentNode]
  let oldOptions: string[] = []

  while (true) {
    if (options.length === 0) {
      return false
    }

    oldOptions = [
      ...oldOptions,
      ...options.map((item) => item.puzzle.join(',').replaceAll(',', ''))
    ]

    let newOptions: NodeType[] = []
    for (let i = 0; i < options.length; i++) {
      const emptyPlace = findEmptyPlace(options[i], length)

      const locationOfOptions = createOptions(
        length,
        emptyPlace!.i,
        emptyPlace!.j
      )

      const oldItems = newOptions.map((item) =>
        item.puzzle.join(',').replaceAll(',', '').trim()
      )

      createNewNode(locationOfOptions, options[i]).forEach((element) => {
        const newItem = element.puzzle.join(',').replaceAll(',', '').trim()
        if (!oldItems.includes(newItem) && !oldOptions.includes(newItem)) {
          newOptions = [...newOptions, element]
        }
      })
    }

    let min = length * length + 1

    for (let i = 0; i < newOptions.length; i++) {
      const calculateH = calculateDiffrence(newOptions[i], goalNode)

      newOptions[i].diffrence = calculateH

      if (min > calculateH) {
        min = calculateH
      }
    }

    options = newOptions.filter((item) => {
      return item.diffrence === min
    })

    if (min === 0) {
      return options[0]
    }
  }
}
