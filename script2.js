/*
A stir fry text has the following form. It has gPassages (integer)
texts. This one has 3 passages: one by McGann, one by Weizenbaum, and
one by Marx. Each passage is chopped into gLength pieces. gLength
is 25 in this stir fry. When the reader places the mouse over part
n of text t, the program replaces that small text with part n of
text t+1. 

Each of the gLength HTML elements with id's of j0 to j24, or jwhatever,
if gLength=whatever, holds HTML code. Not necessarily just text.
This means that a stir fry can also involve graphics or any
arbitrary HTML code, not just text. Marko Niemi made a stir fry,
for instance, that displays images, not texts. The stir fry is a
multi-media form. 

Let's look at how the gLength HTML elements j0 to j24 are coded. Below, 
we see an example.

<p id="j24" class="passage0" data-type="t" data-idnum="24">
  Jerome J. McGann<br><i data-type="c">Social Values and Poetic Acts</i><br>Harvard University Press, 1988.
</p>

This is a paragraph (p) element, but the elements can be span or
div or whatever. If an element starts out being a div, it will
remain a div; if it starts out being a p, it will remain a p, etc.

The id starts with j. And is followed by a number between 0 and gLength-1.

The style/class is initially passage0, a style coded in the stylesheet.
As the user stirs the text, the style and content cycle among the 
gPassages passages and styles.

The data-type of these elements must be "t". Note that in our example,
there is inner content like this:
<i data-type="c">Social Values and Poetic Acts</i>
Any tagged inner content must have data-type="c". This is important
for the touchscreen programming to work right.

*/

//****************************************************************
// GLOBALS
//****************************************************************

var gPassages=7;
// This stir fry has 7 passages, ie 7 main texts.
var gPassageStyles=["passage0","passage1","passage2","passage3","passage4","passage5","passage6"];
// An array of 7 style names, a style for each passage.
var gLength=25;
// Each passage in this stir fry is chopped into 25 pieces.
var gStateOfArt;
// An array of length gLength. Each passage is referred to by
// an index from 0 to gPassages-1. Each element of the gStateOfArt
// array is such an integer. In other words, element x of
// gStateOfArt tells us which passage is currently displayed by
// the HTML node with id='j'+x. All gLength elements are 
// initially 0.
var gTextArray;
// A 2-dimensional array that holds the texts. gTextArray[s][t]
// holds part t of passage s. 
var gCounter=0;
// When the user clicks the image at the bottom, the program
// displays an unstirred passage. This integer is an index
// between 0 and gPassages-1 that indicates which passage
// will be displayed when that button is clicked.

//****************************************************************
// INITIALIZATION
//****************************************************************

window.onload=initialize;  

function initialize() {
	// Runs after window has loaded. Initializes program.
	document.body.addEventListener('touchmove',function(e){
      e.preventDefault();
      // This prevents the body scrolling on the iPad as you
      // 'drag' touch.
  });
	gStateOfArt=[];
	for (var i=0; i<gLength; i++) {
	  gStateOfArt[i]=0;
	}
	// Initializes gStateOfArt to have gLength entries of 0.
	gTextArray = new Array(gPassages);
	for (var i=0; i < gPassages; i++) 
	{   
	  gTextArray[i] = new Array(gLength);  
	}
	// Initializes gTextArray to be a 2-dimensional array.
	gTextArray[0][0] = "1. Ecosystem Restoration: Enhance wetland "
	gTextArray[0][1] = "and associated "
	gTextArray[0][2] = "upland habitats "
	gTextArray[0][3] = "characteristic "
	gTextArray[0][4] = "of the Devereux Slough ecosystem. " 
	gTextArray[0][5] = "To do so will require expansion "
	gTextArray[0][6] = "of wetland area, "
	gTextArray[0][7] = "improved hydrological connectivity, control "
	gTextArray[0][8] = "of invasive non-native species, re-introduction " 
	gTextArray[0][9] = "of native species, enhancement "
	gTextArray[0][10] = "of habitats for threatened "
	gTextArray[0][11] = "and endangered species, "
	gTextArray[0][12] = "and improving resiliency "
	gTextArray[0][13] = "of ecosystem structure "
	gTextArray[0][14] = "and function. "
	gTextArray[0][15] = "2. Provide Social Values: "
	gTextArray[0][16] = "Maintain open space "
	gTextArray[0][17] = "and develop opportunities "
	gTextArray[0][18] = "for passive recreation, "
	gTextArray[0][19] = "and research, "
	gTextArray[0][20] = "and educational use "
	gTextArray[0][21] = "that are compatible "
	gTextArray[0][22] = "with the environmentally sensitive resources "
	gTextArray[0][23] = "of the area. <p>"
	gTextArray[0][24] = "CCBER and ESA<br><i data-type=\"c\">North Campus Open Space Restoration Project Plan pg.9</i><br>Prepared for the UCSB Office of Budget and Planning, 2016 "
	// Above is the first passage. 
	gTextArray[1][0] = "Many modifications "
	gTextArray[1][1] = "to the natural topography "
	gTextArray[1][2] = "have also been made "
	gTextArray[1][3] = "as the result of human actions. "
	gTextArray[1][4] = "Clearing of land "
	gTextArray[1][5] = "for grazing and agriculture "
	gTextArray[1][6] = "in the 1800s through the early 20th century "
	gTextArray[1][7] = "have resulted "
	gTextArray[1][8] = "in erosion and gullying "
	gTextArray[1][9] = "of several areas. Paving "
	gTextArray[1][10] = "of roads and parking lots "
	gTextArray[1][11] = "has contributed "
	gTextArray[1][12] = "to runoff and erosion. Removal "
	gTextArray[1][13] = "of topsoil "
	gTextArray[1][14] = "and infilling "
	gTextArray[1][15] = "of wetlands "
	gTextArray[1][16] = "at Devereux Slough "
	gTextArray[1][17] = "for the golf course "
	gTextArray[1][18] = "and for land development "
	gTextArray[1][19] = "in many areas has occurred. "
	gTextArray[1][20] = "Grading for roadways, beach access, "
	gTextArray[1][21] = "and oil development activities have "
	gTextArray[1][22] = "also resulted "
	gTextArray[1][23] = "in a highly altered environment. <p>"
	gTextArray[1][24] = "CCBER and ESA<br><i data-type=\"c\">North Campus Open Space Restoration Project Plan pg.14</i><br>Prepared for the UCSB Office of Budget and Planning, 2016 "
	// Above is the second passage.
	gTextArray[2][0] = "Plants grow by pulling carbon dioxide from the air "
	gTextArray[2][1] = "through photosynthesis "
	gTextArray[2][2] = "and converting it to leaves, stems, and roots. "
	gTextArray[2][3] = "Salt marsh plants such as "
	gTextArray[2][4] = "pickleweed, jaumea, alkali heath, and salt grass "
	gTextArray[2][5] = "are adapted to growing "
	gTextArray[2][6] = "in intermittently flooded wetlands "
	gTextArray[2][7] = "where natural sediment flows interact "
	gTextArray[2][8] = "with plant growth "
	gTextArray[2][9] = "to incrementally increase the elevation "
	gTextArray[2][10] = "of the ground in line "
	gTextArray[2][11] = "with slowly rising sea levels. "
	gTextArray[2][12] = "Consequently, the carbon-rich roots "
	gTextArray[2][13] = "form part of the soil "
	gTextArray[2][14] = "and remain in the wet, anoxic, low oxygen environment "
	gTextArray[2][15] = "where decomposition rates are slow, "
	gTextArray[2][16] = "so carbon is preserved "
	gTextArray[2][17] = "and taken out of the atmosphere long term. "
	gTextArray[2][18] = "Although tress also sequester carbon, "
	gTextArray[2][19] = "when they die the wood is often burned "
	gTextArray[2][20] = "or decomposes on the surface to re-release the carbon to the air, "
	gTextArray[2][21] = "but wetland soils generally stay buried "
	gTextArray[2][22] = "and moist and thus hold that carbon "
	gTextArray[2][23] = "into the future. <p> "
	gTextArray[2][24] = "Elaine Tran<br>\"Carbon Sequestration: An Ecosystem Service Provided by NCOS\"<br>CCBER, 2018 "
	// Above is the third passage.
	gTextArray[3][0] = "Early definitions promoted "
	gTextArray[3][1] = "a science-based promise "
	gTextArray[3][2] = "to use ecological knowledge "
	gTextArray[3][3] = "to fit degraded ecosystems. "
	gTextArray[3][4] = "Jared Diamond in 1985, was among the first "
	gTextArray[3][5] = "to draw attention "
	gTextArray[3][6] = "to the social dimensions "
	gTextArray[3][7] = "of restoration "
	gTextArray[3][8] = "as he reflected "
	gTextArray[3][9] = "on discussions "
	gTextArray[3][10] = "at the University of Wisconsin-Madison Arboretum symposium "
	gTextArray[3][11] = "in 1984: \"First, no community "
	gTextArray[3][12] = "on Earth "
	gTextArray[3][13] = "has escaped "
	gTextArray[3][14] = "the direct "
	gTextArray[3][15] = "or indirect "
	gTextArray[3][16] = "effects "
	gTextArray[3][17] = "of man, "
	gTextArray[3][18] = "so which "
	gTextArray[3][19] = "is "
	gTextArray[3][20] = "the \'natural community\' "
	gTextArray[3][21] = "that one "
	gTextArray[3][22] = "would seek "
	gTextArray[3][23] = "to restore?\" <p> "
	gTextArray[3][24] = "David M. Martin<br>\"Ecological restoration should be redefined for the twenty-first century\"<br>Restoration Ecology: The Journal of the Society for Ecological Restoration, 2017 "
	// Above is the fourth passage.
	gTextArray[4][0] = "The United Nations Convention "
	gTextArray[4][1] = "on Biological Diversity "
	gTextArray[4][2] = "recently "
	gTextArray[4][3] = "published "
	gTextArray[4][4] = "a similar definition: "
	gTextArray[4][5] = "\"Ecological restoration "
	gTextArray[4][6] = "refers "
	gTextArray[4][7] = "to the process "
	gTextArray[4][8] = "of managing "
	gTextArray[4][9] = "or assisting "
	gTextArray[4][10] = "the recovery "
	gTextArray[4][11] = "of an ecosystem "
	gTextArray[4][12] = "that "
	gTextArray[4][13] = "has been "
	gTextArray[4][14] = "degraded, "
	gTextArray[4][15] = "damaged, "
	gTextArray[4][16] = "or "
	gTextArray[4][17] = "destroyed "
	gTextArray[4][18] = "as "
	gTextArray[4][19] = "a means "
	gTextArray[4][20] = "of sustaining ecosystem "
	gTextArray[4][21] = "resilience "
	gTextArray[4][22] = "and conserving "
	gTextArray[4][23] = "biodiversity\". <p> "
	gTextArray[4][24] = "David M. Martin<br>\"Ecological restoration should be redefined for the twenty-first century\"<br>Restoration Ecology: The Journal of the Society for Ecological Restoration, 2017 "
	// Above is the fifth passage. 
	gTextArray[5][0] = "In sum, we should be able "
	gTextArray[5][1] = "to explain more precisely "
	gTextArray[5][2] = "how ecological restoration "
	gTextArray[5][3] = "is viewed "
	gTextArray[5][4] = "in its definition, "
	gTextArray[5][5] = "other than "
	gTextArray[5][6] = "by insisting that restoration aims "
	gTextArray[5][7] = "to achieve some characteristics "
	gTextArray[5][8] = "of the resulting ecosystem. "
	gTextArray[5][9] = "One way "
	gTextArray[5][10] = "to do this "
	gTextArray[5][11] = "is by amending the...definition: "
	gTextArray[5][12] = "\"Ecological restoration "
	gTextArray[5][13] = "is the process "
	gTextArray[5][14] = "of assisting the recovery "
	gTextArray[5][15] = "of a degraded, "
	gTextArray[5][16] = "damaged, "
	gTextArray[5][17] = "or destroyed ecosystem "
	gTextArray[5][18] = "to reflect "
	gTextArray[5][19] = "values regarded as inherent "
	gTextArray[5][20] = "in the ecosystem "
	gTextArray[5][21] = "and to provide goods "
	gTextArray[5][22] = "and services "
	gTextArray[5][23] = "that people value\". <p> "
	gTextArray[5][24] = "David M. Martin<br>\"Ecological restoration should be redefined for the twenty-first century\"<br>Restoration Ecology: The Journal of the Society for Ecological Restoration, 2017 "
	// Above is the sixth passage. 
	gTextArray[6][0] = "I grabbed a pickaxe, put on some gloves "
	gTextArray[6][1] = "and got down to work. "
	gTextArray[6][2] = "I was only there "
	gTextArray[6][3] = "for four hours, "
	gTextArray[6][4] = "but by the end I was beat. "
	gTextArray[6][5] = "I had been beat "
	gTextArray[6][6] = "by the work "
	gTextArray[6][7] = "and the dirt "
	gTextArray[6][8] = "and the sun. Even "
	gTextArray[6][9] = "though exhausted, "
	gTextArray[6][10] = "the kind of camaraderie "
	gTextArray[6][11] = "and community I experienced "
	gTextArray[6][12] = "just in that short time "
	gTextArray[6][13] = "was certainly something--the feeling "
	gTextArray[6][14] = "that what we were doing here  "
	gTextArray[6][15] = "was beyond our own selves. "
	gTextArray[6][16] = "With each dig, each weeding, and every stalk of native grass planted, "
	gTextArray[6][17] = "it forced on to see this parcel "
	gTextArray[6][18] = "of empty space, "
	gTextArray[6][19] = "as less of a desert, "
	gTextArray[6][20] = "and more as a giant opportunity full of potential. "
	gTextArray[6][21] = "What once was a golf course would soon be wild "
	gTextArray[6][22] = "again. A used canvas, now blank, ready to be made "
	gTextArray[6][23] = "into something beautiful. <p> "
	gTextArray[6][24] = "Gabriel Buzzelli<br>\"My Time at NCOS\"<br>CCBER, 2018 "
	// Above is the seventh passage.
	setBindings();
	resizeBrowser();
}; // end of initialize

function setBindings() {
  // Called once. Toward the end of initialize.
  window.addEventListener("resize", resizeBrowser, false);
  if (isEventSupported("touchmove")) {
    //set up touch handling
    var maintextobj=document.getElementById("maintext");
    document.body.addEventListener("touchstart", touchInProgress, false);
    document.body.addEventListener("touchmove", touchInProgress, false);
  }
  else {
    // Mouse handling
    for (var i=0; i<gLength; i++) {
      document.getElementById('j' + i).addEventListener("mouseover", cutupMouse, false);
    }
  }
} // end of setBindings

//****************************************************************
// FUNCTIONS
//****************************************************************

function resizeBrowser() {
	// Called at the beginning of the program and when the user resizes the browser.
	var bh=browserHeight();
	var mainTextHeight=bh - elementHeight(document.getElementById('titleImg'));
	var textHeight=elementHeight('maintext');
	if (mainTextHeight>=textHeight) {
		document.getElementById('maintext').style.top=Math.round((mainTextHeight-textHeight)/2) + 'px';
	}
	else {
			document.getElementById('maintext').style.top='0px';
	}
}

function cutupMouse() {
	// This gets called each time the mouseover event occurs over
	// one of the html elements with id such as j0 or j5 etc.
  var x=this.getAttribute("data-idnum");
  var xint=parseInt(x);
  gStateOfArt[xint]=(gStateOfArt[xint]+1) % gPassages;
  // When the reader places the mouse over part n of text t, the 
  //program replaces that small text with part n of text t+1. 
  cutup(this, gStateOfArt[xint], xint);
}

function cutup(Textian, jstate, jposition) {
	// Gets called each time the program stirs the text.
	// Textian is the html object. jstate is the number
	// of the passage. jposition is the number of the part.
  Textian.innerHTML=gTextArray[jstate][jposition];
  Textian.className=gPassageStyles[jstate];
}

function touchInProgress(e) {
	// Gets called each time the user stirs the text on a touchscreen.
	var touch = e.touches[0];
	var x = touch.pageX;
	var y = touch.pageY;
	var el= document.elementFromPoint(x,y); 
	//el is the topmost element the user is touching.
	if (el) {
    var dataType=el.getAttribute('data-type');
    // Each of the gLength HTML elements with id of j0 or j24
    // (or whatever) have data-type="t". Tagged inner content
    // of those elements must have data-type="c".
    if (dataType) {
    	// Then el is either one of our j0 to j24 elements or
    	// an element inside those.
    	while (dataType != 't') {
    		// This loop ensures that el ends up being one of our
    		// targeted j0 to j24 elements.
    		el=el.parentNode;
    		dataType=el.getAttribute('data-type');
    	}
    	var idnumasstring=el.getAttribute("data-idnum");
	    if (idnumasstring) {
	      var idnum=parseInt(idnumasstring);
	      gStateOfArt[idnum]=(gStateOfArt[idnum]+1)%gPassages;
	      cutup(el, gStateOfArt[idnum], idnum);
	    }

    }
	}
} // end of touchInProgress

function order() {
	// Called when the user clicks the button that
	// cycles through the texts.
	gCounter=(gCounter+1) % gPassages;
	for (var i=0; i<gLength; i++) {
		var el=document.getElementById("j"+i)
		el.innerHTML = gTextArray[gCounter][i];
		el.className=gPassageStyles[gCounter];
	}
}

/*
	var maintext=document.getElementById('maintext');
  for (var i=0; i<gLength; i++) {
	  var n=document.createElement('span');
	  n.setAttribute('id', 'j'+i);
	  n.setAttribute('class', gPassageStyles[gCounter]);
	  n.setAttribute('data-type', 't');
	  n.setAttribute('data-idnum', i.toString());
	  n.innerHTML=gTextArray[gCounter][i];
	  gObjArray[i]=n;
	  maintext.appendChild(n);
	}
	*/
