class htmlRemote {
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

        build() { return new htmlRemote(this); }
    }
}

class htmlRemote_Model {
    #htmlControlOb;
    constructor() {
        this.#htmlControlOb = new htmlRemote.Builder()
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

const newhtmlContol_Model = new htmlRemote_Model();
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

    function_selectEvent(event){
        const select = event.target;
        //`w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv`;
        const targetClassName = select.className.split("_")[1].split(":");
        const target = document.querySelector(`.${targetClassName[0]}`);
        for(let i=0; i<target.childNodes.length; i++){
            target.childNodes[i].style.display = "none";
        }
        target.childNodes[select.selectedIndex].style.display = targetClassName[1];
        //select.dispatchEvent(new Event('change'));
    }
    function_nextBefoEvent(event){
        const btn = event.target;
        const select = btn.parentNode.parentNode.previousSibling;
        const newIndex = btn.innerText == ">" ? +1 : -1; 
        let index = select.selectedIndex + newIndex;
        let lastIndex = select.childNodes.length-1;
        if(index < 0){ index = lastIndex }else if(index > lastIndex){ index = 0 }
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change'));
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


        this.div.style.fontFamily = this.db.fontFamily;
        this.div.style.fontSize = `${this.db.fontSize}pt`;
        this.div.style.fontWeight = this.db.fontThick;
        this.div.style.fontStyle = this.db.fontStyle;
        this.div.style.color = this.db.fontColor;
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
        tapPlsBtn.className = `w${this.db.index}tapPlsBtn_showHide:w${this.db.index}tapSelectDiv:flex`
        tapPlsBtn.addEventListener("click", showHide);

        const tapSelectDiv = MAIN_LINE_DIV.cloneNode(true);
        tapSelectDiv.style.display = "none";
        tapSelectDiv.className = `w${this.db.index}tapSelectDiv`;
        const plsBtnType = LEFT_BTN.cloneNode(true);
        let tapTypeName = ["메모", "계산", "링크", "시간", "그림", "달력", "확율", "윈도"];
        for (let i = 0; i < tapTypeName.length; i++) {
            const plsBtn_new = plsBtnType.cloneNode(true);
            plsBtn_new.innerText = tapTypeName[i];

            tapSelectDiv.appendChild(plsBtn_new);
        }
        const plsBtnType_e = MIN_BTN.cloneNode(true);
        plsBtnType_e.innerText = "e";
        plsBtnType_e.className = `w${this.db.index}plsBtnTypeE_showHide:w${this.db.index}editDiv:flex`;
        plsBtnType_e.addEventListener("click", showHide);
        tapSelectDiv.appendChild(plsBtnType_e);

        const editDiv = MAIN_LINE_DIV.cloneNode(true);
        editDiv.style.display = "none";
        editDiv.style.flexWrap = 'wrap';
        editDiv.style.flexDirection = 'column';
        editDiv.className = `w${this.db.index}editDiv`;
        const editPageSelect = this.select.cloneNode(true);
        editPageSelect.className = `w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv:flex`;
        editPageSelect.style.marginRight = "10px";
        editPageSelect.addEventListener("change", this.function_selectEvent);
        let editSelect_text = ["제목, 삭제", "색상 수정", "글자 수정", "크기 수정",];
        for (let i = 0; i < editSelect_text.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${editSelect_text[i]}`;
            editPageSelect.appendChild(editOption);
        }
        editDiv.appendChild(editPageSelect);

        const editBookDiv = SUB_DIV.cloneNode(true);
        editBookDiv.className = `w${this.db.index}editBookDiv`;
        //-->제목, 삭제
        const pageDiv =  SUB_DIV.cloneNode(true);
        const textDiv1 = SUB_DIV.cloneNode(true);
        textDiv1.style.width = "100%";
        textDiv1.className = "textDiv";

        const textDiv2 = textDiv1.cloneNode(true);

        const goTobefo = LEFT_BTN.cloneNode(true);
        goTobefo.innerText = "<= move to front";
        const goTonext = LEFT_BTN.cloneNode(true);
        goTonext.innerText = "move to back =>";
        const hideEditPage = LEFT_BTN.cloneNode(true);
        hideEditPage.innerText = "hideEdit";
        hideEditPage.className = `w${this.db.index}hideEditPage_showHide:w${this.db.index}editDiv:flex`;
        hideEditPage.addEventListener("click", showHide);
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
        textDiv2.appendChild(hideEditPage);

        textDiv1.appendChild(titleForm);

        const befo = MIN_BTN.cloneNode(true);
        befo.innerText = "<";
        befo.className = `btn/${editPageSelect.className}`
        befo.addEventListener("click", this.function_nextBefoEvent);
        befo.style.height = "100%";
        const next = MIN_BTN.cloneNode(true);
        next.innerText = ">";
        next.className = `btn/${editPageSelect.className}`
        next.addEventListener("click", this.function_nextBefoEvent);
        next.style.height = "100%";

        const textAll1 = SUB_DIV.cloneNode(true);
        textAll1.style.flexWrap = "wrap"
        textAll1.appendChild(textDiv1);
        textAll1.appendChild(textDiv2);

        pageDiv.appendChild(befo);
        pageDiv.appendChild(textAll1);
        pageDiv.appendChild(next);
        pageDiv.style.width = "100%"
        pageDiv.className = `w${this.db.index}pageDiv1`;
        editBookDiv.appendChild(pageDiv);
        //<--제목, 삭제, 수정 숨기기
        //-->컬러 수정
        const textAll2 = SUB_DIV.cloneNode(true);
        textAll2.style.flexDirection = "column";

        const backColorDiv = SUB_DIV.cloneNode(true);
        const backColorTxt = SUB_DIV.cloneNode(true); 
        backColorTxt.innerText = "배경 색";
        backColorTxt.style.display = "flex";
        backColorTxt.style.flexGrow = 1;
        const backColorInput = this.input.cloneNode(true);
        backColorInput.type = "color";
        backColorInput.value = this.db.backgroundColor;
        backColorInput.style.display = "flex";
        backColorInput.style.flexGrow = 1;
        backColorDiv.appendChild(backColorTxt);
        backColorDiv.appendChild(backColorInput);
        textAll2.appendChild(backColorDiv);

        const fontColorDiv = SUB_DIV.cloneNode(true);
        const fontColorTxt = backColorTxt.cloneNode(true); 
        fontColorTxt.innerText = "글자 색"
        const fontColorInput = backColorInput.cloneNode(true);
        fontColorInput.value = this.db.fontColor;
        fontColorDiv.appendChild(fontColorTxt);
        fontColorDiv.appendChild(fontColorInput);
        textAll2.appendChild(fontColorDiv);

        const lineColorDiv = SUB_DIV.cloneNode(true);
        const lineColorTxt = backColorTxt.cloneNode(true); 
        lineColorTxt.innerText = "라인 색"
        const lineColorInput = backColorInput.cloneNode(true);
        lineColorInput.value = this.db.lineColor;
        lineColorDiv.appendChild(lineColorTxt);
        lineColorDiv.appendChild(lineColorInput);
        textAll2.appendChild(lineColorDiv);
        
        const befo2 = befo.cloneNode(true);
        befo2.addEventListener("click", this.function_nextBefoEvent);
        const next2 = next.cloneNode(true);
        next2.addEventListener("click", this.function_nextBefoEvent);

        textAll2.style.width = "100%";
        textAll2.style.flexWrap = "wrap"

        const pageDiv2 =  SUB_DIV.cloneNode(true);
        pageDiv2.style.width = "100%"
        pageDiv2.appendChild(befo2);
        pageDiv2.appendChild(textAll2);
        pageDiv2.appendChild(next2);
        pageDiv2.style.display = "none";//임시

        editBookDiv.appendChild(pageDiv2);
        //<--컬러 수정
        //-->글자 수정
        const textAll3 = SUB_DIV.cloneNode(true);
        textAll3.style.flexDirection = "column";

        const fontSizeDiv = SUB_DIV.cloneNode(true);
        const fontSizeTxt = SUB_DIV.cloneNode(true); 
        fontSizeTxt.innerText = "글자 크기";
        fontSizeTxt.style.width = "50%";
        const  fontSizeInput = this.input.cloneNode(true);
        fontSizeInput.type = "number";
        fontSizeInput.value = this.db.fontSize;
        fontSizeInput.style.width = "50%";
        fontSizeDiv.appendChild(fontSizeTxt);
        fontSizeDiv.appendChild(fontSizeInput);
        textAll3.appendChild(fontSizeDiv);

        const fontWeightDiv = SUB_DIV.cloneNode(true);
        const fontWeightTxt = fontSizeTxt.cloneNode(true); 
        fontWeightTxt.innerText = "글자 두께"
        const fontWeightInput = fontSizeInput.cloneNode(true);
        fontWeightInput.min = 100; fontWeightInput.max = 800;
        fontWeightInput.step = 100;
        fontWeightInput.value = this.db.fontThick;
        fontWeightDiv.appendChild(fontWeightTxt);
        fontWeightDiv.appendChild(fontWeightInput);
        textAll3.appendChild(fontWeightDiv);

        const fontFamilyDiv = SUB_DIV.cloneNode(true);
        const fontFamilyTxt = fontSizeTxt.cloneNode(true); 
        fontFamilyTxt.innerText = "글자 종류"
        const fontFamilySelect = this.select.cloneNode(true);
        fontFamilySelect.style.width = "50%";
        let fontFamily = [
            "serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace",
            "ui-rounded","emoji","math","fangsong"
        ];
        for (let i = 0; i < fontFamily.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${fontFamily[i]}`;
            fontFamilySelect.appendChild(editOption);
        }
        fontFamilyDiv.appendChild(fontFamilyTxt);
        fontFamilyDiv.appendChild(fontFamilySelect);
        textAll3.appendChild(fontFamilyDiv);

        const fontStyleDiv = SUB_DIV.cloneNode(true);
        const fontStyleTxt = fontSizeTxt.cloneNode(true); 
        fontStyleTxt.innerText = "글자 종류"
        const fontStyleSelect = this.select.cloneNode(true);
        fontStyleSelect.style.width = "50%";
        let fontStyle = [
            "normal","italic","oblique"
        ];
        for (let i = 0; i < fontStyle.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${fontStyle[i]}`;
            fontStyleSelect.appendChild(editOption);
        }
        fontStyleDiv.appendChild(fontStyleTxt);
        fontStyleDiv.appendChild(fontStyleSelect);
        textAll3.appendChild(fontStyleDiv);
        
        const befo3 = befo.cloneNode(true);
        befo3.addEventListener("click", this.function_nextBefoEvent);
        const next3 = next.cloneNode(true);
        next3.addEventListener("click", this.function_nextBefoEvent);

        textAll3.style.width = "100%";
        textAll3.style.flexWrap = "wrap"

        const pageDiv3 =  SUB_DIV.cloneNode(true);
        pageDiv3.style.width = "100%"
        pageDiv3.appendChild(befo3);
        pageDiv3.appendChild(textAll3);
        pageDiv3.appendChild(next3);
        pageDiv3.style.display = "none";//임시

        editBookDiv.appendChild(pageDiv3);
        //<--글자 수정
        //-->크기 수정
        const textAll4 = SUB_DIV.cloneNode(true);
        textAll4.style.flexDirection = "column";
        textAll4.style.width = "100%";
        textAll4.style.flexWrap = "wrap"

        const winWidthDiv = SUB_DIV.cloneNode(true);
        const winWidthTxt = SUB_DIV.cloneNode(true); 
        winWidthTxt.innerText = "가로 사이즈";
        winWidthTxt.style.width = "50%";
        const  winWidthInput = this.input.cloneNode(true);
        winWidthInput.type = "number";
        winWidthInput.value = this.db.width;
        winWidthInput.style.width = "50%";
        winWidthDiv.appendChild(winWidthTxt);
        winWidthDiv.appendChild(winWidthInput);
        textAll4.appendChild(winWidthDiv);

        const lineWeightDiv = SUB_DIV.cloneNode(true);
        const lineWeightTxt = fontSizeTxt.cloneNode(true); 
        lineWeightTxt.innerText = "라인 두께"
        const lineWeightInput = fontSizeInput.cloneNode(true);
        lineWeightInput.min = 0; lineWeightInput.max = 10;
        lineWeightInput.step = 0.1;
        lineWeightInput.value = this.db.lineThick;
        lineWeightDiv.appendChild(lineWeightTxt);
        lineWeightDiv.appendChild(lineWeightInput);
        textAll4.appendChild(lineWeightDiv);

        const befo4 = befo.cloneNode(true);
        befo4.addEventListener("click", this.function_nextBefoEvent);
        const next4 = next.cloneNode(true);
        next4.addEventListener("click", this.function_nextBefoEvent);

        const pageDiv4 =  SUB_DIV.cloneNode(true);
        pageDiv4.style.width = "100%"
        pageDiv4.appendChild(befo4);
        pageDiv4.appendChild(textAll4);
        pageDiv4.appendChild(next4);
        pageDiv4.style.display = "none";
        editBookDiv.appendChild(pageDiv4);
        //<--크기 수정
        

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
    fontColor: "#000000", backgroundColor: "#FEF896", lineColor: "#B8D993",
    width: 600, lineThick: 1.5
}
el.setValue(eldb);
const elel = el.setElementCss();
mainDiv.appendChild(elel);

//실험실

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
