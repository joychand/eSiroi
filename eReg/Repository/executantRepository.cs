using eReg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eReg.Repository
{
    public class executantRepository
    {
        eregdbContext _Context;

        public executantRepository()
        {
            _Context = new eregdbContext();
            //System.Threading.Thread.Sleep(5000); 
        }
        public List<District> GetDistricts()
        {
            return _Context.Districts.OrderBy(s => s.DistCode).ToList();
        }
    }
}