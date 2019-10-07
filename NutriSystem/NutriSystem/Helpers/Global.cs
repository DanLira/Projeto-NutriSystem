using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Helpers
{
    public class Global
    {
        public const string StringConnection = @"Data Source=WIN-L8SE61F2E4\SQLEXPRESS;Initial Catalog=db_nutrisystem;Integrated Security=True;";
        public const string ReportConnectionStringManager = @"Data Source=(LocalDB)\MSSQLLocalDB;Initial Catalog=db_nutrisystem;Trusted_Connection=False; MultipleActiveResultSets=True";
        public const string UrlAPI = @"http://localhost:44389/api/";
    }
}