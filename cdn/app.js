 
// var current_user;

// function sendusername(event){
//   event.preventDefault();
//   console.log(event.target.username.value)
//   var current_user = event.target.username.value;
//   fetchnow(current_user)
//   return current_user;
// }


var x = document.getElementById("show").innerText;
    
var abc = `https://www.instagram.com/${x}/?__a=1`;


// document.getElementById("show").innerText = "";


 
 function fetchnow(abc){

  fetch( `https://www.instagram.com/${abc}/?__a=1` )
  .then( (res) => res.json() )
  .then( (data) => {
   
  //   console.log(data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url)
    
  for(i=0; i<10; i++) {

    photo = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;


  //   console.log(data.graphql.user.edge_owner_to_timeline_media)
  //   console.log(data.graphql)

  var node = document.createElement("img");
  node.setAttribute('src', `${photo}`);
  node.setAttribute('class', 'insta')
  document.getElementById("show").appendChild(node);
 
  //   document.getElementById('show').innerHTML = `<img src=${photo} alt="" height="500px" width="500px">`

    console.log(photo)

  }

  

  } )

  setTimeout(() => {
    document.getElementById('code').style.display = "block";
  }, 2000)
 

 }

 fetchnow()
        