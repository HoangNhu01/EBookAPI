using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace eBook.Data.Entities
{
    public class Author
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public List<Product> Products { get; set; }
    }
}
