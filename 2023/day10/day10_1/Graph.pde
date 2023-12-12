class Graph {
  Pipe[][] pipes;

  Pipe start;

  public Graph(int rows, int columns) {
    this.pipes = new Pipe[rows][columns];
  }

  public Pipe getStart() {
    println(this.start.x, this.start.y);
    return this.start;
  }

  public void setStart(Pipe start) {
    this.start = start;
  }

  public void addPipe(Pipe p, int x, int y) {
    pipes[x][y] = p;
  }

  public Pipe[][] getPipes() {
    return this.pipes;
  }

  public boolean isEdge(int x, int y) {
    return x < this.pipes.length && y < this.pipes[x].length;
  }

  public ArrayList<Pipe> getNeighbours(Pipe p, Pipe previous) {
    ArrayList<Pipe> neighbours =  new ArrayList<Pipe>();
    // North
    if (p.x + 0 > -1 && p.y + -1 > -1 && this.isEdge(p.x + 0, p.y + -1) && !this.pipes[p.x + 0][p.y + -1].equals(previous)) {
      neighbours.add(this.pipes[p.y + -1][p.x + 0]);
    }
    // East
    if (p.x + 1 > -1 && p.y + 0 > -1 && this.isEdge(p.x + 1, p.y + 0) && !this.pipes[p.x + 1][p.y + 0].equals(previous)) {
      neighbours.add(this.pipes[p.y + 0][p.x + 1]);
    }
    // South
    if (p.x + 0 > -1 && p.y + 1 > -1 && this.isEdge(p.x + 0, p.y + 1) && !this.pipes[p.x + 0][p.y + 1].equals(previous)) {
      neighbours.add(this.pipes[p.y + 1][p.x + 0]);
    }
    // West
    if (p.x + -1 > -1 && p.y + 0 > -1 && this.isEdge(p.x + -1, p.y + 0) && !this.pipes[p.x + -1][p.y + 0].equals(previous)) {
      neighbours.add(this.pipes[p.y + 0][p.x + -1]);
    }
    return neighbours;
  }

  public void drawMap() {
    for (int i = 0; i < this.pipes.length; i++) {
      for (int j = 0; j < this.pipes[i].length; j++) {
        Pipe p = pipes[i][j];
        p.drawPipe();
        p.setStroke(color(0), 0.5);
      }
    }
  }
}
