using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

namespace JuiceData
{
    public static class Extension
    {
        public static string NT2Name(this string nt)
        {
            return nt.Substring(nt.IndexOf('\\') + 1);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mail"></param>
        /// <returns></returns>
        public static string Mail2Name(this string mail)
        { 
            //Richie Huang <Richie.Huang@EF.com>
            return mail.Substring(0, mail.IndexOf('<')).Trim().Replace(' ', '.');
        }

        static Regex REG_MORE_SPACE = new Regex(@"\s{2,}");
        public static string ClearDuplicateSpace(this string s)
        {
            return REG_MORE_SPACE.Replace(s.Replace('\t', ' '), " ");
        }

        public static string ClearAllSpace(this string s)
        {
            return s.Replace(" ", "");
        }
    }
}