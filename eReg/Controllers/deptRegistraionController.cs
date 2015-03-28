using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eReg.Models;
using eReg.Migrations.Models;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Data.Entity.Infrastructure;


namespace eReg.Controllers
{
    public class deptRegistraionController : ApiController
    {
        private eregdbContext db = new eregdbContext();
        private LPplot lpdb = new LPplot();


        ////Get LandType 

        [HttpGet]
        [Route("api/deptRegistraionController/landtype")]
        public IHttpActionResult getlandtype()
        {


            var landtype = db.LandType;

            if (landtype.Any())
            {
                return Ok(landtype);
            }

            return NotFound();

        }

        // Get LandClass
        [HttpGet]

        [Route("api/deptRegistraionController/landclass")]

        public IHttpActionResult getlandclass()
        {
            var landclass = db.Class;
            if (landclass.Any())
            {
                return Ok(landclass);

            }
            return NotFound();
        }


        // post executantlist

        [HttpPost]
        [Route("api/deptRegistraionController/postexecutant")]
        public async Task<IHttpActionResult> postexecutant([FromBody] IEnumerable<Executant> executantlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (Executant E in executantlist)
            {


                db.Executant.Add(E);

            }



            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                throw;


            }

            // return CreatedAtRoute("DefaultApi", new { controller = "postexecutant", id = executantlist[0].ackno }, executantlist);
            return Ok();
        }

        // Get Online Claimant list 

        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/claimantlist")]
        public IEnumerable<OnlineClaimant> claimantlist(int ackno)
        {

            //return db.OnlineExecutant 
            IEnumerable<OnlineClaimant> clist;
            clist = db.OnlineClaimant
                  .Where(b => b.Ackno == ackno);


            return clist;
        }
        // GET ONLINE IDENTIFIER LIST
        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/identifierlist")]
        public IEnumerable<OnlineIdentifier> identifierlist(int ackno)
        {

            //return db.OnlineExecutant 
            IEnumerable<OnlineIdentifier> ilist;
            ilist = db.OnlineIdentifier
                  .Where(b => b.Ackno == ackno);


            return ilist;
        }

        // GET ONLINE IDENTDDL LIST

        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/identddllist")]
        public System.Collections.IEnumerable identddllist(int ackno)
        {

            System.Collections.IEnumerable iddlist;
           

            iddlist = (from p in db.Set<OnlineIdentifier>()
                     where p.Ackno == ackno
                     select new { p.State, p.District, p.SubDivision, p.Village, p.PostOffice, p.PinCode, p.PoliceSt }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return iddlist;


          }

       // GET CLAIMANT DDL LIST

        [HttpGet]
        [Route("api/deptRegistraionController/{ackno}/claimddlist")]

        public System.Collections.IEnumerable claimddlist(int ackno)
        {

            System.Collections.IEnumerable cddlist;


            cddlist = (from p in db.Set<OnlineClaimant>()
                       where p.Ackno == ackno
                       select new { p.State, p.District, p.SubDivision, p.Village, p.PostOffice, p.PinCode, p.PoliceSt }).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return cddlist;


        }

       
        // get plot
        [HttpGet]
        [Route("api/deptRegistraionController/{plotno}/{pattano}/verfiyplot")]
        
        public  IHttpActionResult getPlotDetails(string plotno, string pattano)
        {

        //IQueryable plotlist;


           var plotlist = (from p in lpdb.Set<uniplot>()
                        where p.NewDagNo == plotno && p.NewPattaNo == pattano
                        select new { p.LocCd, p.LandClass, p.unit });
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });
            if (plotlist.Any())
            {
                return Ok(plotlist); 
            }

            return NotFound();

        }


     






       
    }
}
