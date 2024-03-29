class Data{
  async getData(){

    const response = await fetch('./data.json');

    const data = await response.json();

    return data;
  } 
}

class UI{
  
  // display list of jobs in UI
  showList(jobs){
    let jobList = document.querySelector('.jobs');

    // CODE FOR JOB LI
    jobs.forEach(job => {
      
      let output = '';
      output += `
      <li class="job${job.featured  ===true? ' cyan-border': ''}">
      <img src="./${job.logo}" alt="banner">
      <div class="company">
      <h2>${job.company}</h2>
      <span class=${job.new === true? 'cyan': ''}>${job.new === true? 'New!': ''}</span>
      <span class=${job.featured === true? 'black': ''}>${job.featured === true? 'Featured': ''}</span>
      </div>
      <h3>${job.position}</h3>
      <div class="details">
        <span>${job.postedAt}</span>
        <span>${job.contract}</span>
        <span>${job.location}</span>
      </div>
      <div class="filter">
      <button data-role= "${job.role}">${job.role}</button>
      <button data-level= "${job.level}">${job.level}</button>
      ${job.languages.map(itemFxn).join('')}
      ${job.tools.map(itemFxn).join('')}
      </div>
      `;
  
      function itemFxn(item) {
        return `<button data-tools= ${item}>${item}</button>`;
      }
      
      jobList.innerHTML += output;
    });
  }


  filterSelection(){

    // CODE FOR ALL BUTTON VALUES
    let buttons = document.querySelectorAll('.filter button');

    // ARRAY for ALL BUTTON VALUES PRESENT IN FILTER DIV
    let btnValues = []; 

    buttons.forEach(btn=> {
      let btnValue = btn.innerText; 
      btnValues.push(btnValue); 
    })

    buttons.forEach(clickBtn=>{
      clickBtn.addEventListener('click', (e)=>{
        let clickBtn = e;

        // all cards
        let cards = document.querySelectorAll('.job');
        
        // CLICKED BTN DISPLAY IN FITLERED DIV
        let filterContainer = document.querySelector('.filter-container');
        let selectedBtnDiv = document.querySelector('.selected-btn');
        let btnOutput = '';
        filterContainer.style.display = 'block';

        btnOutput += `
        <button>
          ${e.target.innerText.trimEnd()}
          <span><img src="./images/icon-remove.svg" alt=""></span>
        </button>
        `;

        selectedBtnDiv.innerHTML += btnOutput;

          fltrBtnArray();



          function fltrBtnArray() {
            let fltrBtns = document.querySelectorAll('.selected-btn button');
            let fltrArray = []; 

            // ADD EACH OF THE FILTERED BTN INTO AN ARRAY
            fltrBtns.forEach(fltrBtn=>{
              fltrArray.push(fltrBtn.innerText);
            })

            // REMOVE ALL DUPLICATED BTNS
            fltrArray.forEach(btn=>{

              // if the 1st index of the btn isnt its last index
              if (fltrArray.indexOf(btn)!==fltrArray.lastIndexOf(btn)){
                fltrBtns[fltrArray.lastIndexOf(btn)].remove()
              }
            })

            fltrArray.forEach(btn=>{
              cards.forEach(card=>{
                // BTNS ARRAY OF EACH CARD
                let btnArray = card.lastElementChild.innerText.split('\n');

                // CHECK EACH CARD IF IT CONTAINS EACH OF THE CLICKED BTN
                return btnArray.includes(btn.trimEnd())?
                  card.style.display = '': card.style.display = 'none';
              
              })
            })

            cancelBtn();
            
            // REMOVES THE FILTER BTN IF CANCEL ON IT IS CLICKED
            function cancelBtn(){
              fltrBtns.forEach(btn=>{
                btn.addEventListener('click', (e)=>{
  
                  let btnIndex = fltrArray.indexOf(btn.innerText);
                  if(e.target === btn.firstElementChild.firstElementChild){
                    fltrArray.splice(btnIndex);
                    e.target.parentNode.parentNode.remove();
                  }
                })
              })
            }
          }
      })
    })
  }


  refilterCards(){
    let filterContainer = document.querySelector('.filter-container');
    let selectedBtnContainer = document.querySelector('.selected-btn');
    let selectedBtns = document.querySelectorAll('.selected-btn button');
    let cards = document.querySelectorAll('.job');

    selectedBtnContainer.addEventListener('click', (e)=>{
      selectedBtns = selectedBtnContainer.childNodes;
      let selectBtnArray = [];

      selectedBtns.forEach(btn=>{
        // IF ITS A BUTTON
        if(btn.nodeType == 1){

          // ADD BTN TO AN ARRAY
          selectBtnArray.push(btn.innerText.trimEnd());

          // SHOW ALL CARDS
          cards.forEach(card=>{
            card.style.display = '';
          })
          
          // EACH BTN IN ARRAY 
          selectBtnArray.forEach(btn=>{

            cards.forEach(card=>{

              // CREATE ARRAY OF CARD'S BTNS
              let btnArray = card.lastElementChild.innerText.split('\n');
  
              // CHECK EACH CARD IF IT CONTAINS EACH OF THE FILTER BTN
              return btnArray.includes(btn.trimEnd())?
                card.style.display = '': card.style.display = 'none';
  
            })
          })
        }

      })

      // REMOVE FILTER CONTAINER IF EMPTY & DISPLAY ALL CARDS
      if(selectBtnArray.length=== 0){
        filterContainer.style.display = 'none';
        cards.forEach(card=>{
          card.style.display = '';
        })
      }
    })

    // EVENT LISTENER FOR CLEAR ALL
    filterContainer.addEventListener('click', (e)=>{
      if(e.target === document.querySelector('.clear')){
        selectedBtnContainer.childNodes.forEach(btn=>{
          if(btn.nodeType ===1){
            btn.remove();
            cards.forEach(card=>card.style.display = '');
            filterContainer.style.display = 'none';
          }
        })
      }
    })
  }
}