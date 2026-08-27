namespace ZombieCode.Practice;

// INCIDENT #09 — THE MERGE CONFLICT
// Original snippet:
//   class Zombie {
//       public int Health = 100;
//       public void Bite() { Health -= 10; }
//   }
//   Zombie z = new Zombie();
//   z.Bite();
//   z.Bite();
//   Console.WriteLine(z.Health);
public class Zombie
{
    public int Health { get; private set; } = 100;

    public void Bite()
    {
        Health -= 10;
    }
}
