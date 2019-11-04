using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Models
{
    public class Consultorio
    {
        public int ConsultorioId { get; set; }
        public string NomeFantasia { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string Pais { get; set; }
        public int Numero { get; set; }
        public string Endereco { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Uf { get; set; }
        public string Cep { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Whatsapp { get; set; }
        public string HoraAbertura { get; set; }
        public string HoraFechamento { get; set; }
        public int NutricionistaId { get; set; }
    }
}