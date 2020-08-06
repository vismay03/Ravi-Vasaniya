
// var name =  document.getElementById('name').value;
// if (name == "") {
//     document.querySelector('.status').innerHTML = "Name cannot be empty";
//     return false;
// }
// var email =  document.getElementById('email').value;
// if (email == "") {
//     document.querySelector('.status').innerHTML = "Email cannot be empty";
//     return false;
// } else {
// var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// if(!re.test(email)){
//         document.querySelector('.status').innerHTML = "Email format invalid";
//         return false;
// }
// }
// var subject =  document.getElementById('subject').value;
// if (subject == "") {
//     document.querySelector('.status').innerHTML = "Subject cannot be empty";
//     return false;
// }
// var message =  document.getElementById('message').value;
// if (message == "") {
//     document.querySelector('.status').innerHTML = "Message cannot be empty";
//     return false;
// }
// document.querySelector('.status').innerHTML = "Sending...";

AOS.init();


(function() {
  


  function validEmail(email) {
  
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  
  }

  function validMobile(mobile) {
    var re = /\d{10}$/;
    return re.test(mobile);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

  
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    console.log(event);
    var form = event.target;
    var data = getFormData(form);         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */
  var emptyName = form.querySelector(".name-empty");
  if(data.name == ""){
    
    if(emptyName) {
      emptyName.style.display = "block";
      console.log("Hello");
      return false;
    }
    
  }
  else
    emptyName.style.display = "none";

  var emptyMobile = form.querySelector(".mobile-empty");
  if(data.mobile == ""){
  
    if(emptyMobile) {
      emptyMobile.style.display = "block";
      return false;
    }
  }
  else
  emptyMobile.style.display = "none";
  
  var invalidMobile = form.querySelector(".mobile-invalid");
    if(  data.mobile && !validMobile(data.mobile) ) {   // if email is not valid show error
    
    
      if (invalidMobile) {
        invalidMobile.style.display = "block";
        return false;
      }
    } 
    else {
      invalidMobile.style.display = "none";
    }
  var emptyEmail = form.querySelector(".email-empty");
  if(data.email == ""){
  
    if(emptyEmail) {
      emptyEmail.style.display = "block";
      console.log("Hello");
      return false;
    }
  }
  else
  emptyEmail.style.display = "none";
  var invalidEmail = form.querySelector(".email-invalid");
    if(  data.email && !validEmail(data.email) ) {   // if email is not valid show error
    
    
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } 
    else {
      invalidEmail.style.display = "none";
    }
  var emptyMessage = form.querySelector(".message-empty");
  if(data.message == ""){
    if(emptyMessage) {
      emptyMessage.style.display = "block";
      return false;
    }
  }
  else
  emptyMessage.style.display = "none";
  var invalidEmail = form.querySelector(".email-invalid");
    if(  data.email && !validEmail(data.email) ) {   // if email is not valid show error
    
    
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } 
    else {
      invalidEmail.style.display = "none";
    }
    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        console.log(xhr.status, xhr.statusText);
        console.log(xhr.responseText);
        var formElements = form.querySelector(".form-elements");
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }
  
  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    
    console.log(forms);
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }

  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();
