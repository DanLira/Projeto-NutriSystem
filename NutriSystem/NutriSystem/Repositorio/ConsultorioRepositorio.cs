using Dapper;
using NutriSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
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
                                      [uf],
                                      [pais],
                                      [celular],
	                                  [email],
	                                  [telefone],
	                                  [instagram],
	                                  [facebook],
	                                  [whatsapp],
	                                  [horaAbertura],
                                      [horaFechamento],
                                      [idNutricionista])
                                    VALUES
                                     (@NomeFantasia,
	                                  @RazaoSocial,
	                                  @Cnpj,
	                                  @Endereco,
                                      @Numero,
                                      @Bairro,
                                      @Cep,
                                      @Cidade,
                                      @Uf,
                                      @Pais,
                                      @Celular,
	                                  @Email,
	                                  @Telefone,
	                                  @Instagram,
	                                  @Facebook,
	                                  @Whatsapp,
	                                  @HoraAbertura,
                                      @HoraFechamento,
                                      @idNutricionista)";

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
                            consultorio.Endereco
                            ,
                            consultorio.Numero
                            ,
                            consultorio.Bairro
                            ,
                            consultorio.Cep
                            ,
                            consultorio.Cidade
                            ,
                            consultorio.Uf
                            ,
                            consultorio.Pais
                            ,
                            consultorio.Celular
                            ,
                            consultorio.Email
                            ,
                            consultorio.Telefone
                            ,
                            consultorio.Instagram
                            ,
                            consultorio.Facebook
                            ,
                            consultorio.Whatsapp
                            ,
                            consultorio.HoraAbertura
                            ,
                            consultorio.HoraFechamento
                            ,
                            consultorio.idNutricionista

                        }, tran) ;

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


        public bool DeleteConsultorio(int consultorioId)
        {
            var queryNutricionista = @"DELETE FROM [consultorio] WHERE idConsultorio = @idConsultorio";

            using (var cn = Connection)
            {
                cn.Open();
                using (var tran = cn.BeginTransaction())
                {
                    try
                    {
                        cn.Query(queryNutricionista, new { idConsultorio = consultorioId }, tran);
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
                int resultado = cn.Execute(queryNutricionista, new { idConsultorio = consultorioId });
                return resultado != 0;
            }
        }

        public bool UpdateConsultorio(Consultorio consultorio)
        {
            using (var cn = Connection)
            {
                if (cn.State == ConnectionState.Closed)
                {
                    cn.Open();
                }

                int resultado = cn.Execute("UPDATE [consultorio] SET [nomeFantasia] = @NomeFantasia ,[cnpj] = @Cnpj, [razaoSocial] = @RazaoSocial, [pais] = @Pais, " +
                    "[numero] = @Numero, [endereco] = @Endereco, [bairro] = @Bairro," +
                    "[cidade] = @Cidade, [uf] = @Uf, [cep] = @Cep, [telefone] = @Telefone, [instagram] = @Instagram," +
                    "[facebook] = @Facebook, [whatsapp] = @Whatsapp, [horaAbertura] = @HoraAbertura, [horaFechamento] = @HoraFechamento, [idNutricionista] = @NutricionistaId" +
                    " WHERE idConsultorio = " + consultorio.idConsultorio, consultorio); ;
                return resultado != 0;
            }
        }


    }
}