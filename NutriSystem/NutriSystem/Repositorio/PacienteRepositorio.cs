﻿using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Repositorio
{
    public class PacienteRepositorio : FactoryConnection
    {
        public List<Paciente> ListarPaciente()
        {
            string queryPaciente = @"SELECT * FROM paciente";

            try
            {
                using (var cn = Connection)
                {
                    cn.Open();

                    List<Paciente> pacientes = cn.Query<Paciente>(queryPaciente).ToList();



                    return pacientes;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SalvarPaciente(Paciente paciente)
        {
            var queryPaciente = @"INSERT INTO [paciente]
                                     ([nome],
	                                  [cpf],
	                                  [sexo],
	                                  [dataNascimento],
	                                  [celular],
	                                  [email])
                                    VALUES
                                     (@Nome
                                     ,@Cpf
                                     ,@DataNascimento
                                     ,@Celular
                                     ,@Email)";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryPaciente, new
                        {
                            
                            paciente.Nome
                            ,
                            paciente.Cpf
                            ,
                            paciente.Sexo
                            ,
                            paciente.DataNascimento
                            ,
                            paciente.Celular
                            ,
                            paciente.Email
                            ,
                            Data = DateTime.Now
                            ,
                            Hora = DateTime.Now
                        }, tran);
                       
                        tran.Commit();
                    }
                    catch (Exception)
                    {
                        tran.Rollback();
                        throw;
                    }

                }
            }
        }


    }
}