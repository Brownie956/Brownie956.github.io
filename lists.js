function openAdminPrompt() {
    let password = prompt("Enter password");
    if(password == "1") {
        let otherPeopleItems = document.getElementsByClassName("other-person");
        for(const element of otherPeopleItems) {
            element.style.display = "list-item";
        }
    } else {
        alert("Wrong password");
    }
}
