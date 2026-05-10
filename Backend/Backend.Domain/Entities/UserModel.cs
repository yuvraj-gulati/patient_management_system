using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Domain.Entities
{
    public class UserModel:BaseEntity
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Only letters are allowed.")]
        public string UserName { get; set; }


        [Required(ErrorMessage = "UserEmail is required")]
        [RegularExpression("^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$", ErrorMessage = "Must have a valid email")]
        public string UserEmail { get; set; }


        [Required(ErrorMessage = "UserDob is required")]
        public string UserDob { get; set; }


        [Required(ErrorMessage = "UserPhone is required")]
        [MaxLength(10, ErrorMessage = "User Phone must be of 10 digit only")]
        [RegularExpression(@"^[0-9]+$", ErrorMessage = "Only numbers are allowed.")]
        public string UserPhone { get; set; }


        [Required(ErrorMessage = "UserGender is required")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Only letters are allowed.")]
        public string UserGender { get; set; }


        [Required(ErrorMessage = "UserAddress is required")]
        public string UserAddress { get; set; }


        [Required(ErrorMessage = "UserPassword is required")]
        public string UserPassword { get; set; }

    }
}
