using DomainLayer.Common;
using System;

namespace DomainLayer.Entities
{
    public class Event : BaseEntity
    {
        public string Name { get; set; }
        public byte[] BackImage { get; set; }
        public byte[] Image { get; set; }
        public byte[] DetailImage { get; set; }
        public DateTime Date { get; set; }
        public float Price { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }
    }
}
