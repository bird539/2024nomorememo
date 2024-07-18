const mainDiv = document.querySelector(".main");
const mainHtml = document.querySelector('html');
mainHtml.style.height = '100%';

const all_fontWeight = [100,200,300,400,500,600,700,800];
const all_fontFamily = ['serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif','ui-sans-serif','ui-monospace','ui-rounded','emoji','math','fangsong'];
const all_fontStyle = ['normal','italic','oblique'];
const all_tapType_kr = ['메모','계산','링크','시간','그림','달력','확률'];
const all_backgroundColor = ['#FEF896','#E4F1E7','#C9DAEE','#FAD5E6'];

const basic_width = 600;
const basic_lineWeight = 1.5;
const basic_fontSize = 14;
const basic_fontColor = "#000000";

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
function timeSomthing(time){
/**
    let time = {
        old,
        futur,
        plsTime: {
            year:0,
            date:10,
            hours:3,
            minutes:4,
            seconds:50
        }
    }
 */
    const old = new Date(time.old);
    const now = new Date();

    let plsTime = {
        year:0,
        date:10,
        hours:3,
        minutes:4,
        seconds:50
    }


    let futur;

    if(time.futur == null){
        futur = new Date(time.old);
        futur.setFullYear(old.getFullYear() + time.plsTime.year);
        futur.setDate(old.getDate() + time.plsTime.date);
        futur.setHours(old.getHours() + time.plsTime.hours);
        futur.setMinutes(old.getMinutes() + time.plsTime.minutes);
        futur.setSeconds(old.getSeconds() + time.plsTime.seconds);
    }else{
        futur = new Date(time.futur);
    }

    const diff = futur.getTime() - now.getTime();

    const secInMs = Math.floor(diff / 1000);
    const minInMs = Math.floor(secInMs / 60);
    const hourInMs = Math.floor(minInMs / 60);

    const days = Math.floor(hourInMs / 24 % 365);
    const years = Math.floor(hourInMs /24 / 365);

    const seconds = secInMs % 60;
    const minutes = minInMs % 60;
    const hours = minutes % 24;

    let txt = "";
    if(years != 0){txt+=`${years}year `};
    if(days != 0){txt+=`${days}day `};
    if(hours != 0){txt+=`${hours}h `};
    if(minutes != 0){txt+=`${minutes}m `};
    if(seconds != 0){txt+=`${seconds}s `};
//        old : `${old.getFullYear()}.${old.getMonth()}.${old.getDate()}·${old.getHours()}:${old.getMinutes()}:${old.getSeconds()}`,
//        futur : `${futur.getFullYear()}.${futur.getMonth()}.${futur.getDate()}·${futur.getHours()}:${futur.getMinutes()}:${futur.getSeconds()}`,
    
    let oldYear = "" + old.getFullYear();
    let futurYear = "" +futur.getFullYear();

    let timeTxt = {
        old : `${oldYear.substr(2)}.${old.getMonth()}.${old.getDate()}\n${old.getHours()}:${old.getMinutes()}:${old.getSeconds()}`,
        futur : `${futurYear.substr(2)}.${futur.getMonth()}.${futur.getDate()}\n${futur.getHours()}:${futur.getMinutes()}:${futur.getSeconds()}`,
        diff : txt,

        realOld : old,
        realFutur : futur,
    }
    return timeTxt;
}
//==========================================================
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
/*
let eldb = {
    befoIndex: null, index: 1, nextIndex: 2,
    title: "heelo world", show: true,
    fontSize: 14, fontThick: 100, fontFamily: "sans-serif", fontType: "normal",
    fontColor: "#000000", backgroundColor: "#FEF896", lineColor: "#B8D993",
    width: 600, lineThick: 1.5
}
 */
/*
let remoteDb = {
    lastPageShow:0,
    //remote 꾸미기
    title: "카프카의 꿈",
    fontSize: 14, fontWeight: 100, fontFamily: "sans-serif", fontType: "normal",
    fontColor: "#ffffff", backgroundColor: "#000000",
    //html 설정
    htmlBackgroundColor: "#95C2FE", lightDarkMode: false, language: 0,
    //최근 항목(date, text) / 일정모음(마감시간,남은시간,텍스트)
    newInfo: [{date:today,window:"long title window name",text:"short txt"},{date:today,window:"win2win2",text:"text2text2text2text2text2text2text2text2"},], 
    schedule:[{old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"이것 저것 구매하기 목록"},
        {old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"과자 3 빵 2 밀가루 칫실 3"},
        {old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"운동하기"},
        {old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"식물 물주기"},
    ],
    
    //쓰레기통 - 윈도우     (삭제일key, 윈도우 제목, 탭 제목들, 탭 정보들 )
    trashWindow: [],        //삭제일 + 윈도우div(tap디테일(탭 글자들)) + 복구 btn
    //쓰레기통 - 탭들       (삭제일key, 탭 제목들, 탭 정보들 )
    trashTab: [],           //삭제일 + tap디테일(탭 글자들))          + 복구 btn
    //쓰레기통 - 탭 정보들  (삭제일key, 탭 정보들 )               
    trashTabText: [],      //삭제일  + 탭 글자들           + 복구 btn
}
*/
class htmlInfo {
    lastPageShow=null; title=null;
    fontSize=null; fontWeight=null; fontFamily=null; fontType=null;
    fontColor=null; backgroundColor=null;
    htmlBackgroundColor=null; lightDarkMode=null;
    language=null;

    newInfo=[];
    schedule=[];
    constructor(){
        lastPageShow=0; title='hello!';
        fontSize=basic_fontSize; fontWeight=all_fontWeight[0]; fontFamily=all_fontFamily[1]; fontType=null;
        fontColor=null; backgroundColor=null;
        htmlBackgroundColor=null; lightDarkMode=null;
        language=null;    
    }
}

class Window {
    index = null; indexBefo = null; indexNext = null; name=null; show=null; 
    fontSize=null; fontWeight=null; fontFamily=null; fontStyle=null; 
    fontColor=null; backgroundColor=null;
    width=null; lineWeight=null;
    
    constructor(){
        this.index = 0; this.indexBefo = null; this.indexNext = 1; 
        this.name=`${this.index}win`; this.show=true; 
        this.fontSize=basic_fontSize; this.fontWeight=100; this.fontFamily=all_fontFamily[1]; this.fontStyle=all_fontStyle[0]; 
        this.fontColor=basic_fontColor; this.backgroundColor=all_backgroundColor[0];
        this.width=basic_width; this.lineWeight=basic_lineWeight;
    }
}

class TabInfo {
    index=null; fk_windowInex=null; type=null; name=null; show=null; sort=null; fontSize=null;
    fontColor=null; backgroundColor=null; width=null;

    constructor(typeNum){
        this.index=0; this.fk_windowInex=0; this.type=typeNum; this.name=all_tapType_kr[typeNum]; this.show=true; this.sort=0; this.fontSize=basic_fontSize;
        this.fontColor=basic_fontColor; this.backgroundColor=all_backgroundColor[0]; this.width=basic_width;
    }
}

class Tab_Memo_color {
    fk_tabIndex=null; color1=null; color2=null; color3=null;
    constructor(tabIndex){
        this.fk_tabIndex=tabIndex; this.color1='#fe0000'; this.color2='#1500ff'; this.color3='#00ff19';
    }
}
class Tab_Memo_text {
    fk_tabIndex=null; key_madeDate=null; 
    checked=null; text=null; fk_colorIndex = null;
    constructor(tabIndex){
        this.fk_tabIndex=tabIndex; this.key_madeDate=new Date(); 
        this.checked=true; this.text=null; this.fk_colorIndex = 0;
    }
}

class Model {
    htmlInfo = null;
    windowArr = [];
    tabInfoArr = [];

    tab_memo_colorArr = [];
    tab_memo_textArr = [];

    constructor(){
        this.htmlInfo = JSON.parse(localStorage.getItem("htmlDB"));
        this.windowArr = JSON.parse(localStorage.getItem("windowDB"));
        this.tabInfoArr = JSON.parse(localStorage.getItem("tabInfoDB"));

        this.tab_memo_colorArr = JSON.parse(localStorage.getItem("memo_color"));
        this.tab_memo_textArr = JSON.parse(localStorage.getItem("memo_text"));
        
        if(this.htmlInfo == null){
            this.htmlInfo = [];
            localStorage.setItem("htmlDB", JSON.stringify(this.htmlInfo));
        }
        if(this.windowArr == null){
            this.windowArr = [];
            localStorage.setItem("windowDB", JSON.stringify(this.windowArr));
        }
        if(this.tabInfoArr == null){
            this.tabInfoArr = [];
            localStorage.setItem("tabInfoDB", JSON.stringify(this.tabInfoArr));
        }

        if(this.tab_memo_colorArr == null){
            this.tab_memo_colorArr = [];
            localStorage.setItem("memo_color", JSON.stringify(this.tab_memo_colorArr));
        }
        if(this.tab_memo_textArr == null){
            this.tab_memo_textArr = [];
            localStorage.setItem("memo_text", JSON.stringify(this.tab_memo_textArr));
        }
    }

    htmlInfo_C(){

    }
}
class View {

}
class Controller {

}

class htmlRemoteElement{
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;

    details = null;
    summary = null;

    htmlRemoteDiv = null;
    db = {
        //최근 연 페이지 인덱스
        lastPageShow:null,
        //remote 꾸미기
        title: null,
        fontSize: null, fontWeight: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null, 
        //html 설정
        htmlBackgroundColor: null, lightDarkMode: null, language: null,
        //최근 항목(date, text) / 일정모음(마감시간,남은시간,텍스트)
        newInfo: [], schedule:[],
        
        //쓰레기통 - 윈도우     (삭제일key, 윈도우 제목, 탭 제목들, 탭 정보들 )
        trashWindow: [],        //삭제일 + 윈도우div(tap디테일(탭 글자들)) + 복구 btn
        //쓰레기통 - 탭들       (삭제일key, 탭 제목들, 탭 정보들 )
        trashTab: [],           //삭제일 + tap디테일(탭 글자들))          + 복구 btn
        //쓰레기통 - 탭 정보들  (삭제일key, 탭 정보들 )               
        trashTabText: [],      //삭제일  + 탭 글자들           + 복구 btn
    }
    constructor() {
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.input = document.createElement("input");
        this.form = document.createElement("form");
        this.select = document.createElement("select");
        this.option = document.createElement("option");

        this.details = document.createElement("details");
        this.summary = document.createElement("summary");
        this.htmlRemoteDiv = null;
    }
    setValue(db) {
            this.db.lastPageShow = db.lastPageShow;
            this.db.title = db.title;
    
            this.db.fontSize = db.fontSize;
            this.db.fontWeight = db.fontWeight;
            this.db.fontFamily = db.fontFamily;
            this.db.fontStyle = db.fontType;
    
            this.db.fontColor = db.fontColor;
            this.db.backgroundColor = db.backgroundColor;
    
            this.db.htmlBackgroundColor = db.htmlBackgroundColor;
            this.db.lightDarkMode = db.lightDarkMode;
            this.db.language = db.language;
    
            this.db.newInfo = db.newInfo;
            this.db.schedule = db.schedule;
        
        //쓰레기통 - 윈도우     (삭제일key, 윈도우 제목, 탭 제목들, 탭 정보들 )
            this.db.trashWindow = db.trashWindow;        //삭제일 + 윈도우div(tap디테일(탭 글자들)) + 복구 btn
        //쓰레기통 - 탭들       (삭제일key, 탭 제목들, 탭 정보들 )
            this.db.trashTab = db.trashTab;           //삭제일 + tap디테일(탭 글자들))          + 복구 btn
        //쓰레기통 - 탭 정보들  (삭제일key, 탭 정보들 )               
            this.db.trashTabText= db.trashTabText;//삭제일  + 탭 글자들           + 복구 btn
    
            //make basic
            this.button.style.backgroundColor = "transparent";
            this.input.style.backgroundColor = "transparent";
            this.div.style.backgroundColor = "transparent";
            this.select.style.backgroundColor = "transparent";
            this.details.style.backgroundColor = "transparent";
            this.summary.style.backgroundColor = "transparent";
            this.option.style.backgroundColor = this.db.backgroundColor;
    
            this.select.style.border = "none";
            this.button.style.border = "none";
            this.input.style.border = "none";
    
            this.select.style.padding = "0";
            this.button.style.padding = "0";
            this.input.style.padding = "0";
    
            this.select.style.marginRight = "10px";
            this.button.style.marginRight = "10px";
    
            this.select.style.height = "40px";
            this.button.style.height = "40px";
            this.input.style.height = "40px";
    
            this.select.style.fontFamily = this.db.fontFamily;
            this.select.style.fontSize = `${this.db.fontSize}pt`;
            this.select.style.fontWeight = this.db.fontThick;
            this.select.style.fontStyle = this.db.fontStyle;
            this.select.style.color = this.db.fontColor;
            
            this.option.style.fontFamily = this.db.fontFamily;
            this.option.style.fontSize = `${this.db.fontSize}pt`;
            this.option.style.fontWeight = this.db.fontThick;
            this.option.style.fontStyle = this.db.fontStyle;
            this.option.style.color = this.db.fontColor;
    
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
    
            this.details.style.fontFamily = this.db.fontFamily;
            this.details.style.fontSize = `${this.db.fontSize}pt`;
            this.details.style.fontWeight = this.db.fontThick;
            this.details.style.fontStyle = this.db.fontStyle;
            this.details.style.color = this.db.fontColor;
    
            this.summary.style.fontFamily = this.db.fontFamily;
            this.summary.style.fontSize = `${this.db.fontSize}pt`;
            this.summary.style.fontWeight = this.db.fontThick;
            this.summary.style.fontStyle = this.db.fontStyle;
            this.summary.style.color = this.db.fontColor;
    }
    //<-- set value

    //function event -->
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
        const select = btn.parentNode.previousSibling;
        const newIndex = btn.innerText == ">" ? +1 : -1; 
        let index = select.selectedIndex + newIndex;
        let lastIndex = select.childNodes.length-1;
        if(index < 0){ index = lastIndex }else if(index > lastIndex){ index = 0 }
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change'));
    }
    //<-- function event

    //make tuple -->
    newRecentInfoMake(newInfo){
        const newInfoDiv = this.div.cloneNode(true);
        newInfoDiv.style.display = "flex";
        //newInfoDiv.style.flexGrow = "1";

        const dateDiv = newInfoDiv.cloneNode(true);
        const befoTime =new Date(newInfo.date);
        const afterTime = `${befoTime.getMonth()}/${befoTime.getDate()}/${befoTime.getHours()}:${befoTime.getMinutes()}`
        dateDiv.innerText = afterTime;
        //dateDiv.style.wordBreak = "break-all"; 

        const windowDiv = newInfoDiv.cloneNode(true);
        windowDiv.style.paddingLeft = "10px";
        windowDiv.innerText = newInfo.window;
        windowDiv.style.wordBreak = "break-all"; 
        //windowDiv.style.flexGrow = "1";

        const textDiv = windowDiv.cloneNode(true);
        textDiv.innerText = newInfo.text;
        //textDiv.style.flexGrow = "2";

        newInfoDiv.appendChild(dateDiv);
        newInfoDiv.appendChild(windowDiv);
        newInfoDiv.appendChild(textDiv);

        return newInfoDiv;
    }
    newRestWorkInfoMake(newInfo2){
        //윈도명도 넣어야 할 지 의문
        const newInfoDiv = this.div.cloneNode(true);
        newInfoDiv.style.display = "flex";
        newInfoDiv.style.borderTop = `0.1px solid ${this.db.fontColor}`;

        const endTimeDiv = this.div.cloneNode(true);
        endTimeDiv.style.display = "flex";
        endTimeDiv.style.width = "60px";
        endTimeDiv.style.flexShrink = "0";
        const diffTimeDiv = endTimeDiv.cloneNode(true);
        diffTimeDiv.style.paddingLeft ="10px";
        diffTimeDiv.style.width ="80px";

        let tt = {
            old: newInfo2.old,
            futur: newInfo2.futur,
        }
        let time = timeSomthing(tt);
        endTimeDiv.innerText = `${time.futur}`
        diffTimeDiv.innerText = `${time.diff}`
        
        const windowDiv = newInfoDiv.cloneNode(true);
        windowDiv.innerText = time.futur;

        const textDiv =  this.div.cloneNode(true);
        textDiv.innerText = newInfo2.text;
        textDiv.style.paddingLeft ="10px";        
        textDiv.style.display = "flex";
        textDiv.style.flexGrow = "1";

        newInfoDiv.appendChild(endTimeDiv);
        newInfoDiv.appendChild(diffTimeDiv);
        //newInfoDiv.appendChild(windowDiv);
        newInfoDiv.appendChild(textDiv);

        return newInfoDiv;
    }
    trasInfoMake(newInfo){

    }
    //<--make tuple
    

    recentPlsPage(){
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "block";
        for(let i=0; i<this.db.newInfo.length; i++){
            pageDiv.appendChild(this.newRecentInfoMake(this.db.newInfo[i]));
        }
        pageDiv.className = "recentPlsPage";
        return pageDiv;
    }
    restWorkPage(){
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "flex";
        for(let i=0; i<this.db.schedule.length; i++){

            pageDiv.appendChild(this.newRestWorkInfoMake(this.db.schedule[i]));
        }
        //임시 숨기기
        pageDiv.className = "restWorkPage";
        pageDiv.style.display = "none";
        return pageDiv;
    }


    setElementEditBook(){
        const bodyDiv = this.div.cloneNode(true);
        bodyDiv.style.marginRight = "10px";
        bodyDiv.style.display = "block";
        //bodyDiv.style.flexDirection = "column";
        bodyDiv.style.backgroundColor = this.db.backgroundColor;
        bodyDiv.style.float = "right";
        bodyDiv.className = "htmlRemoteBody";
        bodyDiv.style.width = "400px";

        //`w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv`;
        const pageSelect = this.select.cloneNode(true);
        pageSelect.className = "htmlEditSelectDiv_htmpPagesDiv:block";
        //function_selectEvent
        pageSelect.addEventListener("change",this.function_selectEvent);
        pageSelect.style.width = "100%"
        let pageName = ["최근 추가","남은 일정", "쓰레기통","remote 꾸미기",];
        for (let i = 0; i < pageName.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${pageName[i]}`;
            pageSelect.appendChild(editOption);
        }
        bodyDiv.appendChild(pageSelect);
        
        const BookDiv = this.div.cloneNode(true);
        BookDiv.style.display = "flex";
        BookDiv.style.flexDirection = "row";
        BookDiv.style.float = "right";
        BookDiv.style.width = "100%";

        const next = this.button.cloneNode(true);
        next.style.display = "flex";
        next.style.alignItems = "center";
        next.style.justifyContent = "center";
        next.style.flexShirink = 0;
        next.style.width = "40px"
        next.style.height = "100%";
        const befo = next.cloneNode(true);
        befo.innerText = "<";
        next.innerText = ">";
        befo.addEventListener("click", this.function_nextBefoEvent);
        next.addEventListener("click", this.function_nextBefoEvent);
        
        const pagesDiv = this.div.cloneNode(true);
        pagesDiv.className = "htmpPagesDiv";
        pagesDiv.style.display = "flex";
        pagesDiv.style.float = "right";
        pagesDiv.style.flexDirection = "row";
        pagesDiv.style.width = "100%"
        

        BookDiv.appendChild(befo);

        pagesDiv.appendChild(this.recentPlsPage());
        pagesDiv.appendChild(this.restWorkPage());
        
        BookDiv.appendChild(pagesDiv);
        BookDiv.appendChild(next);

        bodyDiv.appendChild(BookDiv);
        this.htmlRemoteDiv.appendChild(bodyDiv);
    }
    setElementAll(){
        this.htmlRemoteDiv = this.div.cloneNode(true);
        this.htmlRemoteDiv.className = `htmlRemoteDiv`;
        this.htmlRemoteDiv.style.display = "block";
        this.htmlRemoteDiv.style.zIndex = "1";
        this.htmlRemoteDiv.style.width = `${this.db.width}px`;
        //this.htmlRemoteDiv.style.flexDirection = "column-reverse";//row-reverse column-reverse
        this.htmlRemoteDiv.style.bottom = "0px";
        this.htmlRemoteDiv.style.position = "absolute";
        //this.htmlRemoteDiv.style.marginRight = "20px";

        this.htmlRemoteDiv.style.width = "300px";

        const headBtn = this.button.cloneNode(true);
        headBtn.innerText = this.db.title.length > 0 ? this.db.title : "m";
        headBtn.style.backgroundColor = this.db.backgroundColor;
        headBtn.style.display = "flex";
        headBtn.style.float = "right";
        headBtn.style.alignItems = "center";
        headBtn.style.justifyContent = "center";
        headBtn.style.flexShirink = 0;
        headBtn.className = "htmlRemoteHeadBtn";
        headBtn.style.padding = "20px";
        headBtn.className = `htmlRemoteBtn_showHide:htmlRemoteBody:block`;
        headBtn.addEventListener("click",showHide);
        
        this.setElementEditBook();
        this.htmlRemoteDiv.appendChild(headBtn);

        const makeRightDiv = this.div.cloneNode(true);
        makeRightDiv.style.display = "flex";
        makeRightDiv.style.flexDirection = "row-reverse";


        makeRightDiv.appendChild(this.htmlRemoteDiv);
        return makeRightDiv;
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
//========================================================================
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
const remot = new htmlRemoteElement();
//const locale = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
const today = new Date("Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)");
const toFutur = new Date("Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)");

let remoteDb = {
    lastPageShow:0,
    //remote 꾸미기
    title: "카프카의 꿈",
    fontSize: 14, fontWeight: 100, fontFamily: "sans-serif", fontType: "normal",
    fontColor: "#ffffff", backgroundColor: "#000000",
    //html 설정
    htmlBackgroundColor: "#95C2FE", lightDarkMode: false, language: 0,
    //최근 항목(date, text) / 일정모음(마감시간,남은시간,텍스트)
    newInfo: [{date:today,window:"long title window name",text:"short txt"},{date:today,window:"win2win2",text:"text2text2text2text2text2text2text2text2"},], 
    schedule:[{old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"이것 저것 구매하기 목록"},
        {old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"과자 3 빵 2 밀가루 칫실 3"},
        {old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"운동하기"},
        {old:"Thu Jul 11 2024 17:28:06 GMT+0900 (한국 표준시)", futur:"Sun Jul 21 2024 18:48:06 GMT+0900 (한국 표준시)", text:"식물 물주기"},
    ],
    
    //쓰레기통 - 윈도우     (삭제일key, 윈도우 제목, 탭 제목들, 탭 정보들 )
    trashWindow: [],        //삭제일 + 윈도우div(tap디테일(탭 글자들)) + 복구 btn
    //쓰레기통 - 탭들       (삭제일key, 탭 제목들, 탭 정보들 )
    trashTab: [],           //삭제일 + tap디테일(탭 글자들))          + 복구 btn
    //쓰레기통 - 탭 정보들  (삭제일key, 탭 정보들 )               
    trashTabText: [],      //삭제일  + 탭 글자들           + 복구 btn
}
remot.setValue(remoteDb);
const remoteEl = remot.setElementAll();
mainHtml.appendChild(remoteEl);


//실험실------------------------------------------------------------------------------------------
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
