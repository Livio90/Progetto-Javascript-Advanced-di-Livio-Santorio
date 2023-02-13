import '../styles/styles-loader.scss'
import favi from '/assets/js/favicon.png'
import axios from 'axios'
function search(){
  axios.get('https://openlibrary.org/search.json?q='+searchbar.value)
  .then(response=>{
     
     
   for(let i=0;i<response.data.numFound;i++){
      
      try{ document.getElementById("r"+i).replaceWith("");
   }
   catch{
      
   }
      let newDiv= document.createElement("h4");
      let newDiv2= document.createElement("h6");
      let newButton=document.createElement("button");
      let btnText=document.createTextNode("Book Description")
        newDiv.innerHTML= response.data.docs[i].title;
        newDiv2.innerHTML=response.data.docs[i].author_name;
        newDiv.id="r"+i;
        newDiv2.id= "s"+i;
        newButton.id="b"+i;
        newDiv2.className="col-sm-3";
        newDiv.className="col-sm-3";
        newButton.className="btn btn-info";
        document.getElementById("row").appendChild(newDiv);
        document.getElementById("r"+i).appendChild(newDiv2);
        newButton.appendChild(btnText);
        document.getElementById("s"+i).appendChild(newButton);
        newButton.addEventListener("click", () => {
          axios.get("https://openlibrary.org"+response.data.docs[i].key+".json")
            .then(response => {
              console.log(response.data);
             let w= window.open("","", "width=400, height=400");
              let title1=document.createElement("h4");
              title1.innerHTML= response.data.title;
              w.document.body.appendChild(title1);
// w.document.write("<html><head><style>h4 { color: red; }</style></head><body><h4>Il tuo testo a scelta</h4></body></html>");
if (response.data.description !== undefined) {
  let descriptionEl = document.createElement("p");
  descriptionEl.innerHTML = response.data.description;
  w.document.body.appendChild(descriptionEl);
} else {
  let errorEl = document.createElement("p");
  errorEl.innerHTML = "This book doesn't have a description yet.";
  w.document.body.appendChild(errorEl);
}
              
            })
            .catch(error => console.error(error));
        });
          };
  })
 
  
  .catch(error=> console.error(error));
  
};
let bottone= document.getElementById("bottone");
let searchbar= document.getElementById("search");
bottone.addEventListener("click",search)
document.addEventListener("keypress",function(event){    
    if(event.key === "Enter"){
       search();
    }
})