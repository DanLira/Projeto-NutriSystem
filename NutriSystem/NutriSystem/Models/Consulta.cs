using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Models
{
    public class Consulta
    {
        public int idConsulta { get; set; }
        public DateTime DataConsulta { get; set; }
        public string HoraConsulta { get; set; }
        public string StatusConsulta { get; set; }
        public int idPaciente { get; set; }
        public int idNutricionista { get; set; }
        public int idConsultorio { get; set; }
    }
}