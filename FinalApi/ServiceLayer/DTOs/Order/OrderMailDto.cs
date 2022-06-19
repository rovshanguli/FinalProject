using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTOs.Order
{
    public class OrderMailDto
    {
        public string SeatId { get; set; }
        public int EventId { get; set; }
        public string Email { get; set; }
        public string EventName { get; set; }
        public string HallName { get; set; }
        public string Date { get; set; }
    }
}
