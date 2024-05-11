abstract class Shape {
    abstract public void draw();
}

class Line extends Shape {
    public void draw() {
        System.out.println("Line");
    }
}

class Rect extends Shape {
    public void draw() {
        System.out.println("Rect");
    }
}

class Circle extends Shape {
    public void draw() {
        System.out.println("Circle");
    }
}

public class OverridingEx {
    static void paint(Shape s) {
        s.draw();
    }

    public static void main(String[] args) {
        Shape sp = new Line();
        paint(sp);
        paint(new Line());
        paint(new Rect());
        paint(new Circle());
    }
}
