using eBook.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace eBook.ViewModels.Catalog.Authors
{
    public class AuthorVm
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
        
        [JsonIgnore] 
        public virtual Product Product { get; set; }
    }
}
