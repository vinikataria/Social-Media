using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social_Media_API.Models;
using System.Data.SqlClient;

namespace Social_Media_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Registration")]
        public Response Registration(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.Registration(registration, connection);
            return response;
        }

        [HttpPost]
        [Route("Login")]
        public Response Login(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.Login(registration, connection);
            return response;
        }

        [HttpPost]
        [Route("Approval")]
        public Response Approval(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.Approval(registration, connection);
            return response;
        }

        [HttpPost]
        [Route("StaffRegistration")]
        public Response StaffRegistration(Staff staff)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.StaffRegistration(staff, connection);
            return response;
        }

        [HttpPost]
        [Route("DeleteStaffRegistration")]
        public Response DeleteStaffRegistration(Staff staff)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.DeleteStaffRegistration(staff, connection);
            return response;
        }

        [HttpGet]
        [Route("RegistrationList")]
        public Response RegistrationList()
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.RegistrationList(connection);
            return response;
        }

        [HttpPost]
        [Route("DeleteUserRegistration")]
        public Response DeleteUserRegistration(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Socialmedia").ToString());
            dal dal = new dal();
            response = dal.DeleteUserRegistration(registration, connection);
            return response;
        }
    }


    
}
