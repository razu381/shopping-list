let form = document.querySelector("#item-form")
let input = document.querySelector("#item-input")
let listItems = document.querySelector("#item-list")


function addItem(e){
    e.preventDefault()
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(input.value))
    
    let button = createButton("remove-item btn-link text-red")
    li.appendChild(button)

    listItems.appendChild(li)
    input.value = ""
}

function createButton(btnClass){
    let btn = document.createElement("button")
    btn.className = btnClass

    let icon  = createIcon("fa-solid fa-xmark")
    console.log(icon)
    btn.appendChild(icon)
    return btn
}

function createIcon(iClass){
    let icon = document.createElement("i")
    icon.classList = iClass
    return icon
}

form.addEventListener('submit', addItem)