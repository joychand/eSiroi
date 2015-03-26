using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using eReg.Models;
using eReg.Repository;
using System.Web.Http.Description;
using System.Threading.Tasks;
using System.Web.Http.Results;

namespace eReg.Controllers
{

    public class ApplyRegistrationController : ApiController
    {
        private eregdbContext db = new eregdbContext();


        // api/disricts
        [HttpGet]
        [Route("api/ApplyRegistrationController/{DistCode:int}/districts")]
        public IEnumerable<District> Districts(int distcode)
        {
            return db.Districts;
        }
        //api/subdivisions
        [HttpGet]
        [Route("api/ApplyRegistrationController/{DistCode}/subdivisions")]
        public IEnumerable<SubDivision> SubDivisions(String distcode)
        {
            //String distcd = Convert.ToString(distcode);
            //Console.Write(distcd);
            return from s in db.SubDivision
                   where s.DistCode == distcode
                   select s;

        }
        //GET subdivision
        [HttpGet]
        [Route("api/ApplyRegistrationController/subdivisions")]
        public IEnumerable<CensusSubDivision> CensusSubDivision()
        {

            return db.CensusSubDivisions;

        }
//        //GET POSTOFFICE
        [HttpGet]
        [Route("api/ApplyRegistrationController/villages")]
        public IEnumerable<censusvillage> villages ()
            {
                return db.CensusVillage;


            }
        // GET POSTOFFICES
        [HttpGet]
        [Route("api/ApplyRegistrationController/postoffices")]
            public IEnumerable<PostOffice> postoffices ()

            {
                return db.PostOffice;
            }
        // Get States
        [HttpGet]
        [Route("api/ApplyRegistrationController/state")]
        public IEnumerable<State> states ()
            {
               return db.State;
            }
        //Get MajorTrans_code
        [HttpGet]
        [Route("api/ApplyRegistrationController/MajorTrans_code")]
        public IEnumerable<MajorTrans_code> MajorTrans_code()
        {
            return db.MajorTrans_code;
        }
        [HttpGet]
        [Route("api/ApplyRegistrationController/circle")]
        public IEnumerable<Circle> Circle()
        {
            return db.Circle;
        }
        [HttpGet]
        [Route("api/ApplyRegistrationController/RevVillage")]
        public IEnumerable<RevVillage> RevVillage()
        {
            return db.RevVillage;
        }

        [HttpGet]
        [Route("api/ApplyRegistrationController/{maj_code}/trans_name")]
        public IEnumerable<MajorTrans_code> MajorTrans_name(String maj_code)
        {
           
            return from s in db.MajorTrans_code
                   where s.tran_maj_code == maj_code
                   select s;
           

        }

        [HttpGet]
        [Route("api/ApplyRegistrationController/{sro}/ackno")]
        public IHttpActionResult Ackno(String sro)
        {
            
            var application = from s in db.onlineapplication
                              where s.sro == sro  && s.ackno == (db.onlineapplication.Select(s1 => s1.ackno).Max())  
                              select s;
           if (application.Any())
             return Ok(application);  
           return NotFound();
           

            // Request.CreateResponse(HttpStatusCode.OK, online);
        }

        [HttpGet]
        [Route("api/ApplyRegistrationController/{ackno}/excutantlist")]
        public IEnumerable <OnlineExecutant> excutantlist(int ackno)
        {

            //return db.OnlineExecutant 
            IEnumerable<OnlineExecutant> elist;
            elist = db.OnlineExecutant
                  .Where(b => b.Ackno == ackno);
                  
            //elist = (from p in db.OnlineExecutant
            //         where p.Ackno == ackno
            //         select p);
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            //return elist;

            //elist = (from p in db.Set<OnlineExecutant>()
            //         where p.Ackno == ackno
            //         select new { Ackno = p.Ackno }).AsEnumerable();
            //         //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return elist;
           
           


            // Request.CreateResponse(HttpStatusCode.OK, online);
        }

        //***   GET EXECUTANT DDL DATA *********//
        [HttpGet]
        [Route("api/ApplyRegistrationController/{ackno}/execddllist")]
        public System.Collections.IEnumerable execddlist(int ackno)
        {

            //return db.OnlineExecutant 
            System.Collections.IEnumerable elist;
            //elist = db.OnlineExecutant
            //      .Where(b => b.Ackno == ackno);

            //elist = (from p in db.OnlineExecutant
            //         where p.Ackno == ackno
            //         select p);
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            //return elist;

            elist = (from p in db.Set<OnlineExecutant>()
                     where p.Ackno == ackno
                     select new { p.State, p.District,p.SubDivision,p.Village,p.PostOffice,p.PinCode,p.PoliceSt}).AsEnumerable();
            //.Select(x => new OnlineExecutant { Ackno = x.Ackno });

            return elist;




            // Request.CreateResponse(HttpStatusCode.OK, online);
        }

        [HttpPost]
        [Route("api/ApplyRegistrationController/postapplication")]
        public async Task<IHttpActionResult> PostOnlineApplication([FromBody] onlineapplication   onlineapplication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.onlineapplication.Add(onlineapplication);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (onlineapplicationExists(onlineapplication.ackno))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { controller = "onlineapplication", id = onlineapplication.ackno }, onlineapplication);
        }

        private bool onlineapplicationExists(int id)
        {
            return db.onlineapplication.Count(e => e.ackno == id) > 0;
        }

        private IQueryable<int> getackno(String sro){
             return from s in db.onlineapplication
                   where s.sro == sro
                   select s.ackno;

        }
        private int getAck()
        {
            try { 
            int currAckno = db.onlinePlot.Max(s => s.ackno);
            return currAckno;
            }
            catch(Exception)
            {
                return 0;
            }
            
        }
       
        [HttpPost]
        [Route("api/ApplyRegistraionController/postplot")]
        public async Task<IHttpActionResult> postplot([FromBody] onlinePlot plot)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var currAckno = getAck();
            plot.ackno = currAckno + 1;
            //db.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
            db.onlinePlot.Add(plot);
             try
            {
                await db.SaveChangesAsync();
            }
             catch (DbUpdateException)
             {
                
                 throw;
                
             }
             return Ok(plot.ackno);
        }

        // POST EXECUTANT LIST
        [HttpPost]
        [Route("api/ApplyRegistrationController/postexecutant")]
        public async Task<IHttpActionResult> postexecutant([FromBody] IEnumerable <OnlineExecutant>  executantlist)
         {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            foreach ( OnlineExecutant E in executantlist) {


                 db.OnlineExecutant.Add(E);

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

        // POST CLAIMANT LIST
        [HttpPost]
        [Route("api/ApplyRegistrationController/postclaimant")]
        public async Task<IHttpActionResult> postexecutant([FromBody] IEnumerable<OnlineClaimant> claimantlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (OnlineClaimant C in claimantlist)
            {


                db.OnlineClaimant.Add(C);

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
        // POST IDENTIFIER LIST
        [HttpPost]
        [Route("api/ApplyRegistrationController/postidentifier")]
        public async Task<IHttpActionResult> postexecutant([FromBody] IEnumerable<OnlineIdentifier> identifierlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (OnlineIdentifier I in identifierlist)
            {


                db.OnlineIdentifier.Add(I);

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

    }
}
