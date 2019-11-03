// wait for dom to load and then fill it in
document.addEventListener("DOMContentLoaded", function(){
    const monsterContainer = document.getElementById("monster-container")
    const backButton = document.getElementById("back")
    const forwardButton = document.getElementById("forward")
    forwardButton.addEventListener("click", pageForward)
    // backButton.addEventListener("click", pageBack)
    const perPage ="?_limit=50 "
    // <form id="monster-form">
    //     <input type="text" id="monster-name" placeholder="name..">
    //     <input type="text" id="monster-age" placeholder="age...">
    //     <input type="text" id="monster-desc" placeholder="description">
    //     <button>Create Monster</button>
    //   </form>
    const monsterForm = document.createElement("form")
    monsterForm.id = "monster-form"

    const nameInput = document.createElement("input")
    nameInput.id = "monster-name"
    nameInput.placeholder = "name..."
    nameInput.type = "text"

    const ageInput = document.createElement("input")
    ageInput.id = "monster-age"
    ageInput.placeholder = "age...."
    ageInput.type = "text"
    const descInput = document.createElement("input")
    descInput.id = "monster-desc"
    descInput.placeholder = "their tale....."
    descInput.type = "text"
    const createButton = document.createElement("button")
    createButton.innerHTML = "Create Monster"
    monsterForm.append(nameInput, ageInput, descInput, createButton)
    document.body.insertBefore(monsterForm, monsterContainer)
    


    const URL = "http://localhost:3000/monsters"
    let page = 1
    fetch(URL+perPage)
        .then(response => response.json())
        .then(monsterData =>{
            // monsterData is an array of objects
            monsterData.forEach(renderMonster)
            // debugger
        })
    function pageForward(){
        // increment the page
        page++
        fetch(URL+perPage+`&_page=${page}`)
            .then(response => response.json())
            .then(monsters =>{ 
                monsterContainer.innerHTML = ""
                monsters.forEach(renderMonster)
            })
        // fetch the next 50
        // clear out the current display
        // show the new 50
    }

    // const monsterForm = document.getElementById("monster-form")
    monsterForm.addEventListener("submit", addMonster)
    
    function addMonster(e){
        e.preventDefault()
        const name = document.getElementById("monster-name").value
        const age = document.getElementById("monster-age").value
        const desc = document.getElementById("monster-desc").value
        let monsterObj = {
            name: name,
            age: age,
            description: desc
        }
        let configObj = {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(monsterObj)

        }
        fetch(URL, configObj )
        .then(response => response.json())
        .then(monsterObj => renderMonster(monsterObj))
    }
    

    function renderMonster(monsterObj){
        // make a div for each monster, and a paragraph for each of its attributes
        // h2 for name
        // h4 for age
        // p for bio
        const monsterDiv = document.createElement("div")
        
        const nameH2 = document.createElement("h2")
        nameH2.innerHTML = monsterObj.name
        monsterDiv.appendChild(nameH2)

        const ageH4 = document.createElement("h4")
        ageH4.innerHTML = `Age: ${monsterObj.age}`
        monsterDiv.appendChild(ageH4)

        const bioP = document.createElement("p")
        bioP.innerHTML = `Bio: ${monsterObj.description}`
        monsterDiv.appendChild(bioP)

        monsterContainer.appendChild(monsterDiv)


    }
})