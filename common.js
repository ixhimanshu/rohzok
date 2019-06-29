function sendusername(event){
  event.preventDefault();
  var current_user = event.target.username.value;
  var rows = event.target.rows.value;
  var posts = event.target.posts.value;
  var gap = event.target.gap.value;
  fetchnow(current_user, rows, posts, gap)
}

counter = 0;


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
    document.getElementById("show").appendChild(rozhok_wrapper);
  }
  document.getElementById("rozhok_wrapper").appendChild(node);

 

  }

  counter++

  return counter;

  } )



  setTimeout(() => {
    code_generator(current_user, rows, posts, gap)
  }, 2000)


 
  console.log(counter)

  if( counter != 0  ){
    clear();
  }

 }

 function clear(){
  document.getElementById("show").innerHTML = '';
 }

 code_counter = 0;

 function code_generator(current_user, rows, posts, gap){

  console.log(code_counter)
  if(code_counter != 0){
    clear_code()
  }

  var code_node = document.createElement("xmp");
  var code = document.createElement("div")
  code_node.setAttribute('id', 'xmp')
  code.setAttribute('id', 'code')
  code.setAttribute('data-currentuser', current_user);
  code.setAttribute('data-rows', rows);
  code.setAttribute('data-posts', posts);
  code.setAttribute('data-gap', gap);


  document.getElementById("code_wrapper").appendChild(code);

  displaycode(code_counter);

  code_counter++

 }

 function displaycode(){
 var replace = document.getElementById("code_wrapper").innerHTML;
 var newcontent = replace.replace('<', '&lt;');
 document.getElementById("code_wrapper").innerHTML = newcontent;
 }

function clear_code(){
  document.getElementById("code_wrapper").innerHTML = '';
}
        