using NutriSystem.Models;
using NutriSystem.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NutriSystem.Controllers
{
    public class ConsultaController : Controller
    {
        ConsultaRepositorio db = new ConsultaRepositorio();

        [ActionName("GetAll")]
        [HttpGet]
        public JsonResult GetAll()
        {
            try
            {
                return Json(db.ListarConsulta(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        [ActionName("Create")]
        [Route("Create")]
        [HttpPost]
        public JsonResult SalvarConsulta(Consulta consulta)
        {
            try
            {

                db.SalvarConsulta(consulta);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
        [ActionName("Delete")]
        [Route("Delete")]
        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                db.DeleteConsulta(id);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [ActionName("Update")]
        [Route("Update")]
        [HttpPost]
        public JsonResult Put(Consulta consulta)
        {
            try
            {
                db.UpdateConsulta(consulta);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }


        [ActionName("GetNutricionistas")]
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                return Json(db.ListarNutricionistas(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}