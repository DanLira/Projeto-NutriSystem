using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Models
{
    public class Paciente
    {
        public int PacienteId { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public string Sexo { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Celular { get; set; }
    }
}