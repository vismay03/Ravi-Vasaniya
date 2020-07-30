    filterSelection("all");
    function filterSelection(c) {
    var x, i, desc;
    x = document.getElementsByClassName("item");
    desc = document.getElementsByClassName("desc");
    
    if (c == "all") { 
        // for(i=0; i<desc.length ; i++){
        //     desc[i].style.display = "none";
        // }
        console.log('all');
        
        c="";
    }
    // else {
    //     for(i=0; i<desc.length ; i++){
    //         desc[i].style.display = "block";
    //     }
    
    // }
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
    //document.write(arr1+ "<br>");
    arr2 = name.split(" ");
    //document.write(arr2);
    for (i = 0; i < arr2.length; i++) {
        //document.write(arr2[i]);
        while (arr1.indexOf(arr2[i]) > -1) {
       // document.write( arr1.indexOf(arr2[i]) );
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
    }
