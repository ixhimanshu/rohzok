 



var client_username = document.getElementById("show").innerText;
    
var client_abc = `https://www.instagram.com/${client_username}/?__a=1`;

console.log(client_abc);




 


  fetch( `https://www.instagram.com/${client_abc}/?__a=1` )
  .then( (res) => res.json() )
  .then( (data) => {
   
 
    
  for(i=0; i<10; i++) {

    photo = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;


  var node = document.createElement("img");
  node.setAttribute('src', `${photo}`);
  node.setAttribute('class', 'insta')
  document.getElementById("show").appendChild(node);
 
  //   document.getElementById('show').innerHTML = `<img src=${photo} alt="" height="500px" width="500px">`

    console.log(photo)

  }

  

  } )

//   setTimeout(() => {
//     document.getElementById('code').style.display = "block";
//   }, 2000)
 


        
