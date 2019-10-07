using NutriSystem.Models;
using NutriSystem.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NutriSystem.Controllers
{
    public class PacienteController : Controller
    {
        PacienteRepositorio db = new PacienteRepositorio();

        [ActionName("GetAll")]
        [HttpGet]
        public JsonResult GetAll()
        {
            try
            {
                return Json(db.ListarPaciente(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        [ActionName("Create")]
        [HttpPost]
        public JsonResult SalvarPaciente(Paciente paciente)
        {
            try
            {
                paciente.PacienteId = Guid.NewGuid();

                db.SalvarPaciente(paciente);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }


    }

}