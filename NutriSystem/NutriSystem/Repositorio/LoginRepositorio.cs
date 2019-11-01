using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace NutriSystem.Repositorio
{
    public class LoginRepositorio : FactoryConnection
    {
        public List<Usuario> ListarUsuario()
        {
            string queryUsuario = @"SELECT * FROM usuario";

            try
            {
                using (var cn = Connection)
                {
                    cn.Open();

                    List<Usuario> usuarios = cn.Query<Usuario>(queryUsuario).ToList();



                    return usuarios;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SalvarUsuario(Usuario usuario)
        {

            var queryUsuario = @"INSERT INTO [usuario]
                                     ([loginUsuario],
	                                  [senha],)
                                    VALUES
                                     (@Login
                                     ,@Senha)";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryUsuario, new
                        {

                            usuario.Login
                            ,
                            usuario.Senha

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


    }
}