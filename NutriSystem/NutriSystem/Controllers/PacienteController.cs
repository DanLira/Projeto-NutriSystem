﻿using NutriSystem.Models;
using NutriSystem.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
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
        [Route("Create")]
        [HttpPost]
        public JsonResult SalvarPaciente(Paciente paciente)
        {
            try
            {

                db.SalvarPaciente(paciente);
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
                db.DeletePaciente(id);
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
        public JsonResult Put(Paciente paciente)
        {
            try
            {
                db.UpdatePaciente(paciente);
                return Json("OK");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }



    }

}