using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using JuiceData.Models;

namespace JuiceData.Controllers
{
    public class DefaultController : Controller
    {
        //
        // GET: /Default/

        public ActionResult Index()
        {
            FruitJuiceMenu menu = new FruitJuiceMenu();
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //string ret = js.Serialize(menu.Items);
            return View(menu);
        }

        public ActionResult Menu()
        {
            FruitJuiceMenu menu = new FruitJuiceMenu();
            return Json(menu.Items, JsonRequestBehavior.AllowGet);
        }
    }
}
