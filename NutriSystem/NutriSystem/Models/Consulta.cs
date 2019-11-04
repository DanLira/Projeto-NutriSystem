using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Models
{
    public class Consulta
    {
        public int ConsultaId { get; set; }
        public DateTime DataConsulta { get; set; }
        public string HoraConsulta { get; set; }
        public string StatusConsulta { get; set; }
        public int PacienteId { get; set; }
        public int NutricionistaId { get; set; }
        public int ConsultorioId { get; set; }
    }
}