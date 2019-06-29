var client_data = document.querySelectorAll("#code")[0].dataset;

var exp_data = document.querySelectorAll("#code")[0].dataset;

current_user = client_data.currentuser;
rows = client_data.rows;
posts = client_data.posts;
gap = client_data.gap;


console.log(client_abc);


console.log(exp_data)
console.log(gap)


 
 function fetchnow(current_user, rows, posts, gap){

  fetch( `https://www.instagram.com/${current_user}/?__a=1` )
  .then( (res) => res.json() )
  .then( (data) => {

    if(posts){
      posts
    }else{
     posts = data.graphql.user.edge_owner_to_timeline_media.edges.length;
    }
 
    
    for(i=0; i<posts; i++) {

      photo = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
    
      var node = document.createElement("img");
      var rozhok_wrapper = document.createElement("div")
      rozhok_wrapper.setAttribute('id', 'rozhok_wrapper')
      rozhok_wrapper.setAttribute('style', `display: grid; grid-template-columns:repeat(${rows}, 1fr); grid-gap: ${gap}`)
      node.setAttribute('src', `${photo}`);
      node.setAttribute('class', 'insta');
      node.setAttribute('style', `display: grid; grid-template-columns:repeat(${rows}, 1fr)`)
    
      if(i==0){
        document.getElementById("code").appendChild(rozhok_wrapper);
      }
      document.getElementById("rozhok_wrapper").appendChild(node);
    
     
    
      }
    

  

  } )

 }

 fetchnow(current_user, rows, posts, gap)



//  Client side HTML code

/* <div id="code" data-currentuser="nokia" data-rows="4" data-posts="12" data-gap="1rem"> */
        
