char[][] symbols;

Tile[] grid;

int rows = 5;
int columns = 5;
int sizeTile;

ArrayList<Tile> path = new ArrayList<Tile>();  // Lijst om het Euleriaanse pad op te slaan
Tile start;

void setup() {
  size(980, 980, P2D);
  background(0);
  colorMode(HSB, 360, 100, 100);
  
  String[] test = loadStrings("../../data/day10/test_1.txt");
  String[] test3 = loadStrings("../../data/day10/test_3.txt");
  String[] input = loadStrings("../../data/day10/input.txt");
  setSymbols(input);

  sizeTile = width / rows;
  grid = new Tile[rows*columns];

  createTiles(symbols);
  path.add(start);
}

void draw() {
  Tile current = path.get(path.size() -1);
  IntList nextTilesIndices = current.getNeighbours();
  for (int i = 0; i < nextTilesIndices.size(); i++) {
    Tile nextTile = grid[nextTilesIndices.get(i)];
    if (nextTile.isStart()) {
      println("MaxDistance:", floor(path.size()/2));
      noLoop();
    }
    if (nextTile.getNeighbours().hasValue(getIndex(current.x, current.y)) && !nextTile.visited) {
      nextTile.setStroke(color(floor(map(getIndex(nextTile.x, nextTile.y), 0, grid.length, 0, 360)), 100, 100), 1.5);
      nextTile.drawTile(sizeTile);
      path.add(grid[getIndex(nextTile.x, nextTile.y)]);
      current.visited = true;
      break;
    }
  }
}

int getIndex(int x, int y) {
  if (x < 0 || x > rows-1 || y < 0 || y > columns-1) {
    return -1;
  }
  return x + y * columns;
}

void setSymbols(String[] input) {
  rows = input.length; // get number of rows
  columns = input[0].toCharArray().length; // get number of columns
  symbols = new char[input.length][input[0].toCharArray().length];
  for (int r = 0; r < input.length; r++) {
    char[] line = input[r].toCharArray();
    symbols[r] = line;
  }
}

void createTiles(char[][] map) {
  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < columns; c++) {
      Tile t = new Tile(map[r][c], c, r, sizeTile);
      if (t.type == 'S') {
        start = t;
      }
      grid[getIndex(c, r)] = t;
    }
  }
}
