// all constant variables

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) //with JSON.parse change the string version in the local storage into the array
const tabBtn = document.getElementById("tab-btn")

// array where we save our future notes links
let myLeads = []

// takes all the saved links and notes from local storage and display them in the website thanks to render function
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
// on click of the button input from the current tab and broswer will be pushed into our array and saved in local storage  
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
// function that display all the items from the array in HTML 
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {  //for loop goes throgh all the elememnts in the array
        // and create a new list with a tag for each item with different name and link to it  
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>  
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  //in the end after loop is executed it display it all the informaton in the HTML thanks to innerHTML method
}

// on double click you delete all the information from the local storage and from the array

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// on click it saves the written input to the local storage and dispay it in HTML thanks to the render function
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
