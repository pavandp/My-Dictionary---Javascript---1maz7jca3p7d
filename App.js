async function inputWord(){
    let inputValue=document.getElementById("input").value;
    let result=document.getElementById("result");
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`; 
    const res=await fetch(url);
    const data=await res.json();
    const data_definition=data[0].meanings[0].definitions[0].definition;
    let existingData=localStorage.getItem("myHistory");
    let existingArray=JSON.parse(existingData) || [];
    const myArray={
        word:inputValue,
        meaning:data_definition
    }
    existingArray=existingArray.concat(myArray);
    localStorage.setItem("myHistory",JSON.stringify(existingArray));
    result.innerHTML=`
    <div class="result_layout">
    <h2>word: ${inputValue}</h2>
    <p>${data_definition}</P> 
    </div>
    `
}

function history(){
    for(let i=0; i<localStorage.length; i++){
        let key=localStorage.key(i);
        let value=localStorage.getItem(key);
        var res=JSON.parse(value);
    }
    let searched_history=document.getElementById("searched_history");
    console.log(res);
    searched_history.innerHTML=res.map((elem)=>{
           return(`
            <div class="result_layout">
            <h2>word: <span class="key_word">${elem.word}</span></h2>   
            <p>${elem.meaning}</P> 
            <button onclick="del(event)">Delete</button>
            </div>
            `)
    })
}

// history page script
function getDataFromLocalStorage() {
    const dataString = localStorage.getItem("myHistory");
    return JSON.parse(dataString) || [];
  }
  
   let data = getDataFromLocalStorage();
   console.log(data);
  
   const itemsPerPage = 3;
   let currentPage = 1;
   
   function renderPage(page) {
     const dataContainer = document.getElementById("data-container");
     dataContainer.innerHTML = "";
   
     const startIndex = (page - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
  
     const pageData = data.slice(startIndex, endIndex);
     dataContainer.innerHTML=pageData.map(elem => {
   return(`
              <div class="result_layout">
              <h2>word: <span class="key_word">${elem.word}</span></h2>   
              <p>${elem.meaning}</P> 
              <img onclick="del(event)" class="del_img" src="t_delete.png" />
              </div>
              `)
  });
  
  }
   
   function renderPaginationControls() {
     const pagination = document.getElementById("pagination");
     pagination.innerHTML = "";
   
     const totalPages = Math.ceil(data.length / itemsPerPage);
   
     for (let page = 1; page <= totalPages; page++) {
       const pageButton = document.createElement("button");
       pageButton.textContent = page;
       pageButton.addEventListener("click", () => {
         currentPage = page;
         renderPage(currentPage);
         renderPaginationControls();
       });
   
       pagination.appendChild(pageButton);
     }
   }
  
   function del(event){
      const parent=event.target.parentNode;
      console.log(parent);
      console.log(parent.childNodes[1].childNodes[1].innerText);
      let key_word=parent.childNodes[1].childNodes[1].innerText;
      const getItem=localStorage.getItem("myHistory");
      let dataArray=JSON.parse(getItem);
      dataArray=dataArray.filter(elem => elem.word !== key_word);
      localStorage.setItem("myHistory",JSON.stringify(dataArray));
      data=dataArray;
      renderPage(currentPage);
      renderPaginationControls();
  }
   
   renderPage(currentPage);
   renderPaginationControls();
  
   function handleSearch() {
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value;
    const filteredData = filterData(data, query);
    currentPage = 1;
    renderPage(currentPage, filteredData);
    renderPaginationControls(filteredData);
  }
  
   const searchInput = document.getElementById("search-input");
   searchInput.addEventListener("input", handleSearch);
   