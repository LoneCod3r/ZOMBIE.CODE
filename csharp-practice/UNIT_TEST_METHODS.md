# Unit Test Methods — Cheat Sheet

Reference for filling in the `// TODO: assert...` lines in `IncidentLogicTests.cs` and `ZombieTests.cs`. All 17 tests can be finished using just the methods below. It shows you **how** to write the assertion — working out the actual expected value from each incident's code snippet is on you.

---

## The one you'll use almost every time: `Assert.Equal`

```csharp
Assert.Equal(expected, actual);
```

- `expected` — the value **you** work out by hand (read the original code snippet in the comment above the test and figure out what it produces).
- `actual` — the `result` variable already captured by the `// Act` step.

Works for `int`, `string`, `bool` — every return type in this project.

```csharp
// Generic example — not one of your actual incidents
[Fact]
public void Example_ReturnsExpectedValue()
{
    // Arrange

    // Act
    var result = SomeClass.SomeMethod();

    // Assert
    Assert.Equal(42, result);   // 42 is whatever YOU worked out the method returns
}
```

That's the whole pattern: figure out the expected value by reading the code snippet in the comment, then `Assert.Equal(thatValue, result)`.

---

## Syntax you'll need alongside it

| What you need to do | Syntax |
|---|---|
| Create a new object | `var z = new Zombie();` |
| Call a method that returns nothing (`void`) | `z.Bite();` |
| Read a property | `z.Health` |
| Call a method with an argument | `IncidentLogic.TheDeadArray(4)` |

---

## Quick map: which test needs what method

| Test method | Assert to write |
|---|---|
| `TheFirstCommit_ReturnsExpectedValue` | `Assert.Equal(int, result)` |
| `TheNullPointer_UsesIntegerDivision` | `Assert.Equal(int, result)` — remember integer division truncates |
| `WhoDeployedThis_ConcatenatesTheGreeting` | `Assert.Equal("...", result)` — exact string, quotes and all |
| `TheLoopThatNeverEnded_ReturnsElseBranch` | `Assert.Equal("...", result)` — one of the two branch strings |
| `CoffeeExeHasStoppedResponding_CountsFiveTicks` | `Assert.Equal(int, result)` |
| `ProductionIsOnFire_ReadsThirdArrayElement` | `Assert.Equal(int, result)` |
| `TheDeadArray_SquaresTheInput` | pick an `int input` yourself, call `IncidentLogic.TheDeadArray(input)`, then `Assert.Equal(input * input, result)` |
| `WhoTouchedMain_TracksRemainingTicketCount` | `Assert.Equal(int, result)` |
| `MartinFromBackend_SumsOnlyEvenScores` | `Assert.Equal(int, result)` |
| `NewZombie_StartsAtFullHealth` | `var z = new Zombie();` then `Assert.Equal(int, z.Health);` |
| `Bite_ReducesHealthByTen` | `var z = new Zombie(); z.Bite();` then `Assert.Equal(int, z.Health);` |
| `Bite_CalledTwice_ReducesHealthByTwenty` | `var z = new Zombie(); z.Bite(); z.Bite();` then `Assert.Equal(int, z.Health);` |
| `TheStackOverflow_RecursivelySumsDownToZero` | `Assert.Equal(int, result)` — trace the recursion by hand, one call at a time |
| `TryCatchThatWasnt_CatchesAndCleansUp` | `Assert.Equal("...", result)` — exact string built across the catch and finally blocks |
| `TheNullReference_FallsBackToDefaultGreeting` | `Assert.Equal("...", result)` |
| `TheSwitchStatementIncident_MatchesTheSeverityArm` | `Assert.Equal("...", result)` |
| `TheStringFormatGlitch_RoundsToTwoDecimalPlaces` | `Assert.Equal("...", result)` — remember `:F2` rounds, it doesn't truncate |

`int` / `"..."` above are placeholders — swap in the actual number or string you calculate for that incident.

---

## Bonus methods (not required for these 12, good to know)

| Method | Use it for |
|---|---|
| `Assert.True(condition)` / `Assert.False(condition)` | Asserting a boolean expression directly, e.g. `Assert.True(result > 0)` |
| `Assert.NotEqual(expected, actual)` | Confirming two values are **different** |
| `Assert.Null(obj)` / `Assert.NotNull(obj)` | Checking whether a reference is null |
| `Assert.Contains(item, collection)` | Checking a list/string contains something, e.g. `Assert.Contains("BUG-2", tickets)` |
| `Assert.Throws<TException>(() => ...)` | Asserting that code throws an exception |

---

## Running the tests

```
cd csharp-practice
dotnet test
```

Green = pass, red = fail (with the expected vs. actual values printed so you can see exactly what went wrong).
