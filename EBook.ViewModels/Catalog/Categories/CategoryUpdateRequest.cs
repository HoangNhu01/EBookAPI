﻿using eBook.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.Catalog.Categories
{
    public class CategoryUpdateRequest
    {
        public int Id { get; set; }

        public string Name { set; get; }

        public string SeoDescription { set; get; }

        public string SeoTitle { set; get; }

        public string SeoAlias { get; set; }

        public string LanguageId { set; get; }

        public int? ParentId { set; get; }

        public int SortOrder { set; get; }
        public Status Status { get; set; }


    }
}
