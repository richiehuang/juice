using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JuiceData.Models
{
    public class SeasonalPrice
    {
        public int MonthStart { get; set; }
        public int MonthEnd { get; set; }
        public decimal Price { get; set; }
        public decimal MemberPrice { get; set; }

        public SeasonalPrice()
        {
            MonthStart = 1;
            MonthEnd = 12;
        }
    }
}