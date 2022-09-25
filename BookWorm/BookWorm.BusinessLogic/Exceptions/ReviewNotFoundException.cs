using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Exceptions
{
    [Serializable]
    public class ReviewNotFoundException: Exception
    {
        public ReviewNotFoundException() {}

        public ReviewNotFoundException(string reason): base(String.Format("Review can not be found: {0}", reason)) {}
    }
}
