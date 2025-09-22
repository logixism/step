using System;

namespace VectorOperators
{
    public class Vector
    {
        public double X { get; set; }
        public double Y { get; set; }

        public Vector(double x, double y)
        {
            X = x;
            Y = y;
        }

        public double Length => Math.Sqrt(X * X + Y * Y);

        public static Vector operator +(Vector a, Vector b) =>
            new Vector(a.X + b.X, a.Y + b.Y);

        public static Vector operator -(Vector a, Vector b) =>
            new Vector(a.X - b.X, a.Y - b.Y);

        public static Vector operator *(Vector a, Vector b) =>
            new Vector(a.X * b.X, a.Y * b.Y);

        public static Vector operator /(Vector a, Vector b)
        {
            if (b.X == 0 || b.Y == 0)
                throw new DivideByZeroException("Can't divide by 0");
            return new Vector(a.X / b.X, a.Y / b.Y);
        }

        public static bool operator ==(Vector a, Vector b) =>
            a.X == b.X && a.Y == b.Y;

        public static bool operator !=(Vector a, Vector b) =>
            !(a == b);

        public static bool operator >(Vector a, Vector b) =>
            a.Length > b.Length;

        public static bool operator <(Vector a, Vector b) =>
            a.Length < b.Length;

        public static bool operator >=(Vector a, Vector b) =>
            a.Length >= b.Length;

        public static bool operator <=(Vector a, Vector b) =>
            a.Length <= b.Length;

        public override bool Equals(object obj)
        {
            if (obj is Vector v)
                return this == v;
            return false;
        }

        public override int GetHashCode() => (X, Y).GetHashCode();

        public override string ToString() => $"({X}, {Y})";
    }

    class Program
    {
        static void Main()
        {
            Vector v1 = new Vector(3, 4);
            Vector v2 = new Vector(1, 2);

            Console.WriteLine($"v1 = {v1}");
            Console.WriteLine($"v2 = {v2}");

            Console.WriteLine($"v1 + v2 = {v1 + v2}");
            Console.WriteLine($"v1 - v2 = {v1 - v2}");
            Console.WriteLine($"v1 * v2 = {v1 * v2}");
            Console.WriteLine($"v1 / v2 = {v1 / v2}");

            Console.WriteLine($"v1 == v2: {v1 == v2}");
            Console.WriteLine($"v1 != v2: {v1 != v2}");

            Console.WriteLine($"v1 > v2: {v1 > v2}");
            Console.WriteLine($"v1 < v2: {v1 < v2}");
            Console.WriteLine($"v1 >= v2: {v1 >= v2}");
            Console.WriteLine($"v1 <= v2: {v1 <= v2}");
        }
    }
}
