function CreateElement(nameElement, idElement, innerText, parentId) {
    let element = document.createElement(nameElement);
    element.id = idElement;
    element.innerText = innerText;
    if (parentId == "body")
         document.body.appendChild(element);
    else
         document.getElementById(parentId).appendChild(element);
    return element;
}

function CreateElementInput(id) {
    CreateElement("input", "input-"+id, "", "rating__items-"+ filmId).classList.add("rating__item");
    document.getElementById("input-"+id).setAttribute('type', "radio");
    document.getElementById("input-"+id).setAttribute('value', id);
    document.getElementById("input-"+id).setAttribute('name', "rating");
}

var filmId = localStorage.getItem("FILM_ID");
var rating = 10;
let user_grade = 10;

console.log("filmId", filmId);
fetch (`/getFilmDetails/${filmId}`, {
    method: 'GET',
}) 
.then(res => res.text())
.then(res => {
//    console.log(res);

    let filmTable = JSON.parse(res)[0];
    rating = filmTable['rating'].toFixed(1)
    CreateElement("h1", "hFilm-" + filmId, filmTable['name'], "totalInfoFilm");    
    CreateElement("hr", "hr1Film-" + filmId, "", "totalInfoFilm"); 
    CreateElement("div", "trailerFilm-" + filmId, "", "totalInfoFilm").classList.add("embed-responsive", "embed-responsive-16by9");       
    CreateElement("iframe", "iframeFilm-" + filmId, "", "trailerFilm-" + filmId).classList.add("embed-responsive-item");
    document.getElementById("iframeFilm-" + filmId).setAttribute('src', "assets/trailers/"+filmTable['trailer']);
    document.getElementById("iframeFilm-" + filmId).setAttribute('frameborder', "0");
    document.getElementById("iframeFilm-" + filmId).setAttribute('allow', "autoplay; encrypted-media");
    document.getElementById("iframeFilm-" + filmId).setAttribute('allowfullscreen', "true");
    CreateElement("div", "infoFilm-" + filmId, "", "totalInfoFilm").classList.add("well", "info-block", "text-center");
    CreateElement("span", "ratingFilm-" + filmId, "Рейтинг: " + filmTable['rating'].toFixed(1), "infoFilm-"+ filmId).classList.add("badge"); 
    CreateElement("span", "genresFilm-" + filmId, "Жанри: "+filmTable['film_genres'], "infoFilm-"+ filmId).classList.add("badge");      
    CreateElement("span", "directorFilm-" + filmId, "Тривалість: " + filmTable['duration'] + " хв", "infoFilm-"+ filmId).classList.add("badge"); 
    CreateElement("div", "marginFilm-" + filmId, "", "totalInfoFilm").classList.add("margin-8r");
    CreateElement("h2", "h2Film-" + filmId, "Опис " + filmTable['name'], "totalInfoFilm"); 
    CreateElement("hr", "hr2Film-" + filmId, "", "totalInfoFilm"); 
    CreateElement("div", "descriptionFilm-" + filmId, filmTable['description'] , "totalInfoFilm").classList.add("well");

    CreateElement("div", "commentsFilm-" + filmId, "", "totalInfoFilm").classList.add("margin-8"); 
    CreateElement("h2", "h2commentsFilm-" + filmId, "Відгуки", "commentsFilm-"+ filmId); 
    CreateElement("hr", "hrcomments1Film-" + filmId, "", "commentsFilm-"+ filmId); 
    CreateElement("div", "panelCommentsFilm-" + filmId, "", "commentsFilm-"+ filmId).classList.add("panel", "panel-info");

    for (let i = 0; i < filmTable['film_reviews'].length; i++) {
        CreateElement("div", "nameUser-" + i, "", "panelCommentsFilm-"+ filmId).classList.add("panel-heading"); 
        CreateElement("i", "iReviewFilm-" + i, "", "nameUser-"+ i).classList.add("glyphicon", "glyphicon-user");
        CreateElement("span", "spanNameUser-" + i, " " + filmTable['film_reviews'][i]['first_name'] + ' ' + filmTable['film_reviews'][i]['last_name'] , "iReviewFilm-"+ i);
        CreateElement("div", "reviewText-" + i, filmTable['film_reviews'][i]['review_text'] , "panelCommentsFilm-"+ filmId).classList.add("panel-body","custom-mb-2"); 
    }
    return fetch (`/getFirstAndLastName`, {
        method: 'GET',
    });
})
.then(res2 => res2.text())
.then(res2 => {
    //console.log("res2::", res2);
    if(res2 != 0) {

    let user = JSON.parse(res2);
    CreateElement("form", "formReview-" + filmId, "", "panelCommentsFilm-"+ filmId).classList.add("custom-mt-3");
    CreateElement("h1", "newComment-" + filmId, "Залиште відгук!", "formReview-"+ filmId).classList.add("mt-2");
    CreateElement("div", "newFeedback-" + filmId, "", "formReview-"+ filmId).classList.add("feedback");
    CreateElement("div", "rating-" + filmId, "", "newFeedback-"+ filmId).classList.add("rating", "rating_set");
    CreateElement("div", "rating__body-" + filmId, "", "rating-"+ filmId).classList.add("rating__body");
    CreateElement("div", "rating__active-" + filmId, "", "rating__body-"+ filmId).classList.add("rating__active");
    CreateElement("div", "rating__items-" + filmId, "", "rating__body-"+ filmId).classList.add("rating__items");
    CreateElementInput(1);
    CreateElementInput(2);
    CreateElementInput(3);
    CreateElementInput(4);
    CreateElementInput(5);
    CreateElementInput(6);
    CreateElementInput(7);
    CreateElementInput(8);
    CreateElementInput(9);
    CreateElementInput(10);




    CreateElement("p", "rating__header-" + filmId, "Оцінка фільму: ", "rating-"+ filmId).classList.add("rating__header");
    CreateElement("p", "rating__value-" + filmId, rating, "rating-"+ filmId).classList.add("rating__value");
    user_grade = rating;
    CreateElement("div", "newUserNameReview-" + filmId, "", "formReview-"+ filmId).classList.add("form-group");
    CreateElement("input", "inputNameReview-" + filmId, "", "newUserNameReview-"+ filmId).classList.add("form-control", "input-lg");
    document.getElementById("inputNameReview-" + filmId).setAttribute('type', "text");

    
    document.getElementById("inputNameReview-" + filmId).setAttribute('placeholder', user['first_name'] + " " + user['last_name']);
    document.getElementById("inputNameReview-" + filmId).setAttribute('disabled', 'disabled');

    CreateElement("div", "newReviewArea-" + filmId, "", "formReview-"+ filmId).classList.add("form-group");
    CreateElement("textarea", "textareaReview-" + filmId, "", "newReviewArea-"+ filmId).classList.add("form-control");
    CreateElement("button", "buttonSendReview-" + filmId, "Відправити", "formReview-"+ filmId).classList.add("btm", "btn-lg","btn-warning", "pull-right");

    CreateElement("div", "marginCommentsFilm-" + filmId, "", "commentsFilm-" + filmId).classList.add("margin-8"); 



    document.getElementById("buttonSendReview-" + filmId).onclick = function () {
          var userData = {
              film_id: filmId,
              user_id: user['user_id'],
              grade: user_grade, 
              comment: document.getElementById("textareaReview-" + filmId).value
          };
          var xhr = new XMLHttpRequest(); 
          xhr.open('POST', '/postReviewToDB'); 
           

          xhr.setRequestHeader('Content-Type', 'application/json'); 
          xhr.send(JSON.stringify(userData)); 

          xhr.onload = function() {
            if (xhr.status === 200) {
                  alert(this.responseText); 
                  location.reload();
            }
            else if (xhr.status === 409) {
                alert('user not found!');
            }
            else if (xhr.status === 404) {
                alert('wrong password!');
            }
          }; 

          xhr.onerror = function() {
              alert('server error!'); 
          }

      }

}
}).then(res2 => {
if(res2 != 0) {

/*
<div class="feedback">
<div class="rating rating_set">
    <div class="rating__body">
        <div class="rating__active"></div>
        <div class="rating__items">
            <input type="radio" class="rating__item" value="1" name="rating">
            <input type="radio" class="rating__item" value="2" name="rating">
            <input type="radio" class="rating__item" value="3" name="rating">
            <input type="radio" class="rating__item" value="4" name="rating">
            <input type="radio" class="rating__item" value="5" name="rating">
        </div>
    </div>
    
    <p class="rating__header">Ваша оценка:</p>
    <div class="rating__value">1.5</div>
</div>
<button class="feedback_button" type="submit">Оценить фильм</button>
</div>
*/


// оценка фильма
const ratings = document.querySelectorAll(".rating");
if (ratings.length>0){
initRatings();
}

function initRatings(){
let ratingActive, ratingValue, ratingHeader;
let temp = 0;
for(let index = 0; index < ratings.length; index++){
    const rating = ratings[index];
    initRating(rating);
}

function initRating(rating){
    initRatingVars(rating);


    setRatingActiveWidth();

    if (rating.classList.contains('rating_set')){
        setRating(rating);
    }
}

function initRatingVars(rating){
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
    ratingHeader = rating.querySelector(".rating__header");
}

function setRatingActiveWidth(index=ratingValue.innerHTML){
    const ratingActiveWidth = index / 0.1;
    console.log("index", index);
    ratingActive.style.width = `${ratingActiveWidth}%`;
}

function setRating(rating){
    const ratingItems = rating.querySelectorAll(".rating__item");
    for (let index =0; index < ratingItems.length;index++){
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener("mouseover", function(e){
            if (temp != index+1) {
                temp = index+1;
                //initRatings(rating);
                setRatingActiveWidth(ratingItem.value);
            }
        });

        ratingItem.addEventListener("mouseleave", function(e){
            setRatingActiveWidth();
        })

        ratingItem.addEventListener("click", function(e){
            initRatingVars(rating);
            ratingHeader.innerHTML = "Ваша оцінка: ";
            ratingValue.innerHTML = index+1;
            user_grade = index+1;
            setRatingActiveWidth();
        })
    }

}
}
}
})