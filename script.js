let slideIndex = 0;
let slideStyles = ["slide-1","slide-2"];

function roundIter(i,size){
    let res = i;
    if (i > size - 1) res = i - size;
    if (i < 0) res = i + size;
    return res;
}

function clickNavBar(){
  
    let navBarItems = document.querySelectorAll(".nav-item");
   
    for(let item of navBarItems){
         item.classList.remove("nav-item-active");
    }

    let _li = this.closest(".nav-item");
    _li.classList.add("nav-item-active");
}
function shiftItems(arr,_shift){
    _newArr = [];
    for (let i = 0; i < arr.length - 1; i++){
        let _i = roundIter(i - _shift,arr.length);
        _newArr.push(arr[_i]);    
    }
    return _newArr;
    
}

function clickSortBar(){
    
    let sortItems = document.querySelectorAll(".sort-item");
   
    for(let button of sortItems){
        button.classList.remove("sort-active");
    }
    
    this.classList.add("sort-active");

    let _container = document.querySelector(".portfolio__wrapper");
   
    let arr = [];
    arr = Array.from(_container.children);
   
    arr = shiftItems(arr,2);
    
    for (let child of arr){
        _container.appendChild(child);
    }

}




function clickPortfolioProject(){
    
    let projects = document.querySelectorAll(".portfolio__project");
   
    for(let project of projects){
        project.classList.remove("portfolio__project-active");
    }
    
    this.classList.add("portfolio__project-active");
    
}


function srcChange(){
    let _src = this.src;
    if (_src.includes("_Black.png")) _src = _src.replace("_Black.png",".png");
    else _src = _src.replace(".png","_Black.png");
    this.src = _src;
}


function clickSliderArrow(){
    let direction = (this.classList.contains("left"))?true:false;
    let slides = document.querySelectorAll(".slide");
    let currentSlide = slideIndex;
    let slidesCount = slides.length; 
    let nextSlide = (direction)?(currentSlide - 1):(currentSlide + 1);
   
    nextSlide = roundIter(nextSlide, slidesCount);
    
    slides[currentSlide].style.display = "none";

    slideBgColor(slides[nextSlide]);
    slides[nextSlide].style.display = "flex";
    slideIndex = nextSlide;
}
function slideBgColor(elem){
    let slider = elem.closest(".slider-wrapper"); 
    for (let _style of slideStyles){
        slider.classList.remove(_style);    
    }
    let _style = "";
    for (_style of slideStyles){
        if (elem.classList.contains(_style))break;
    }
    slider.classList.add(_style);
}

function clickSubmit(){

	let _subject = document.querySelector('.contact-form_subject').value.toString();
	let _describe = document.querySelector('.contact-form_description').value.toString();
	

	if(_subject.length==0){
		document.querySelector('.modal-form_subject').innerText = 'Без темы';
	}
	else{
		document.querySelector('.modal-form_subject').innerText = `Тема:  ${_subject}`;
	}
	if(_describe.length==0){
		document.querySelector('.modal-form_describe').innerText = 'Без описания';
	}
	else{
		document.querySelector('.modal-form_describe').innerText = `Описание:  ${_describe}`;
	}
	if (document.querySelector('.contact-form_name').checkValidity() && document.querySelector('.contact-form_mail').checkValidity()){
	document.querySelector('.modal-form').classList.remove("modal-form_closed");
	}
}

function clickCloseForm(){
	document.querySelector('.modal-form_subject').innerText = '';
	document.querySelector('.modal-form_describe').innerText = '';
	document.querySelector('.modal-form').classList.add('modal-form_closed');
}	

// *************************** init's ******************************

// init nav-bar links

let navBarItems = document.querySelectorAll("a.nav-link");

for (let item of navBarItems){
    item.addEventListener("click",clickNavBar);
}



// init slide arrows links

let sliderArrows = document.querySelectorAll(".slider-arrow");
for (let arrow of sliderArrows){
    arrow.addEventListener("click",clickSliderArrow);
}
// init Iphones
let iphones = document.querySelectorAll(".iphone");
for (let item of iphones){
    item.addEventListener("click",srcChange);
}

// init slides

let slides = document.querySelectorAll(".slide");

for (let slide of slides){
    slide.style.display = "none";
} 
slides[slideIndex].style.display = "flex";
slideBgColor(slides[slideIndex]);

// init portfolio sort

let sortItems = document.querySelectorAll(".portfolio-sort > li");
for (let item of sortItems){
    item.addEventListener("click",clickSortBar);
}

// init portfolio projects
let projects = document.querySelectorAll(".portfolio__project");
for(let project of projects){
    project.addEventListener("click",clickPortfolioProject);
}



// init form button submit
let button_submit = document.querySelector(".contact-form_button");
button_submit.addEventListener("click",clickSubmit);

// init modal form
let button_closeForm = document.querySelector(".modal-form_close");
button_closeForm.addEventListener("click",clickCloseForm);