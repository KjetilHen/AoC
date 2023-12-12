int rows, columns, size; //<>//
char[][] symbols;

Graph ground;


int numberOfSteps = 0;
ArrayList<Pipe> neighbours;
Pipe pipe;
Pipe previous = null;

void setup() {
  size(980, 980);
  background(255);
  frameRate(1);
  String[] test1 = loadStrings("../../data/day10/test_1.txt");
  String[] test3 = loadStrings("../../data/day10/test_3.txt");
  String[] input = loadStrings("../../data/day10/input.txt");
  setSymbolsArray(test3);
  size = height / rows;
  createMap();
  ground.drawMap();
  pipe = ground.getStart();
}


void draw() {
  ArrayList<Pipe> neighbours = ground.getNeighbours(pipe, previous);
  for (int i = 0; i < neighbours.size(); i++) {
    Pipe nextPipe = neighbours.get(i);
    if (pipe.isConnectingNeighbour(nextPipe)) {
      nextPipe.setStroke(color(0, 255, 0), 3);
      nextPipe.drawPipe();
      pipe = nextPipe;
      numberOfSteps++;
      break;
    }
    if (nextPipe.isStart()) {
      println(numberOfSteps);
      noLoop();
    }
  }
  previous = pipe;
}

void setSymbolsArray(String[] input) {
  rows = input.length; // get number of rows
  columns = input[0].toCharArray().length; // get number of columns
  symbols = new char[rows][columns];
  for (int i = 0; i < input.length; i++) {
    symbols[i] = input[i].toCharArray();
  }
}

void createMap() {
  ground = new Graph(rows, columns);
  for (int j = 0; j < rows; j++) {
    for (int i = 0; i < columns; i++) {
      Pipe p = new Pipe(symbols[i][j], j, i);
      ground.addPipe(p, i, j);
      if (p.isStart()) {
        ground.setStart(p);
      }
    }
  }
}
