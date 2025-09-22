namespace generics_app_3
{
    public class Program
    {
        static void Main(string[] args)
        {
            MyList<int> list = new MyList<int>();

            for (int i = 5; i >= 1; i--)
            {
                list.Push(i);
            }

            Console.WriteLine($"Unsorted: {list}");
            list.Sort((a, b) => a.CompareTo(b));
            Console.WriteLine($"Sorted: {list}");

            Console.WriteLine(list.Find(x => x > 3));
        }
    }
}