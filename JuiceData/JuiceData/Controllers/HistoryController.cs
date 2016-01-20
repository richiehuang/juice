using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JuiceData.Models;

namespace JuiceData.Controllers
{
    public class HistoryController : Controller
    {
        //
        // GET: /History/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Menu()
        {
            FruitJuiceMenu menu = new FruitJuiceMenu();
            return Json(menu.Filter, JsonRequestBehavior.AllowGet);
        }
    }
}
