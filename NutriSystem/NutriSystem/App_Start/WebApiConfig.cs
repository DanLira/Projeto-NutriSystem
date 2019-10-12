using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
namespace NutriSystem
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
           config.EnableCors(new EnableCorsAttribute(origins:"*", headers: "*", methods: "*") { SupportsCredentials = true });

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            
        }
    }
}
