class Block {
  private int heat;
  private int x, y;

  ArrayList<Block> neighbours = new ArrayList<Block>();

  int f;
  int g;
  int h;


  Block(int heat, int x, int y) {
    this.heat = heat;
    this.x = x;
    this.y = y;
  }

  int getHeat() {
    return this.heat;
  }

  void addNeighbours(Block[][] map) {

    int x = this.x;
    int y = this.y;
    if (y > 0) {
      this.neighbours.add(map[x][y - 1]);
    }
    if (x < columns-1) {
      this.neighbours.add(map[x + 1][y]);
    }
    if (y <  rows-1) {
      this.neighbours.add(map[x][y + 1]);
    }
    if (x > 0) {
      this.neighbours.add(map[x -1 ][y]);
    }
  }

  void drawBlock() {
    rect(this.x * (width / columns), this.y * (height / rows), width / columns, height / rows);
  }

  void setFill(color c) {
    fill(c);
  }
}
