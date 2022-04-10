using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Exceptions
{
    [Serializable]
    public class BookNotFoundException: Exception
    {
        public BookNotFoundException() {}

        public BookNotFoundException(string reason): base(String.Format("Book can not be found: {0}", reason)) {}
    }
}
