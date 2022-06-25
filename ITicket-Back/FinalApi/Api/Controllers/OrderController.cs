using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTOs.Order;
using ServiceLayer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _service;
        private readonly IEmailService _emailService;
        public OrderController(IOrderService service, IEmailService emailService)
        {
            _service = service;
            _emailService = emailService;
        }

        [HttpPost]
        [Route("CreateOrder")]
        public async Task<IActionResult> Create([FromBody] OrderMailDto orderMailDto)
        {
            OrderDto orderDto = new OrderDto();
            orderDto.EventId = orderMailDto.EventId;
            orderDto.SeatId = orderMailDto.SeatId;
            orderDto.Email = orderMailDto.Email;
            await _service.CreateAsync(orderDto);
            _emailService.OrderCreate(orderMailDto.Email, orderMailDto.EventName, orderMailDto.SeatId, orderMailDto.HallName, orderMailDto.Date);
            return Ok();
        }

        [HttpGet]
        [Route("GetByEventId/{id}")]
        public async Task<IActionResult> GetByEventId([FromRoute] int id)
        {
            var res = await _service.GetAllAsync(id);
            return Ok(res);
        }
    }
}