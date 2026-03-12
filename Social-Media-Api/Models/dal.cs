using Microsoft.Extensions.Configuration;
using Microsoft.Win32;
using System.Data;
using System.Data.SqlClient;

namespace Social_Media_API.Models

{
    public class dal
    {
        public Response Registration(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO Registration(Name,Email,Password,PhoneNo,IsActive,IsApproved,Type) VALUES ('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','" + registration.PhoneNo + "',1,0,'" + registration.Type + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "Registration successful";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Registration failed";
                response.StatusCode = 100;
            }

            return response;

        }


        public Response Login(Registration registration, SqlConnection connection)
        {
            SqlDataAdapter dataAdapter = new SqlDataAdapter("SELECT * FROM Registration WHERE Email='" + registration.Email + "' AND Password='" + registration.Password + "'", connection);
            Response response = new Response();
            DataTable dt = new DataTable();
            dataAdapter.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                response.StatusMessage = "Login successful";
                response.StatusCode = 200;
                Registration register = new Registration();
                register.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                register.Name = dt.Rows[0]["Name"].ToString();
                register.Email = dt.Rows[0]["Email"].ToString();
                register.PhoneNo = dt.Rows[0]["PhoneNo"].ToString();
                response.Registration = register;
            }
            else
            {
                response.StatusMessage = "Login failed";
                response.StatusCode = 100;
                response.Registration = null;
            }
            return response;

        }

        public Response Approval(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsApproved=1 WHERE ID = '" + registration.ID + "'AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "Approval successful";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Approval failed";
                response.StatusCode = 100;
            }
            return response;
        }


        public Response AddNews(News news, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO News(Title,Content,Email,IsActive,CreatedOn) VALUES ('" + news.Title + "','" + news.Content + "','" + news.Email + "','1', GETDATE())", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "News added successfully";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Failed to add news";
                response.StatusCode = 100;
            }
            return response;
        }

        public Response NewsList(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("Select * From News where IsActive = 1", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<News> newsList = new List<News>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    News news = new News();
                    news.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    news.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    news.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    news.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    news.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);

                    newsList.Add(news);
                }
                if (newsList.Count > 0)
                {
                    response.StatusMessage = "News list retrieved successfully";
                    response.StatusCode = 200;
                    response.ListNews = newsList;
                }
                else
                {
                    response.StatusMessage = "No news found";
                    response.StatusCode = 100;
                    response.ListNews = null;
                }

            }
            else
            {
                response.StatusMessage = "No news found";
                response.StatusCode = 100;
                response.ListNews = null;
            }
            return response;
        }

        public Response AddArticle(Article article, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO Article(Title,Content,Email,Image,IsActive,IsApproved ,Type) VALUES ('" + article.Title + "','" + article.Content + "','" + article.Email + "','" + article.Image + "','1','0','" + article.Type + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "Article added successfully";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Failed to add article";
                response.StatusCode = 100;
            }
            return response;
        }

        public Response ArticleList(Article article, SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = null;
            if (article.Type == "User")
            {
                da = new SqlDataAdapter(
                    "SELECT * FROM Article WHERE IsActive = 1 AND Email = '" + article.Email + "'",
                    connection
                );
            }
            else if (article.Type == "Admin")
            {
                da = new SqlDataAdapter(
                    "SELECT * FROM Article WHERE IsActive = 1",
                    connection
                );
            }

            DataTable dt = new DataTable();

            if (da != null)
            {
                da.Fill(dt);
            }

            List<Article> articleList = new List<Article>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Article art = new Article();
                    art.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    art.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    art.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    art.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    art.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    art.Image = Convert.ToString(dt.Rows[i]["Image"]);
                    articleList.Add(art);
                }
                if (articleList.Count > 0)
                {
                    response.StatusMessage = "Article list retrieved successfully";
                    response.StatusCode = 200;
                    response.ListArticle = articleList;
                }
                else
                {
                    response.StatusMessage = "No articles found";
                    response.StatusCode = 100;
                    response.ListArticle = null;
                }
            }
            else
            {
                response.StatusMessage = "No articles found";
                response.StatusCode = 100;
                response.ListArticle = null;
            }
            return response;
        }

        public Response ArticleApproval(Article article, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Article SET IsApproved=1 WHERE ID = '" + article.ID + "'AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "Article Approval successful";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Article Approval failed";
                response.StatusCode = 100;
            }
            return response;
        }

        public Response StaffRegistration(Staff staff, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO Staff(Name,Email,Password,IsActive) VALUES ('" + staff.Name + "','" + staff.Email + "','" + staff.Password + "',1)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "staff Registration successful";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "staff Registration failed";
                response.StatusCode = 100;
            }

            return response;

        }

        public Response DeleteStaffRegistration(Staff staff, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Delete From Staff WHERE ID = '" + staff.ID + "'", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "Staff  delete successful";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "staff deletion  failed";
                response.StatusCode = 100;
            }

            return response;

        }

        public Response AddEvents(Events events, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO Events(Title,Content,Email,IsActive) VALUES ('" + events.Title + "','" + events.Content + "','" + events.Email + "',1)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "Event added successfully";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Failed to add event";
                response.StatusCode = 100;
            }
            return response;
        }

        public Response EventsList(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("Select * From Events where IsActive = 1", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Events> eventsList = new List<Events>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Events events = new Events();
                    events.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    events.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    events.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    events.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    events.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    eventsList.Add(events);
                }
                if (eventsList.Count > 0)
                {
                    response.StatusMessage = "Event list retrieved successfully";
                    response.StatusCode = 200;
                    response.ListEvents = eventsList;
                }
                else
                {
                    response.StatusMessage = "No events found";
                    response.StatusCode = 100;
                    response.ListEvents = null;
                }
            }
            else
            {
                response.StatusMessage = "No events found";
                response.StatusCode = 100;
                response.ListEvents = null;
            }
            return response;
        }

        public Response RegistrationList(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("Select * From Registration where IsActive = 1 AND  Type='User'", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Registration> registrationList = new List<Registration>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Registration registration = new Registration();
                    registration.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    registration.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    registration.PhoneNo = Convert.ToString(dt.Rows[i]["PhoneNo"]);
                    registration.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    registration.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    registration.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    registration.Type = Convert.ToString(dt.Rows[i]["Type"]);
                    registrationList.Add(registration);
                }
                if (registrationList.Count > 0)
                {
                    response.StatusMessage = "Registration list retrieved successfully";
                    response.StatusCode = 200;
                    response.ListRegistrations = registrationList;
                }
                else
                {
                    response.StatusMessage = "No Registration found";
                    response.StatusCode = 100;
                    response.ListRegistrations = null;
                }
            }
            else
            {
                response.StatusMessage = "No Registration found";
                response.StatusCode = 100;
                response.ListRegistrations = null;
            }
            return response;
        }

        public Response DeleteUserRegistration(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Delete From Registration WHERE ID = '" + registration.ID + "'", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i >= 0)
            {
                response.StatusMessage = "User  delete successful";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "User deletion  failed";
                response.StatusCode = 100;
            }

            return response;

        }

    }
}