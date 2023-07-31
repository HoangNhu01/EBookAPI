using eBook.ViewModels.AppSystem.Roles;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eBook.Application.AppSystem.Roles
{
    public interface IRoleService
    {
        Task<List<RoleVm>> GetAll();
    }
}