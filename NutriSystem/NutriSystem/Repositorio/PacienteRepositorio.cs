﻿using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
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
                                     ,@sexo
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

                        }, tran);; 
                       
                        tran.Commit();
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        throw;
                    }

                }
            }
        }

        public bool DeletePaciente(int pacienteId)
        {
            var queryPaciente = @"DELETE FROM [paciente] WHERE idPaciente = @idPaciente";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryPaciente, new { idPaciente = pacienteId }, tran);

                        tran.Commit();
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        throw;
                    }

                }
            }

            using (var cn = Connection)
            {
                if (cn.State == ConnectionState.Closed)
                {
                    cn.Open();
                }
                int resultado = cn.Execute(@"DELETE FROM [paciente] WHERE idPaciente = @idPaciente", new { idPaciente = pacienteId });
                return resultado != 0;
            }
        }

        public bool UpdatePaciente(Paciente paciente)
        {
            using (var cn = Connection)
            {
                if (cn.State == ConnectionState.Closed)
                {
                    cn.Open();
                }



                int resultado = cn.Execute("UPDATE [paciente] SET [nome] = @Nome ,[cpf] = @Cpf, [sexo] = @Sexo, [dataNascimento] = @DataNascimento, " +
                    "[celular] = @Celular, [email] = @Email WHERE idPaciente = " + paciente.idPaciente, paciente); ;
                return resultado != 0;
            }
        }




    }
}