using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NutriSystem.Repositorio
{
    public class ConsultorioRepositorio : FactoryConnection
    {
        public List<Consultorio> ListarConsultorio()
        {
            string queryConsultorio = @"SELECT * FROM consultorio";

            try
            {
                using (var cn = Connection)
                {
                    cn.Open();

                    List<Consultorio> consultorios = cn.Query<Consultorio>(queryConsultorio).ToList();

                    return consultorios;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SalvarConsultorio(Consultorio consultorio)
        {
            var queryConsultorio = @"INSERT INTO [consultorio]
                                     ([nomeFantasia],
	                                  [razaoSocial],
	                                  [cnpj],
	                                  [endereco],
                                      [numero],
                                      [bairro],
                                      [cep],
                                      [cidade],
                                      [celular],
	                                  [email],
	                                  [telefone],
	                                  [instagram],
	                                  [facebook],
	                                  [whatsapp],
	                                  [horarioFuncionamento]
                                        )
                                    VALUES
                                     (@NomeFantasia,
	                                  @RazaoSocial,
	                                  @Cnpj,
	                                  @Logradouro,
                                      @Numero,
                                      @Bairro,
                                      @Cep,
                                      @Cidade,
                                      @Celular,
	                                  @Email,
	                                  @Telefone,
	                                  @Instagram,
	                                  @Facebook,
	                                  @Whatsapp,
	                                  @HorarioFuncionamento)";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryConsultorio, new
                        {

                            consultorio.NomeFantasia
                            ,
                            consultorio.RazaoSocial
                            ,
                            consultorio.Cnpj
                            ,
                            consultorio.Logradouro
                            ,
                            consultorio.Numero
                            ,
                            consultorio.Bairro
                            ,
                            consultorio.Cep
                            ,
                            consultorio.Cidade
                            ,
                            consultorio.Celular
                            ,
                            consultorio.Email
                            ,
                            consultorio.Instagram
                            ,
                            consultorio.Facebook
                            ,
                            consultorio.Whatsapp
                            ,
                            consultorio.HorarioFuncionamento
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