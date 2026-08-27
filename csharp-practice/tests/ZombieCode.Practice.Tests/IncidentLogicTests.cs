using Xunit;
using ZombieCode.Practice;

namespace ZombieCode.Practice.Tests;

public class IncidentLogicTests
{
    // INCIDENT #01 — THE FIRST COMMIT
    // int x = 5; x = x + 3; what is x?
    [Fact]
    public void TheFirstCommit_ReturnsExpectedValue()
    {
        // Arrange
        // (nothing to set up — the method takes no input)

        // Act
        var result = IncidentLogic.TheFirstCommit();

        // Assert
        Assert.Equal(8, result);
    }

    // INCIDENT #02 — THE NULL POINTER
    // int a = 7; int b = 2; what does integer division a / b produce?
    [Fact]
    public void TheNullPointer_UsesIntegerDivision()
    {
        // Arrange

        // Act
        var result = IncidentLogic.TheNullPointer();

        // Assert
        Assert.Equal(3, result);
    }

    // INCIDENT #03 — WHO DEPLOYED THIS?
    // String concatenation of "Hello, " + name + "!"
    [Fact]
    public void WhoDeployedThis_ConcatenatesTheGreeting()
    {
        // Arrange

        // Act
        var result = IncidentLogic.WhoDeployedThis();

        // Assert
        Assert.Equal("Hello, Dev!", result);
    }

    // INCIDENT #04 — THE LOOP THAT NEVER ENDED
    // isOpen is false — which branch runs?
    [Fact]
    public void TheLoopThatNeverEnded_ReturnsElseBranch()
    {
        // Arrange

        // Act
        var result = IncidentLogic.TheLoopThatNeverEnded();

        // Assert
        Assert.Equal("Closed", result);
    }

    // INCIDENT #05 — COFFEE.exe HAS STOPPED RESPONDING
    // for (int i = 0; i < 5; i++) — how many iterations is that?
    [Fact]
    public void CoffeeExeHasStoppedResponding_CountsFiveTicks()
    {
        // Arrange

        // Act
        var result = IncidentLogic.CoffeeExeHasStoppedResponding();

        // Assert
        Assert.Equal(5, result);
    }

    // INCIDENT #06 — PRODUCTION IS ON FIRE
    // int[] nums = { 10, 20, 30 }; what is nums[2]?
    [Fact]
    public void ProductionIsOnFire_ReadsThirdArrayElement()
    {
        // Arrange

        // Act
        var result = IncidentLogic.ProductionIsOnFire();

        // Assert
        Assert.Equal(30, result);
    }

    // INCIDENT #07 — THE DEAD ARRAY
    // Square(n) returns n * n. Pick your own input to test with.
    [Fact]
    public void TheDeadArray_SquaresTheInput()
    {
        // Arrange
        var yourInput = 4;

        // Act
        var result = IncidentLogic.TheDeadArray(yourInput);

        // Assert
        Assert.Equal(16, result);
    }

    // INCIDENT #08 — WHO TOUCHED MAIN?
    // Two tickets added, one removed — what's left in the list?
    [Fact]
    public void WhoTouchedMain_TracksRemainingTicketCount()
    {
        // Arrange

        // Act
        var result = IncidentLogic.WhoTouchedMain();

        // Assert
        Assert.Equal(1, result);
    }

    // INCIDENT #10 — MARTIN FROM BACKEND
    // LINQ Where(even) + Sum over { 1, 2, 3, 4, 5 }
    [Fact]
    public void MartinFromBackend_SumsOnlyEvenScores()
    {
        // Arrange

        // Act
        var result = IncidentLogic.MartinFromBackend();

        // Assert
        Assert.Equal(6, result);
    }
}
