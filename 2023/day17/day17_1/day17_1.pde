int rows, columns;

Block[][] map;
ArrayList<Block> openSet = new ArrayList<Block>();
ArrayList<Block> closedSet = new ArrayList<Block>();
Block start;
Block end;

void setup() {
  size(987, 987);
  colorMode(HSB, 360, 100, 100);
  frameRate(5);
  noStroke();
  String[] test = loadStrings("../data/test_1.txt");
  String[] input = loadStrings("../data/input.txt");

  createCityBlocks(test);
  start = new Block(0, 0, 0);
  end = new Block(0, columns-1, rows-1);
  openSet.add(start);

  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < columns; c++) {
      Block b = map[r][c];
      b.addNeighbours(map);
      b.setFill(color(map(b.getHeat(), 1, 9, 180, 0), 100, 100));
      b.drawBlock();
    }
  }
}

int steps = 0;
void draw() {
  start.setFill(color(0, 100, 0));
  start.drawBlock();
  if (!openSet.isEmpty()) {
    Block current = openSet.get(0);
    for (Block b : openSet) {
      if (b.f < current.f) {
        current = b;
      }
      if (current.equals(end)) {
        println("Path Found");
        noLoop();
      }
      
      openSet.remove(openSet.indexOf(current));
      closedSet.add(current);
    }
    if (steps < 3) {
      start.x += 1;
    } else {
      start.y += 1;
      steps = 0;
    }
    steps++;
  } else {
    println("No Solution");
    noLoop();
  }
}

void createCityBlocks(String[] input) {
  rows = input.length;
  columns = input[0].toCharArray().length;
  map = new Block[rows][columns];
  for (int r = 0; r < input.length; r++) {
    char[] line = input[r].toCharArray();
    for (int c = 0; c < line.length; c++) {
      map[r][c] = new Block(int(str(line[c])), c, r);
    }
  }
}
