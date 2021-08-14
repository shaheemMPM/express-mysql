const btnWithdraw = document.getElementById("btnWithdraw");
const etUsername = document.getElementById("etUsername");
const etAmount = document.getElementById("etAmount");
const etBalance = document.getElementById("etBalance");
const sectionWithdraw = document.getElementById("sectionWithdraw");
const sectionBalance = document.getElementById("sectionBalance");

btnWithdraw.onclick = () => {
  fetch("http://localhost:5000/withdraw", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: etUsername.value,
      amount: Number(etAmount.value),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "SUCCESS") {
        etBalance.value = `Rs. ${data.user.balance}`;
        sectionWithdraw.style.display = "none";
        sectionBalance.style.display = "block";
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
