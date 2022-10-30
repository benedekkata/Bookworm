using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookWorm.BusinessLogic.Exceptions
{
    [Serializable]
    public class UserNotFoundException: Exception
    {
        public UserNotFoundException() {}

        public UserNotFoundException(string reason): base(String.Format("User can not be found: {0}", reason)) {}
    }
}
