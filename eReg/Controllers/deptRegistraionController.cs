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
    }
}
