using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social_Media_API.Models;
using System.Data.SqlClient;

namespace Social_Media_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        readonly IConfiguration _configuration;

        public EventsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("AddEvents")]
        public Response AddEvents(Events events)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.AddEvents(events, connection);
            return response;
        }

        [HttpGet]
        [Route("EventsList")]
        public Response EventsList()
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.EventsList(connection);
            return response;
        }
    }
}
