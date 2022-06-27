using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTOs.Event
{
    public class EventPaginateDto
    {
        public int Length { get; set; }
        public IEnumerable<EventDto> EventDtos { get; set; }
    }
}
