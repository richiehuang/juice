using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using System.Web.Script.Serialization;

namespace JuiceData.Models
{
    public class FruitJuiceItem
    {
        public string Category { get; set; }
        public string Name { get; set; }
        public string NameEn { get; set; }
        public decimal Price
        {
            get
            {
                return CurrentPrice.Price;
            }
            set
            {
                CurrentPrice.Price = value;
            }
        }
        public decimal MemberPrice
        {
            get
            {
                return CurrentPrice.MemberPrice;
            }
            set
            {
                CurrentPrice.MemberPrice = value;
            }
        }
        SeasonalPrice _CurrentPrice = null;
        SeasonalPrice CurrentPrice
        {
            get
            {
                if (_CurrentPrice == null)
                {
                    _CurrentPrice = new SeasonalPrice();
                    if (Prices.Count > 0)
                    {
                        int month = DateTime.Now.Month;
                        _CurrentPrice = Prices.Find(i => i.MonthStart > i.MonthEnd ?
                            (month >= i.MonthStart || month <= i.MonthEnd)
                            : (month >= i.MonthStart && month <= i.MonthEnd));
                    }
                    else
                    {
                        Prices.Add(_CurrentPrice);
                    }
                }
                return _CurrentPrice;
            }
        }
        public bool IsSelected { get; set; }
        [ScriptIgnore]
        public List<SeasonalPrice> Prices { get; set; }

        public FruitJuiceItem()
        {
            Prices = new List<SeasonalPrice>();
        }
    }
}