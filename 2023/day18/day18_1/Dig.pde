class DigSite {
  String direction;
  int distance;
  
  ArrayList<Edge> line = new ArrayList<Edge>();

  color c;

  DigSite(String direction, int distance, color c) {
    this.direction = direction;
    this.distance = distance;
    this.c = c;
  }

  String getDirection() {
    return this.direction;
  }

  int getDistance() {
    return this.distance;
  }
}
