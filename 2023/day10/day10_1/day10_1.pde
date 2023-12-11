int rows;
int columns;

int startX;
int startY;

int size; // size of the pipe
Pipe[][] ground;
Pipe[] path;
Pipe pipe;
Pipe nextP;
char[][] symbols;

final int[] north = {0, -1};
final int[] east = {1, 0};
final int[] south = {0, 1};
final int[] west = {-1, 0};

final int[][] directions = {north, east, south, west};

int farthestPoint = 0;

void setup() {
  size(980, 980);
  background(255);
  frameRate(2);
  String[] test1 = loadStrings("../../data/day10/test_1.txt");
  String[] test3 = loadStrings("../../data/day10/test_3.txt");
  String[] input = loadStrings("../../data/day10/input.txt");
  symbols = getSymbolsArray(test3);
  size = width / rows;
  drawGround(symbols);
  pipe = ground[startX][startY];
}
int index = 0;
void draw() {
  //println("start: " + pipe.indexX, pipe.indexY);
  //println(pipe.indexX + directions[index][0], pipe.indexY + directions[index][1], index);
  if (pipe.isStart()) { //<>//
    nextP = ground[pipe.indexX + directions[index][0]][pipe.indexY + directions[index][1]];
  }
  //println(nextP);
  if (index < directions.length) {
  for (int j = 0; j < directions.length; j++) {
    //println(nextP);
    if (nextP.isGround()) {
      continue;
    }
    if (pipe.isNeighbour(nextP)) {
      pipe = nextP;
      pipe.move(directions[j][0], directions[j][1], 2);
    }
    nextP = ground[pipe.indexX + directions[j][0]][pipe.indexY + directions[j][1]];
    if (pipe.beginning(nextP)) {
      index++;
    }
  }
  } else {
    noLoop();
  }
}

char[][] getSymbolsArray(String[] input) {
  rows = input.length; // get number of rows
  columns = input[0].toCharArray().length; // get number of columns
  char[][] symbols = new char[rows][columns];
  for (int i = 0; i < input.length; i++) {
    symbols[i] = input[i].toCharArray();
  }
  return symbols;
}

void drawGround(char[][] symbols) {
  ground = new Pipe[rows][columns];
  for (int j = 0; j < rows; j++) {
    for (int i = 0; i < columns; i++) {
      println(symbols[i][j], i, j);
      Pipe p = getPipe(symbols[i][j], i, j);
      ground[j][i] = p;
      if (p.isStart()) {
        startX = j;
        startY = i;
        println("x, y: " + startX, startY);
        stroke(255, 0, 0);
        strokeWeight(2);
        rect(startX * size, startY * size, size, size);
      }

      if (!p.isGround()) {
        p.drawPipe(j, i);
      }
    }
  }
}


/*
    | is a vertical pipe connecting north and south.
 - is a horizontal pipe connecting east and west.
 L is a 90-degree bend connecting north and east.
 J is a 90-degree bend connecting north and west.
 7 is a 90-degree bend connecting south and west.
 F is a 90-degree bend connecting south and east.
 . is ground; there is no pipe in this tile.
 S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
 */
Pipe getPipe(char symbol, int x, int y) {
  // order is north, west, south, east
  switch(symbol) {
  case '|':
    return new Pipe(true, false, true, false, x, y);
  case '-':
    return new Pipe(false, true, false, true, x, y);
  case 'L':
    return new Pipe(true, false, false, true, x, y);
  case 'J':
    return new Pipe(true, true, false, false, x, y);
  case '7':
    return new Pipe(false, true, true, false, x, y);
  case 'F':
    return new Pipe(false, false, true, true, x, y);
  case '.':
    return new Pipe(false, false, false, false, x, y);
  case 'S':
    return new Pipe(true, true, true, true, x, y);
  default:
    return null;
  }
}
