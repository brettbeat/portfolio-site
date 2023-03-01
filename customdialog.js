export function attachCustomDialogs() {
    let alertBtn = document.getElementById("alert");
    let confirmBtn = document.getElementById("confirm");
    let promptBtn = document.getElementById("prompt");
    alertBtn.addEventListener("click", function() {
        showAlertDialog();
    });
    confirmBtn.addEventListener("click", function() {
        showConfirmDialog();
    });
    promptBtn.addEventListener("click", function() {
        showPromptDialog();
    });
}

function showAlertDialog() {
    let dialog = document.getElementById("dialog");
    let dialogChildren = dialog.querySelectorAll("*");
    let output = document.getElementById("output");
    output.innerHTML = "";
    dialogChildren[0].innerHTML = "Alert Pressed!"
    dialogChildren[1].style.display = "none";
    dialogChildren[2].onclick = (event) => {dialog.close();};
    dialogChildren[3].style.display = "none";
    dialog.showModal();
}

function showConfirmDialog() {
    let dialog = document.getElementById("dialog");
    let dialogChildren = dialog.querySelectorAll("*");
    let output = document.getElementById("output");
    output.innerHTML = "";
    dialogChildren[0].innerHTML = "Do you want to confirm this?"
    dialogChildren[1].style.display = "none";
    dialogChildren[2].onclick = (event) => {output.innerHTML = "Confirm result : true"; dialog.close();};
    dialogChildren[3].onclick = (event) => {output.innerHTML = "Confirm result : false"; dialog.close();};
    dialogChildren[3].style.display = "";
    dialog.showModal(); 
}

function showPromptDialog() {
    let dialog = document.getElementById("dialog");
    let dialogChildren = dialog.querySelectorAll("*");
    let output = document.getElementById("output");
    output.innerHTML = "";
    dialogChildren[0].innerHTML = "What is your name?"
    dialogChildren[1].style.display = "";
    dialogChildren[1].value = ""; 
    dialogChildren[2].onclick = (event) => {output.innerHTML = `Prompt result : ${DOMPurify.sanitize(dialogChildren[1].value)}`; dialog.close();};
    dialogChildren[3].onclick = (event) => {output.innerHTML = `Prompt result : User didn't enter anything`; dialog.close();};
    dialogChildren[3].style.display = ""; 
    dialog.showModal();
}