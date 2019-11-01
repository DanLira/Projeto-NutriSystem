using NutriSystem.Models;
using NutriSystem.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NutriSystem.Controllers
{
    public class ConsultorioController : Controller
    {
        ConsultorioRepositorio db = new ConsultorioRepositorio();

        [ActionName("GetAll")]
        [HttpGet]
        public JsonResult GetAll()
        {
            try
            {
                return Json(db.ListarConsultorio(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        [ActionName("Create")]
        [Route("Create")]
        [HttpPost]
        public JsonResult SalvarConsultorio(Consultorio consultorio)
        {
            try
            {

                db.SalvarConsultorio(consultorio);
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
                db.DeleteConsultorio(id);
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
        public JsonResult Put(Consultorio consultorio)
        {
            try
            {
                db.UpdateConsultorio(consultorio);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}