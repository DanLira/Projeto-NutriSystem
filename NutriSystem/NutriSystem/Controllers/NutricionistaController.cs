using NutriSystem.Models;
using NutriSystem.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NutriSystem.Controllers
{
    public class NutricionistaController : Controller
    {
        NutricionistaRepositorio db = new NutricionistaRepositorio();

        [ActionName("GetAll")]
        [HttpGet]
        public JsonResult GetAll()
        {
            try
            {
                return Json(db.ListarNutricionista(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        [ActionName("Create")]
        [Route("Create")]
        [HttpPost]
        public JsonResult SalvarNutricionista(Nutricionista nutricionista)
        {
            try
            {
                db.SalvarNutricionista(nutricionista);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}