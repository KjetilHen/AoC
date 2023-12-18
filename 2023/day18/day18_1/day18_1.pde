DigSite[] digsites;
Edge[] edges;

int minX = 0;
int maxX = 0;
int maxY = 0;
int minY = 0;

int x = 0;
int y = 0;

void setup() {
  size(914, 964);
  background(255);

  String[] test = loadStrings("../data/test.txt");
  String[] input = loadStrings("../data/input.txt");

  digsites = new DigSite[test.length];
  edges = new Edge[914 * 964];

  for (int i = 0; i < test.length; i++) {
    String[] digSite = split(test[i], ' ');
    color c = unhex("FF" + digSite[2].substring(2, 8));
    digsites[i] = new DigSite(digSite[0], int(digSite[1]), c);
  }
  drawOutline();
  //println(minX, maxX, minY, maxY);
  int area = 0;
  Edge begin1 = digsites[0].line.get(digsites[0].line.size() -1);
  Edge end2 = digsites[1].line.get(0);
  println(begin1.x, begin1.y, end2.x, end2.y);
  //for (Edge e : digsites[0].line) {
  //  println(e.x, e.y);
  //}
  //for (Edge e : digsites[1].line) {
  //  println(e.x, e.y);
  //}
  for (int i = 0; i < digsites.length-1; i++) {
    Edge begin = digsites[i].line.get(0);
    Edge end = digsites[i+1].line.get(0);
    area = area + ((begin.x * end.y) - (begin.y*end.x));
  }
  //println(area/2);
}

void drawOutline() {
  int index = 0;
  int steps = 0;
  translate(136, 446);
  stroke(0);
  strokeWeight(0.5);
  line(-width, 446, width, 446);
  line(136, -height, 136, height);
  while (index < digsites.length) {
    DigSite d = digsites[index];
    Edge e = new Edge(x, y);
    d.line.add(e);
    e.drawTrench(d.c, 2);
    if (steps < d.getDistance()) {
      if (d.getDirection().equals("U")) {
        y--;
      }
      if (d.getDirection().equals("D")) {
        y++;
      }
      if (d.getDirection().equals("L")) {
        x--;
      }
      if (d.getDirection().equals("R")) {
        x++;
      }
      steps++;
      if (y < minY) {
        minY = y;
      } else if ( y > maxY) {
        maxY = y;
      }

      if (x < minX) {
        minX = x;
      } else if (x > maxX) {
        maxX = x;
      }
    } else {
      d.line.add(e);
      index++;
      steps = 0;
    }
  }
}
