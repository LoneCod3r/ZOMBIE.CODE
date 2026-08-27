using Xunit;
using ZombieCode.Practice;

namespace ZombieCode.Practice.Tests;

// INCIDENT #09 — THE MERGE CONFLICT
// class Zombie { public int Health = 100; public void Bite() { Health -= 10; } }
public class ZombieTests
{
    [Fact]
    public void NewZombie_StartsAtFullHealth()
    {
        // Arrange
        var zombie = new Zombie();

        // Act
        var health = zombie.Health;

        // Assert
        Assert.Equal(100, health);
    }

    [Fact]
    public void Bite_ReducesHealthByTen()
    {
        // Arrange
        var zombie = new Zombie();

        // Act
        var initialHealth = zombie.Health;
        zombie.Bite();
        var finalHealth = zombie.Health;

        // Assert
        Assert.Equal(100, initialHealth);
        Assert.Equal(90, finalHealth);
    }

    [Fact]
    public void Bite_CalledTwice_ReducesHealthByTwenty()
    {
        // Arrange
       var zombie = new Zombie();
       var initialHealth = zombie.Health;
       var bites = 2;

        // Act
       var finalHealth = initialHealth;
       for (int i = 0; i < bites; i++)
       {
           zombie.Bite();
           finalHealth = zombie.Health;
       }

        // Assert
        Assert.Equal(100, initialHealth);
        Assert.Equal(80, finalHealth);
    }
}
