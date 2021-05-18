var alertList = document.querySelectorAll(".alert");
alertList.forEach(function (alert) {
  new bootstrap.Alert(alert);
});
var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl, option);
});
function prefixChange() {
  try {
    document.getElementById("prefsssix").innerHTML = "Funciona esto Xd";
  } catch (error) {
    console.log(error);
  }
}
