let form = document.querySelector("#item-form")
let input = document.querySelector("#item-input")
let listItems = document.querySelector("#item-list")
let filter = document.querySelector("#filter")
let formbtn = form.querySelector("button")
let isEditMode = false;
// Add single items

function addItem(e){
    e.preventDefault()
    if(input.value === "") {
        alert("Please add an item")
        return
    }
    
    if(isEditMode === true){
        let editItem = listItems.querySelector(".edit-mode")
        console.log(editItem.textContent)
        removeFromLocal(editItem.textContent)
        editItem.remove()
       
        isEditMode = false
        
     }
   else{
        if(checkDup(input.value)){
            alert("You alrady added this item")
            return
        } 
    }

    addToDOM(input.value)
    addToLocal(input.value)
    
    checkUi()
    
}


//add item to DOM
function addToDOM(item){

    let li = document.createElement('li')
    li.appendChild(document.createTextNode(item))
    
    let button = createButton("remove-item btn-link text-red")
    li.appendChild(button)

    listItems.appendChild(li)
    
}

function addToLocal(item){
    itemsFromStorage = getFromLocal()
    itemsFromStorage.push(item)
    localStorage.setItem('items',JSON.stringify(itemsFromStorage))
}


//add item to local storage

function createButton(btnClass){
    let btn = document.createElement("button")
    btn.className = btnClass

    let icon  = createIcon("fa-solid fa-xmark")
    btn.appendChild(icon)
    return btn
}

function createIcon(iClass){
    let icon = document.createElement("i")
    icon.classList = iClass
    return icon
}

form.addEventListener('submit', addItem)



//display from local storage
function getFromLocal(){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = []
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
   // console.log(typeof(itemsFromStorage))
    return itemsFromStorage
}

function displayFromLocal(){
    let itemsFromStorage = getFromLocal()
    console.log(itemsFromStorage)
    itemsFromStorage.forEach((item) => {
        console.log(item)
        addToDOM(item)})
}

displayFromLocal()

//remove sinlge items

function clickedItem(e){
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement)
    }else {
        setiItemToEdit(e.target)
    }
        
}

function removeItem(item){
    item.parentElement.remove()
    removeFromLocal(item.parentElement.textContent)
    checkUi()
}

function removeFromLocal(item){
    let itemsFromStorage = getFromLocal()

    itemsFromStorage = itemsFromStorage.filter((i) => i != item )
    localStorage.setItem('items',JSON.stringify(itemsFromStorage))
}

listItems.addEventListener('click', clickedItem)



//remove all items at once

let clrbtn = document.querySelector("#clear")

function clearAll(e){
    
    while(listItems.firstChild){
        listItems.firstChild.remove()
    }

    localStorage.removeItem('items')
    checkUi()
}

clrbtn.addEventListener('click',clearAll)

//Edit mode

function setiItemToEdit(item){
    isEditMode = true;
    listItems.querySelectorAll('li').forEach(item => {
        item.classList.remove("edit-mode")
    })

    item.classList.add("edit-mode")
    formbtn.style.background = "green"
    formbtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update`

    input.value = item.textContent
}



// Clear UI if there is no items

function checkUi(){
    input.value = " "

    let lis = listItems.querySelectorAll("li")
    if(lis.length == 0){
        filter.style.display = "none"
        clrbtn.style.display = "none"
    }else{
        filter.style.display = "block"
        clrbtn.style.display = "block"
    }

    formbtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`
    formbtn.style.background = "#000"

}

checkUi()

// filtering
filter.addEventListener('input', (e)=> {
    let lis = listItems.querySelectorAll("li")
    
    lis.forEach((item) =>{
        let itemText = item.firstChild.textContent.toLowerCase()
        let filterText = e.target.value.toLowerCase()
        if(itemText.indexOf(filterText) != -1){
            item.style.display = 'flex'
        }else{
            item.style.display = 'none'
        }
        //console.log(itemText,e.target.value)
    })
})

function checkDup(item){
    let itemsFromStorage = localStorage.getItem('items')

    if(itemsFromStorage != null){
        return itemsFromStorage.includes(item)
    }
   
}