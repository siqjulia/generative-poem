var t=0;
var n=0;
var paths=0;
var above='muffin,cinnamon roll,dough,yeast,bun,brioche,bread,biscuit,crossiant,crumpet,beignet,panettone,focaccia,sticky bun,ciabatta'.split(',');
var below='sorrow,tension,bad experience,heartbreak,hassle,trouble,struggle,sadness'.split(',');
var trans='lessen,warm,sweeten,silence,relieve,soothe,heal,fade,hide'.split(',');
var imper='eat,share,love,prepare,bake,slice,fold,roll,whisk';
imper=imper.split(',');
var intrans='expand,rise,brown,bubble,crisp,cool,melt'.split(',');
var s='s,'.split(',');
var texture='soft,doughy'.split(',');
function rand_range(max) {
 return Math.floor(Math.random()*(max+1));
}
function choose(array) {
 return array[rand_range(array.length-1)];
}
function path() {
 var p=rand_range(1);
 var words=choose(above);
 if ((words=='forest')&&(rand_range(3)==1)) {
  words='monkeys '+choose(trans);
 } else {
  words+=s[p]+' '+choose(trans)+s[(p+1)%2];
 }
 words+=' the '+choose(below)+choose(s)+'.';
 return words;
}
function site() {
 var words='';
 if (rand_range(2)==1) {
  words+=choose(above);
 } else {
  words+=choose(below);
 }
 words+='s '+choose(intrans)+'.';
 return words;
}
function cave() {
 var adjs=('comforting,'+choose(texture)+',sugary,sweet,caloric,buttery,flaky,dough').split(',');
 var target=1+rand_range(3);
 while (adjs.length>target) {
  adjs.splice(rand_range(adjs.length),1);
  }
 var words='\u00a0\u00a0'+choose(imper)+' the '+adjs.join(' ')+' \u2014';
 return words;
}
function do_line() {
 var main=document.getElementById('main');
 if (t<=25) {
  t+=1;
 } else {
  main.removeChild(document.getElementById('main').firstChild);
 }
 if (n===0) {
  text=' ';
 } else if (n==1) {
  paths=2+rand_range(2);
  text=path();
 } else if (n<paths) {
  text=site();
 } else if (n==paths) {
  text=path();
 } else if (n==paths+1) {
  text=' ';
 } else if (n==paths+2) {
  text=cave();
 } else {
  text=' ';
  n=0;
 }
 n+=1;
 text=text.substring(0,1).toUpperCase()+text.substring(1,text.length);
 last=document.createElement('div');
 last.appendChild(document.createTextNode(text));
 main.appendChild(last);
}
function poem() {
 setInterval(do_line, 1200);
}

var lastAbove = '';

function chooseNew(array, last) {
  var word;
  do {
    word = choose(array);
  } while (word === last);
  return word;
}