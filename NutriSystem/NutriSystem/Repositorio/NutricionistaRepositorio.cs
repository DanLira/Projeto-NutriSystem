using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace NutriSystem.Repositorio
{
    public class NutricionistaRepositorio : FactoryConnection
    {
        public List<Nutricionista> ListarNutricionista()
        {
            string queryNutricionista = @"SELECT * FROM nutricionista";
            try
            {
                using (var cn = Connection)
                {
                    cn.Open();
                    List<Nutricionista> nutricionistas = cn.Query<Nutricionista>(queryNutricionista).ToList();
                    return nutricionistas;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SalvarNutricionista(Nutricionista nutricionista)
        {
            var queryNutricionista = @"INSERT INTO [nutricionista]
                                     ([nome], [crn], [sexo], [email])
                                     VALUES (@Nome, @Crn, @Sexo, @Email)";
            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryNutricionista, new
                        {
                            nutricionista.Nome,
                            nutricionista.Crn,
                            nutricionista.Sexo,
                            nutricionista.Email
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

        public bool DeleteNutricionista(int nutricionistaId)
        {
            var queryNutricionista = @"DELETE FROM [nutricionista] WHERE idNutricionista = @idNutricionista";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryNutricionista, new { idNutricionista = nutricionistaId }, tran);
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
                int resultado = cn.Execute(queryNutricionista, new { idNutricionista = nutricionistaId });
                return resultado != 0;
            }
        }


    }
}