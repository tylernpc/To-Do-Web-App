using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoController : ControllerBase
{
    private static Todo[] todo = new Todo[]
    {
        new Todo
        {
            Id = 1,
            Title = "Walk the dog",
            IsCompleted = false
        },
        new Todo
        {
            Id = 2,
            Title = "Get passport",
            IsCompleted = true
        }
    };
}