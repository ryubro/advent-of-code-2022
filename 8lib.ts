import { uniq } from 'lodash';

const getVisibleTreesInMatrix = (matrix: string[]) => {
  const visibleLocationsInHorizontalPOV = matrix.map((trees, rowIndex) => {
    return getVisibleTreesInRow(trees).map(colIndex => [rowIndex, colIndex]);
  }).flatMap(val => val);

  const visibleLocationsInVerticalPOV = pivotMatrix(matrix).map((trees, colIndex) => {
    return getVisibleTreesInRow(trees).map(rowIndex => [rowIndex, colIndex]);
  }).flatMap(val => val);

  return [...visibleLocationsInHorizontalPOV, ...visibleLocationsInVerticalPOV].reduce((uniqueLocations, location) => {
    if (uniqueLocations.find(alreadyAddedLocation => alreadyAddedLocation[0] === location[0] && alreadyAddedLocation[1] === location[1])) {
      return uniqueLocations;
    }

    return [...uniqueLocations, location];
  }, [] as number[][]);
};

const getVisibleTreesInRow = (row: string) => {
  const rowArr = Array.from(row);

  const { visibles: visibleFromLeft } = rowArr.reduce(_theReducer, { visibles: [], highestSoFar: -1 });
  const { visibles: visibleFromRight } = rowArr.reduceRight(_theReducer, { visibles: [], highestSoFar: -1 });

  return uniq([ ...visibleFromLeft, ...visibleFromRight ]);
};

const _theReducer = (acc: { visibles: number[], highestSoFar: number }, heightInString: string, index: number) => {
  const height = parseInt(heightInString, 10);

  const { visibles, highestSoFar } = acc;

  if (highestSoFar >= height) {
    return acc;
  }

  return {
    visibles: [...visibles, index],
    highestSoFar: height,
  };
};

const pivotMatrix = (matrix: string[]) => {
  const numCols = matrix[0].length;

  return matrix.reduce((pivottedMatrix, row) => {
    const rowArr = Array.from(row);

    return concatStringInArrays(pivottedMatrix, rowArr);
  }, []);
};

const concatStringInArrays = (arr1: string[], arr2: string[]) => {
  const length = Math.max(arr1.length, arr2.length);

  return Array.from(Array(length)).map((_, index) => {
    return `${arr1[index] ?? ''}${arr2[index] ?? ''}`;
  });
};

const getNumVisibleTrees = (matrix: string[], location: number[]) => {
  const processed = matrix.map((heightsInString: string) => {
    return Array.from(heightsInString).map(heightInString => parseInt(heightInString, 10));
  });
  const pivotted = pivotMatrix(matrix);
  const processedPivotted = pivotted.map((heightsInString: string) => {
    return Array.from(heightsInString).map(heightInString => parseInt(heightInString, 10));
  });

  const [x, y] = location;

  const height = processed[x][y];

  const numVisibleTreesToLeft = getNumVisibleTreesInOneDirection(processed[x].slice(0, y).reverse(), height);
  const numVisibleTreesToRight = getNumVisibleTreesInOneDirection(processed[x].slice(y + 1), height);
  const numVisibleTreesToUp = getNumVisibleTreesInOneDirection(processedPivotted[y].slice(0, x).reverse(), height);
  const numVisibleTreesToDown = getNumVisibleTreesInOneDirection(processedPivotted[y].slice(x + 1), height);

  return [numVisibleTreesToUp, numVisibleTreesToLeft, numVisibleTreesToRight, numVisibleTreesToDown];
};

const getNumVisibleTreesInOneDirection = (trees: number[], height: number) => {
  const blockingTreeIndex = trees.findIndex(_height => _height >= height);

  if (blockingTreeIndex === -1) {
    return trees.length;
  } else {
    return blockingTreeIndex + 1;
  }
};

export { getVisibleTreesInMatrix, getNumVisibleTrees };
