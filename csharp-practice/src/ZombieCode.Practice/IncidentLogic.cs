using System.Globalization;

namespace ZombieCode.Practice;

/// <summary>
/// Testable versions of the logic behind the 10 C# incidents in ZOMBIE.CODE.
/// Each method mirrors one question's code snippet, rewritten to return a
/// value instead of printing to the console so it can be unit tested.
/// </summary>
public static class IncidentLogic
{
    // INCIDENT #01 — THE FIRST COMMIT
    // Original snippet:
    //   int x = 5;
    //   x = x + 3;
    //   Console.WriteLine(x);
    public static int TheFirstCommit()
    {
        int x = 5;
        x = x + 3;
        return x;
    }

    // INCIDENT #02 — THE NULL POINTER
    // Original snippet:
    //   int a = 7;
    //   int b = 2;
    //   Console.WriteLine(a / b);
    public static int TheNullPointer()
    {
        int a = 7;
        int b = 2;
        return a / b;
    }

    // INCIDENT #03 — WHO DEPLOYED THIS?
    // Original snippet:
    //   string name = "Dev";
    //   string greeting = "Hello, " + name + "!";
    //   Console.WriteLine(greeting);
    public static string WhoDeployedThis()
    {
        string name = "Dev";
        string greeting = "Hello, " + name + "!";
        return greeting;
    }

    // INCIDENT #04 — THE LOOP THAT NEVER ENDED
    // Original snippet:
    //   bool isOpen = false;
    //   if (isOpen) { Console.WriteLine("Open"); }
    //   else { Console.WriteLine("Closed"); }
    public static string TheLoopThatNeverEnded()
    {
        bool isOpen = false;
        if (isOpen)
        {
            return "Open";
        }
        else
        {
            return "Closed";
        }
    }

    // INCIDENT #05 — COFFEE.exe HAS STOPPED RESPONDING
    // Original snippet:
    //   for (int i = 0; i < 5; i++) { Console.WriteLine("Tick"); }
    // Returns how many times "Tick" would have been printed.
    public static int CoffeeExeHasStoppedResponding()
    {
        int tickCount = 0;
        for (int i = 0; i < 5; i++)
        {
            tickCount++;
        }
        return tickCount;
    }

    // INCIDENT #06 — PRODUCTION IS ON FIRE
    // Original snippet:
    //   int[] nums = { 10, 20, 30 };
    //   Console.WriteLine(nums[2]);
    public static int ProductionIsOnFire()
    {
        int[] nums = { 10, 20, 30 };
        return nums[2];
    }

    // INCIDENT #07 — THE DEAD ARRAY
    // Original snippet:
    //   int Square(int n) { return n * n; }
    public static int TheDeadArray(int n)
    {
        return Square(n);
    }

    private static int Square(int n) => n * n;

    // INCIDENT #08 — WHO TOUCHED MAIN?
    // Original snippet:
    //   List<string> tickets = new List<string>();
    //   tickets.Add("BUG-1");
    //   tickets.Add("BUG-2");
    //   tickets.Remove("BUG-1");
    //   Console.WriteLine(tickets.Count);
    public static int WhoTouchedMain()
    {
        List<string> tickets = new List<string>();
        tickets.Add("BUG-1");
        tickets.Add("BUG-2");
        tickets.Remove("BUG-1");
        return tickets.Count;
    }

    // INCIDENT #10 — MARTIN FROM BACKEND
    // Original snippet:
    //   List<int> scores = new List<int> { 1, 2, 3, 4, 5 };
    //   int total = scores.Where(s => s % 2 == 0).Sum();
    //   Console.WriteLine(total);
    public static int MartinFromBackend()
    {
        List<int> scores = new List<int> { 1, 2, 3, 4, 5 };
        int total = scores.Where(s => s % 2 == 0).Sum();
        return total;
    }

    // ── Bonus incidents — not in the live quiz, extra practice ──────────

    // INCIDENT #11 — THE STACK OVERFLOW
    // Original snippet:
    //   int Sum(int n) {
    //       if (n == 0) return 0;
    //       return n + Sum(n - 1);
    //   }
    //   Console.WriteLine(Sum(4));
    public static int TheStackOverflow()
    {
        return Sum(4);
    }

    private static int Sum(int n)
    {
        if (n == 0) return 0;
        return n + Sum(n - 1);
    }

    // INCIDENT #12 — THE TRY-CATCH THAT WASN'T
    // Original snippet:
    //   string log = "";
    //   try {
    //       int[] arr = new int[3];
    //       log += arr[5];
    //   } catch (IndexOutOfRangeException) {
    //       log += "Caught";
    //   } finally {
    //       log += "-Cleanup";
    //   }
    //   Console.WriteLine(log);
    public static string TryCatchThatWasnt()
    {
        string log = "";
        try
        {
            int[] arr = new int[3];
            log += arr[5];
        }
        catch (IndexOutOfRangeException)
        {
            log += "Caught";
        }
        finally
        {
            log += "-Cleanup";
        }
        return log;
    }

    // INCIDENT #13 — THE NULL REFERENCE
    // Original snippet:
    //   string? name = null;
    //   string greeting = name ?? "Unknown Dev";
    //   Console.WriteLine(greeting);
    public static string TheNullReference()
    {
        string? name = null;
        string greeting = name ?? "Unknown Dev";
        return greeting;
    }

    // INCIDENT #14 — THE SWITCH STATEMENT INCIDENT
    // Original snippet:
    //   int severity = 2;
    //   string label = severity switch
    //   {
    //       1 => "Low",
    //       2 => "Medium",
    //       3 => "High",
    //       _ => "Unknown"
    //   };
    //   Console.WriteLine(label);
    public static string TheSwitchStatementIncident()
    {
        int severity = 2;
        string label = severity switch
        {
            1 => "Low",
            2 => "Medium",
            3 => "High",
            _ => "Unknown",
        };
        return label;
    }

    // INCIDENT #15 — THE STRING FORMAT GLITCH
    // Original snippet:
    //   double uptime = 12.3456;
    //   string report = $"Uptime: {uptime:F2}%";
    //   Console.WriteLine(report);
    // NOTE: ":F2" formats using the CURRENT CULTURE's decimal separator by
    // default (a comma on some machines, a period on others). InvariantCulture
    // is used here so the result is always "12.35" regardless of what machine
    // or CI runner this executes on.
    public static string TheStringFormatGlitch()
    {
        double uptime = 12.3456;
        string report = string.Format(CultureInfo.InvariantCulture, "Uptime: {0:F2}%", uptime);
        return report;
    }
}
