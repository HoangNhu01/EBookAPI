using System;
using System.Collections.Generic;
using System.Text;
using eBook.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace eBook.Security.FeatureBuilder
{
    public static class SecurityServiceCollectionExtensions
    {
        public static ISecurityBuilder AddSecurityFeature(this IServiceCollection services, IConfiguration configuration)
        {
            return new DefaultSecurityBuilder(services, configuration);
        }
        public static ISecurityBuilder AddManagers(this ISecurityBuilder builder)
        {
            builder.Services.AddSingleton<IAuthorizationHandler, AdminRoleHandler>();
            return builder;
        }
    }
}
