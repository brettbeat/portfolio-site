
const blogList = JSON.parse(localStorage.getItem("blogList")) || [];

export function initBlog() {
    let addBtn = document.getElementById("add-blog");
    addBtn.addEventListener("click", (event) => {showFormDialog(event);});

    if(blogList.length === 0) {
        const prePopList = Array.from(document.getElementById("blog-list").children); 
        for(let i = 0; i < prePopList.length; i++) {
            const itemContent = prePopList[i].children.item(0).textContent.split(" / ");
            blogList.push({title: itemContent[0], date: itemContent[1], summary: itemContent[2]});
            prePopList[i].hidden = false;
            attachButtons(prePopList[i]);
        }
        localStorage.setItem("blogList", JSON.stringify(blogList));
    } else {
        for(let i = 0; i < blogList.length; i++) {
            createBlogLi(blogList[i]);
        }
        console.log(blogList);
    }
}

function showFormDialog(event) {
    let dialog = document.getElementById("form-dialog"); 
    if(event.target.id == "add-blog") {
        dialog.onclose = () => {
            createBlogLi({title: DOMPurify.sanitize(document.getElementById("title").value), 
                date: DOMPurify.sanitize(document.getElementById("date").value), 
                summary: DOMPurify.sanitize(document.getElementById("summary").value)});
        };
    } else {
        let itemVals = (event.target.previousSibling.textContent.split(" / "));
        document.getElementById("title").value = itemVals[0];
        document.getElementById("date").value = itemVals[1];
        document.getElementById("summary").value = itemVals[2];  
        dialog.onclose = () => {editBlogItem(event.target.previousSibling);};
    }
    dialog.querySelector("#cancel-button").addEventListener("click", () => {
        dialog.onclose = "";
        resetFormVals();
        dialog.close();
    })
    dialog.showModal();
}

/**
 * @method showDeleteDialog
 *  Shows the delete dialog when the user clicks the delete button of a blog post.
 * 
 * @param {*} event - Used to find which blog post to delete
 */
function showDeleteDialog(event) {
    let dialog = document.getElementById("delete-dialog");
    dialog.children.item(1).addEventListener("click", () => {
        console.log(event);
        const blogItem = event.target.parentNode.children[0].textContent.split(" / ");
        for(let i = 0; i < blogList.length; i++) {
            if(blogItem[0] === blogList[i].title && blogItem[1] === blogList[i].date && blogItem[2] === blogList[i].summary) {
                blogList.splice(i, 1);
                localStorage.setItem("blogList", JSON.stringify(blogList));
            }
        }
        event.target.parentNode.remove();
        dialog.close();
    });
    dialog.children.item(2).addEventListener("click", () => {dialog.close();});
    dialog.showModal();
}

/**
 * @method createBlogLi
 *  Creates a new blog post using the provided data, adds it to local storage, and appends it to the list
 * 
 * @param {Object} itemContent - object containing title, date, and summary of a blog post
 */
function createBlogLi(itemContent) {
    let blogLi = document.createElement("li");

    let blogContent = document.createElement("span");
    blogContent.innerHTML = `${itemContent.title} / ${itemContent.date} / ${itemContent.summary}`;
    blogLi.appendChild(blogContent);
    attachButtons(blogLi);

    if(!blogList.includes(itemContent)) {
        blogList.push(itemContent);
        localStorage.setItem("blogList", JSON.stringify(blogList));
    } 

    document.querySelector("ul").appendChild(blogLi);
    resetFormVals();
}

/**
 * @method editBlogItem
 *  Edits the given blog item using the data provided from the edit form
 * 
 * @param {HTMLElement} itemContent - the span of the list element to be edited
 */
function editBlogItem(itemContent) {
    const editedContent = {title: DOMPurify.sanitize(document.getElementById("title").value), 
        date: DOMPurify.sanitize(document.getElementById("date").value), 
        summary: DOMPurify.sanitize(document.getElementById("summary").value)};

    const splitContent = itemContent.textContent.split(" / ");
    for(let i = 0; i < blogList.length; i++) {
        if(splitContent[0] === blogList[i].title && splitContent[1] === blogList[i].date && splitContent[2] === blogList[i].summary) {
            blogList[i] = editedContent;
            itemContent.innerHTML = `${editedContent.title} / ${editedContent.date} / ${editedContent.summary}`;
            localStorage.setItem("blogList", JSON.stringify(blogList));
        }
    }
    resetFormVals();
}

/**
 * @method resetFormVals
 *  Clears the fields of the add/edit blog forms
 */
function resetFormVals() {
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("summary").value = ""; 
}

/**
 * @method attachButtons
 *  Creates and attaches the edit and delete buttons to a blog post
 * 
 * @param {HTMLElement} listElement - The element to attach buttons to
 * 
 */
function attachButtons(listElement) {
    let editBtn = document.createElement("button");
    //editBtn.className = "edit-btn";
    //editBtn.innerHTML = "<img class='button-img' src='edit-button-svgrepo-com.svg'/>";
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", (event) => {showFormDialog(event);});
    listElement.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    //deleteBtn.className = "delete-btn";
    //deleteBtn.innerHTML = "<img class='button-img' src='trash.svg'/>";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", (event) => {showDeleteDialog(event);});
    listElement.appendChild(deleteBtn);
}