 let swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 50,
  slidesPerGroup: 5,
  loop: false,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // breakpoints: {
  //   0: {
  //     slidesPerView: 1,
  //   },
  //   520: {
  //     slidesPerView: 2,
  //   },
  //   1100: {
  //     slidesPerView: 3,
  //   },
  //   1300: {
  //     slidesPerView: 4,
  //   },
  //   1625: {
  //     slidesPerView: 5,
  //   },
  // },
});
 let bell = document.getElementById("bell");
 let box = document.querySelector(".notifi-box");
 let dot = document.querySelector(".notifi-dot");
 let down = false;

 let isNewNotification = $('input[name="isNewNotification"]').val();
 console.log(isNewNotification);
 if(isNewNotification !== 'true'){
   dot.style.display = "none";
 }

 bell.addEventListener("click", function () {
   if (down) {
     box.style.display = "none";
     down = false;
     // Change back to the original source when the box hides
     bell.src = "/img/bell.png";
   } else {
     box.style.display = "block";
     down = true;
     // Change the source when the box shows
     bell.src = "/img/bell-green.png";
     dot.style.display = "none";
   }

   // set isNewNotification to false
   $.ajax({
     type: "POST",
     url: "https://beyondcurrency-deployment-production.up.railway.app/setNotificationNotNew",
     data: {
       loginUserId: $('input[name="loginUserId"]').val()
     },
     success: function () {

     },
     error: function (xhr, status, error) {  // Callback function for error handling
       console.error("Error:", error);
     }
   })
 });

 $('.close-notification').click(function () {
   let button = $(this);
   let notificationId = button.closest('li').find('input[name="notification_id"]').val();

   $.ajax({
     type: "POST",
     url: "https://beyondcurrency-deployment-production.up.railway.app/notificationNotShow",
     data: {
       notificationId: notificationId,
     },
     success: function () {
       button.closest('li').fadeOut("fast");
     },
     error: function (xhr, status, error) {  // Callback function for error handling
       console.error("Error:", error);
     }
   })
 })

 // Check if there are no notifications
 if ($('.notifi-item').length === 0) {
   let noNotificationsMessage = '<li class="notifi-item"><p>You have no notifications</p></li>';
   $(box).append(noNotificationsMessage);
 }

 // Close notification box when clicking outside of it
 document.addEventListener("click", function (event) {
   if (!box.contains(event.target) && event.target !== bell) {
     box.style.display = "none";
     down = false;
     // Change back to the original source when the box hides
     bell.src = "/img/bell.png";
   }
 });

//toggle like image
 $(document).ready(function() {
   $(".people__card__saved-icon").on("click", function(e) {
     let $closestLi = $(this).closest("li");
     let userId = $closestLi.find('input[name="userId"]').val();
     let savedTalentId = $closestLi.find('input[name="talentId"]').val();
     if ($(this).attr("src").includes("/img/heart.png")) {
       $.ajax({
         type: "POST",
         url: "https://beyondcurrency-deployment-production.up.railway.app/addSavedTalent",
         data: {
           userId: userId,
           savedTalentId: savedTalentId,
         },
         success: function() {
           $(e.target).attr("src", "/img/heart-filled.png");
         },
         error: function(xhr, status, error) {
           console.error("Error:", error);
         },
       });
     } else {
       $.ajax({
         type: "POST",
         url: "https://beyondcurrency-deployment-production.up.railway.app/deleteSavedTalent",
         data: {
           userId: userId,
           savedTalentId: savedTalentId,
         },
         success: function() {
           $(e.target).attr("src", "/img/heart.png");
         },
         error: function(xhr, status, error) {
           console.error("Error:", error);
         },
       });
     }
   });

 });
