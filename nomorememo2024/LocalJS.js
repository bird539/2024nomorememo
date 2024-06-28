class htmlControl {
    html_backgroundColor = "";
    html_ligthDarkMode = "";

    #control_backgroundColor = "";

    #control_fontSize = "";
    #control_fontFamily = "";
    #control_fontStyle = "";
    #control_fontWeight = "";

    #trash_window = {};
    #trash_tabInfo = {};
    #trash_tab = {};

    constructor(builder) {
        this.html_backgroundColor = builder.get_html_backgroundColor();
        this.html_ligthDarkMode = builder.get_html_ligthDarkMode();
    }
    get_html_backgroundColor() { return this.html_backgroundColor; }
    get_html_ligthDarkMode() { return this.html_ligthDarkMode; }

    static Builder = class {
        #html_backgroundColor = "";
        #html_ligthDarkMode = "";

        get_html_backgroundColor() { return this.#html_backgroundColor; }
        set_html_backgroundColor(color) {
            this.#html_backgroundColor = color; return this;
        }

        get_html_ligthDarkMode() { return this.#html_ligthDarkMode; }
        set_html_ligthDarkMode(color) {
            this.#html_ligthDarkMode = color; return this;
        }

        build() { return new htmlControl(this); }
    }
}

class htmlContol_Model {
    #htmlControlOb;
    constructor() {
        this.#htmlControlOb = new htmlControl.Builder()
            .set_html_backgroundColor("black")
            .set_html_ligthDarkMode("light")
            .build();
    }
    firstPageOpen() {
        let getOb = localStorage.getItem("htmlControlDB");
        if (getOb == null) {
            this.#htmlControlOb.html_backgroundColor = "white";
            this.#htmlControlOb.html_ligthDarkMode = "black";
            localStorage.setItem("htmlControlDB", JSON.stringify(this.#htmlControlOb));
        } else {
            let saveDB = JSON.parse(getOb);
            this.#htmlControlOb.html_backgroundColor = saveDB.html_backgroundColor;
            this.#htmlControlOb.html_ligthDarkMode = saveDB.html_ligthDarkMode;
        }
    }
}

const newhtmlContol_Model = new htmlContol_Model();
newhtmlContol_Model.firstPageOpen();
//const htmlContolOne = new 

class Window {

}

class TabInfo {

}

class Tab_Memo {

}

let mainDiv = document.querySelector(".main");
mainDiv.innerHTML = "hello world!";


class Subject{
    constructor(){ this.observers = []; }
    subscribe(observer){ this.observers.push(observer); }
    unsubscribe(observer){ this.observers = this.observers.filter((obs)=>obs !== observer); }
    notifyAll(){
        this.observers.forEach((subscriber)=>{
            try{
                subscriber.update(this.constructor.name);
            }catch(err){ console.error("error", err); }
        })
    }
}

class Observer{
    constructor(name){ this.name = name;}
    update(subj){
        //console.log(`${this.name}: notified from ${subj} class!`);
    }
}

const subj = new Subject();
const a = new Observer("A");
const b = new Observer("B");
class c {
    constructor(){ 
        this.name = "c"
    }

    bbb(){
        console.log("by")
    }

    update(){
        //console.log("~~");
    }
}
const cc = new c("c");
subj.subscribe(a);
subj.subscribe(b);
subj.subscribe(cc);
subj.notifyAll();

class windowElement{
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;

    db = {
        befoIndex:null, index:null, nextIndex:null, 
        title:null, show:null,
        fontSize:null, fontThick:null, fontFamily:null, fontStyle:null,
        fontColor:null, backgroundColor:null, lineColor:null,
        width:null, lineThick:null 
    }
    constructor(){
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.input = document.createElement("input");
        this.form = document.createElement("form");
        this.select = document.createElement("select");
        this.option = document.createElement("option");
    }

    setValue(db){
        console.log(db);
        this.db.befoIndex = db.befoIndex;
        this.db.index = db.index;
        this.db.nextIndex = db.nextIndex;
        
        this.db.title = db.title;
        this.db.show = db.show;

        this.db.fontSize = db.fontSize;
        this.db.fontThick = db.fontThick;
        this.db.fontFamily = db.fontFamily;
        this.db.fontStyle = db.fontType;
        
        this.db.fontColor = db.fontColor;
        this.db.backgroundColor = db.backgroundColor;
        this.db.lineColor = db.lineColor;

        this.db.width = db.width;
        this.db.lineThick = db.lineThick;
    }

    setElementCss(){
        this.button.style.backgroundColor = "transparent";
        this.input.style.backgroundColor = "transparent";
        this.div.style.backgroundColor = "transparent";
        this.select.style.backgroundColor = "transparent";

        this.select.style.border = "none";
        this.button.style.border = "none";
        this.input.style.border  = "none";

        this.select.style.padding = "0";
        this.button.style.padding = "0";
        this.input.style.padding  = "0";

        this.select.style.marginLeft = "10px";
        this.button.style.marginLeft = "10px";

        this.select.style.height = "40px";
        this.button.style.height = "40px";
        this.input.style.height  = "40px";

        this.select.style.fontFamily = this.db.fontFamily;
        this.select.style.fontType = this.db.fontStyle;
        this.select.style.fontThick = this.db.fontThick;
        this.select.style.fontStyle = this.db.fonts;
        this.select.style.color = this.db.fontColor;

        this.button.style.fontFamily = this.db.fontFamily;
        this.button.style.fontType = this.db.fontType;
        this.button.style.fontThick = this.db.fontThick;
        this.button.style.fontStyle = this.db.fontStyle;
        this.button.style.color = this.db.fontColor;

        const winDiv = this.div.cloneNode(false);
        winDiv.style.backgroundColor = this.db.backgroundColor;
        winDiv.className = `w${this.db.index}`;
        winDiv.style.display = "flex";
        winDiv.style.flexDirection = "column";
        winDiv.style.width = `${this.db.width}px`;

        const winHeadDiv = this.div.cloneNode(true);
        const winBodyDiv = this.div.cloneNode(true);

        const titleDiv = this.div.cloneNode(true);
        titleDiv.style.display = "flex";
        titleDiv.style.borderBottom = `${this.db.lineThick}px solid ${this.db.lineColor}`;

        const titleBtn =  this.button.cloneNode(true);
        titleBtn.innerText = this.db.title;
        titleBtn.style.flexGrow = 1;
        titleBtn.style.textAlign = "left";

        const tapPlsBtn = this.button.cloneNode(true);
        tapPlsBtn.style.display = "flex";
        tapPlsBtn.style.alignItems = "center";
        tapPlsBtn.style.justifyContent = "center";
        tapPlsBtn.style.flexShirink = 0;
        tapPlsBtn.style.width = "40px";
        tapPlsBtn.innerText = "+";
        
        titleDiv.appendChild(titleBtn);
        titleDiv.appendChild(tapPlsBtn);

        winHeadDiv.appendChild(titleDiv);
        winDiv.appendChild(winHeadDiv);
        winDiv.appendChild(winBodyDiv);
        

        return winDiv;
    }
}

const el = new windowElement();
let eldb = {
    befoIndex : null, index : 1, nextIndex : 2, 
    title : "heelo world", show : true,
    fontSize : 14, fontThick : 100, fontFamily : "serif", fontType:"italic",
    fontColor:"rgb(0, 0, 0)", backgroundColor:"rgb(254, 248, 150)", lineColor:"rgb(184, 217, 147)",
    width:600, lineThick:1.5 
}
el.setValue(eldb);
const elel = el.setElementCss();
mainDiv.appendChild(elel);