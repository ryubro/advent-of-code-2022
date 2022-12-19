import { last, map } from 'lodash';

type Location = [number, number, number];
type Path = Location[];

const exploreNext = (path: Path, map: number[][], explored: Location[]) => {
  const lastLocation = last(path);
  const [x, y, elev] = lastLocation;
  const possibleNextLocs = [[x - 1, y], [x + 1, y], [x, y + 1], [x, y - 1]];

  const filteredByPos = possibleNextLocs.filter(([_x, _y]) => {
    if (_x < 0 || _y < 0 || _x >= map.length || _y >= map[0].length) {
      return false;
    }

    if (explored.find(([__x, __y]) => __x === _x && __y === _y)) {
      return false;
    }

    return true;
  });

  const enrichedNextLocs = filteredByPos.map(loc => {
    const [_x, _y] = loc;
    const _elev = map[_x][_y];

    return [_x, _y, _elev] as Location;
  });

  const filteredByElev = enrichedNextLocs.filter(([,, _elev]) => {
    if (_elev <= elev + 1) {
      return true;
    }

    return false;
  });

  if (filteredByElev.length === 0) {
    return [];
  }

  explored.push(...filteredByElev);

  return filteredByElev.map(newLoc => ([...path, newLoc]));
}

const func = (map: number[][], explored: Location[], dest: Location, start: Location) => {
  let paths = [[start]];
  const status = { hasReached: false, pathLength: 0 };
  while (!status.hasReached) {
    let newPaths = [];

    for (const path of paths) {
      const nextPaths = exploreNext(path, map, explored);

      const theOne = nextPaths.find((path) => {
        const lastLoc = path[path.length - 1];
        return lastLoc[0] === dest[0] && lastLoc[1] === dest[1];
      });

      if (theOne) {
        status.hasReached = true;
        status.pathLength = theOne.length - 1;
        break;
      }

      newPaths.push(...nextPaths);
    }
    paths = newPaths;
  }

  return status.pathLength;
};

const inputToMap = (input: string[]) => {
  let start: Location;
  let dest: Location;

  const map = input.map((line, y) => {
    return Array.from(line).map((char, x) => {
      if (char === 'S') {
        start = [y, x, 0];
        return 0;
      }

      if (char === 'E') {
        dest = [y, x, 25];
        return 25;
      }

      return char.charCodeAt(0) - 97;
    });
  });

  return { map, start, dest }
};

const exploreNextFromTop = (path: Path, map: number[][], explored: Location[]) => {
  const lastLocation = last(path);
  const [x, y, elev] = lastLocation;
  const possibleNextLocs = [[x - 1, y], [x + 1, y], [x, y + 1], [x, y - 1]];

  const filteredByPos = possibleNextLocs.filter(([_x, _y]) => {
    if (_x < 0 || _y < 0 || _x >= map.length || _y >= map[0].length) {
      return false;
    }

    if (explored.find(([__x, __y]) => __x === _x && __y === _y)) {
      return false;
    }

    return true;
  });

  const enrichedNextLocs = filteredByPos.map(loc => {
    const [_x, _y] = loc;
    const _elev = map[_x][_y];

    return [_x, _y, _elev] as Location;
  });

  const filteredByElev = enrichedNextLocs.filter(([,, _elev]) => {
    if (_elev >= elev - 1 ) {
      return true;
    }

    return false;
  });

  if (filteredByElev.length === 0) {
    return [];
  }

  explored.push(...filteredByElev);

  return filteredByElev.map(newLoc => ([...path, newLoc]));
}

const func1 = (map: number[][], explored: Location[], dest: Location, start: Location) => {
  let paths = [[start]];
  const status = { hasReached: false, pathLength: 0 };
  while (!status.hasReached) {
    let newPaths = [];

    for (const path of paths) {
      const nextPaths = exploreNextFromTop(path, map, explored);

      const theOne = nextPaths.find((path) => {
        const lastLoc = path[path.length - 1];
        return lastLoc[2] === 0;
      });

      if (theOne) {
        status.hasReached = true;
        status.pathLength = theOne.length - 1;
        break;
      }

      newPaths.push(...nextPaths);
    }
    paths = newPaths;
  }

  return status.pathLength;
};

export { func, func1, inputToMap };
