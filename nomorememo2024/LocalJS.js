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


class Subject {
    constructor() { this.observers = []; }
    subscribe(observer) { this.observers.push(observer); }
    unsubscribe(observer) { this.observers = this.observers.filter((obs) => obs !== observer); }
    notifyAll() {
        this.observers.forEach((subscriber) => {
            try {
                subscriber.update(this.constructor.name);
            } catch (err) { console.error("error", err); }
        })
    }
}

class Observer {
    constructor(name) { this.name = name; }
    update(subj) {
        //console.log(`${this.name}: notified from ${subj} class!`);
    }
}

const subj = new Subject();
const a = new Observer("A");
const b = new Observer("B");
class c {
    constructor() {
        this.name = "c"
    }

    bbb() {
        console.log("by")
    }

    update() {
        //console.log("~~");
    }
}
const cc = new c("c");
subj.subscribe(a);
subj.subscribe(b);
subj.subscribe(cc);
subj.notifyAll();



function showHide(event) {
    const strArray = event.target.className.split('_');
    for (let i = 0; i < strArray.length; i++) {
        if (strArray[i].includes("showHide")) {
            const targetName = strArray[i].split(":")[1];
            const target = document.querySelector(`.${targetName}`);
            target.style.display = target.style.display != "none" ? "none" : strArray[i].split(":")[2];
        }
    }
}
class windowElement {
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;

    db = {
        befoIndex: null, index: null, nextIndex: null,
        title: null, show: null,
        fontSize: null, fontThick: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null, lineColor: null,
        width: null, lineThick: null
    }
    constructor() {
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.input = document.createElement("input");
        this.form = document.createElement("form");
        this.select = document.createElement("select");
        this.option = document.createElement("option");
    }

    setValue(db) {
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
        //make basic
        this.button.style.backgroundColor = "transparent";
        this.input.style.backgroundColor = "transparent";
        this.div.style.backgroundColor = "transparent";
        this.select.style.backgroundColor = "transparent";

        this.select.style.border = "none";
        this.button.style.border = "none";
        this.input.style.border = "none";

        this.select.style.padding = "0";
        this.button.style.padding = "0";
        this.input.style.padding = "0";

        this.select.style.marginLeft = "10px";
        this.button.style.marginLeft = "10px";

        this.select.style.height = "40px";
        this.button.style.height = "40px";
        this.input.style.height = "40px";

        this.select.style.fontFamily = this.db.fontFamily;
        this.select.style.fontSize = `${this.db.fontSize}pt`;
        this.select.style.fontWeight = this.db.fontThick;
        this.select.style.fontStyle = this.db.fontStyle;
        this.select.style.color = this.db.fontColor;

        this.button.style.fontFamily = this.db.fontFamily;
        this.button.style.fontSize = `${this.db.fontSize}pt`;
        this.button.style.fontWeight = this.db.fontThick;
        this.button.style.fontStyle = this.db.fontStyle;
        this.button.style.color = this.db.fontColor;

        
        this.input.style.fontFamily = this.db.fontFamily;
        this.input.style.fontSize = `${this.db.fontSize}pt`;
        this.input.style.fontWeight = this.db.fontThick;
        this.input.style.fontStyle = this.db.fontStyle;
        this.input.style.color = this.db.fontColor;
    }

    setElementCss() {
        const winDiv = this.div.cloneNode(false);
        winDiv.style.backgroundColor = this.db.backgroundColor;
        winDiv.className = `w${this.db.index}`;
        winDiv.style.display = "flex";
        winDiv.style.flexDirection = "column";
        winDiv.style.width = `${this.db.width}px`;

        const winHeadDiv = this.div.cloneNode(true);
        const winBodyDiv = this.div.cloneNode(true);
        winBodyDiv.className = `w${this.db.index}body`
        winBodyDiv.innerText = "body";
        winBodyDiv.style.display = this.db.show == true ? "flex" : "none";
        //
        
        const MAIN_LINE_DIV = this.div.cloneNode(true);
        MAIN_LINE_DIV.style.display = "flex";
        MAIN_LINE_DIV.style.borderBottom = `${this.db.lineThick}px solid ${this.db.lineColor}`;

        const SUB_DIV = this.div.cloneNode(true);
        SUB_DIV.style.display = "flex";

        const MIN_BTN = this.button.cloneNode(true);
        MIN_BTN.style.display = "flex";
        MIN_BTN.style.alignItems = "center";
        MIN_BTN.style.justifyContent = "center";
        MIN_BTN.style.flexShirink = 0;
        MIN_BTN.style.width = "40px";
        
        const LEFT_BTN = this.button.cloneNode(true);
        LEFT_BTN.style.flexGrow = 1;
        LEFT_BTN.style.textAlign = "left";
        //-->main resorce

        const titleDiv = MAIN_LINE_DIV.cloneNode(true);
        titleDiv.style.display = "flex";

        const titleBtn = LEFT_BTN.cloneNode(true);
        titleBtn.innerText = this.db.title;
        titleBtn.className = `w${this.db.index}titleBtn_showHide:w${this.db.index}body:flex`;
        titleBtn.addEventListener('click', showHide);

        const tapPlsBtn = MIN_BTN.cloneNode(true);
        tapPlsBtn.innerText = "+";

        const tapSelectDiv = MAIN_LINE_DIV.cloneNode(true);
        const plsBtnType = LEFT_BTN.cloneNode(true);
        let tapTypeName = ["메모", "계산", "링크", "시간", "그림", "달력", "확율", "윈도"];
        for (let i = 0; i < tapTypeName.length; i++) {
            const plsBtn_new = plsBtnType.cloneNode(true);
            plsBtn_new.innerText = tapTypeName[i];

            tapSelectDiv.appendChild(plsBtn_new);
        }
        const plsBtnType_e = MIN_BTN.cloneNode(true);
        plsBtnType_e.innerText = "e";
        tapSelectDiv.appendChild(plsBtnType_e);



        const editDiv = MAIN_LINE_DIV.cloneNode(true);
        editDiv.style.flexWrap = 'wrap';
        editDiv.style.flexDirection = 'column';
        editDiv.className = `w${this.db.index}editDiv`;
        const editPageSelect = this.select.cloneNode(true);
        editPageSelect.style.marginRight = "10px";
        let editSelect_text = ["제목, 삭제", "색상 수정", "글자 수정", "크기 수정",];
        for (let i = 0; i < editSelect_text.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${editSelect_text[i]}`;
            editPageSelect.appendChild(editOption);
        }
        editDiv.appendChild(editPageSelect);

        const editBookDiv = SUB_DIV.cloneNode(true);
        //-->
        const pageDiv =  SUB_DIV.cloneNode(true);
        const textDiv1 = SUB_DIV.cloneNode(true);
        textDiv1.style.width = "100%";
        textDiv1.className = "textDiv";

        const textDiv2 = textDiv1.cloneNode(true);

        const goTobefo = LEFT_BTN.cloneNode(true);
        goTobefo.innerText = "<= move to front";
        const goTonext = LEFT_BTN.cloneNode(true);
        goTonext.innerText = "move to back =>";
        const delWinBtn = LEFT_BTN.cloneNode(true);
        delWinBtn.innerText = "del-win";
        delWinBtn.style.removeProperty("width");

        const titleForm = this.form.cloneNode(true);
        titleForm.style.display = "flex";
        titleForm.style.width = "100%"
        titleForm.style.flexDirection = "row";
        const titleInput = this.input.cloneNode(true);
        const titleSub = this.input.cloneNode(true);
        titleInput.value = this.db.title;
        titleInput.style.flexGrow = 1;
        titleSub.value = "sub";
        titleSub.type = "submit";
        titleSub.style.flexGrow = 0;

        titleForm.appendChild(titleInput);
        titleForm.appendChild(titleSub);

        textDiv2.appendChild(goTobefo);
        textDiv2.appendChild(delWinBtn);
        textDiv2.appendChild(goTonext);

        textDiv1.appendChild(titleForm);

        const befo = MIN_BTN.cloneNode(true);
        befo.innerText = "<";
        befo.style.height = "100%";
        const next = MIN_BTN.cloneNode(true);
        next.innerText = ">";
        //next.style.marginRight ="5px";
        next.style.height = "100%";

        const textAll = SUB_DIV.cloneNode(true);
        textAll.style.flexWrap = "wrap"
        textAll.appendChild(textDiv1);
        textAll.appendChild(textDiv2);

        pageDiv.appendChild(befo);
        pageDiv.appendChild(textAll);
        pageDiv.appendChild(next);
        pageDiv.style.width = "100%"
        pageDiv.className = `w${this.db.index}pageDiv1`;
        //<--

        
        editBookDiv.appendChild(pageDiv);
        editDiv.appendChild(editBookDiv);

        /**
    db = {
        befoIndex: null, index: null, nextIndex: null,
        title: null, show: null,
        fontSize: null, fontThick: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null, lineColor: null,
        width: null, lineThick: null
    }
         */


        titleDiv.appendChild(titleBtn);
        titleDiv.appendChild(tapPlsBtn);

        winHeadDiv.appendChild(titleDiv);
        winHeadDiv.appendChild(tapSelectDiv);
        winHeadDiv.appendChild(editDiv);
        winDiv.appendChild(winHeadDiv);
        winDiv.appendChild(winBodyDiv);

        return winDiv;
    }
}



const el = new windowElement();
let eldb = {
    befoIndex: null, index: 1, nextIndex: 2,
    title: "heelo world", show: true,
    fontSize: 14, fontThick: 100, fontFamily: "sans-serif", fontType: "normal",
    fontColor: "rgb(0, 0, 0)", backgroundColor: "rgb(254, 248, 150)", lineColor: "rgb(184, 217, 147)",
    width: 600, lineThick: 1.5
}
el.setValue(eldb);
const elel = el.setElementCss();
mainDiv.appendChild(elel);