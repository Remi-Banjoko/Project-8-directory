let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let currentIndex=0;

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    
    <div class= "modal-nav" >
        
        <div class="prev">
            <p> <--- Prev </p>
        </div>

        <div class="next">
            <p > Next ---> </p>
        </div>

    </div>
    </div>
    `;
    console.log(`${street.number} , ${street.name}`);
    currentIndex = index;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    let modalPrev = document.querySelector(".prev");
    let modalNext = document.querySelector(".next");

    if(currentIndex <= 0){

        modalPrev.classList.add("hidden");

    }  else if(currentIndex >= 11) {

        modalNext.classList.add("hidden");

    }

    
    modalPrev.addEventListener('click', () => {

       
        console.log(currentIndex);
        currentIndex = (currentIndex - 1);
      
        displayModal(currentIndex);
        
        console.log(currentIndex);

    });

    modalNext.addEventListener('click', () => {

        
       
        console.log(currentIndex);
        currentIndex+= 1;
      
        displayModal(currentIndex);
        
        console.log(currentIndex);

    });

    
    
    }
    

    gridContainer.addEventListener('click', e => {
        // make sure the click is not on the gridContainer itself

        if(e.target !== gridContainer) {
        
            // select the card element based on its proximity to actual element clicked

        const card = e.target.closest(".card");
        currentIndex = card.getAttribute('data-index');
        console.log(typeof(currentIndex));
        displayModal(parseInt(currentIndex));

        
        }

        
        });

       


        modalClose.addEventListener('click', () => {
            overlay.classList.add("hidden");
            });




             document.getElementById("search").addEventListener("keyup", myFunction);

            function myFunction() {

                var user_input = document.getElementById("search").value;
                var filter =  user_input.toUpperCase();
                // var names = document.getElementsByClassName('name');
                var names = document.querySelectorAll('.name');
                
                var people = document.querySelectorAll('.card');

                // console.log(names);
                // console.log(people);
                // console.log(employees);


                console.log( people);
                // console.log(people[0]);
                // console.log(employees);

                for (var i = 0; i < names.length; i++) {
                    if(names[i].textContent.toUpperCase().includes(filter)) {
                        people[i].style.display= "flex";
                    } else {
                        people[i].style.display="none";
                    }
                }

                
              }




            // function myFunction() {
            //     var user_input = document.getElementById("search").value;
            //     var filter =  user_input.toUpperCase();
            //     // var  = document.getElementById("image_gallery");
            //     var gallery_entries = gallery.getElementsByClassName('name');
            //   //   var gallery_captions = li.getAttribute("data-caption");
              
              
              
            //     for( let i = 0; i < gallery_entries.length; i++){
              
            //       var a = gallery_entries[i].getElementsByTagName("a")[0];
            //       console.log(a.getAttribute("data-caption"));
            //       var txtValue = a.getAttribute("data-caption") || a.getAttribute("alt");
            //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
            //           gallery_entries[i].style.display = "list-item";
            //       } else {
            //           gallery_entries[i].style.display = "none";
            //       }
              
            //       // let caption = image_cap`${i}`.getAttribute("data-caption");
            //       // console.log(caption);
                  
            //       }
                  
              
            //   }