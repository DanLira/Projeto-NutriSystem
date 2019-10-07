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
        [HttpPost]
        public JsonResult SalvarConsultorio(Consultorio consultorio)
        {
            try
            {
                consultorio.ConsultorioId = Guid.NewGuid();

                db.SalvarConsultorio(consultorio);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}