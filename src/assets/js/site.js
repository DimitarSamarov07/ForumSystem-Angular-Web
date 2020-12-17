// window.onscroll = function () {
//   scrollFunction()
// };
//
// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     document.getElementById("myBtn").style.display = "block";
//   } else {
//     document.getElementById("myBtn").style.display = "none";
//   }
// }

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// HOme page forum view button
function change() {
  var elem = document.getElementById("myButton1");
  if (elem.value === "Hide list of categories") elem.value = "Show list of categories";
  else elem.value = "Hide list of categories";
}

function PostAlert() {
  alert("Please use the ,,Create Post'' link below the desired category :)");
}

// function Delete(id) {
//   let r = confirm("Are you sure you want to Delete?");
//   let json = {id: id};
//   if (r === true) {
//
//   }
// }
