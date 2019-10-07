using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Models
{
    public class Nutricionista
    {
        public Guid NutricionistaId { get; set; }
        public string Nome { get; set; }
        public string Crn { get; set; }
        public string Email { get; set; }
        public string Sexo { get; set; }
        public bool AtdNutPediatrica { get; set; }
        public bool AtdNutClinica { get; set; }
        public bool AtdNutHospitalar { get; set; }
        public bool AtdNutAmbulatorial { get; set; }
        public bool AtdNutDomiciliar { get; set; }
        public bool AtdNutConsultoria { get; set; }
        public bool AtdNutEsportiva { get; set; }
        public bool AtdNutGastronomia { get; set; }
    }
}