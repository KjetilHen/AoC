class Pipe { //<>//
  char type;

  // Neighbours
  boolean north = false;
  boolean south = false;
  boolean east = false;
  boolean west = false;
  
  Pipe previous = null;

  int x, y;
  int startX, startY;

  public Pipe(char type, int x, int y) {
    this.type = type;
    this.x = x;
    this.y = y;
    startX = x * size;
    startY = y * size;
    this.setNeighbours(type);
  }

  public void setNeighbours(char type) {
    // order is north, west, south, east
    switch(type) {
    case '|':
      this.north = true;
      this.south = true;
      break;
    case '-':
      this.west = true;
      this.east = true;
      break;
    case 'L':
      this.north = true;
      this.east = true;
      break;
    case 'J':
      this.north = true;
      this.west = true;
      break;
    case '7':
      this.south = true;
      this.west = true;
      break;
    case 'F':
      this.south = true;
      this.east = true;
      break;
    case 'S':
      this.north = true;
      this.west = true;
      this.south = true;
      this.east = true;
      break;
    default:
      break;
    }
  }
  
  public void setStroke(color c,  float weight) {
    stroke(c);
    strokeWeight(weight);
  }

  public void drawPipe() {
    if (this.isStart()) {
      this.setStroke(color(255, 0, 0), 1.5);
    }
    if (this.north) {
      int northX = startX + size / 2;
      int northY = startY;
      drawLine(northX, northY);
    }
    if (this.south) {
      int southX = startX + size / 2;
      int southY = startY + size;
      drawLine(southX, southY);
    }
    if (this.west) {
      int westX = startX;
      int westY = startY + size / 2;
      drawLine(westX, westY);
    }
    if (this.east) {
      int eastX = startX + size;
      int eastY = startY + size / 2;
      drawLine(eastX, eastY);
    }
  }
  
  public boolean isConnectingNeighbour(Pipe next) {
    return (this.north && next.south || this.south && next.north) || (this.west && next.east && this.east && next.west);  //<>//
  }
  
  public void setPrevious() {
    this.previous = this;
  }

  public void drawLine(int endX, int endY) {
    line(startX + size / 2, startY + size / 2, endX, endY);
  }

  public boolean isStart() {
    return this.type == 'S';
  }

  public boolean isGround() {
    return this.type == '.';
  }
}
