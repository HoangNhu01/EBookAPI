using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace eBook.Security.FeatureBuilder
{
    public interface ISecurityBuilder
    {
        IServiceCollection Services { get; set; }
        IConfiguration Configuration { get; set; }
    }
}
