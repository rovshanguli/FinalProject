using DomainLayer.Entities;
using ServiceLayer.DTOs.AppUser;
using ServiceLayer.DTOs.Order;
using System.Threading.Tasks;

namespace ServiceLayer.Services.Interfaces
{
    public interface IEmailService
    {
        void Register(RegisterDto registerDto, string link);
        Task ConfirmEmail(string userId, string token);
        void OrderCreate(string email, string eventname,string seat, string hallname, string date);
        void ForgotPassword(AppUser user,string url,ForgotPasswordDto forgotPassword);
    }
}