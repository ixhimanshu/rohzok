function sendusername(event){
  event.preventDefault();
  var current_user = event.target.username.value;
  var rows = event.target.rows.value;
  var posts = event.target.posts.value;
  var gap = event.target.gap.value;
  var search_by =  event.target.search_by.value;
  var redirect_to = event.target.redirect_to.value;
  var widget_width = event.target.widget_width.value;

 

  console.log(widget_width)

  calc_img_size(rows,gap,widget_width)

    if(search_by == "o_username"){
      var fetch_url = `https://www.instagram.com/${current_user}/?__a=1&max_id=QVFCSHRNZmlOeHBlb0FqNnVtTjYxNXYwN3doUHVUUldCLU5sU0hMdGcxSldYUGdlVnBnaUtnbW83RmgxMnl5RFBMdTBuOGYyb3NwN1k4clJ3XzZtNlF3Ng==`;
      fetchnow( fetch_url, current_user, rows, posts, gap, widget_width, calc_img_size(rows,gap,widget_width), redirect_to );
    }
    if(search_by == "hash_tag"){
      var fetch_url = `https://www.instagram.com/explore/tags/${current_user}/?__a=1`;
      fetchhash( fetch_url, current_user, rows, posts, gap);
    }



 
}





// Calc image size

function calc_img_size(rows,gap,widget_width){
  var new_widget_width = widget_width.replace('px', '');
  var new_gap = gap.replace('px', '');
  var img_width = (new_widget_width/rows) - new_gap;
  return img_width;
}

// Calc icons size

function calc_icons_size(img_width){
var icon_size = img_width/8;
calc_icons_size(img_width)
return icon_size;
}




// fetch data via username

counter = 0;


function fetchnow(fetch_url, current_user="nokia", rows, posts, gap, widget_width, img_width, redirect_to){

  fetch( fetch_url )
  .then( (res) => res.json() )
  .then( (data) => {

   console.log(data)

    if(posts){
      posts
    }else{
     posts = data.graphql.user.edge_owner_to_timeline_media.edges.length;
    }

  for(i=0; i<posts; i++) {
    

    // icon size
    icon_size = img_width/6;
    // photo source
    photo = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
    // likes
    liked_by = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_liked_by.count;
    // comments
    comment_by = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_comment.count;
    // post redirect url
    post_shortcode = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.shortcode;
    post_init_url = "https://www.instagram.com/p/";
    post_redirect_url = post_init_url + post_shortcode;
    profile_redirect_url = `https://www.instagram.com/${current_user}`;

    console.log(liked_by)


    // widget wrapper
    var rozhok_wrapper = document.createElement("div")
    rozhok_wrapper.setAttribute('id', 'rozhok_wrapper')
    rozhok_wrapper.setAttribute('style', `display: grid; grid-template-columns:repeat(${rows}, 1fr); grid-gap: ${gap}; width: ${widget_width}`)
    if(i==0){
      document.getElementById("show").appendChild(rozhok_wrapper);
    }
    

    // Anchor tag parent
    var node = document.createElement("a");
    node.setAttribute('class', 'post_wrap');
    if(redirect_to == "redirect_post"){
      node.setAttribute('href', `${post_redirect_url}`);
    }else{
      node.setAttribute('href', `${profile_redirect_url}`);
    }
    
    node.setAttribute('target', '_blank');

    //Image division 
    var img_wrapper = document.createElement("div")
    img_wrapper.setAttribute('id', 'insta');
    img_wrapper.setAttribute('src', `${photo}`);
    img_wrapper.setAttribute('class', 'img_wrapper')
    img_wrapper.setAttribute('style', `height: ${img_width}px; width: ${img_width}px; background: url(${photo}); background-size: cover;`)
    

    // hover division
    var hover_div = document.createElement("div")
    hover_div.setAttribute('class', 'hover');
    hover_div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve" width=${icon_size}px height=${icon_size}px class=""><g><g>
    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905   c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478   c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014   C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25   c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826   c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514   c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
    </g></g> </svg>
     <p> ${liked_by} </p> 
     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width=${icon_size}px height=${icon_size}px class=""><g><path d="M55.232,43.104C58.354,38.745,60,33.705,60,28.5c0-14.888-13.458-27-30-27S0,13.612,0,28.5s13.458,27,30,27  c4.262,0,8.378-0.79,12.244-2.348c6.805,3.927,16.212,5.282,16.618,5.338c0.046,0.007,0.093,0.01,0.139,0.01  c0.375,0,0.725-0.211,0.895-0.554c0.192-0.385,0.116-0.849-0.188-1.153C57.407,54.493,55.823,49.64,55.232,43.104z M42.84,51.182  L42.84,51.182c-2.11-1.302-4.467-2.814-5.017-3.249c-0.296-0.432-0.88-0.563-1.337-0.29c-0.299,0.179-0.489,0.512-0.492,0.861  c-0.003,0.589,0.006,0.77,4.081,3.316C36.865,52.93,33.487,53.5,30,53.5c-15.439,0-28-11.215-28-25s12.561-25,28-25s28,11.215,28,25  c0,4.897-1.591,9.643-4.601,13.724c-0.144,0.195-0.212,0.436-0.191,0.677c0.35,4.174,1.238,9.49,3.44,13.16  C53.314,55.383,47.305,53.878,42.84,51.182z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>
    <p> ${comment_by} </p> 
    
    
    
    `;
 
      document.getElementById("rozhok_wrapper").appendChild(node);
      
      var all_query = document.querySelectorAll(".post_wrap");
  
      for(k=0; k<all_query.length; k++){
        all_query[k].appendChild(img_wrapper);
        all_query[k].appendChild(hover_div);
      }

  }




  counter++

  return counter;

  } )



  setTimeout(() => {
    code_generator(current_user, rows, posts, gap)
  }, 2000)



  if( counter != 0  ){
    clear();
  }

 }



//  fetch data by hash tag

function fetchhash(fetch_url, current_user, rows, posts, gap){

  fetch( fetch_url )
  .then( (res) => res.json() )
  .then( (data) => {

    if(posts){
      posts
    }else{
     posts = data.graphql.hashtag.edge_hashtag_to_media.edges.length;
    }

  // posts = data.graphql.hashtag.edge_hashtag_to_media.edges.length;
   

  for(i=0; i<posts; i++) {

  photo = data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.display_url;

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




  if( counter != 0  ){
    clear();
  }

 }


 // fetch data by location





// clear fetch data

 function clear(){
  document.getElementById("show").innerHTML = '';
 }




//  code generator

 code_counter = 0;

 function code_generator(current_user, rows, posts, gap){

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

//  display code

 function displaycode(){
 var replace = document.getElementById("code_wrapper").innerHTML;
 var newcontent = replace.replace('<', '&lt;' )
 document.getElementById("code_wrapper").innerHTML = newcontent;
 }

//  clear displayed code

function clear_code(){
  document.getElementById("code_wrapper").innerHTML = '';
}




// function my_encoder(replace){

//   String.prototype.allReplace = function(obj) {
//     var retStr = this;
//     for (var x in obj) {
//         retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
//     }
//     return retStr;
// };

// console.log('aabbaabbcc'.allReplace({'a': 'h', 'b': 'o'}));

  // var newcontent = replace.allReplace({'<' : '(', '>':')', ' ': '&', '"': '#',  });



  // document.getElementById("code_wrapper").innerHTML = newcontent;
// }
        


fetchnow(fetch_url='https://www.instagram.com/nokia/?__a=1', current_user="nokia", rows=3, posts=12, gap="5px", widget_width="465px", img_width="150", redirect_to="#")