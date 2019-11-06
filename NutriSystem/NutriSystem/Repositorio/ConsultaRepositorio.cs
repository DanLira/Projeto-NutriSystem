using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace NutriSystem.Repositorio
{
    public class ConsultaRepositorio : FactoryConnection
    {
        public List<Consulta> ListarConsulta()
        {
            string queryConsulta = @"SELECT * FROM consulta";

            try
            {
                using (var cn = Connection)
                {
                    cn.Open();

                    List<Consulta> consultas = cn.Query<Consulta>(queryConsulta).ToList();

                    return consultas;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SalvarConsulta(Consulta consulta)
        {

            var queryConsulta = @"INSERT INTO [consulta]
                                     ([dataConsulta],
	                                  [horaConsulta],
	                                  [statusConsulta],
	                                  [idPaciente],
	                                  [idNutricionista],
	                                  [idConsultorio])
                                    VALUES
                                     (@DataConsulta
                                     ,@HoraConsulta
                                     ,@StatusConsulta
                                     ,@PacienteId
                                     ,@NutricionistaId
                                     ,@ConsultorioId)";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryConsulta, new
                        {

                            consulta.DataConsulta
                            ,
                            consulta.HoraConsulta
                            ,
                            consulta.StatusConsulta
                            ,
                            consulta.idPaciente
                            ,
                            consulta.idNutricionista
                            ,
                            consulta.idConsultorio

                        }, tran); ;

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

        public bool DeleteConsulta(int consultaId)
        {
            var queryConsulta = @"DELETE FROM [consulta] WHERE idConsulta = @idConsulta";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryConsulta, new { idConsulta = consultaId }, tran);

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
                int resultado = cn.Execute(@"DELETE FROM [consulta] WHERE idConsulta = @idConsulta", new { idConsulta = consultaId });
                return resultado != 0;
            }
        }

        public bool UpdateConsulta(Consulta consulta)
        {
            using (var cn = Connection)
            {
                if (cn.State == ConnectionState.Closed)
                {
                    cn.Open();
                }

                int resultado = cn.Execute("UPDATE [consulta] SET [dataConsulta] = @DataConsulta ,[horaConsulta] = @HoraConsulta," +
                    " [statusConsulta] = @StatusConsulta, [idPaciente] = @idPaciente, " +
                    "[idNutricionista] = @idNutricionista, [idConsultorio] = @idConsultorio WHERE idConsulta = " + consulta.idConsulta, consulta); ;
                return resultado != 0;
            }
        }

        public List<Nutricionista> ListarNutricionistas()
        {
            string queryNutriconista = @"select n.nome from consultorio as c inner join nutricionista as n on n.idNutricionista = c.idNutricionista";

            try
            {
                using (var cn = Connection)
                {
                    cn.Open();

                    List<Nutricionista> nutricionistas = cn.Query<Nutricionista>(queryNutriconista).ToList();

                    return nutricionistas;

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}