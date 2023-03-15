export function init() {
    document.getElementById("form1").addEventListener("submit", (event) => postPut(event));
    document.getElementById("getBtn").addEventListener("click", (event) => delGet(event));
    document.getElementById("deleteBtn").addEventListener("click", (event) => delGet(event));
}

async function postPut(event) {
    let httpMethod;
    if(event.submitter === document.getElementById("postBtn")) {
        httpMethod = "POST";
    } else {
        httpMethod = "PUT";
    }
    event.preventDefault();
    document.getElementById("recordId").value = Math.random();
    document.getElementById("articleDate").value = new Date().toISOString().split('T')[0];
    const formData = new FormData(event.target);
    let response = await fetch(`https://httpbin.org/${httpMethod.toLowerCase()}`, {
        method: httpMethod,
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData).toString()
    });
    if(response.ok) {
        const responseText = await response.text();
        document.getElementById("response").innerHTML = responseText;
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function delGet(event) {
    let httpMethod;
    if(event.target === document.getElementById("getBtn")) {
        httpMethod = "GET";
    } else {
        httpMethod = "DELETE";
    }
    let response = await fetch(`https://httpbin.org/${httpMethod.toLowerCase()}?id=${Math.random()}&name=${document.getElementById("articleName").value}&body=${document.getElementById("articleBody").value}&date=${new Date().toISOString().split('T')[0]}`, {
        method: httpMethod,
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" 
        }
    });
    if(response.ok) {
        const responseText = await response.text();
        document.getElementById("response").innerHTML = responseText;
    } else {
        alert(`Error: ${response.status}`);
    }
}