class Edge {
  
  int x, y;
  
  Edge(int x, int y) {
    this.x = x;
    this.y = y;
  }
  
  void drawTrench(color c, int size) {
    fill(c);
    noStroke();
    rect(this.x * size, this.y * size, size, size);
  }
}
