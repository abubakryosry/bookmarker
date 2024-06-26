var bookName = document.getElementById("bookmarkName");
var bookUrl = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var warningBox = document.getElementById("warningBox");
var closeBtn = document.getElementById("closeBtn");

var bookList;
if (localStorage.getItem("bookList")){
    bookList = JSON.parse (localStorage.getItem("bookList"))
    displayBook(bookList);
}else{
    bookList = [];
};

/* adding bookmark */
function addBookMark(){
    if(bookNameValidation() && bookUrlValidation()){
        var bookMark = {
            name : bookName.value,
            url : bookUrl.value
        }
        bookList.push(bookMark)
        addToLocalStorage()
        displayBook(bookList)
        clearInputs()
        
    }else{
        warningBox.classList.replace("d-none" , "d-block")
    }

}

/* display */
function displayBook(bList){
    cartoona = "";
    for (var i =0; i< bList.length; i++){
        cartoona += `
            <tr>
            <td>${i+1}</td>
            <td>${bList[i].name}</td>
            <td ><button class="btn btnVisit"><a class="" href="${bList[i].url}"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button></td>
            <td><button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
            `
    }
    tableContent.innerHTML = cartoona;
}


/* clearing inputs */
function clearInputs(){
    bookName.value = "";
    bookUrl.value = "";
}


/* adding to local storage */
function addToLocalStorage(){
    localStorage.setItem("bookList" , JSON.stringify(bookList));
}


/* deleting bookmark */
function deleteBook(index){
    bookList.splice(index,1);
    addToLocalStorage();
    displayBook(bookList);
}


/* bookmark name validation */
function bookNameValidation(){
    var regex = /^([a-zA-Z]{3,})$/;
    
    if(regex.test(bookName.value) === true){
        bookName.classList.add("is-valid");
        bookName.classList.remove("is-invalid");
        return true;
    }else{
        bookName.classList.add("is-invalid");
        bookName.classList.remove("is-valid")
        return false;
    }
}
/* bookmark url validation */
function bookUrlValidation(){
    var regex = /^((www\.)?[a-zA-Z]{3,9}\.[a-zA-Z]{3})$/;
    
    if(regex.test(bookUrl.value) === true){
        bookUrl.classList.add("is-valid");
        bookUrl.classList.remove("is-invalid");
        return true;
    }else{
        bookUrl.classList.add("is-invalid");
        bookUrl.classList.remove("is-valid")
        return false;
    }
}


function closing(){
    warningBox.classList.replace("d-block","d-none")
}
