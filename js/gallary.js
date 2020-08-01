    
    AOS.init();
    
    filterSelection("all");
    function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("item");
    var desc = document.getElementById('desc');
    if (c == "all") { 
        
        console.log('all');
        desc.style.display= "none";
        desc.style.flexDirection = "column";
        desc.style.justifyContent = "center";
        c="";
    }
    else {
        desc.style.display= "flex";
    }

    for (i = 0; i < x.length; i++) {
    
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
    }

    function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    //document.write(arr1);
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
    }

    function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
    
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
    }

    var btnContainer = document.getElementById("filter-nav");
var btns = btnContainer.getElementsByTagName("a");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName(" h");
    current[0].className = current[0].className.replace(" h", " ");
    this.className += " h";
});
}