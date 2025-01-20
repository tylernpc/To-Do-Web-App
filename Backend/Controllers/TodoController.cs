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

    [HttpPost]
    public IActionResult CreateTodo([FromBody] Todo newTodo)
    {
        var newId = todo.Max(x => x.Id) + 1;

        var todoItem = new Todo
        {
            Id = newId,
            Title = newTodo.Title,
            IsCompleted = newTodo.IsCompleted
        };
        todo = todo.Concat(new[] { todoItem }).ToArray();

        return CreatedAtAction(nameof(GetTodo), new { id = todoItem.Id }, todoItem);
    }

    [HttpPut("items/{id}")]
    public IActionResult UpdateTodo([FromRoute] int id, [FromBody] Todo updatedTodo)
    {
        var todoItem = todo.SingleOrDefault(x => x.Id == id);
        
        if (todoItem == null)
        {
            return NotFound();
        }

        todoItem.Title = updatedTodo.Title;
        todoItem.IsCompleted = updatedTodo.IsCompleted;
        
        return NoContent();
    }

    [HttpDelete("items/{id}")]
    public IActionResult DeleteTodo([FromRoute] int id)
    {
        var todoItem = todo.SingleOrDefault(x => x.Id == id);

        if (todoItem == null)
        {
            return NotFound();
        }

        DeleteTodo(id);
        return NoContent();
    }
}