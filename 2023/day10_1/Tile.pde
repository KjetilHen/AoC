class Tile{
  char type; // either '|', '-', 'L', 'J', '7', 'F', '.', 'S'
  int x, y, startX, startY;

  // North, East, South, West
  private IntList neighbours = new IntList();
  boolean visited = false;
  
  public Tile(char type, int x, int y, int size) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.startX = x * size;
    this.startY = y * size;
    this.setNeighbours();
  }
  
  public void setNeighbours() {
    switch(this.type) {
      case '|':
        this.neighbours.append(getIndex(this.x, this.y-1));
        this.neighbours.append(getIndex(this.x, this.y+1));
        break;
      case '-':
        this.neighbours.append(getIndex(this.x+1, this.y));
        this.neighbours.append(getIndex(this.x-1, this.y));
        break;
      case 'L':
        this.neighbours.append(getIndex(this.x, this.y-1));
        this.neighbours.append(getIndex(this.x+1, this.y));
        break;
      case 'J':
        this.neighbours.append(getIndex(this.x, this.y-1));
        this.neighbours.append(getIndex(this.x-1, this.y));
        break;
      case '7':
        this.neighbours.append(getIndex(this.x, this.y+1));
        this.neighbours.append(getIndex(this.x-1, this.y));
        break;
      case 'F':
        this.neighbours.append(getIndex(this.x+1, this.y));
        this.neighbours.append(getIndex(this.x, this.y+1));
        break;
      case 'S':
        this.neighbours.append(getIndex(this.x, this.y-1));
        this.neighbours.append(getIndex(this.x+1, this.y));
        this.neighbours.append(getIndex(this.x, this.y+1));
        this.neighbours.append(getIndex(this.x-1, this.y));
        break;
      case '.':
      default:
        break;
    }
  }
  
  public boolean isStart() {
     return this.type == 'S'; 
  }
  
  public IntList getNeighbours() {
    IntList existingNeighbours = new IntList();
    for (int index : this.neighbours) {
      if (index > -1) {
         existingNeighbours.append(index); 
      }
    }
    return existingNeighbours;
  }
  
  public void setStroke(color c, float w) {
    stroke(c);
    strokeWeight(w);
  }
  
  public void drawTile(int size) {
    switch(this.type) {
      case '|':
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size / 2, this.startY + size);
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size / 2, this.startY);
        break;
      case '-':
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size, this.startY  + size / 2);
        line(this.startX + size / 2, this.startY + size / 2, this.startX, this.startY + size / 2);
        break;
      case 'L':
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size / 2, this.startY);
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size, this.startY  + size / 2);
        break;
      case 'J':
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size / 2, this.startY);
        line(this.startX + size / 2, this.startY + size / 2, this.startX, this.startY + size / 2);
        break;
      case '7':
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size / 2, this.startY + size);
        line(this.startX + size / 2, this.startY + size / 2, this.startX, this.startY + size / 2);
        break;
      case 'F':
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size / 2, this.startY + size);
        line(this.startX + size / 2, this.startY + size / 2, this.startX + size, this.startY  + size / 2);
        break;
      case 'S':
        stroke(color(0, 0, 100));
        ellipseMode(CORNER);
        ellipse(this.startX, this.startY, size, size);
        break;
      case '.':
      default:
        break;
    }
  }
}
