self.onmessage = function (e) {
  const { grid, gridWidth, gridHeight } = JSON.parse(e.data)

  const getNeighborCount = (i, j) => {
    let count = [0, 0, 0]
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue
        const ni = (i + x + gridWidth) % gridWidth
        const nj = (j + y + gridHeight) % gridHeight
        count[grid[ni][nj]] += 1
      }
    }
    return count
  }

  const newGrid = new Array(gridWidth).fill(null).map(() => new Array(gridHeight).fill(0))
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      const neighbors = getNeighborCount(i, j)
      const favor = neighbors[1] - neighbors[2]
      if (favor === 0) {
        newGrid[i][j] = grid[i][j]
        continue
      }
      else if (favor > 0) {
        newGrid[i][j] = 1
      }
      else {
        if (grid[i][j] === 2) {
          newGrid[i][j] = favor === -1 && neighbors[1] ? 1 : 2
        }
        else if (grid[i][j] === 1) {
          newGrid[i][j] = favor === -1 ? 1 : 2
        }
        else {
          newGrid[i][j] = favor === -3 ? 2 : 0
        }
      }
    }
  }

  self.postMessage(newGrid)
}
