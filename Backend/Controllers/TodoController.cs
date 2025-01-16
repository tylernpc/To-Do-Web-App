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

    [HttpGet]
    public Todo[] GetTodo(int? Id)
    {
        return todo;
    }

    [HttpGet("items/{id}")]
    public Todo[] GetTodo([FromRoute] int id)
    {
        var item = todo.Single(x => x.Id == id);
        var response = new Todo
        {
            Id = item.Id,
            Title = item.Title,
            IsCompleted = item.IsCompleted
        };
        return new Todo[] { response };
    }
}