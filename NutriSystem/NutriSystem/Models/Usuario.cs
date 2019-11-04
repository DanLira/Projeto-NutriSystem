using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Models
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        //public string Tipo { get; set; }
        //public int PacienteId { get; set; }
        //public int NutricionistaId { get; set; }
    }
}