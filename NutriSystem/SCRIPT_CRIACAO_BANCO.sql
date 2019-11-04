create database db_nutrisystem

use db_nutrisystem

create table paciente(
	idPaciente int identity(1,1) primary key not null,
	nome varchar(100) not null,
	cpf char(14) not null,
	sexo char(1) not null,
	dataNascimento date not null,
	celular varchar(20) not null,
	email varchar(100)
)

create table nutricionista(
	idNutricionista int identity(1,1) primary key not null,
	nome varchar(100) not null,
	crn varchar(20) not null,
	sexo char(1) not null,
	email varchar(100),

	atdNutPediatrica bit,
	atdNutClinica bit,
	atdNutHospitalar bit,
	atdNutAmbulatorial bit,
	atdNutDomiciliar bit,
	atdNutConsultoria bit,
	atdNutEsportiva bit,
	atdNutGastronomia bit
)


create table usuario(
	idUsuario int identity(1,1) primary key not null, 
	loginUsuario varchar(30) not null,
	senha char(8) not null,
	tipo varchar(20) not null,
	idPaciente int foreign key references paciente(idPaciente),
	idNutricionista int foreign key references nutricionista(idNutricionista)
)

create table consultorio(
	idConsultorio int identity(1,1) primary key not null,
	nomeFantasia varchar(100) not null,
	razaoSocial varchar(100) not null,
	cnpj char(18) not null,
	endereco varchar(100) not null,
	numero varchar(15) not null,
	bairro varchar(50) not null,
	cep char(10) not null,
	cidade varchar(50) not null,
	uf char(2) not null,
	pais varchar(50) not null,
	celular  varchar(20) not null,
	email varchar(100) not null,
	telefone  varchar(20), 
	instagram varchar(50),
	facebook varchar(50), 
	whatsapp varchar(50),
    horaAbertura Varchar(5),
	horaFechamento Varchar(5)
)

create table nutricionistaConsultorio(
	idNutricionista int foreign key references nutricionista(idNutricionista) not null,
	idConsultorio int foreign key references consultorio(idConsultorio) not null
)

create table consulta(
	idConsulta int identity(1,1) primary key not null,
	dataConsulta date not null,
	horaConsulta varchar(10) not null,
	statusConsulta varchar(20) not null,
	idPaciente int foreign key references paciente(idPaciente) not null,
	idNutricionista int foreign key references nutricionista(idNutricionista) not null,
	idConsultorio int foreign key references consultorio(idConsultorio) not null,
)