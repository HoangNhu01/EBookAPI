# EBookAPI

## BE:
- ASP.NET Core 3.1
- Entity Framework Core 3.1
### Install Tools
- .NET Core SDK 3.1
- Git client
- Visual Studio 2022
- SQL Server 2022
### How to configure and run
- Clone code from Github: git clone https://github.com/HoangNhu01/EBookAPI.git
- Open solution EBookAPI.sln in Visual Studio 2022
- Set startup project is eShopSolution.Data
- Change connection string in Appsetting.json in EBookAPI.Data project
- Open Tools --> Nuget Package Manager -->  Package Manager Console in Visual Studio
- Run Update-database and Enter.
- After migrate database successful, set Multiple Startup Project is EBook.Admin & EBook.API(Kestrel web server, not IIS)
- Change database connection in appsettings.Development.json in EBook.API project.
- Choose profile to run or press F5 or Ctrl+F5
### How to contribute
- Fork and create your branch
- Create Pull request to us.

## FE:
- React v18.2.0
### Install Tools
- Nodejs
- Git client
- Visual Studio Code 2021 || Visual Studio 2022
### How to configure and run
- Clone code from Github: git clone https://github.com/HoangNhu01/EBookAPI.git
- Open folder EBookStore with your IDE 
- Open terminal of EBookStore and Run `npm i --force`
- Finally, Run `npm start` to start FE project at http://localhost:3000

