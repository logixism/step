using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace generics_app_3
{

    public class Node<T>
    {
        public T Value { get; set; }
        public Node<T>? Next { get; set; }

        public Node(T value)
        {
            Value = value;
            Next = null;
        }
    }

    public class MyList<T>
    {
        public int Count { get; set; }
        public Node<T>? Head { get; set; }

        public MyList()
        {
            Head = null;
            Count = 0;
        }

        public void Push(T item)
        {
            var newNode = new Node<T>(item);

            Count++;

            if (Head == null)
            {
                Head = newNode;
            }
            else
            {
                Node<T> current = Head;

                while (current.Next != null)
                {
                    current = current.Next;
                }

                current.Next = newNode;
            }
        }

        public void Sort(Comparison<T> comparison)
        {
            if (Head == null || Head.Next == null)
            {
                return;
            }
            bool swapped;

            do
            {
                swapped = false;
                Node<T>? current = Head;
                while (current.Next != null)
                {
                    if (comparison(current.Value, current.Next.Value) > 0)
                    {
                        T temp = current.Value;
                        current.Value = current.Next.Value;
                        current.Next.Value = temp;
                        swapped = true;
                    }
                    current = current.Next;
                }
            } while (swapped);
        }

        public T Find(Predicate<T> predicate)
        {
            Node<T>? current = Head;
            while (current != null)
            {
                if (predicate(current.Value))
                {
                    return current.Value;
                }
                current = current.Next;
            }
            throw new KeyNotFoundException("No matching element found");
        }

        override public string ToString()
        {
            if (Head == null)
            {
                return "[]";
            }

            var current = Head;
            var result = "[";

            while (current != null)
            {
                result += current.Value != null ? current.Value.ToString() : "null";

                if (current.Next != null)
                {
                    result += ", ";
                }

                current = current.Next;
            }

            result += "]";

            return result;
        }
    }
}
