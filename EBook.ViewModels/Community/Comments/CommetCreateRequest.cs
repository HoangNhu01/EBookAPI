using eBook.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.Community.Comments
{
    public class CommetCreateRequest
    {
        public Guid? Id { set; get; }

        public Guid UserId { set; get; }

        public string CommentText { set; get; }

        public DateTime? CreatedDate { set; get; }

        public Guid? ParentId { set; get; }
        public int ProductId { set; get; }
    }
}
