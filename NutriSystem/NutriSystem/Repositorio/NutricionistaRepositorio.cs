using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
                                     VALUES (@Nome, @Crn, @Sexo, @Email) OUTPUT INSERTED.ID";

            var queryUsuarioInsert = @"INSERT INTO [usuario]
                                     ([loginUsuario], [senha], [tipo], [idNutricionista])
                                     VALUES (@Login, @Senha, @Tipo, @NutricionistaId)";

        //    using (SqlConnection con = new SqlConnection(Config.ConnectionString))
        //    {

        //        using (SqlCommand cmd = new SqlCommand(queryNutricionista, con))
        //        {
        //            cmd.Parameters.AddWithValue("@na", Mem_NA);
        //            cmd.Parameters.AddWithValue("@occ", Mem_Occ);
        //            con.Open();

        //            int modified = (int)cmd.ExecuteScalar();

        //            if (con.State == System.Data.ConnectionState.Open)
        //                con.Close();

        //            return modified;
        //        }
        //    }

        //}

            int idNutricionistaSaved;
            nutricionista.Senha = "12345678910";
            Usuario usuario = new Usuario();

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

                        //idNutricionistaSaved = (int)tran.Id
                        //idNutricionistaSaved = O ID DO NUTRICIONISTA QUE ESTÁ SENDO SALVO AQUI
                        //int retorno = Convert.ToInt32(tran.Parameters["@id"].Value);

                    }
                    catch (Exception)
                    {
                        tran.Rollback();
                        throw;
                    }

                        usuario.Login = nutricionista.Crn;
                        usuario.Senha = nutricionista.Senha;
                        usuario.Tipo = "Nutricionista";
                        usuario.NutricionistaId = 3;               
                               
                    try
                    {
                        cn.Query(queryUsuarioInsert, new
                        {
                           usuario.Login,
                           usuario.Senha,
                           usuario.Tipo,
                           usuario.NutricionistaId
                        }, tran);
                        tran.Commit();
                    }
                    catch(Exception e)
                    {
                        var message = e.Message;
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

        public bool UpdateNutricionista(Nutricionista nutricionista)
        {
            using (var cn = Connection)
            {
                if (cn.State == ConnectionState.Closed)
                {
                    cn.Open();
                }

                int resultado = cn.Execute("UPDATE [nutricionista] SET [nome] = @Nome ,[crn] = @Crn, [sexo] = @Sexo, [email] = @Email, " +
                    "WHERE idNutricionista = " + nutricionista.idNutricionista, nutricionista); ;
                return resultado != 0;
            }
        }


    }
}