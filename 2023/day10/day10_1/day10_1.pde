int rows;
int columns;

int startX;
int startY;

int size; // size of the pipe
Pipe[][] ground;
Pipe[] path;
Pipe pipe;
char[][] symbols;

final int[] dx = {0, 1, 0, -1};
final int[] dy = {-1, 0, 1, 0};

int farthestPoint = 0;

void setup() {
  size(1000, 1000);
  background(255);
  frameRate(2);
  String[] test1 = loadStrings("../../data/day10/test_1.txt");
  String[] test3 = loadStrings("../../data/day10/test_3.txt");
  String[] input = loadStrings("../../data/day10/input.txt");
  symbols = getSymbolsArray(input);
  size = width / rows;
  drawGround(symbols);
  println(startX, startY);
  pipe = ground[startX][startY];
}

void draw() {
  for (int i = 0; i < dx.length; i++) {
    for (int j = 0; j < dy.length; j++) {
      println(startX + dx[i], startY + dy[j]);
      Pipe nextP = ground[startX + dx[i]][startY + dy[j]];
      if (pipe.isNeighbour(nextP)) {
        pipe = nextP;
        pipe.move(j, i, 2);
      }

      if (pipe.beginning(nextP)) {
        noLoop();
      }
    }
  }
}

char[][] getSymbolsArray(String[] input) {
  rows = input.length;
  columns = input[0].toCharArray().length;
  char[][] symbols = new char[rows][columns];
  for (int i = 0; i < input.length; i++) {
    symbols[i] = input[i].toCharArray();
  }
  return symbols;
}

void drawGround(char[][] symbols) {
  this.ground = new Pipe[rows][columns];
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < columns; j++) {
      Pipe p = getPipe(symbols[i][j], i, j);
      this.ground[i][j] = p;
      if (p.isStart()) {
        startX = i;
        startY = j;
      }

      if (!p.isGround()) {
        p.drawPipe(j, i);
      }

      if (p.isStart()) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(startX, startY, northX, northY);
        line(startX, startY, eastX, eastY);
        line(startX, startY, westX, westY);
        line(startX, startY, southX, southY);
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
