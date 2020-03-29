let slideIndex = 0;
let slideStyles = ["slide-1","slide-2"];
let curCoor = 0;
function roundIter(i,size){
    let res = i;
    if (i > size - 1) res = i - size;
    if (i < 0) res = i + size;
    return res;
}
//change of link activity by scroll

document.addEventListener('scroll', onScroll);
//document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const curPosEnd = curPos + window.innerHeight;
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-item');
   
    sections.forEach( el => {
        elTop = el.offsetTop;
        elEnd = el.offsetTop + el.offsetHeight;
        let findSect = false;
        if (elTop + 100 > curPos && elEnd - 100 < curPosEnd)findSect = true; 
        if (elTop<curPos && elEnd > curPos) findSect = true;
        if (findSect){
           // console.log(el.firstElementChild.getAttribute('name'));
           
            links.forEach( a => {
            //console.log(a.firstElementChild);
            a.classList.remove('nav-item-active');
            if(el.firstElementChild.getAttribute('name') === a.firstElementChild.getAttribute('href').substring(1)) {
                a.classList.add('nav-item-active');
            }
        })
    }
        
    });
    
} 

//opening burger menu
document.querySelector('.hamburger').addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('hamburger__active');
    document.querySelector('nav').classList.toggle('nav__active');
    document.querySelector('.logo').classList.toggle('logo__burger-active');
    document.body.classList.toggle('blocked');
});

//close burger menu
document.addEventListener('click', (e) => {
    let isBurgerActive = document.querySelector('.hamburger').classList.contains('hamburger__active');
    if(isBurgerActive && e.target.tagName === 'A' || e.target.tagName === 'NAV') {
      document.querySelector('.hamburger').classList.toggle('hamburger__active');
      document.querySelector('nav').classList.toggle('nav__active');
      document.querySelector('.logo').classList.toggle('logo__burger-active');
      document.body.classList.remove('blocked');
    }
}, true); 

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
    if (this.classList.contains("portfolio__image-active")) this.classList.toggle("portfolio__image-active");
    else{
        let projects = document.querySelectorAll(".portfolio__image");
   
        for(let project of projects){
            project.classList.remove("portfolio__image-active");
        }
        
        this.classList.add("portfolio__image-active");
    }
}


function srcChange(){
    let _src = this.src;
    if (_src.includes("_Black.png")) _src = _src.replace("_Black.png",".png");
    else _src = _src.replace(".png","_Black.png");
    this.src = _src;
}
// функция анимации перехода слайдов
function animateCarusel(slideOld,slideNew,direction){
    // direction true on left button
    document.querySelector(".slide-container").classList.add("slide-container-anime");
    if (direction){
        slideOld.classList.add("to-right");
        slideOld.addEventListener('animationend', function() {
            this.classList.remove('slide-active', "to-right");
        });
   
        slideNew.classList.add("slide-next", "from-left");
        slideNew.addEventListener('animationend', function() {
            this.classList.remove('slide-next', "from-left");
            this.classList.add('slide-active');
            document.querySelector(".slide-container").classList.remove("slide-container-anime");
        });
        
    }else{
        
        slideOld.classList.add("to-left");
        slideOld.addEventListener('animationend', function() {
            this.classList.remove('slide-active', "to-left");
        });
        slideNew.classList.add("slide-next", "from-right");
        slideNew.addEventListener('animationend', function() {
            this.classList.remove('slide-next', "from-right");
            this.classList.add('slide-active');
            document.querySelector(".slide-container").classList.remove("slide-container-anime");
           
        });

    }
}
// функция кнопок слайдера

function clickSliderArrow(){
    // direction true on left button
    let direction = (this.classList.contains("left"))?true:false;
    let slides = document.querySelectorAll(".slide");
    let currentSlide = slideIndex;
    let slidesCount = slides.length; 
    let nextSlide = (direction)?(currentSlide - 1):(currentSlide + 1);
   
    nextSlide = roundIter(nextSlide, slidesCount);
    
    animateCarusel(slides[currentSlide],slides[nextSlide],direction);
   
    slideBgColor(slides[nextSlide]);
   
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
    slide.classList.remove("slide-active");
} 
slides[slideIndex].classList.add("slide-active");
slideBgColor(slides[slideIndex]);

// init portfolio sort

let sortItems = document.querySelectorAll(".portfolio-sort > li");
for (let item of sortItems){
    item.addEventListener("click",clickSortBar);
}

// init portfolio projects
let projects = document.querySelectorAll(".portfolio__image");
for(let project of projects){
    project.addEventListener("click",clickPortfolioProject);
}



// init form button submit
let button_submit = document.querySelector(".contact-form_button");
button_submit.addEventListener("click",clickSubmit);

// init modal form
let button_closeForm = document.querySelector(".modal-form_close");
button_closeForm.addEventListener("click",clickCloseForm);