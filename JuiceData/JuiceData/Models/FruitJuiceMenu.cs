using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text.RegularExpressions;

namespace JuiceData.Models
{
    public class FruitJuiceMenu
    {
        public Dictionary<string, List<string>> Filter = new Dictionary<string, List<string>>()
        {
            {"水果", new List<string>()
            {
                "甘蔗","梨", "柚", "西瓜", "柠檬",
                "葡萄", "苹果", "菠萝", "密瓜", "橙","雪莲", "奇异果",
                "芒果", "草莓", "石榴", "蓝莓", "香蕉", "木瓜",
            }
            },
            {"蔬菜", new List<string>()
            {
                "黄瓜", "番茄","冬瓜","胡萝卜", "苦瓜","老姜", "甜菜根", "芹菜", 
            }
            },
            {"器官", new List<string>()
            {
                "肺", "肝", "脾", "肾","肤"
            }
            },
            {"功效", new List<string>()
            {
                "生津", "润燥", "美颜", "瘦身","抗衰","解毒","美容", "消化", "精力",
                "精力", "清凉", "消暑", "疲劳",
            }
            }
        };

        List<FruitJuiceItem> _Items = null;
        public List<FruitJuiceItem> Items
        {
            get
            {
                if (_Items == null)
                {
                    //_Items = FromText(@"D:\TeamFood\Resource\FruitsMenu.txt"); ;
                    _Items = FromList(@"D:\TeamFood\Resource\FruitsJuiceList.txt", "鲜榨果蔬汁");
                    _Items.AddRange(FromList(@"D:\TeamFood\Resource\Youge.txt"));
                }
                return _Items;
            }
        }

        List<string> _Categorys = null;
        public List<string> Categorys
        {
            get
            {
                if (_Categorys == null)
                {
                    _Categorys = new List<string>();
                    foreach (FruitJuiceItem item in Items)
                    {
                        if (!_Categorys.Contains(item.Category))
                        {
                            _Categorys.Add(item.Category);
                        }
                    }
                }
                return _Categorys;
            }
        }

        public string SelectedItem { get; set; }
        public string SelectedTime { get; set; }
        public string UserName { get; set; }

        public string FilterStyle
        {
            get
            {
                return "STYLE_" + (UserName.Equals("yihui.cao", StringComparison.OrdinalIgnoreCase) ? "BLUE" : "RED");
            }
        }

        string Nothing = "Nothing";
        public bool IsSelectedNothing
        {
            get
            {
                return string.IsNullOrEmpty(SelectedItem);
            }
        }
        public string SelectedItemShow
        {
            get
            {
                return IsSelectedNothing ? Nothing : SelectedItem;
            }
        }

        static Regex REG_FruitItem = new Regex(@"([\u4e00-\u9fa5]|（|）)+\s+￥\d+", RegexOptions.CultureInvariant);
        private static List<FruitJuiceItem> FromText(string path)
        {
            List<FruitJuiceItem> items = new List<FruitJuiceItem>();
            string[] lines = File.ReadAllLines(path);
            string category = string.Empty;
            foreach (string line in lines)
            {
                if (line.Length == 0 || line.StartsWith("http://"))
                {
                    continue;
                }
                if (line.IndexOf("￥") < 0)
                {
                    category = line.Trim();
                }
                else
                {
                    foreach (Match match in REG_FruitItem.Matches(line))
                    {
                        items.Add(Item2FruitItem(category, match.Value));
                    }
                }
            }
            return items;
        }

        private static FruitJuiceItem Item2FruitItem(string category, string item)
        {
            string[] a = item.Split(new string[] { "￥" }, StringSplitOptions.None);
            return new FruitJuiceItem()
            {
                Category = category,
                Name = a[0].Trim(),
                Price = Int32.Parse(a[1]),
            };
        }

        static Regex REG_FRUICE_JUICE_NAME = new Regex(@"[\u4e00-\u9fa5\s]{2,}");
        static Regex REG_FRUICE_JUICE_EN_NAME = new Regex(@"[a-zA-Z\s-.]{2,}");
        static Regex REG_FRUICE_JUICE_PRICE_TRIM = new Regex(@"1\s\d");
        static Regex REG_FRUICE_JUICE_SEASONAL_PRICE = new Regex(@"\d+");
        private List<FruitJuiceItem> FromList(string path, string category)
        {
            List<FruitJuiceItem> items = new List<FruitJuiceItem>();
            string[] lines = File.ReadAllLines(path);
            foreach (string line in lines)
            {
                string lin = line.ClearDuplicateSpace().Replace("（", "(").Replace("）", ")").Replace("．", ".").Replace("'", " ").Trim();
                if (lin.Length == 0)
                {
                    continue;
                }
                FruitJuiceItem o = BuildItem(category, lin);
                items.Add(o);
            }
            return items;
        }

        public List<FruitJuiceItem> FromList(string path)
        {
            List<FruitJuiceItem> items = new List<FruitJuiceItem>();
            string[] lines = File.ReadAllLines(path);
            string category = string.Empty;
            foreach (string line in lines)
            {
                string lin = line.ClearDuplicateSpace().Replace("（", "(").Replace("）", ")").Replace("．", ".").Replace("'", " ").Trim();
                if (lin.Length == 0)
                {
                    continue;
                }
                if (!lin.Contains(' ') && !lin.Contains('\t'))
                {
                    category = lin;
                    continue;
                }
                FruitJuiceItem o = BuildItem(category, lin);
                items.Add(o);
            }
            return items; 
        }

        private static FruitJuiceItem BuildItem(string category, string lin)
        {
            string[] a = REG_FRUICE_JUICE_NAME.Match(lin).Value.Trim().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            Match m = REG_FRUICE_JUICE_EN_NAME.Match(lin);
            FruitJuiceItem o = new FruitJuiceItem()
            {
                Category = category,
                Name = string.Format("{0}({1})", a[1], a[0]),
                NameEn = m.Value.Trim(),
            };
            string l = lin.Substring(m.Index + m.Length).Trim();
            l = REG_FRUICE_JUICE_PRICE_TRIM.Replace(l, i => i.Value.Replace(" ", ""));
            if (l.IndexOf('(') >= 0)
            {
                MatchCollection matches = REG_FRUICE_JUICE_SEASONAL_PRICE.Matches(l);
                List<int> nums = new List<int>();
                foreach (Match match in matches)
                {
                    nums.Add(Int32.Parse(match.Value));
                }
                o.Prices.Add(new SeasonalPrice()
                {
                    MonthStart = nums[0],
                    MonthEnd = nums[1],
                    Price = nums[2],
                    MemberPrice = nums[3],
                });
                o.Prices.Add(new SeasonalPrice()
                {
                    MonthStart = nums[4],
                    MonthEnd = nums[5],
                    Price = nums[6],
                    MemberPrice = nums[7],
                });
            }
            else
            {
                string[] price = l.Split(new char[] { ' ' });
                if (price.Length > 1)
                {
                    o.Price = Int32.Parse(price[0]);
                    o.MemberPrice = Int32.Parse(price[1]); 
                }
                else
                {
                    o.Price = Int32.Parse(price[0].Substring(0, 2));
                    o.MemberPrice = Int32.Parse(price[0].Substring(2, 2));
                }
            }
            return o;
        }
    }
}