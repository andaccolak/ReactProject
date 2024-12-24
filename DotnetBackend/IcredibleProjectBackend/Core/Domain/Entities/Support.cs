using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Support
    {
        public int SupportID { get; set; }
        public string TicketDate { get; set; }
        public string TicketMessage { get; set; }
        public string TicketResponse { get; set; }
        public string Status { get; set; }
    }
}
