public class Pipe {
 
  public boolean north;
  public boolean west;
  public boolean south;
  public boolean east;
  public boolean start = false;
  public int indexX;
  public int indexY;
  
  public Pipe(boolean north, boolean west, boolean south, boolean east, int indexX, int indexY) {
     this.north = north;
     this.west = west;
     this.south = south;
     this.east = east;
     this.indexX = indexX;
     this.indexY = indexY;
  }
  
  public boolean isNeighbour(Pipe next) {
     return (this.west && next.east)  || (this.east && next.west) || (this.north && next.south) || (this.south && next.north);
  }
  
  public boolean beginning(Pipe p) {
    return this.indexX == p.indexX && this.indexY == p.indexY;
  }
  
  public void drawPipe(int x, int y) {
    this.drawPipe(x, y, 1, color(30, 30, 30));
  }
  
  public void drawPipe(int x, int y, int strokeWeight, color c) {
    stroke(c);
    strokeWeight(strokeWeight);
    int tileHeight = (y + 1) * size;
    int tileWidth = (x + 1) * size;
    int startX = tileWidth - (size / 2);
    int startY = tileHeight - (size / 2);
    int northX = tileWidth - size / 2;
    int northY = tileHeight - size;
    int westX = tileWidth - size;
    int westY = tileHeight - size / 2;
    int southX = tileWidth - size / 2;
    int southY = tileHeight;
    int eastX = tileWidth;
    int eastY = tileHeight - size / 2;
    // North - South
    if (this.hasNorth() && !this.hasWest() && this.hasSouth() && !this.hasEast()) {
      line(startX, startY, northX, northY);
      line(startX, startY, southX, southY);
    }
    // North - West
    if (this.hasNorth() && this.hasWest() && !this.hasSouth() && !this.hasEast()) {
      line(startX, startY, northX, northY);
      line(startX, startY, westX, westY);
    }
    // North - East
    if (this.hasNorth() && !this.hasWest() && !this.hasSouth() && this.hasEast()) {
      line(startX, startY, northX, northY);
      line(startX, startY, eastX, eastY);
    }
    // East - West
    if (!this.hasNorth() && this.hasWest() && !this.hasSouth() && this.hasEast()) {
      line(startX, startY, westX, westY);
      line(startX, startY, eastX, eastY);
    }
    // East - South
    if (!this.hasNorth() && !this.hasWest() && this.hasSouth() && this.hasEast()) {
      line(startX, startY, eastX, eastY);
      line(startX, startY, southX, southY);
    }
    // West - South
    if (!this.hasNorth() && this.hasWest() && this.hasSouth() && !this.hasEast()) {
      line(startX, startY, westX, westY);
      line(startX, startY, southX, southY);
    }
  }
  
  public void move(int x, int y, int strokeWeight) {
    color c = color(0, 255, 0);
    this.drawPipe(x, y, strokeWeight, c);
  }
  
  public boolean hasNorth() {
    return this.north;
  }
  
  public boolean hasWest() {
    return this.west;
  }
  
  public boolean hasSouth() {
    return this.south;
  }
  
  public boolean hasEast() {
    return this.east;
  }
  
  public boolean isStart() {
    return this.north && this.west && this.south && this.east;
  }
  
  public boolean isGround() {
    return !this.north && !this.west && !this.south && !this.east;
  }
}
