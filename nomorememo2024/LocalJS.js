const mainDiv = document.querySelector(".main");
const mainHtml = document.querySelector('html');
mainHtml.style.height = '100%';
mainHtml.style.textAlign = "center";

const all_fontWeight = [100, 200, 300, 400, 500, 600, 700, 800];
const all_fontFamily = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong'];
const all_fontStyle = ['normal', 'italic', 'oblique'];
const all_tapType_kr = ['메모', '계산', '링크', '시간', '그림', '달력', '확률'];
const all_backgroundColor = ['#FEF896', '#E4F1E7', '#C9DAEE', '#FAD5E6'];
const all_langauge = ['kr', 'en', 'ch', 'jp'];
const all_labgaugeText = [
    ko = {},
    en = {},
    ch = {},
    jp = {}
]

const basic_width = 600;
const basic_lineWeight = 1.5;
const basic_fontSize = 14;
const basic_fontColor = "#000000";
const basic_htmlBacground = "#ffffff";
const basic_lineColor = "#B8D993";
const baseic_regex = /[^0-9]/g;

let new_windwo_colorIndex = 0;
//해야 할 것 - 언어 선택 가능케 만들기(전역변수)
//window_U : 순서 변경
//htmlRemote : 
//메모 CRUD 구현 - R : element 요소 구성 및 읽어서 만들기 / C : 새로 추가하기

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
function timeSomthing(time) {
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
        year: 0,
        date: 10,
        hours: 3,
        minutes: 4,
        seconds: 50
    }


    let futur;

    if (time.futur == null) {
        futur = new Date(time.old);
        futur.setFullYear(old.getFullYear() + time.plsTime.year);
        futur.setDate(old.getDate() + time.plsTime.date);
        futur.setHours(old.getHours() + time.plsTime.hours);
        futur.setMinutes(old.getMinutes() + time.plsTime.minutes);
        futur.setSeconds(old.getSeconds() + time.plsTime.seconds);
    } else {
        futur = new Date(time.futur);
    }

    const diff = futur.getTime() - now.getTime();

    const secInMs = Math.floor(diff / 1000);
    const minInMs = Math.floor(secInMs / 60);
    const hourInMs = Math.floor(minInMs / 60);

    const days = Math.floor(hourInMs / 24 % 365);
    const years = Math.floor(hourInMs / 24 / 365);

    const seconds = secInMs % 60;
    const minutes = minInMs % 60;
    const hours = minutes % 24;

    let txt = "";
    if (years != 0) { txt += `${years}year ` };
    if (days != 0) { txt += `${days}day ` };
    if (hours != 0) { txt += `${hours}h ` };
    if (minutes != 0) { txt += `${minutes}m ` };
    if (seconds != 0) { txt += `${seconds}s ` };
    //        old : `${old.getFullYear()}.${old.getMonth()}.${old.getDate()}·${old.getHours()}:${old.getMinutes()}:${old.getSeconds()}`,
    //        futur : `${futur.getFullYear()}.${futur.getMonth()}.${futur.getDate()}·${futur.getHours()}:${futur.getMinutes()}:${futur.getSeconds()}`,

    let oldYear = "" + old.getFullYear();
    let futurYear = "" + futur.getFullYear();

    let timeTxt = {
        old: `${oldYear.substr(2)}.${old.getMonth()}.${old.getDate()}\n${old.getHours()}:${old.getMinutes()}:${old.getSeconds()}`,
        futur: `${futurYear.substr(2)}.${futur.getMonth()}.${futur.getDate()}\n${futur.getHours()}:${futur.getMinutes()}:${futur.getSeconds()}`,
        diff: txt,

        realOld: old,
        realFutur: futur,
    }
    return timeTxt;
}


const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text; document.body.appendChild(textArea);
    textArea.focus(); textArea.select();
    try { document.execCommand('copy') } catch (err) { console.error('Unable to copy to clipboard', err) } document.body.removeChild(textArea)
};
const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(content);
    } else {
        unsecuredCopyToClipboard(content);
    }
    //copyToClipboard(copyText);
};
function clone(value){
    const value2 = value;
    return value2;
}
//==========================================================

//옵저버 디자인 패턴 ===>
class Subject_sendGetData {
    exValue = null; check = null; target = null;
    constructor() { this.observers = []; this.exValue = null; this.check = true; this.target = null; }
    subscribe(observer) { this.observers.push(observer); }
    unsubscribe(observer) { this.observers = this.observers.filter((obs) => obs !== observer); }
    clear() {
        this.observers = [this.observers[0],];
    }
    notifyAll() {
        for (let i = this.observers.length - 1; i > -1; i--) {
            let subscriber = this.observers[i];
            try {
                if (subscriber.name == "Controller_observer") { //컨트롤러는 무조건 실행
                    subscriber.getValue(this.target, this.exValue);
                }
                this.check = subscriber.checkFunction();
                if (this.check == true) { //보낼 정보가 있느냐 없느냐
                    this.exValue = subscriber.sendValue();
                    this.target = subscriber.sendTarget();
                } else if (this.check == false) {
                    let check_target = subscriber.sendName();
                    if (this.target == check_target) {
                        subscriber.target = this.target;
                        subscriber.getValue(this.exValue);
                        this.exValue = null;
                    }
                }
            } catch (err) { console.error("error", err); }
        }
        /*
        this.observers.forEach((subscriber) => {
            try {
                if(subscriber.name == "Controller_observer"){ //컨트롤러는 무조건 실행
                    subscriber.target = this.target;
                    subscriber.getValue(this.exValue); 
                }
                this.check = subscriber.checkFunction();
                if(this.check == true){ //보낼 정보가 있느냐 없느냐
                    this.exValue = subscriber.sendValue();
                    this.target = subscriber.sendTarget();
                }else if(this.check == false){
                    let check_target = subscriber.sendName();
                    if(this.target == check_target){
                        subscriber.target = this.target;
                        subscriber.getValue(this.exValue);
                        this.exValue = null;
                    }
                }
                
            } catch (err) { console.error("error", err); }
        })
        */
        this.clear();
    }
}
class Observer_sendGetData {
    check = null; value = null; target = null; name = null;
    constructor(check) { this.check = check; this.value = null; this.target = null; this.name = null; }
    checkFunction() { return this.check; }
    sendValue() { return this.value; }
    getValue(value) { this.value = value; }
    sendTarget() { return this.target; }
    sendName() { return this.name; }
}
const subj = new Subject_sendGetData();
//<===

//View - element all ==========>
class htmlRemoteElement {
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;

    details = null;
    summary = null;

    htmlRemoteDiv = null;

    trash = null;
    db = {
        //최근 연 페이지 인덱스
        lastPageShow: null,
        //remote 꾸미기
        title: null,
        fontSize: null, fontWeight: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null,
        //html 설정
        htmlBackgroundColor: null, lightDarkMode: null, language: null,
        //최근 항목(date, text) / 일정모음(마감시간,남은시간,텍스트)
        newInfo: [], schedule: [],

        index_fontWeight: null,
        index_fontFamily: null,
        index_fontStyle: null,
    }
    constructor() {
        this.trash = null;
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
        this.trash = db.trash;

        this.db.lastPageShow = db.lastPageShow;
        this.db.title = db.title;

        this.db.fontSize = db.fontSize;

        this.db.index_fontWeight = db.fontWeight;
        this.db.index_fontFamily = db.fontFamily;
        this.db.index_fontStyle = db.fontStyle;

        this.db.fontWeight = all_fontWeight[db.fontWeight];
        this.db.fontFamily = all_fontFamily[db.fontFamily];
        this.db.fontStyle = all_fontStyle[db.fontStyle];

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
        this.db.trashTabText = db.trashTabText;//삭제일  + 탭 글자들           + 복구 btn

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
        this.select.style.fontWeight = this.db.fontWeight;
        this.select.style.fontStyle = this.db.fontStyle;
        this.select.style.color = this.db.fontColor;

        this.option.style.fontFamily = this.db.fontFamily;
        this.option.style.fontSize = `${this.db.fontSize}pt`;
        this.option.style.fontWeight = this.db.fontWeight;
        this.option.style.fontStyle = this.db.fontStyle;
        this.option.style.color = this.db.fontColor;

        this.button.style.fontFamily = this.db.fontFamily;
        this.button.style.fontSize = `${this.db.fontSize}pt`;
        this.button.style.fontWeight = this.db.fontWeight;
        this.button.style.fontStyle = this.db.fontStyle;
        this.button.style.color = this.db.fontColor;

        this.input.style.fontFamily = this.db.fontFamily;
        this.input.style.fontSize = `${this.db.fontSize}pt`;
        this.input.style.fontWeight = this.db.fontWeight;
        this.input.style.fontStyle = this.db.fontStyle;
        this.input.style.color = this.db.fontColor;

        this.div.style.fontFamily = this.db.fontFamily;
        this.div.style.fontSize = `${this.db.fontSize}pt`;
        this.div.style.fontWeight = this.db.fontWeight;
        this.div.style.fontStyle = this.db.fontStyle;
        this.div.style.color = this.db.fontColor;

        this.details.style.fontFamily = this.db.fontFamily;
        this.details.style.fontSize = `${this.db.fontSize}pt`;
        this.details.style.fontWeight = this.db.fontWeight;
        this.details.style.fontStyle = this.db.fontStyle;
        this.details.style.color = this.db.fontColor;

        this.summary.style.fontFamily = this.db.fontFamily;
        this.summary.style.fontSize = `${this.db.fontSize}pt`;
        this.summary.style.fontWeight = this.db.fontWeight;
        this.summary.style.fontStyle = this.db.fontStyle;
        this.summary.style.color = this.db.fontColor;
    }
    //<-- set value

    //function event -->
    function_selectEvent(event) {
        const select = event.target;
        //`w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv`;
        const targetClassName = select.className.split("_")[1].split(":");
        const target = document.querySelector(`.${targetClassName[0]}`);
        for (let i = 0; i < target.childNodes.length; i++) {
            target.childNodes[i].style.display = "none";
        }
        target.childNodes[select.selectedIndex].style.display = targetClassName[1];

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "html update event";
        observer.target = "html_U";
        observer.value = `lastPageShow/${select.selectedIndex}`;

        subj.subscribe(observer);
        subj.notifyAll();
        //select.dispatchEvent(new Event('change'));
    }
    function_nextBefoEvent(event) {
        const btn = event.target;
        const select = btn.parentNode.previousSibling;
        const newIndex = btn.innerText == ">" ? +1 : -1;
        let index = select.selectedIndex + newIndex;
        let lastIndex = select.childNodes.length - 1;
        if (index < 0) { index = lastIndex } else if (index > lastIndex) { index = 0 }
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change'));
    }
    function_htmlEdit(event) {
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "html update event";
        observer.target = "html_U";
        const key = event.target.className.split("_")[1];
        let value = event.target.value;
        if (key == "fontFamily" || key == "fontStyle" || key == "language") {
            value = event.target.selectedIndex;
        } else if (key == "lightDarkMode") {
            value = event.target.checked;
        }
        observer.value = `${key}/${value}`;

        if(key == "htmlBackgroundColor"){
        mainHtml.style.backgroundColor = value; 
        }else if(key =="html_backgroundColor"){
            const body = document.querySelector(`htmlRemoteBody`);
            body.style.backgroundColor = value;
            const btn = document.querySelector(`htmlRemoteBtn`);
            btn.style.backgroundColor = value;
        }

        subj.subscribe(observer);
        subj.notifyAll();
    }
    function_showEvent(event){
        const body = document.querySelector(".htmlRemoteBody");
        body.style.display =  body.style.display == "none" ? "block" : "none";
    }
    function_showEvent2(event){
        const body = event.target.parentNode.nextSibling;
        body.style.display =  body.style.display == "none" ? "block" : "none";
    }
    function_copyEvent(event){
        copyToClipboard(event.target.innerText);
    }
    function_delTuple(event){
        const trashPage = event.target.parentNode.parentNode;
        for(let i=0; i<trashPage.childNodes.length; i++){
            if(trashPage.childNodes[i].childNodes.length == 3){
                const check = trashPage.childNodes[i].childNodes[0].childNodes[0];
                if(check.checked){
                    const split = check.value.split("_");
                    const key = split[1];
                    const type = split[0]
                    const value = trashPage.childNodes[i].childNodes[2].innerText;    
                    const observer = new Observer_sendGetData(true);
                    observer.check = true;
                    observer.name = "html delete event";
                    observer.target = "html_trash_D";
                    observer.value = {key:key, value:value, type:type};
                    subj.subscribe(observer);
                    subj.notifyAll();

                    trashPage.childNodes[i].remove();
                }
            }else if(trashPage.childNodes[i].childNodes.length == 2){
                const check = trashPage.childNodes[i].childNodes[0].childNodes[0];
                if(check.checked){
                    const split = check.value.split("_");
                    const key = split[1];
                    const type = split[0]
                    const value = key;
                    const observer = new Observer_sendGetData(true);
                    observer.check = true;
                    observer.name = "html delete event";
                    observer.target = "html_trash_D";
                    observer.value = {key:key, value:value, type:type};
                    subj.subscribe(observer);
                    subj.notifyAll();
                    
                    trashPage.childNodes[i].remove();
                }
            }
        }
        // /html_trash_D(value.key, value.value, value.type);
    }
    //<-- function event

    //make tuple -->
    tuple_recentWork(newInfo) {
        const newInfoDiv = this.div.cloneNode(true);
        newInfoDiv.style.display = "flex";
        newInfoDiv.style.flexDirection = "row";

        const dateDiv = this.div.cloneNode(true);
        const split = newInfo.time.split("-");
        const afterTime = `${split[1]}/${split[2]}`
        dateDiv.style.width = "30%"
        dateDiv.style.textAlign = "left";
        dateDiv.innerText = afterTime;

        const textDiv =  this.div.cloneNode(true);
        textDiv.style.width = "70%"
        textDiv.innerText = newInfo.text;
        textDiv.style.textAlign = "left";
        textDiv.style.wordBreak = "break-all";
        textDiv.addEventListener("click", this.function_copyEvent);

        newInfoDiv.appendChild(dateDiv);
        newInfoDiv.appendChild(textDiv);

        return newInfoDiv;
    }
    tuple_restWork(newInfo2) {
        //윈도명도 넣어야 할 지 의문
        const newInfoDiv = this.div.cloneNode(true);
        newInfoDiv.style.display = "flex";
        newInfoDiv.style.borderTop = `0.1px solid ${this.db.fontColor}`;

        const endTimeDiv = this.div.cloneNode(true);
        endTimeDiv.style.display = "flex";
        endTimeDiv.style.width = "60px";
        endTimeDiv.style.flexShrink = "0";
        const diffTimeDiv = endTimeDiv.cloneNode(true);
        diffTimeDiv.style.paddingLeft = "10px";
        diffTimeDiv.style.width = "80px";

        let tt = {
            old: newInfo2.old,
            futur: newInfo2.futur,
        }
        let time = timeSomthing(tt);
        endTimeDiv.innerText = `${time.futur}`
        diffTimeDiv.innerText = `${time.diff}`

        const windowDiv = newInfoDiv.cloneNode(true);
        windowDiv.innerText = time.futur;

        const textDiv = this.div.cloneNode(true);
        textDiv.innerText = newInfo2.text;
        textDiv.style.paddingLeft = "10px";
        textDiv.style.display = "flex";
        textDiv.style.flexGrow = "1";

        newInfoDiv.appendChild(endTimeDiv);
        newInfoDiv.appendChild(diffTimeDiv);
        //newInfoDiv.appendChild(windowDiv);
        newInfoDiv.appendChild(textDiv);

        return newInfoDiv;
    }
    tuple_trash(indexTime, text) {
        const newInfoDiv = this.div.cloneNode(true);
        newInfoDiv.style.display = "flex";
        newInfoDiv.style.flexDirection = "row";
        newInfoDiv.style.width = "100%";


        const chekDiv = this.div.cloneNode(true);
        chekDiv.style.display = "flex";
        chekDiv.style.height = "40px";
        chekDiv.style.alignItems = "stretch";

        const checkbox = this.input.cloneNode(true);
        checkbox.type = "checkbox";
        checkbox.style.accentColor = this.db.htmlBackgroundColor;
        checkbox.value = `tuple_${indexTime}`;
        checkbox.style.height = "100%";
        checkbox.style.width = "60px";
        checkbox.style.display = "flex";
        checkbox.style.alignItems = "stretch";
        chekDiv.appendChild(checkbox);

        const dateDiv = this.div.cloneNode(true);
        const time = new Date(indexTime);
        const afterTime = `${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
        dateDiv.style.width = "35%"
        dateDiv.style.textAlign = "left";
        dateDiv.innerText = afterTime;
        //background-color: transparent; font-family: sans-serif; font-size: 14pt; font-weight: 100; color: rgb(0, 0, 0); display: flex; align-items: stretch; width: 40px;
        //background-color: transparent; border: none; padding: 0px; height: 100%; font-family: sans-serif; font-size: 14pt; font-weight: 100; color: rgb(0, 0, 0); display: flex; align-items: stretch;
        
        //background-color: transparent; font-family: sans-serif; font-size: 14pt; font-weight: 100; font-style: normal; color: rgb(0, 0, 0); display: flex; align-items: stretch;
        //background-color: transparent; border: none; padding: 0px; height: 110%; font-family: sans-serif; font-size: 14pt; font-weight: 100; font-style: normal; color: rgb(0, 0, 0); accent-color: rgb(255, 255, 255); width: 20px; display: flex; align-items: stretch;
        const textDiv =  this.div.cloneNode(true);
        textDiv.style.width = "70%"
        textDiv.innerText = text;
        textDiv.style.textAlign = "left";
        textDiv.style.wordBreak = "break-all";
        textDiv.addEventListener("click", this.function_copyEvent);

        newInfoDiv.appendChild(chekDiv);
        newInfoDiv.appendChild(dateDiv);
        newInfoDiv.appendChild(textDiv);

        return newInfoDiv;
    }
    tuple_trash_tab(index,title, db){
        const allDiv = this.div.cloneNode(true);
        const headDiv = this.div.cloneNode(true);
        headDiv.style.display = "flex";
        
        const checkbox = this.input.cloneNode(true);
        checkbox.type = "checkbox";
        checkbox.style.accentColor = this.db.htmlBackgroundColor;
        checkbox.value = `tab_${index}`;
        checkbox.style.height = "20px";
        checkbox.style.width = "50px";
        headDiv.appendChild(checkbox);

        /*
        const remakeBtn = this.button.cloneNode(true);
        remakeBtn.innerText = "r"
        remakeBtn.style.width = "10%";
        remakeBtn.style.marginRight = "0";
        headDiv.appendChild(remakeBtn);
        */
        const titleDiv = this.button.cloneNode(true);
        titleDiv.innerText = title;
        titleDiv.style.textAlign = "start";
        titleDiv.style.width = "60%";
        titleDiv.addEventListener("click", this.function_showEvent2);

        headDiv.style.width = "100%";
        headDiv.appendChild(titleDiv);
        
        const bodyDiv = this.div.cloneNode(true);

        const infoDiv = this.div.cloneNode(true);
        const infoHead = this.div.cloneNode(true);
        const infoHead2 = this.div.cloneNode(true);
        const time = new Date(index);
        infoHead.innerText = `===info : ${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
        infoHead.style.textAlign = "start";
        const infoBody = this.div.cloneNode(true);
        for(let key in db){
            const infoDivn = this.div.cloneNode(true);
            infoDivn.innerText += `${key} : ${db[key]}`;
            infoDivn.style.textAlign = "left";
            infoDivn.style.wordBreak = "break-all";
            infoBody.appendChild(infoDivn);
        }
        infoBody.style.display = "none";
        infoHead.addEventListener("click", this.function_showEvent2);
        infoHead2.appendChild(infoHead);
        infoDiv.appendChild(infoHead2);
        infoDiv.appendChild(infoBody);
        bodyDiv.appendChild(infoDiv);

        for(let j=0; j<this.trash.tab_text.length; j++){
            if(this.trash.tab_text[j].index == index){
                bodyDiv.appendChild(this.tuple_trash(this.trash.tab_text[j].index, this.trash.tab_text[j].text ))
            }
        }
        bodyDiv.style.display = "none";
        
        allDiv.appendChild(headDiv);
        allDiv.appendChild(bodyDiv);
        return allDiv;
    }
    tuple_trash_window(index,title,db){
        const allDiv = this.div.cloneNode(true);
        const headDiv = this.div.cloneNode(true);
        headDiv.style.display = "flex";
        
        const checkbox = this.input.cloneNode(true);
        checkbox.type = "checkbox";
        checkbox.style.accentColor = this.db.htmlBackgroundColor;
        checkbox.value = `window_${index}`;
        checkbox.style.height = "20px";
        checkbox.style.width = "40px";
        headDiv.appendChild(checkbox);

        /*
        const remakeBtn = this.button.cloneNode(true);
        remakeBtn.innerText = "r"
        remakeBtn.style.width = "10%";
        remakeBtn.style.marginRight = "0";
        headDiv.appendChild(remakeBtn);
        */
        const titleDiv = this.button.cloneNode(true);
        titleDiv.innerText = title;
        titleDiv.style.textAlign = "start";
        titleDiv.style.width = "60%";
        titleDiv.addEventListener("click", this.function_showEvent2);
        headDiv.style.width = "100%";
        headDiv.appendChild(titleDiv);
        const bodyDiv = this.div.cloneNode(true);

        const infoDiv = this.div.cloneNode(true);
        const infoHead = this.div.cloneNode(true);
        const infoHead2 = this.div.cloneNode(true);
        const time = new Date(index);
        infoHead.innerText = `===info : ${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
        infoHead.style.textAlign = "start";
        const infoBody = this.div.cloneNode(true);
        for(let key in db){
            const infoDivn = this.div.cloneNode(true);
            infoDivn.innerText += `${key} : ${db[key]}`;
            infoDivn.style.textAlign = "left";
            infoDivn.style.wordBreak = "break-all";
            infoBody.appendChild(infoDivn);
        }
        infoBody.style.display = "none";
        infoHead.addEventListener("click", this.function_showEvent2);
        infoHead2.appendChild(infoHead);
        infoDiv.appendChild(infoHead2);
        infoDiv.appendChild(infoBody);
        bodyDiv.appendChild(infoDiv);

        for(let j=0; j<this.trash.tab.length; j++){
            if(this.trash.tab[j].index == index){
                bodyDiv.appendChild(this.tuple_trash_tab(this.trash.tab[j].index, this.trash.tab[j].name, this.trash.tab[j] ))
            }
        }
        bodyDiv.style.display = "none";

        allDiv.appendChild(headDiv);
        allDiv.appendChild(bodyDiv);
        return allDiv;
    }
    //<--make tuple

    //pages
    recentPlsPage() {
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "flex";
        pageDiv.style.width = "100%";
        pageDiv.style.height = "300px";
        pageDiv.style.overflowY = "scroll";
        pageDiv.style.scrollbarColor = "#28FE0B";
        pageDiv.style.display = "flex";
        pageDiv.style.flexDirection = "column"
        for (let i = this.db.newInfo.length - 1; i >= 0; i --) {
            pageDiv.appendChild(this.tuple_recentWork(this.db.newInfo[i]));
        }
        pageDiv.className = "recentPlsPage";
        return pageDiv;
    }
    restWorkPage() {
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "flex";
        for (let i = 0; i < this.db.schedule.length; i++) {

            pageDiv.appendChild(this.tuple_restWork(this.db.schedule[i]));
        }
        //임시 숨기기
        pageDiv.className = "restWorkPage";
        pageDiv.style.display = "none";
        return pageDiv;
    }
    trashPage() {
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "100%";
        pageDiv.style.height = "300px";
        pageDiv.style.overflowY = "scroll";
        pageDiv.style.scrollbarColor = "#28FE0B";

        //tab_text
        const tabTupleTextDiv = this.div.cloneNode(true);
        tabTupleTextDiv.style.textAlign = "start";
        let count = this.trash.tab_text.length;
        tabTupleTextDiv.style.borderBottom = `1.5px solid ${this.db.fontColor}`;
        tabTupleTextDiv.innerText = `tuple (max 40/${count})`;
        pageDiv.appendChild(tabTupleTextDiv);
        for(let i=this.trash.tab_text.length-1; i>=0; i--){
            pageDiv.appendChild(this.tuple_trash(this.trash.tab_text[i].index, this.trash.tab_text[i].text ));
        }



        //tab
        const tabTextDiv = tabTupleTextDiv.cloneNode(true);
        count = this.trash.tab.length;
        tabTextDiv.innerText = `tab (max 10/${count})`;
        pageDiv.appendChild(tabTextDiv);
        for(let i=this.trash.tab.length-1; i>=0; i--){
            const allDiv = this.tuple_trash_tab(this.trash.tab[i].index, this.trash.tab[i].name, this.trash.tab[i]);
            pageDiv.appendChild(allDiv);
        }


        //window
        const windowTextDiv = tabTupleTextDiv.cloneNode(true);
        count = this.trash.window.length;
        windowTextDiv.innerText = `window(max 5/${count})`;
        pageDiv.appendChild(windowTextDiv);
        for(let i=this.trash.window.length-1; i>=0; i--){
            const allDiv = this.tuple_trash_window(this.trash.window[i].index, this.trash.window[i].name, this.trash.window[i]);
            pageDiv.appendChild(allDiv);
        }


        const allDelChek =  this.div.cloneNode(true);
        allDelChek.style.width = "100%";
        allDelChek.style.display = "flex";
        allDelChek.style.alignItems = "start"
        allDelChek.style.borderTop = `1.5px solid ${this.db.fontColor}`;
        const checkbox = this.input.cloneNode(true);
        checkbox.type = "checkbox";
        checkbox.style.border = this.db.fontColor;
        checkbox.value = `all`;
        checkbox.style.height = "20px";
        checkbox.style.width = "15%";

        const delBtn = this.button.cloneNode(true);
        delBtn.addEventListener("click", this.function_delTuple);
        delBtn.innerText = "checked all delete";

        //allDelChek.appendChild(checkbox);
        allDelChek.appendChild(delBtn);
        pageDiv.appendChild(allDelChek);

        ///pageDiv.innerText = "trash Page..."
        return pageDiv;
    }
    remoteEditPage() {
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "flex";
        pageDiv.style.width = "100%";
        pageDiv.style.height = "300px";
        pageDiv.style.overflowY = "scroll";
        pageDiv.style.scrollbarColor = "#28FE0B";

        const sub_div = this.div.cloneNode(true);
        sub_div.style.display = "flex";
        sub_div.style.flexWrap = "wrap";

        //html 변경 - htmlBackgroundColor / language / lightDarkMode
        const html_edit_text = sub_div.cloneNode(true);
        html_edit_text.innerText = "html 편집 "
        html_edit_text.style.borderBottom = `1.5px solid ${this.db.fontColor}`;
        pageDiv.appendChild(html_edit_text);

        const htmlBackgroundColorDiv = sub_div.cloneNode(true);
        htmlBackgroundColorDiv.style.width = "100%";
        const htmlBackgroundColorText = sub_div.cloneNode(true);
        htmlBackgroundColorText.innerText = "html 배경 색";
        const htmlBackgroundColorInput = this.input.cloneNode(true);
        htmlBackgroundColorInput.type = "color";
        htmlBackgroundColorInput.value = this.db.htmlBackgroundColor;
        htmlBackgroundColorInput.style.width = "50%";
        htmlBackgroundColorText.style.width = "50%";
        htmlBackgroundColorInput.className = `html_htmlBackgroundColor`;
        htmlBackgroundColorInput.addEventListener("change", this.function_htmlEdit);
        htmlBackgroundColorDiv.appendChild(htmlBackgroundColorText);
        htmlBackgroundColorDiv.appendChild(htmlBackgroundColorInput);
        pageDiv.appendChild(htmlBackgroundColorDiv);

        const htmlLanguageDiv = sub_div.cloneNode(true);
        htmlLanguageDiv.style.width = "100%";
        const htmlLanguageText = sub_div.cloneNode(false);
        htmlLanguageText.innerText = "html 언어";
        htmlLanguageText.style.width = "50%";
        const htmlLanguageSelect = this.select.cloneNode(true);
        htmlLanguageSelect.style.width = "45%";
        for (let i = 0; i < all_langauge.length; i++) {
            const option = this.option.cloneNode(true);
            option.innerText = `${i}.${all_langauge[i]}`;
            htmlLanguageSelect.appendChild(option);
        }
        htmlLanguageSelect.className = `html_language`;
        htmlLanguageSelect.selectedIndex = this.db.language;
        htmlLanguageSelect.addEventListener("change", this.function_htmlEdit);
        htmlLanguageDiv.appendChild(htmlLanguageText);
        htmlLanguageDiv.appendChild(htmlLanguageSelect);
        pageDiv.appendChild(htmlLanguageDiv);

        const lightDarkModeDiv = sub_div.cloneNode(true);
        lightDarkModeDiv.style.width = "100%";
        const lightDarkModeText = sub_div.cloneNode(false);
        lightDarkModeText.innerText = "html 다크모드";
        lightDarkModeText.style.width = "50%";
        const lightDarkModeInput = this.input.cloneNode(true);
        lightDarkModeInput.type = "checkbox";
        lightDarkModeInput.checked = this.db.lightDarkMode;
        lightDarkModeInput.style.width = "40px";
        lightDarkModeInput.style.accentColor = this.db.htmlBackgroundColor;
        lightDarkModeInput.className = `html_lightDarkMode`;
        lightDarkModeInput.addEventListener("change", this.function_htmlEdit);
        lightDarkModeDiv.appendChild(lightDarkModeText);
        lightDarkModeDiv.appendChild(lightDarkModeInput);
        pageDiv.appendChild(lightDarkModeDiv);

        //remote 변경 - title / backgroundColor  / fontColor / fontFamily / fontSize / fontStyle / fontWeight /  
        const remote_edit_text = sub_div.cloneNode(true);
        remote_edit_text.innerText = "remote 편집 "
        remote_edit_text.style.borderBottom = `1.5px solid ${this.db.fontColor}`;
        pageDiv.appendChild(remote_edit_text);

        const remoteTitleDiv = sub_div.cloneNode(true);
        remoteTitleDiv.style.width = "100%";
        const remoteTitleDivText = sub_div.cloneNode(true);
        remoteTitleDivText.innerText = "제목";
        remoteTitleDivText.style.width = "50%";
        const remoteTitleDivInput = this.input.cloneNode(true);
        remoteTitleDivInput.style.width = "50%";
        remoteTitleDivInput.value = this.db.title;
        remoteTitleDivInput.className = `html_title`;
        remoteTitleDivInput.addEventListener("change", this.function_htmlEdit);
        remoteTitleDiv.appendChild(remoteTitleDivText);
        remoteTitleDiv.appendChild(remoteTitleDivInput);
        pageDiv.appendChild(remoteTitleDiv);

        const remotebackgroundColorDiv = sub_div.cloneNode(true);
        remotebackgroundColorDiv.style.width = "100%";
        const remotebackgroundColorText = sub_div.cloneNode(true);
        remotebackgroundColorText.innerText = "배경 색";
        remotebackgroundColorText.style.width = "50%";
        const remotebackgroundColorInput = this.input.cloneNode(true);
        remotebackgroundColorInput.style.width = "50%";
        remotebackgroundColorInput.type = "color";
        remotebackgroundColorInput.value = this.db.backgroundColor;
        remotebackgroundColorInput.className = `html_backgroundColor`;
        remotebackgroundColorInput.addEventListener("change", this.function_htmlEdit);
        remotebackgroundColorDiv.appendChild(remotebackgroundColorText);
        remotebackgroundColorDiv.appendChild(remotebackgroundColorInput);
        pageDiv.appendChild(remotebackgroundColorDiv);

        const remoteFontColorDiv = sub_div.cloneNode(true);
        remoteFontColorDiv.style.width = "100%";
        const remoteFontColorText = sub_div.cloneNode(true);
        remoteFontColorText.innerText = "글자 색";
        remoteFontColorText.style.width = "50%";
        const remoteFontColorInput = this.input.cloneNode(true);
        remoteFontColorInput.style.width = "50%";
        remoteFontColorInput.type = "color";
        remoteFontColorInput.className = `html_fontColor`;
        remoteFontColorInput.addEventListener("change", this.function_htmlEdit);
        remoteFontColorInput.value = this.db.fontColor;
        remoteFontColorDiv.appendChild(remoteFontColorText);
        remoteFontColorDiv.appendChild(remoteFontColorInput);
        pageDiv.appendChild(remoteFontColorDiv);

        const remoteFontSizeDiv = sub_div.cloneNode(true);
        remoteFontSizeDiv.style.width = "100%";
        const remoteFontSizeText = sub_div.cloneNode(true);
        remoteFontSizeText.innerText = "글자 크기";
        remoteFontSizeText.style.width = "50%";
        const remoteFontSizeInput = this.input.cloneNode(true);
        remoteFontSizeInput.style.width = "50%";
        remoteFontSizeInput.type = "number";
        remoteFontSizeInput.min = 1; remoteFontSizeInput.max = 50;
        remoteFontSizeInput.value = this.db.fontSize;
        remoteFontSizeInput.className = `html_fontSize`;
        remoteFontSizeInput.addEventListener("change", this.function_htmlEdit);
        remoteFontSizeDiv.appendChild(remoteFontSizeText);
        remoteFontSizeDiv.appendChild(remoteFontSizeInput);
        pageDiv.appendChild(remoteFontSizeDiv);

        const remotfontFamilyDiv = sub_div.cloneNode(true);
        remotfontFamilyDiv.style.width = "100%";
        const remotfontFamilyText = sub_div.cloneNode(true);
        remotfontFamilyText.innerText = "글자 종류";
        remotfontFamilyText.style.width = "50%";
        const remotfontFamilySelect = this.select.cloneNode(true);
        remotfontFamilySelect.style.width = "45%";
        for (let i = 0; i < all_fontFamily.length; i++) {
            const option = this.option.cloneNode(true);
            option.innerText = `${i}.${all_fontFamily[i]}`;
            remotfontFamilySelect.appendChild(option);
        }
        remotfontFamilySelect.selectedIndex = this.db.index_fontFamily;
        remotfontFamilySelect.className = `html_fontFamily`;
        remotfontFamilySelect.addEventListener("change", this.function_htmlEdit);
        remotfontFamilyDiv.appendChild(remotfontFamilyText);
        remotfontFamilyDiv.appendChild(remotfontFamilySelect);
        pageDiv.appendChild(remotfontFamilyDiv);

        const remotfontTypeDiv = sub_div.cloneNode(true);
        remotfontTypeDiv.style.width = "100%";
        const remotfontTypeText = sub_div.cloneNode(true);
        remotfontTypeText.innerText = "글자 모양";
        remotfontTypeText.style.width = "50%";
        const remotfontTypeSelect = this.select.cloneNode(true);
        remotfontTypeSelect.style.width = "45%";
        for (let i = 0; i < all_fontStyle.length; i++) {
            const option = this.option.cloneNode(true);
            option.innerText = `${i}.${all_fontStyle[i]}`;
            remotfontTypeSelect.appendChild(option);
        }
        remotfontTypeSelect.selectedIndex = this.db.index_fontStyle;
        remotfontTypeSelect.className = `html_fontStyle`;
        remotfontTypeSelect.addEventListener("change", this.function_htmlEdit);
        remotfontTypeDiv.appendChild(remotfontTypeText);
        remotfontTypeDiv.appendChild(remotfontTypeSelect);
        pageDiv.appendChild(remotfontTypeDiv);

        const fontWeightDiv = sub_div.cloneNode(true);
        fontWeightDiv.style.width = "100%";
        const fontWeightTxt = sub_div.cloneNode(true);
        fontWeightTxt.innerText = "글자 두께"
        fontWeightTxt.style.width = "50%";
        const fontWeightInput = this.input.cloneNode(true);
        fontWeightInput.type = "number"
        fontWeightInput.min = 0; fontWeightInput.max = 7;
        fontWeightInput.step = 1;
        fontWeightInput.value = this.db.index_fontWeight;
        fontWeightInput.style.width = "50%";
        fontWeightInput.className = `html_fontWeight`;
        fontWeightInput.addEventListener("change", this.function_htmlEdit);
        fontWeightDiv.appendChild(fontWeightTxt);
        fontWeightDiv.appendChild(fontWeightInput);
        pageDiv.appendChild(fontWeightDiv);

        return pageDiv;
    }

    setElementEditBook() {
        const bodyDiv = this.div.cloneNode(true);
        bodyDiv.style.marginRight = "10px";
        bodyDiv.style.display = "none";
        //bodyDiv.style.flexDirection = "column";
        bodyDiv.style.backgroundColor = this.db.backgroundColor;
        bodyDiv.style.float = "right";
        bodyDiv.className = "htmlRemoteBody";
        bodyDiv.style.width = "400px";

        //`w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv`;
        const pageSelect = this.select.cloneNode(true);
        pageSelect.className = "htmlEditSelectDiv_htmpPagesDiv:block";
        //function_selectEvent
        pageSelect.addEventListener("change", this.function_selectEvent);
        pageSelect.style.width = "100%"
        let pageName = ["최근 추가", "남은 일정", "쓰레기통", "remote 꾸미기",];
        for (let i = 0; i < pageName.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${pageName[i]}`;
            pageSelect.appendChild(editOption);
        }
        pageSelect.selectedIndex = this.db.lastPageShow;
        bodyDiv.appendChild(pageSelect);

        const BookDiv = this.div.cloneNode(true);
        BookDiv.style.display = "flex";
        BookDiv.style.flexDirection = "row";
        BookDiv.style.float = "right";
        BookDiv.style.width = "100%";
        BookDiv.style.height = "300px"

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
        befo.style.height = "100%";
        next.style.height = "100%";

        const pagesDiv = this.div.cloneNode(true);
        pagesDiv.className = "htmpPagesDiv";
        pagesDiv.style.display = "flex";
        pagesDiv.style.float = "right";
        pagesDiv.style.flexDirection = "row";
        pagesDiv.style.width = "100%"


        BookDiv.appendChild(befo);

        let page;
        page = this.recentPlsPage();
        if (this.db.lastPageShow != "0") { page.style.display = "none"; }
        pagesDiv.appendChild(page);

        page = this.restWorkPage();
        if (this.db.lastPageShow != "1") { page.style.display = "none"; }
        pagesDiv.appendChild(page);

        page = this.trashPage();
        if (this.db.lastPageShow != "2") { page.style.display = "none"; }
        pagesDiv.appendChild(page);

        page = this.remoteEditPage();
        if (this.db.lastPageShow != "3") { page.style.display = "none"; }
        pagesDiv.appendChild(page);

        BookDiv.appendChild(pagesDiv);
        BookDiv.appendChild(next);

        bodyDiv.appendChild(BookDiv);
        this.htmlRemoteDiv.appendChild(bodyDiv);
    }
    setElementAll() {
        mainHtml.style.backgroundColor = this.db.htmlBackgroundColor;
        this.htmlRemoteDiv = this.div.cloneNode(true);
        this.htmlRemoteDiv.className = `htmlRemoteDiv`;
        this.htmlRemoteDiv.style.display = "block";
        this.htmlRemoteDiv.style.zIndex = "1";
        this.htmlRemoteDiv.style.width = `${this.db.width}px`;
        this.htmlRemoteDiv.style.bottom = "0";
        this.htmlRemoteDiv.style.right = "-10px";
        this.htmlRemoteDiv.style.position = "fixed"
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
        headBtn.className = `htmlRemoteBtn`;
        headBtn.addEventListener("click", this.function_showEvent);

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
        width: null, lineThick: null,

        index_fontFamily: null,
        index_fontStyle: null,
        index_fontWeight: null
    }
    constructor() {
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.input = document.createElement("input");
        this.form = document.createElement("form");
        this.select = document.createElement("select");
        this.option = document.createElement("option");
    }

    function_selectEvent(event) {
        const select = event.target;
        //`w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv`;
        const targetClassName = select.className.split("_")[1].split(":");
        const target = document.querySelector(`.${targetClassName[0]}`);
        for (let i = 0; i < target.childNodes.length; i++) {
            target.childNodes[i].style.display = "none";
        }
        target.childNodes[select.selectedIndex].style.display = targetClassName[1];
        //select.dispatchEvent(new Event('change'));
    }
    function_nextBefoEvent(event) {
        const btn = event.target;
        const select = btn.parentNode.parentNode.previousSibling;
        const newIndex = btn.innerText == ">" ? +1 : -1;
        let index = select.selectedIndex + newIndex;
        let lastIndex = select.childNodes.length - 1;
        if (index < 0) { index = lastIndex } else if (index > lastIndex) { index = 0 }
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change'));
    }
    function_createWindow(event) {
        const observer = new Observer_sendGetData(true);
        observer.name = "make new window event";
        observer.target = "window_C";
        subj.subscribe(observer);
        subj.notifyAll();
    }
    function_removeWindow(event) {
        //element.remove();
        const delWin = document.querySelector(`.w${event.target.className}`);
        const observer = new Observer_sendGetData(true);
        observer.name = "window delete event";
        observer.target = "window_D";
        observer.value = event.target.className;
        observer.check = true;
        subj.subscribe(observer);
        subj.notifyAll();
        delWin.remove();
    }
    function_editWindow(event) {
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "window update event";
        observer.target = "window_U";
        const index = event.target.className.split("_")[0].replace(baseic_regex, "");
        const key = event.target.className.split("_")[1];
        let value = event.target.value;
        if (key == "fontFamily" || key == "fontStyle") {
            value = event.target.selectedIndex;
        }
        observer.value = `${index}/${key}/${value}`;
        subj.subscribe(observer);
        subj.notifyAll();

        if(key == "backgroundColor"){
            const tabDiv = document.querySelector(`.w${index}`);
            tabDiv.style.backgroundColor = value;
        }else if(key == "fontColor"){
            const tabDiv = document.querySelector(`.w${index}`);
            tabDiv.childNodes[0].childNodes[0].childNodes[0].style.color = value;
        }else if(key == "lineColor" ||key == "lineWeight" ){
            const tabDiv = document.querySelector(`.w${index}`);
            const lineWeight = document.querySelector(`.w${index}_lineWeight`);
            const lineColor = document.querySelector(`.w${index}_lineColor`);
            tabDiv.childNodes[0].childNodes[0].style.borderBottom = `${lineWeight.value}px solid ${lineColor.value}`;
        }else if(key == "width"){
            const tabDiv = document.querySelector(`.w${index}`);
            tabDiv.style.width = `${value}px`;
        }
    }
    function_newTab(event) {
        const winIndex = event.target.className.split("_")[0].replace(baseic_regex, "");
        const tabType = event.target.className.split("_")[1];

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "new tab pluse event";
        observer.target = "tab_C";

        observer.value = `${winIndex}/${tabType}`;
        subj.subscribe(observer);
        subj.notifyAll();
    }
    function_editIndex(event){
        const index = event.target.className.replace(baseic_regex, "");
        const select = event.target.className.split("_")[1];  
        
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "window update event";
        observer.target = "window_U_indexChange";
        observer.value = {index:index, select:select}
        subj.subscribe(observer);
        subj.notifyAll();

        const len = mainDiv.childNodes.length;

        if(select.includes("next")){
            let firstNodeNot = true;
            for(let i=0;i<len; i++){
                if(mainDiv.childNodes[i].className == `w${index}` && i == len -1){
                    firstNodeNot = false; break
                }
            }
            if(firstNodeNot){
                for(let i=0;i<len; i++){
                    if(mainDiv.childNodes[0].className == `w${index}`){
                        const nextNodeClassName = mainDiv.childNodes[1].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
    
                        const nowNode = document.querySelector(`.w${index}`);
                        mainDiv.appendChild(nextNode);
                        mainDiv.appendChild(nowNode);
                        i += 1;
                    }else{
                        const nextNodeClassName = mainDiv.childNodes[0].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
                        mainDiv.appendChild(nextNode);
                    }
                }
            }
        }else if(select.includes("befo")){
            let firstNodeNot = true; let next = null;
            for(let i=0;i<len; i++){
                if(mainDiv.childNodes[i].className == `w${index}`){
                    if(mainDiv.childNodes[i - 1] != null){
                        next = mainDiv.childNodes[i - 1].className;
                    }
                }
                if(mainDiv.childNodes[i].className == `w${index}` && i == 0){
                    firstNodeNot = false; break
                }

            }
            if(firstNodeNot){
                for(let i=0;i<len; i++){
                    if(mainDiv.childNodes[0].className == `${next}`){
                        const befoNodeClassName = mainDiv.childNodes[0].className;
                        const befoNode = document.querySelector(`.${befoNodeClassName}`);
    
                        const nowNode = document.querySelector(`.w${index}`);
                        mainDiv.appendChild(nowNode);
                        mainDiv.appendChild(befoNode);
                        i += 1;
                    }else{
                        const nextNodeClassName = mainDiv.childNodes[0].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
                        mainDiv.appendChild(nextNode);
                    }
                }
            }
        }
        
    }

    setValue(db) {
        this.db.befoIndex = db.befoIndex;
        this.db.index = db.index;
        this.db.nextIndex = db.nextIndex;

        this.db.title = db.name;
        this.db.show = db.show;

        this.db.index_fontFamily = db.fontFamily;
        this.db.index_fontStyle = db.fontStyle;
        this.db.index_fontWeight = db.fontWeight;

        this.db.fontSize = db.fontSize;
        this.db.fontThick = all_fontWeight[db.fontWeight];
        this.db.fontFamily = all_fontFamily[db.fontFamily];
        this.db.fontStyle = all_fontStyle[db.fontStyle];

        this.db.fontColor = db.fontColor;
        this.db.backgroundColor = db.backgroundColor;
        this.db.lineColor = db.lineColor;

        this.db.width = db.width;
        this.db.lineThick = db.lineWeight;
        //make basic
        this.button.style.backgroundColor = "transparent";
        this.input.style.backgroundColor = "transparent";
        this.div.style.backgroundColor = "transparent";
        this.select.style.backgroundColor = "transparent";
        this.option.style.backgroundColor = this.db.backgroundColor;

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

        this.option.style.fontFamily = this.db.fontFamily;
        this.option.style.fontSize = `${this.db.fontSize}pt`;
        this.option.style.fontWeight = this.db.fontWeight;
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
    }

    showHide(event) {
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "window update event";
        observer.target = "window_U";
        observer.value = null;

        const index = event.target.className.replace(baseic_regex, "");
        const tapPls = document.querySelector(`.w${index}TabSelectDiv`);
        const winEdit = document.querySelector(`.w${index}EditDiv`);
        
        const winBody = document.querySelector(`.w${index}body`);
        winBody.style.display = winBody.style.display == "none" ? "block":"none";
        const plsBtn = event.target.nextSibling;
        plsBtn.innerText = winBody.style.display == "none" ? "-" : "+";
        const show = winBody.style.display != "none";
        if(show == false){
            tapPls.style.display = "none";
            winEdit.style.display = "none";
        }
        observer.value = `${index}/show/${show}`;
        subj.subscribe(observer);
        subj.notifyAll();
    }
    showHide2(event) {
        const name = event.target.className;
        const win = name.replace(baseic_regex, "");
        let target_classNames = ["body", "TabSelectDiv", "EditDiv"];
        let click_classNames = [`w${win}titleBtn_showHide:w${win}body:flex`, "TabPlsBtn", "Edit"];
        for (let i = 0; i < click_classNames.length; i++) {
            if (name.includes(click_classNames[i])) {
                let display = document.querySelector(`.w${win}${target_classNames[i]}`).style.display == "none" ? "none" : "flex";
                if (display != "none") {
                    for (let j = i; j < target_classNames.length; j++) {
                        const target = document.querySelector(`.w${win}${target_classNames[j]}`);
                        target.style.display = "none";
                    }
                } else {
                    const target = document.querySelector(`.w${win}${target_classNames[i]}`);
                    target.style.display = "flex";
                    break;
                }
            }
        }
    }

    setElementCss() {
        const winDiv = this.div.cloneNode(false);
        winDiv.style.backgroundColor = this.db.backgroundColor;
        winDiv.className = `w${this.db.index}`;
        winDiv.style.display = "inline-block"; //flex
        //winDiv.style.flexDirection = "column";
        winDiv.style.width = `${this.db.width}px`;
        winDiv.style.marginBottom = "5px";
        winDiv.style.marginRight = "5px";

        //body
        const winHeadDiv = this.div.cloneNode(true);
        const winBodyDiv = this.div.cloneNode(true);
        winBodyDiv.className = `w${this.db.index}body`
        winBodyDiv.style.display = this.db.show == true ? "block" : "none";
        winBodyDiv.style.overflow = "scroll";
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
        titleBtn.className = `w${this.db.index}titleBtn`;
        titleBtn.addEventListener('click', this.showHide);

        const tapPlsBtn = MIN_BTN.cloneNode(true);
        tapPlsBtn.innerText = this.db.show ? "+" : "-";
        tapPlsBtn.className = `w${this.db.index}TabPlsBtn`
        tapPlsBtn.addEventListener("click", this.showHide2);

        const tapSelectDiv = MAIN_LINE_DIV.cloneNode(true);
        tapSelectDiv.style.display = "none";
        tapSelectDiv.className = `w${this.db.index}TabSelectDiv`;
        const plsBtnType = LEFT_BTN.cloneNode(true);
        let tapTypeName = ["메모", "계산", "링크", "시간", "그림", "달력", "확율", "윈도"];
        for (let i = 0; i < tapTypeName.length; i++) {
            const plsBtn_new = plsBtnType.cloneNode(true);
            plsBtn_new.innerText = tapTypeName[i];
            plsBtn_new.className = `w${this.db.index}_${i}`;
            if (i == 7) {
                plsBtn_new.addEventListener("click", this.function_createWindow);
            } else {
                plsBtn_new.addEventListener("click", this.function_newTab);
            }
            tapSelectDiv.appendChild(plsBtn_new);
        }
        const plsBtnType_e = MIN_BTN.cloneNode(true);
        plsBtnType_e.innerText = "e";
        plsBtnType_e.className = `w${this.db.index}Edit`;
        plsBtnType_e.addEventListener("click", this.showHide2);
        tapSelectDiv.appendChild(plsBtnType_e);

        const editDiv = MAIN_LINE_DIV.cloneNode(true);
        editDiv.style.display = "none";
        editDiv.style.flexWrap = 'wrap';
        editDiv.style.flexDirection = 'column';
        editDiv.className = `w${this.db.index}EditDiv`;
        const editPageSelect = this.select.cloneNode(true);
        editPageSelect.className = `w${this.db.index}editSelectDiv_w${this.db.index}editBookDiv:flex`;
        editPageSelect.style.marginRight = "10px";
        editPageSelect.addEventListener("change", this.function_selectEvent);
        let editSelect_text = ["제목, 삭제, 순서변경", "색상 수정", "글자 수정", "크기 수정",];
        for (let i = 0; i < editSelect_text.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${editSelect_text[i]}`;
            editPageSelect.appendChild(editOption);
        }
        editDiv.appendChild(editPageSelect);

        const editBookDiv = SUB_DIV.cloneNode(true);
        editBookDiv.className = `w${this.db.index}editBookDiv`;
        //-->제목, 삭제
        const pageDiv = SUB_DIV.cloneNode(true);
        const textDiv1 = SUB_DIV.cloneNode(true);
        textDiv1.style.width = "100%";
        textDiv1.className = "textDiv";

        const textDiv2 = textDiv1.cloneNode(true);

        const goTobefo = LEFT_BTN.cloneNode(true);
        goTobefo.className = `w${this.db.index}_befo`;
        goTobefo.innerText = "<= move to back";
        goTobefo.addEventListener("click",this.function_editIndex);
        const goTonext = LEFT_BTN.cloneNode(true);
        goTonext.innerText = "move to front =>";
        goTonext.className = `w${this.db.index}_next`;
        goTonext.addEventListener("click",this.function_editIndex);
        const hideEditPage = LEFT_BTN.cloneNode(true);
        hideEditPage.innerText = "hideEdit";
        hideEditPage.className = `w${this.db.index}hideEditPage_showHide:w${this.db.index}editDiv:flex`;
        hideEditPage.addEventListener("click", showHide);
        const delWinBtn = LEFT_BTN.cloneNode(true);
        delWinBtn.className = `${this.db.index}`;
        delWinBtn.innerText = "del(X)";
        delWinBtn.style.removeProperty("width");
        delWinBtn.addEventListener("click", this.function_removeWindow);

        const titleForm = this.form.cloneNode(true);
        titleForm.style.display = "flex";
        titleForm.style.width = "100%"
        titleForm.style.flexDirection = "row";
        const titleInput = this.input.cloneNode(true);
        const titleSub = this.input.cloneNode(true);
        titleInput.value = this.db.title;
        titleInput.className = `w${this.db.index}_name`;
        titleInput.style.flexGrow = 1;
        titleInput.addEventListener("change", this.function_editWindow);
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
        backColorInput.className = `w${this.db.index}_backgroundColor`;
        backColorInput.addEventListener("change", this.function_editWindow);

        backColorDiv.appendChild(backColorTxt);
        backColorDiv.appendChild(backColorInput);
        textAll2.appendChild(backColorDiv);

        const fontColorDiv = SUB_DIV.cloneNode(true);
        const fontColorTxt = backColorTxt.cloneNode(true);
        fontColorTxt.innerText = "글자 색"
        const fontColorInput = backColorInput.cloneNode(true);
        fontColorInput.value = this.db.fontColor;
        fontColorInput.className = `w${this.db.index}_fontColor`;
        fontColorInput.addEventListener("change", this.function_editWindow);
        fontColorDiv.appendChild(fontColorTxt);
        fontColorDiv.appendChild(fontColorInput);
        textAll2.appendChild(fontColorDiv);

        const lineColorDiv = SUB_DIV.cloneNode(true);
        const lineColorTxt = backColorTxt.cloneNode(true);
        lineColorTxt.innerText = "라인 색"
        const lineColorInput = backColorInput.cloneNode(true);
        lineColorInput.value = this.db.lineColor;
        lineColorInput.className = `w${this.db.index}_lineColor`;
        lineColorInput.addEventListener("change", this.function_editWindow);
        lineColorDiv.appendChild(lineColorTxt);
        lineColorDiv.appendChild(lineColorInput);
        textAll2.appendChild(lineColorDiv);

        const befo2 = befo.cloneNode(true);
        befo2.addEventListener("click", this.function_nextBefoEvent);
        const next2 = next.cloneNode(true);
        next2.addEventListener("click", this.function_nextBefoEvent);

        textAll2.style.width = "100%";
        textAll2.style.flexWrap = "wrap"

        const pageDiv2 = SUB_DIV.cloneNode(true);
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
        const fontSizeInput = this.input.cloneNode(true);
        fontSizeInput.type = "number";
        fontSizeInput.value = this.db.fontSize;
        fontSizeInput.style.width = "50%";
        fontSizeInput.className = `w${this.db.index}_fontSize`;
        fontSizeInput.addEventListener("change", this.function_editWindow);

        fontSizeDiv.appendChild(fontSizeTxt);
        fontSizeDiv.appendChild(fontSizeInput);
        textAll3.appendChild(fontSizeDiv);

        const fontWeightDiv = SUB_DIV.cloneNode(true);
        const fontWeightTxt = fontSizeTxt.cloneNode(true);
        fontWeightTxt.innerText = "글자 두께"
        const fontWeightInput = fontSizeInput.cloneNode(true);
        fontWeightInput.min = 0; fontWeightInput.max = 7;
        fontWeightInput.step = 1;
        fontWeightInput.value = this.db.index_fontWeight;
        fontWeightInput.className = `w${this.db.index}_fontWeight`;
        fontWeightInput.addEventListener("change", this.function_editWindow);
        fontWeightDiv.appendChild(fontWeightTxt);
        fontWeightDiv.appendChild(fontWeightInput);
        textAll3.appendChild(fontWeightDiv);

        const fontFamilyDiv = SUB_DIV.cloneNode(true);
        const fontFamilyTxt = fontSizeTxt.cloneNode(true);
        fontFamilyTxt.innerText = "글자 종류"
        const fontFamilySelect = this.select.cloneNode(true);
        fontFamilySelect.style.width = "50%";
        for (let i = 0; i < all_fontFamily.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${all_fontFamily[i]}`;
            fontFamilySelect.appendChild(editOption);
        }
        fontFamilySelect.selectedIndex = this.db.index_fontFamily;
        fontFamilySelect.className = `w${this.db.index}_fontFamily`;
        fontFamilySelect.addEventListener("change", this.function_editWindow);
        fontFamilyDiv.appendChild(fontFamilyTxt);
        fontFamilyDiv.appendChild(fontFamilySelect);
        textAll3.appendChild(fontFamilyDiv);

        const fontStyleDiv = SUB_DIV.cloneNode(true);
        const fontStyleTxt = fontSizeTxt.cloneNode(true);
        fontStyleTxt.innerText = "글자 모양";
        const fontStyleSelect = this.select.cloneNode(true);
        fontStyleSelect.style.width = "50%";
        for (let i = 0; i < all_fontStyle.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${all_fontStyle[i]}`;
            fontStyleSelect.appendChild(editOption);
        }
        fontStyleSelect.selectedIndex = this.db.index_fontStyle;
        fontStyleSelect.className = `w${this.db.index}_fontStyle`;
        fontStyleSelect.addEventListener("change", this.function_editWindow);
        fontStyleDiv.appendChild(fontStyleTxt);
        fontStyleDiv.appendChild(fontStyleSelect);
        textAll3.appendChild(fontStyleDiv);

        const befo3 = befo.cloneNode(true);
        befo3.addEventListener("click", this.function_nextBefoEvent);
        const next3 = next.cloneNode(true);
        next3.addEventListener("click", this.function_nextBefoEvent);

        textAll3.style.width = "100%";
        textAll3.style.flexWrap = "wrap"

        const pageDiv3 = SUB_DIV.cloneNode(true);
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
        const winWidthInput = this.input.cloneNode(true);
        winWidthInput.type = "number";
        winWidthInput.value = this.db.width;
        winWidthInput.style.width = "50%";
        winWidthInput.className = `w${this.db.index}_width`;
        winWidthInput.addEventListener("change", this.function_editWindow);
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
        lineWeightInput.className = `w${this.db.index}_lineWeight`;
        lineWeightInput.addEventListener("change", this.function_editWindow);
        lineWeightDiv.appendChild(lineWeightTxt);
        lineWeightDiv.appendChild(lineWeightInput);
        textAll4.appendChild(lineWeightDiv);

        const befo4 = befo.cloneNode(true);
        befo4.addEventListener("click", this.function_nextBefoEvent);
        const next4 = next.cloneNode(true);
        next4.addEventListener("click", this.function_nextBefoEvent);

        const pageDiv4 = SUB_DIV.cloneNode(true);
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
class tabElement {
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;

    details = null;
    summary = null;

    db = {
        tabInfo:null,

        index: null, indexBefo: null, indexNext: null,
        show: null,
        type: null,
        sort: null,
        inputShow : null,

        //수정 가능
        name: null,
        fontSize: null,
        fontColor: null, backgroundColor: null,
        width: null,

        //window 상속받기
        fk_windowIndex: null,

        fontFamily: null, fontStyle: null, fontWeight: null,
        lineColor: null, lineWeight: null,
        width: null,

        index_fontWeight: null,
        index_fontFamily: null,
        index_fontStyle: null,

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
        this.tabInfo = null;
    }
    setValue(db) {
        this.db.tabInfo = db.tabInfo;
        this.db.fk_windowIndex = db.fk_windowIndex;

        this.db.index = db.index;
        this.db.indexBefo = db.indexBefo;
        this.db.indexNext = db.indexNext;

        this.db.show = db.show;
        this.db.type = db.type;
        this.db.sort = db.sort;
        this.db.inputShow = db.inputShow;
        
        this.db.name = db.name;
        this.db.fontSize = db.fontSize;
        this.db.lineWeight = db.lineWeight;
        this.db.lineColor = db.lineColor;

        this.db.index_fontWeight = db.fontWeight;
        this.db.index_fontFamily = db.fontFamily;
        this.db.index_fontStyle = db.fontStyle;

        this.db.width = db.width;

        this.db.fontWeight = all_fontWeight[db.fontWeight];
        this.db.fontFamily = all_fontFamily[db.fontFamily];
        this.db.fontStyle = all_fontStyle[db.fontStyle];

        this.db.fontColor = db.fontColor;
        this.db.backgroundColor = db.backgroundColor;

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
        this.select.style.fontWeight = this.db.fontWeight;
        this.select.style.fontStyle = this.db.fontStyle;
        this.select.style.color = this.db.fontColor;

        this.option.style.fontFamily = this.db.fontFamily;
        this.option.style.fontSize = `${this.db.fontSize}pt`;
        this.option.style.fontWeight = this.db.fontWeight;
        this.option.style.fontStyle = this.db.fontStyle;
        this.option.style.color = this.db.fontColor;

        this.button.style.fontFamily = this.db.fontFamily;
        this.button.style.fontSize = `${this.db.fontSize}pt`;
        this.button.style.fontWeight = this.db.fontWeight;
        this.button.style.fontStyle = this.db.fontStyle;
        this.button.style.color = this.db.fontColor;

        this.input.style.fontFamily = this.db.fontFamily;
        this.input.style.fontSize = `${this.db.fontSize}pt`;
        this.input.style.fontWeight = this.db.fontWeight;
        this.input.style.fontStyle = this.db.fontStyle;
        this.input.style.color = this.db.fontColor;

        this.div.style.fontFamily = this.db.fontFamily;
        this.div.style.fontSize = `${this.db.fontSize}pt`;
        this.div.style.fontWeight = this.db.fontWeight;
        this.div.style.fontStyle = this.db.fontStyle;
        this.div.style.color = this.db.fontColor;

    }
    //click event
    function_selectEvent(event) {
        const select = event.target;
        const targetClassName = select.className.split("_")[1].split(":");
        const target = document.querySelector(`.${targetClassName[0]}`);
        for (let i = 0; i < target.childNodes.length; i++) {
            target.childNodes[i].style.display = "none";
        }
        target.childNodes[select.selectedIndex].style.display = targetClassName[1];
    }
    function_nextBefoEvent(event) {
        const btn = event.target;
        const select = btn.parentNode.parentNode.previousSibling;
        const newIndex = btn.innerText == ">" ? +1 : -1;
        let index = select.selectedIndex + newIndex;
        let lastIndex = select.childNodes.length - 1;
        if (index < 0) { index = lastIndex } else if (index > lastIndex) { index = 0 }
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change'));
    }
    function_editShowEvent(event) {
        const index = event.target.className.split("_")[0].replace(baseic_regex, "");
        const target = document.querySelector(`.t${index}EditDiv`);
        target.style.display = target.style.display == "none" ? "flex" : "none";
    }
    function_showEvent(event) {
        const target = event.target.className;
        const index = target.split("_")[0].replace(baseic_regex, "");
        if (target.includes("titleBtn")) {
            //const element = document.querySelector(`.t${index}BodyDiv`);
            const element = event.target.parentNode.parentNode.nextSibling;
            const display = element.style.display == "none" ? "block" : "none";
            const plsBtn = event.target.nextSibling;
            plsBtn.innerText = element.style.display == "none" ? "e" : "-";
            element.style.display = display;

            //const element2 = document.querySelector(`.t${index}EditDiv`);
            const element2 = event.target.parentNode.parentNode.nextSibling.childNodes[0];
            element2.style.display = "none";

            

            const observer = new Observer_sendGetData(true);
            observer.check = true;
            observer.name = "tap_memo_text update event";
            observer.target = "tab_U";
            observer.value = `${index}/show/${element.style.display == "none" ? false : true}`;
            subj.subscribe(observer);
            subj.notifyAll();
    
        } else if (target.includes("EditBtn")) {
            const element = document.querySelector(`.t${index}EditDiv`);
            element.style.display = element.style.display == "none" ? "flex" : "none";
        }
    }
    function_editTab(event) {
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "tab update event";
        observer.target = "tab_U";
        const split = event.target.className.split("_");
        const index = split[0].replace(baseic_regex, "");
        let key = split[1];
        let value = event.target.value;
        if (key == "fontFamily" || key == "fontStyle") {
            value = event.target.selectedIndex;
        }
        if(key.includes("fk")){
            key += `_${split[2]}`;
            if(split[2].includes("windowIndex")){
                const winDiv = document.querySelector(`.w${value}`);
                const tapDiv = document.querySelector(`.t${index}`);
                winDiv.appendChild(tapDiv);
            }
        }
        observer.value = `${index}/${key}/${value}`;
        subj.subscribe(observer);
        subj.notifyAll();

        if(key == "backgroundColor"){
            const tabDiv = document.querySelector(`.t${index}`);
            tabDiv.style.backgroundColor = value;
        }else if(key == "fontColor"){
            const tabDiv = document.querySelector(`.t${index}`);
            tabDiv.childNodes[0].childNodes[0].childNodes[0].style.color = value;
        }else if(key == "lineColor" ||key == "lineWeight" ){
            const tabDiv = document.querySelector(`.t${index}`);
            const lineWeight = document.querySelector(`.t${index}_lineWeight`);
            const lineColor = document.querySelector(`.t${index}_lineColor`);
            tabDiv.childNodes[0].childNodes[0].style.borderBottom = `${lineWeight.value}px solid ${lineColor.value}`;
        }else if(key == "width"){
            const tabDiv = document.querySelector(`.t${index}`);
            tabDiv.style.width = `${value}px`;
        }
    }
    function_delTab(event) {
        //element.remove();
        const delTab = document.querySelector(`.t${event.target.className}`);

        const observer = new Observer_sendGetData(true);
        observer.name = "tab delete event";
        observer.target = "tab_D";
        observer.value = event.target.className.split("_")[0].replace(baseic_regex, "");
        observer.check = true;
        subj.subscribe(observer);
        subj.notifyAll();
        delTab.remove();
    }
    function_editIndex(event){
        const index = event.target.className.replace(baseic_regex, "");
        const select = event.target.className.split("_")[1];  
        
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "tab update event";
        observer.target = "tab_U_indexChange";
        observer.value = {index:index, select:select}
        subj.subscribe(observer);
        subj.notifyAll();

        //const winDiv = document.querySelector(`w${index}`);
        
    }

    //click event

    tabEditPage() {
        const MAIN_LINE_DIV = this.div.cloneNode(true);
        MAIN_LINE_DIV.style.display = "flex";
        MAIN_LINE_DIV.style.borderBottom = `${this.db.lineWeight}px solid ${this.db.lineColor}`;

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
        //basic set element

        const editDiv = MAIN_LINE_DIV.cloneNode(true);
        editDiv.style.display = "none";
        editDiv.style.flexWrap = 'wrap';
        editDiv.style.flexDirection = 'column';
        editDiv.className = `t${this.db.index}EditDiv`;
        const editPageSelect = this.select.cloneNode(true);
        editPageSelect.className = `t${this.db.index}editSelectDiv_t${this.db.index}editBookDiv:flex`;
        editPageSelect.style.marginRight = "10px";
        editPageSelect.addEventListener("change", this.function_selectEvent);
        editPageSelect.style.marginLeft = "10px";
        let editSelect_text = ["제목, 삭제, 순서변경", "색상 수정", "글자 수정", "크기 수정",];
        for (let i = 0; i < editSelect_text.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${editSelect_text[i]}`;
            editPageSelect.appendChild(editOption);
        }
        editDiv.appendChild(editPageSelect);

        const editBookDiv = SUB_DIV.cloneNode(true);
        editBookDiv.className = `t${this.db.index}editBookDiv`;
        //-->제목, 삭제
        const pageDiv = SUB_DIV.cloneNode(true);
        const textDiv1 = SUB_DIV.cloneNode(true);
        textDiv1.style.width = "100%";
        textDiv1.className = "textDiv";

        const textDiv2 = textDiv1.cloneNode(true);

        const goTobefo = LEFT_BTN.cloneNode(true);
        goTobefo.innerText = "<= move to befo";
        goTobefo.className = `t${this.db.index}_befo`;
        goTobefo.addEventListener("click", this.function_editIndex);
        const goTonext = LEFT_BTN.cloneNode(true);
        goTonext.innerText = "move to next =>";
        goTonext.className = `t${this.db.index}_next`;
        goTonext.addEventListener("click", this.function_editIndex);

        const changeWinSelect = this.select.cloneNode(true);
        changeWinSelect.className = `t${this.db.index}_fk_windowIndex`;
        if(this.db.tabInfo != null && this.db.tabInfo.winSelect != null){
            let index = 0;
            for(let i=0;i<this.db.tabInfo.winSelect.length;i++){
                const op = this.option.cloneNode(true);
                op.value = this.db.tabInfo.winSelect[i].i;
                op.innerText = this.db.tabInfo.winSelect[i].title;
                changeWinSelect.appendChild(op);
                if(op.value == this.db.fk_windowIndex){ index = i; }
            }
            changeWinSelect.selectedIndex = index;
            changeWinSelect.addEventListener("change", this.function_editTab);
        }

        const hideEditPage = LEFT_BTN.cloneNode(true);
        hideEditPage.innerText = "hideEdit";
        hideEditPage.className = `t${this.db.index}hideEditPage_showHide:t${this.db.index}editDiv:flex`;
        hideEditPage.addEventListener("click", showHide);


        const delWinBtn = LEFT_BTN.cloneNode(true);
        delWinBtn.className = `${this.db.index}`;
        delWinBtn.innerText = "del(X)";
        delWinBtn.style.removeProperty("width");
        delWinBtn.addEventListener("click", this.function_delTab);

        const titleForm = this.form.cloneNode(true);
        titleForm.style.display = "flex";
        titleForm.style.width = "100%"
        titleForm.style.flexDirection = "row";
        const titleInput = this.input.cloneNode(true);
        const titleSub = this.input.cloneNode(true);
        titleInput.value = this.db.name;
        titleInput.className = `t${this.db.index}_name`;
        titleInput.style.flexGrow = 1;
        titleInput.addEventListener("change", this.function_editTab);
        titleSub.value = "sub";
        titleSub.type = "submit";
        titleSub.style.flexGrow = 0;

        titleForm.appendChild(titleInput);
        titleForm.appendChild(titleSub);

        textDiv2.appendChild(goTobefo);
        textDiv2.appendChild(delWinBtn);
        textDiv2.appendChild(goTonext);
        textDiv2.appendChild(changeWinSelect);

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
        pageDiv.className = `t${this.db.index}pageDiv1`;
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
        backColorInput.className = `t${this.db.index}_backgroundColor`;
        backColorInput.addEventListener("change", this.function_editTab);

        backColorDiv.appendChild(backColorTxt);
        backColorDiv.appendChild(backColorInput);
        textAll2.appendChild(backColorDiv);

        const fontColorDiv = SUB_DIV.cloneNode(true);
        const fontColorTxt = backColorTxt.cloneNode(true);
        fontColorTxt.innerText = "글자 색"
        const fontColorInput = backColorInput.cloneNode(true);
        fontColorInput.value = this.db.fontColor;
        fontColorInput.className = `t${this.db.index}_fontColor`;
        fontColorInput.addEventListener("change", this.function_editTab);
        fontColorDiv.appendChild(fontColorTxt);
        fontColorDiv.appendChild(fontColorInput);
        textAll2.appendChild(fontColorDiv);

        const lineColorDiv = SUB_DIV.cloneNode(true);
        const lineColorTxt = backColorTxt.cloneNode(true);
        lineColorTxt.innerText = "라인 색"
        const lineColorInput = backColorInput.cloneNode(true);
        lineColorInput.value = this.db.lineColor;
        lineColorInput.className = `t${this.db.index}_lineColor`;
        lineColorInput.addEventListener("change", this.function_editTab);
        lineColorDiv.appendChild(lineColorTxt);
        lineColorDiv.appendChild(lineColorInput);
        textAll2.appendChild(lineColorDiv);

        const befo2 = befo.cloneNode(true);
        befo2.addEventListener("click", this.function_nextBefoEvent);
        const next2 = next.cloneNode(true);
        next2.addEventListener("click", this.function_nextBefoEvent);

        textAll2.style.width = "100%";
        textAll2.style.flexWrap = "wrap"

        const pageDiv2 = SUB_DIV.cloneNode(true);
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
        const fontSizeInput = this.input.cloneNode(true);
        fontSizeInput.type = "number";
        fontSizeInput.value = this.db.fontSize;
        fontSizeInput.style.width = "50%";
        fontSizeInput.className = `t${this.db.index}_fontSize`;
        fontSizeInput.addEventListener("change", this.function_editTab);

        fontSizeDiv.appendChild(fontSizeTxt);
        fontSizeDiv.appendChild(fontSizeInput);
        textAll3.appendChild(fontSizeDiv);

        const fontWeightDiv = SUB_DIV.cloneNode(true);
        const fontWeightTxt = fontSizeTxt.cloneNode(true);
        fontWeightTxt.innerText = "글자 두께"
        const fontWeightInput = fontSizeInput.cloneNode(true);
        fontWeightInput.min = 0; fontWeightInput.max = 7;
        fontWeightInput.step = 1;
        fontWeightInput.value = this.db.index_fontWeight;
        fontWeightInput.className = `t${this.db.index}_fontWeight`;
        fontWeightInput.addEventListener("change", this.function_editTab);
        fontWeightDiv.appendChild(fontWeightTxt);
        fontWeightDiv.appendChild(fontWeightInput);
        textAll3.appendChild(fontWeightDiv);

        const fontFamilyDiv = SUB_DIV.cloneNode(true);
        const fontFamilyTxt = fontSizeTxt.cloneNode(true);
        fontFamilyTxt.innerText = "글자 종류"
        const fontFamilySelect = this.select.cloneNode(true);
        fontFamilySelect.style.width = "50%";
        for (let i = 0; i < all_fontFamily.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${all_fontFamily[i]}`;
            fontFamilySelect.appendChild(editOption);
        }
        fontFamilySelect.selectedIndex = this.db.index_fontFamily;
        fontFamilySelect.className = `t${this.db.index}_fontFamily`;
        fontFamilySelect.addEventListener("change", this.function_editTab);
        fontFamilyDiv.appendChild(fontFamilyTxt);
        fontFamilyDiv.appendChild(fontFamilySelect);
        textAll3.appendChild(fontFamilyDiv);

        const fontStyleDiv = SUB_DIV.cloneNode(true);
        const fontStyleTxt = fontSizeTxt.cloneNode(true);
        fontStyleTxt.innerText = "글자 모양";
        const fontStyleSelect = this.select.cloneNode(true);
        fontStyleSelect.style.width = "50%";
        for (let i = 0; i < all_fontStyle.length; i++) {
            const editOption = this.option.cloneNode(true);
            editOption.innerText = `${i}.${all_fontStyle[i]}`;
            fontStyleSelect.appendChild(editOption);
        }
        fontStyleSelect.selectedIndex = this.db.index_fontStyle;
        fontStyleSelect.className = `t${this.db.index}_fontStyle`;
        fontStyleSelect.addEventListener("change", this.function_editTab);
        fontStyleDiv.appendChild(fontStyleTxt);
        fontStyleDiv.appendChild(fontStyleSelect);
        textAll3.appendChild(fontStyleDiv);

        const befo3 = befo.cloneNode(true);
        befo3.addEventListener("click", this.function_nextBefoEvent);
        const next3 = next.cloneNode(true);
        next3.addEventListener("click", this.function_nextBefoEvent);

        textAll3.style.width = "100%";
        textAll3.style.flexWrap = "wrap"

        const pageDiv3 = SUB_DIV.cloneNode(true);
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
        const winWidthInput = this.input.cloneNode(true);
        winWidthInput.type = "number";
        winWidthInput.value = this.db.width;
        winWidthInput.style.width = "50%";
        winWidthInput.className = `t${this.db.index}_width`;
        winWidthInput.addEventListener("change", this.function_editTab);
        winWidthDiv.appendChild(winWidthTxt);
        winWidthDiv.appendChild(winWidthInput);
        textAll4.appendChild(winWidthDiv);

        const lineWeightDiv = SUB_DIV.cloneNode(true);
        const lineWeightTxt = fontSizeTxt.cloneNode(true);
        lineWeightTxt.innerText = "라인 두께"
        const lineWeightInput = fontSizeInput.cloneNode(true);
        lineWeightInput.min = 0; lineWeightInput.max = 10;
        lineWeightInput.step = 0.1;
        lineWeightInput.value = this.db.lineWeight;
        lineWeightInput.className = `t${this.db.index}_lineWeight`;
        lineWeightInput.addEventListener("change", this.function_editTab);
        lineWeightDiv.appendChild(lineWeightTxt);
        lineWeightDiv.appendChild(lineWeightInput);
        textAll4.appendChild(lineWeightDiv);

        const befo4 = befo.cloneNode(true);
        befo4.addEventListener("click", this.function_nextBefoEvent);
        const next4 = next.cloneNode(true);
        next4.addEventListener("click", this.function_nextBefoEvent);

        const pageDiv4 = SUB_DIV.cloneNode(true);
        pageDiv4.style.width = "100%"
        pageDiv4.appendChild(befo4);
        pageDiv4.appendChild(textAll4);
        pageDiv4.appendChild(next4);
        pageDiv4.style.display = "none";
        editBookDiv.appendChild(pageDiv4);
        //<--크기 수정

        editDiv.appendChild(editBookDiv);
        return editDiv;
    }
    tabMainPage() {
        const tabDiv = this.div.cloneNode(true);
        tabDiv.className = `t${this.db.index}BodyDiv`;
        if(this.db.type==0){
            const memo = new tabElement_memo();
            memo.setValue(this.db);
            tabDiv.appendChild(memo.setElementAll());   
        }else if(this.db.type == 1){
            const calcul = new tabElement_calcul();
            calcul.setValue(this.db);
            tabDiv.appendChild(calcul.setElementAll());
        }
        tabDiv.style.borderBottom =`${this.db.lineWeight}px solid ${this.db.lineColor}`; 
        return tabDiv;
    }

    setElementAll() {
        //basic element set
        const MAIN_LINE_DIV = this.div.cloneNode(true);
        MAIN_LINE_DIV.style.display = "flex";
        MAIN_LINE_DIV.style.borderBottom = `${this.db.lineWeight}px solid ${this.db.lineColor}`;

        const LEFT_BTN = this.button.cloneNode(true);
        LEFT_BTN.style.flexGrow = 1;
        LEFT_BTN.style.textAlign = "left";

        const MIN_BTN = this.button.cloneNode(true);
        MIN_BTN.style.display = "flex";
        MIN_BTN.style.alignItems = "center";
        MIN_BTN.style.justifyContent = "center";
        MIN_BTN.style.flexShirink = 0;
        MIN_BTN.style.width = "40px";

        //start ---
        const tabDiv = this.div.cloneNode(false);
        tabDiv.style.backgroundColor = this.db.backgroundColor;
        tabDiv.className = `t${this.db.index}`;
        tabDiv.style.display = "inline-block";
        tabDiv.style.width = `${this.db.width}px`;
        tabDiv.style.marginBottom = "5px";
        tabDiv.style.marginRight = "5px";

        //tab head / body
        const tabHeadDiv = this.div.cloneNode(true);
        const tabBodyDiv = this.div.cloneNode(true);
        tabBodyDiv.className = `t${this.db.index}body`
        tabBodyDiv.style.display = this.db.show == true ? "block" : "none";

        //title btn / edit btn
        const titleDiv = MAIN_LINE_DIV.cloneNode(true);
        titleDiv.style.display = "flex";
        const titleBtn = LEFT_BTN.cloneNode(true);
        titleBtn.innerText = this.db.name;
        titleBtn.style.marginLeft = "10px"
        titleBtn.className = `t${this.db.index}_titleBtn_show:body`;
        titleBtn.addEventListener("click", this.function_showEvent);
        //titleBtn.addEventListener('click', this.showHide);
        const tapPlsBtn = MIN_BTN.cloneNode(true);
        tapPlsBtn.innerText = this.db.show ? "e" : "-";
        tapPlsBtn.style.marginRight = 0;
        tapPlsBtn.style.marginLeft = "10px";
        tapPlsBtn.className = `t${this.db.index}EditBtn`;
        tapPlsBtn.addEventListener("click", this.function_editShowEvent);

        titleDiv.appendChild(titleBtn);
        titleDiv.appendChild(tapPlsBtn);
        tabHeadDiv.appendChild(titleDiv);

        const tabEditPage = this.tabEditPage();
        const tabMainPage = this.tabMainPage();
        tabBodyDiv.appendChild(tabEditPage);
        tabBodyDiv.appendChild(tabMainPage);

        tabDiv.appendChild(tabHeadDiv);
        tabDiv.appendChild(tabBodyDiv);

        return tabDiv;
    }
}
class tabElement_memo {
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;
    textarea = null;
    mark = null;

    allCheck = null;

    db = {
        textArr : null,
        colorArr : null,
        inputShow:null,

        index: null,
        sort: null,

        fontSize: null, fontWeight: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null,
        lineColor: null, lineThick: null,

        index_fontFamily: null,
        index_fontStyle: null,
        index_fontWeight: null
    }
    constructor() {
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.input = document.createElement("input");
        this.form = document.createElement("form");
        this.select = document.createElement("select");
        this.option = document.createElement("option");
        this.textarea = document.createElement("textarea");
        this.mark = document.createElement("mark");
    }
    setValue(db) {
        this.db.textArr = db.tabInfo.text;
        this.db.colorArr = db.tabInfo.color;
        this.db.sort = db.sort;
        this.db.inputShow = db.inputShow;

        this.allCheck = false;

        this.db.befoIndex = db.befoIndex;
        this.db.index = db.index;
        this.db.nextIndex = db.nextIndex;

        this.db.title = db.name;
        this.db.show = db.show;

        this.db.index_fontFamily = db.fontFamily;
        this.db.index_fontStyle = db.fontStyle;
        this.db.index_fontWeight = db.fontWeight;

        this.db.fontSize = db.fontSize;
        this.db.fontWeight = db.fontWeight < 100 ? all_fontWeight[db.fontWeight] : db.fontWeight;
        this.db.fontFamily = isNaN(Number(db.fontFamily)) ? db.fontFamily : all_fontFamily[db.fontFamily];
        this.db.fontStyle = all_fontStyle[db.fontStyle];

        this.db.fontColor = db.fontColor;
        this.db.backgroundColor = db.backgroundColor;
        this.db.lineColor = db.lineColor;

        this.db.width = db.width;
        this.db.lineThick = db.lineWeight;
        //make basic
        this.button.style.backgroundColor = "transparent";
        this.input.style.backgroundColor = "transparent";
        this.div.style.backgroundColor = "transparent";
        this.select.style.backgroundColor = "transparent";
        this.textarea.style.backgroundColor = "transparent";
        this.option.style.backgroundColor = this.db.backgroundColor;
        this.mark.style.backgroundColor = "transparent";

        this.select.style.border = "none";
        this.button.style.border = "none";
        this.input.style.border = "none";
        this.textarea.style.border = "none";
        this.mark.style.border = "none";

        this.select.style.padding = "0";
        this.button.style.padding = "0";
        this.input.style.padding = "0";
        this.textarea.style.padding = "0";
        this.mark.style.padding = "0";

        this.select.style.marginLeft = "10px";
        this.button.style.marginLeft = "10px";

        this.select.style.height = "40px";
        this.button.style.height = "40px";
        this.input.style.height = "40px";
        this.mark.style.height = "40px";

        this.select.style.fontFamily = this.db.fontFamily;
        this.select.style.fontSize = `${this.db.fontSize}pt`;
        this.select.style.fontWeight = this.db.fontWeight;
        this.select.style.fontStyle = this.db.fontStyle;
        this.select.style.color = this.db.fontColor;

        this.option.style.fontFamily = this.db.fontFamily;
        this.option.style.fontSize = `${this.db.fontSize}pt`;
        this.option.style.fontWeight = this.db.fontWeight;
        this.option.style.fontStyle = this.db.fontStyle;
        this.option.style.color = this.db.fontColor;

        this.button.style.fontFamily = this.db.fontFamily;
        this.button.style.fontSize = `${this.db.fontSize}pt`;
        this.button.style.fontWeight = this.db.fontWeight;
        this.button.style.fontStyle = this.db.fontStyle;
        this.button.style.color = this.db.fontColor;

        this.input.style.fontFamily = this.db.fontFamily;
        this.input.style.fontSize = `${this.db.fontSize}pt`;
        this.input.style.fontWeight = this.db.fontWeight;
        this.input.style.fontStyle = this.db.fontStyle;
        this.input.style.color = this.db.fontColor;

        this.div.style.fontFamily = this.db.fontFamily;
        this.div.style.fontSize = `${this.db.fontSize}pt`;
        this.div.style.fontWeight = this.db.fontWeight;
        this.div.style.fontStyle = this.db.fontStyle;
        this.div.style.color = this.db.fontColor;

        this.textarea.style.fontFamily = this.db.fontFamily;
        this.textarea.style.fontSize = `${this.db.fontSize}pt`;
        this.textarea.style.fontWeight = this.db.fontWeight;
        this.textarea.style.fontStyle = this.db.fontStyle;
        this.textarea.style.color = this.db.fontColor;

        this.mark.style.fontFamily = this.db.fontFamily;
        this.mark.style.fontSize = `${this.db.fontSize}pt`;
        this.mark.style.fontWeight = this.db.fontWeight;
        this.mark.style.fontStyle = this.db.fontStyle;
        this.mark.style.color = this.db.fontColor;

        this.MIN_BTN = this.button.cloneNode(true);
        this.MIN_BTN.style.display = "flex";
        this.MIN_BTN.style.alignItems = "center";
        this.MIN_BTN.style.justifyContent = "center";
        this.MIN_BTN.style.flexShirink = 0;
        this.MIN_BTN.style.width = "40px";
    }

    tab_memo_div = null;
    //head - i btn / form(textarea, sub, color-input, select) / select-sort(new, old, color)
    //body - checkbox / text(text div, edit input, color select, copy btn, del btn)
    //foot - checkbox(all) / select(all, color1~3) / del btn 

    //event --> sort / copy / checkAll(copy)
    function_showEvent(event) {
        const target = event.target.className;
        const split = target.split("_");
        const index = split[0].replace(baseic_regex, "");
        if (target.includes("iBtn")) {
            const element = document.querySelector(`.t${index}inputDiv`);
            element.style.display = element.style.display == "none" ? "flex" : "none";

            const element2 = document.querySelector(`.t${index}subDiv`);
            element2.style.display = element2.style.display == "none" ? "flex" : "none";

            let value = element2.style.display == "none" ? false : true;
            const observer = new Observer_sendGetData(true);
            observer.name = "tab_memo_color update event";
            observer.target = "tab_U";
            observer.value = `${index}/"inputShow"/${value}`//value:value, index:, :,
            subj.subscribe(observer);
            subj.notifyAll();
        } else if (target.includes("editBtn")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_textDiv`);
            element.style.display = element.style.display == "none" ? "block" : "none";

            const element1 = document.querySelector(`.${split[0]}_${split[1]}_editDiv`);
            element1.style.display = element1.style.display == "none" ? "block" : "none";

            const element2 = document.querySelector(`.${split[0]}_${split[1]}_editBtnsDiv`);
            element2.style.display = element2.style.display == "none" ? "block" : "none";

            const element3 = document.querySelector(`.${split[0]}_${split[1]}_colorECBtn`);
            element3.style.display = element3.style.display == "none" ? "flex" : "none";
        } else if (target.includes("subBtn")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_textDiv`);
            element.style.display = element.style.display == "none" ? "block" : "none";

            const element1 = document.querySelector(`.${split[0]}_${split[1]}_editDiv`);
            element1.style.display = element1.style.display == "none" ? "block" : "none";

            const element2 = document.querySelector(`.${split[0]}_${split[1]}_editBtnsDiv`);
            element2.style.display = element2.style.display == "none" ? "block" : "none";

            const element3 = document.querySelector(`.${split[0]}_${split[1]}_colorECBtn`);
            element3.style.display = element3.style.display == "none" ? "flex" : "none";

            const tupleIndex = split[1].replace(baseic_regex, "");
            const textarea = document.querySelector(`.${split[0]}_${split[1]}_editDiv`).childNodes[0];    
            const mark = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            mark.innerText = textarea.value;
            const observer = new Observer_sendGetData(true);
            observer.check = true;
            observer.name = "tap_memo_text update event";
            observer.target = "tab_memo_text_U";
            observer.value = {index:tupleIndex, key:"text" , value:textarea.value};        
            subj.subscribe(observer);
            subj.notifyAll();
        }
    }
    function_checkEvent(event) {
        const target = event.target.className;
        const split = target.split("_");
        if (target.includes("textDiv") || target.includes("emptyDiv") || target.includes("mark")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_checkbox`);
            element.checked = element.checked == true ? false : true;

            const colorArr = document.querySelector(`.${split[0]}_colorInputDiv`);
            const fontColor = document.querySelector(`.${split[0]}_fontColor`);

            const element1 = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            element1.style.textDecorationLine = element.checked ? "line-through" : "none";
            element1.style.color = element.checked ? `${colorArr.childNodes[3].value}` : `${fontColor.value}`;

            const observer = new Observer_sendGetData(true);
            observer.name = "tap_memo_text update event";
            observer.target = "tab_memo_text_U";
            observer.value = {index:split[1].replace(baseic_regex, ""), 
                key:"checked", value:element.checked};
            subj.subscribe(observer);
            subj.notifyAll();

            return
        } else if (target.includes("checkbox")) {
            const element1 = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            element1.style.textDecorationLine = event.target.checked ? "line-through" : "none";
            element1.style.color = event.target.checked ? "gray" : "black";
        } else if (target.includes("allCheckbox")) {
            const element = document.querySelector(`.${split[0]}_tuplesDiv`);
            for (let i = 0; i < element.childNodes.length; i++) {
                const checkbox = element.childNodes[i].childNodes[0].childNodes[0];
                if (checkbox.checked != event.target.checked) {
                    element.childNodes[i].childNodes[1].childNodes[0].childNodes[0].dispatchEvent(new Event('click'));
                }
            }
        }
    }
    function_selectEvent(event) {
        const target = event.target.className;
        const split = target.split("_");
        if (target.includes("colorInputSelect")) {
            const element = document.querySelector(`.${split[0]}_colorInputDiv`);
            for (let i = 0; i < element.childElementCount; i++) {
                element.childNodes[i].style.display = "none";
            }
            if(event.target.selectedIndex-1 != -1){
                element.childNodes[event.target.selectedIndex -1].style.display = event.target.selectedIndex != 0 ? "block" : "none";
            }
        }else if(target.includes("tupleColorSelect")){
            const colorArr = document.querySelector(`.${split[0]}_colorInputDiv`);
            const mark = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            const index = event.target.selectedIndex;
            if(index != 0){
                mark.style.backgroundColor = colorArr.childNodes[index - 1].value;
            }else{
                mark.style.backgroundColor = "transparent";
            }

            const observer = new Observer_sendGetData(true);
            observer.name = "tap_memo_text update event";
            observer.target = "tab_memo_text_U";
            observer.value = {index:split[1].replace(baseic_regex, ""), 
                key:"fk_colorIndex", value:index};
            subj.subscribe(observer);
            subj.notifyAll();
        }else if(target.includes("sortBtn")){
            const index = split[0].replace(baseic_regex, "");
            const key = "sort";
            const value = event.target.selectedIndex;

            const observer = new Observer_sendGetData(true);
            observer.check = true;
            observer.name = "tap update event";
            observer.target = "tab_U";
            observer.value = `${index}/${key}/${value}`;        
            subj.subscribe(observer);
            subj.notifyAll();

            const tuplesDiv = document.querySelector(`.t${index}_tuplesDiv`);
            const len = tuplesDiv.childNodes.length;
            if(value == 0){
                //const div = document.createElement("div"); 
                let exArr = [];
                for(let i=0; i<len; i++){
                    const i_tuple = tuplesDiv.childNodes[i];
                    const i_index = i_tuple.childNodes[0].childNodes[0].value
                    exArr.push(i_index);
                }
                exArr.sort((a, b) => b - a);
                for(let i=0; i<exArr.length; i++){
                    let n = 0; 
                    while(true){
                        const j_tuple = tuplesDiv.childNodes[n];
                        const j_index = j_tuple.childNodes[0].childNodes[0].value
                        if(exArr[i] == j_index){
                            tuplesDiv.appendChild(j_tuple);
                            break;
                        }
                        n += 1;
                    }
                }
            }else if(value == 1){
                let exArr = [];
                for(let i=0; i<len; i++){
                    const i_tuple = tuplesDiv.childNodes[i];
                    const i_index = i_tuple.childNodes[0].childNodes[0].value
                    exArr.push(i_index);
                }
                exArr.sort((a, b) => a - b);
                for(let i=0; i<exArr.length; i++){
                    let n = 0; 
                    while(true){
                        const j_tuple = tuplesDiv.childNodes[n];
                        const j_index = j_tuple.childNodes[0].childNodes[0].value
                        if(exArr[i] == j_index){
                            tuplesDiv.appendChild(j_tuple);
                            break;
                        }
                        n += 1;
                    }
                }
            }else if(value == 2){
                let all = [ [], [], [], [] ];
                for(let j=0; j<all.length; j++){
                    for(let i=0; i<len; i++){
                        const i_tuple = tuplesDiv.childNodes[i];
                        const i_index = i_tuple.childNodes[0].childNodes[0].value
                        const i_color = i_tuple.childNodes[1].childNodes[1].childNodes[0].childNodes[2].selectedIndex;
                        if(i_color == j){
                            all[j].push(i_index);
                        }
                    }
                }
                for(let i=0; i<all.length;i++){
                    all[i].sort((a, b) => a - b);
                }
                for(let i=1; i<all.length; i++){
                    for(let j=0; j<all[i].length;j++){
                        let n = 0; 
                        while(true){
                            const j_tuple = tuplesDiv.childNodes[n];
                            const j_index = j_tuple.childNodes[0].childNodes[0].value
                            if(all[i][j] == j_index){
                                tuplesDiv.appendChild(j_tuple);
                                break;
                            }
                            n += 1;
                        }
                    }
                }// for(let j=0; j<all[i].length;j++){
                    for(let i=0; i<1; i++){
                        for(let j=0; j<all[i].length;j++){
                            let n = 0; 
                            while(true){
                                const j_tuple = tuplesDiv.childNodes[n];
                                const j_index = j_tuple.childNodes[0].childNodes[0].value
                                if(all[i][j] == j_index){
                                    tuplesDiv.appendChild(j_tuple);
                                    break;
                                }
                                n += 1;
                            }
                        }
                    }
            }
        }
    }
    function_copyEvent(event){
        const target = event.target.className;
        const split = target.split("_");
        if (target.includes("tupleCopy")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            copyToClipboard(element.innerText);
        }else if(target.includes("copyAll")){
            const select = event.target.previousSibling.previousSibling;
            const element = document.querySelector(`.${split[0]}_tuplesDiv`);
            let text = "";
            for (let i = 0; i < element.childNodes.length; i++) {
                const checkbox = element.childNodes[i].childNodes[0].childNodes[0];
                if(checkbox.checked){
                    const mark = element.childNodes[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
                    const color = element.childNodes[i].childNodes[1].childNodes[1].childNodes[0].childNodes[2];
                    if(select.selectedIndex != 0 && select.selectedIndex==color.selectedIndex){
                        text += mark.innerText
                        text += "\n";
                    }else if(select.selectedIndex == 0){
                        text += mark.innerText
                        text += "\n";
                    }
                }
            }
            copyToClipboard(text);
        }
    }
    function_newTuple(event){
        const tabIndex = event.target.className.replace(baseic_regex, "");
        const textarea = document.querySelector(`.t${tabIndex}_textarea`);
        const text = textarea.value;
        const colorIndex = document.querySelector(`.t${tabIndex}_colorInputSelect`).selectedIndex;

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "tap_memo_text update event";
        observer.target = "tab_memo_text_C";
        observer.value = {tabIndex:tabIndex, text:text, colorIndex:colorIndex};        
        subj.subscribe(observer);
        subj.notifyAll();

        textarea.value = null;
    }
    function_colorSelectEdit(event){
        const target = event.target.className;
        const tabIndex = target.split("_")[0].replace(baseic_regex, "");
        const key = target.split("_")[1];

        const observer = new Observer_sendGetData(true);
        observer.name = "tab_memo_color update event";
        observer.target = "tab_memo_color_U";
        observer.value = {value:event.target.value, index:tabIndex,
            key:key,
        }
        subj.subscribe(observer);
        subj.notifyAll();
    }
    function_delTuple(event){
        const split = event.target.className.split("_");
        const tuple = document.querySelector(`.${split[0]}_${split[1]}_tupleDiv`);
        const tupleIndex = split[1].replace(baseic_regex, "");

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "tap_memo_text update event";
        observer.target = "tab_memo_text_D";
        observer.value = tupleIndex;    
        subj.subscribe(observer);
        subj.notifyAll();

        tuple.remove();
    }
    function_allDelTuple(event){
        const index = event.target.className.split("_")[0].replace(baseic_regex, "");
        const select = event.target.previousSibling;

        const tuplesDiv = document.querySelector(`.t${index}_tuplesDiv`);
        for(let i=tuplesDiv.childNodes.length-1;i>=0;i--){
            const checkbox = tuplesDiv.childNodes[i].childNodes[0].childNodes[0];
            const color = tuplesDiv.childNodes[i].childNodes[1].childNodes[1].childNodes[0].childNodes[2];
            const del = tuplesDiv.childNodes[i].childNodes[1].childNodes[1].childNodes[0].childNodes[3];
            if(checkbox.checked){
                if(select.selectedIndex != 0 && select.selectedIndex==color.selectedIndex){
                    del.click();
                }else if(select.selectedIndex == 0){
                    del.click();
                }
            }
        }
        
    }
    function_editIndex(event){
        const target = event.target.className.split("_");
        const index = target[0].replace(baseic_regex, "");
        const tupleIndex1 = target[1].replace(baseic_regex, "");
        const key = target[2];
        let tupleIndex2 = null;
        if(key == "befo"){
            const befoElement = event.target.parentNode.parentNode.parentNode.parentNode.previousSibling;
            if(befoElement != null){
                tupleIndex2 = befoElement;
            }else{
                console.log("?");
                return
            }
        }else if(key == "next"){
            const nextElement = event.target.parentNode.parentNode.parentNode.parentNode.nextSibling;
            if(nextElement != null){
                tupleIndex2 = nextElement;
            }else{
                return
            }
        }

        const table = document.querySelector(`.t${index}_tuplesDiv`)
        const len = table.childNodes.length;


        if(key.includes("next")){
            let firstNodeNot = true;
            for(let i=0;i<len; i++){
                if(table.childNodes[i].className == `t${index}_i${tupleIndex1}_tupleDiv` && i == len -1){
                    firstNodeNot = false; break
                }
            }
            if(firstNodeNot){
                for(let i=0;i<len; i++){
                    if(table.childNodes[0].className == `t${index}_i${tupleIndex1}_tupleDiv`){
                        const nextNodeClassName = table.childNodes[1].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);

                        tupleIndex2 = nextNodeClassName.split("_")[1].replace(baseic_regex, "");
    
                        const nowNode = document.querySelector(`.t${index}_i${tupleIndex1}_tupleDiv`);
                        table.appendChild(nextNode);
                        table.appendChild(nowNode);
                        i += 1;
                    }else{
                        const nextNodeClassName = table.childNodes[0].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
                        table.appendChild(nextNode);
                    }

                }
            }
        }else if(key.includes("befo")){
            let firstNodeNot = true; let next = null;
            for(let i=0;i<len; i++){
                if(table.childNodes[i].className == `t${index}_i${tupleIndex1}_tupleDiv`){
                    if(table.childNodes[i - 1] != null){
                        next = table.childNodes[i - 1].className;
                    }
                }
                if(table.childNodes[i].className == `t${index}_i${tupleIndex1}_tupleDiv` && i == 0){
                    firstNodeNot = false; break
                }

            }
            if(firstNodeNot){
                for(let i=0;i<len; i++){
                    if(table.childNodes[0].className == `${next}`){
                        const befoNodeClassName = table.childNodes[0].className;
                        const befoNode = document.querySelector(`.${befoNodeClassName}`);
                        
                        tupleIndex2 = befoNodeClassName.split("_")[1].replace(baseic_regex, "");
                        
                        const nowNode = document.querySelector(`.t${index}_i${tupleIndex1}_tupleDiv`);
                        table.appendChild(nowNode);
                        table.appendChild(befoNode);
                        i += 1;
                    }else{
                        const nextNodeClassName = table.childNodes[0].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
                        table.appendChild(nextNode);
                    }
                }
            }
        }

        if(tupleIndex2 != null){
            const observer = new Observer_sendGetData(true);
            observer.name = "tab_memo_text update event";
            observer.target = "tab_memo_text_U_indexChange";
            observer.value = {tupleIndex1:tupleIndex1, tupleIndex2:tupleIndex2}
            console.log(observer.value);
            subj.subscribe(observer);
            subj.notifyAll();
        }
    }

    //background-color: transparent; border: none; padding: 0px; margin-left: 10px; height: 40px; font-family: sans-serif; font-size: 14pt; color: rgb(0, 117, 66); width: 40px;
    //background-color: transparent; border: none; padding: 0px; margin-left: 10px; height: 40px; font-family: sans-serif; font-size: 14pt; font-weight: 100; font-style: normal; color: rgb(0, 117, 66); width: 40px;
    //<-- event
    setHead() {
        const tab_headDiv = this.div.cloneNode(true);
        tab_headDiv.className = `t${this.db.index}head`;
        tab_headDiv.style.marginTop = "10px";
        tab_headDiv.style.borderBottom = `${this.db.lineThick}px solid ${this.db.lineColor}`;

        const MIN_BTN = this.button.cloneNode(true);
        MIN_BTN.style.display = "flex";
        MIN_BTN.style.alignItems = "center";
        MIN_BTN.style.justifyContent = "center";
        MIN_BTN.style.flexShirink = 0;
        MIN_BTN.style.width = "40px";

        const i_btn_div = this.div.cloneNode(true);
        const i_btn = MIN_BTN.cloneNode(true);

        i_btn.innerText = "i";
        i_btn.style.alignItems = "stretch";
        i_btn.style.height = "100%";
        //i_btn.style.paddingTop = "5px";
        i_btn.style.marginLeft = 0;
        i_btn.className = `t${this.db.index}iBtn`;
        i_btn.addEventListener("click", this.function_showEvent);
        i_btn_div.appendChild(i_btn);

        const formDiv = this.div.cloneNode(true);
        formDiv.className = `t${this.db.index}Form`;
        const textarea = this.textarea.cloneNode(true);
        textarea.rows = "5"; textarea.placeholder = "input memo...";
        textarea.className = `t${this.db.index}_textarea`;
        textarea.style.width = "100%";

        const sortSelect = this.select.cloneNode(true);
        const sortText = ["new", "old", "color"];
        for (let i = 0; i < sortText.length; i++) {
            const op = this.option.cloneNode(true);
            op.innerText = sortText[i];
            sortSelect.appendChild(op);
        }
        sortSelect.className = `t${this.db.index}sortBtn`;
        sortSelect.selectedIndex = this.db.sort;
        sortSelect.addEventListener("change",this.function_selectEvent);
        const colorText = ["⁙⁙⁙⁙", "color1", "color2", "color3", "done"];
        const colorSelect = this.select.cloneNode(true);
        colorSelect.className = `t${this.db.index}_colorInputSelect`;
        colorSelect.addEventListener("change", this.function_selectEvent);
        for (let i = 0; i < colorText.length; i++) {
            const op = this.option.cloneNode(true);
            op.innerText = colorText[i];
            colorSelect.appendChild(op);
        }
        const subBtn = MIN_BTN.cloneNode(true);
        subBtn.style.marginRight = "10px";
        subBtn.className = `t${this.db.index}_subBtn`;
        subBtn.innerText = "sub";
        subBtn.addEventListener("click", this.function_newTuple);

        const colorInputDiv = this.div.cloneNode(true);
        colorInputDiv.className = `t${this.db.index}_colorInputDiv`;

            const colorInput = this.input.cloneNode(true);
            colorInput.type = "color";
            colorInput.style.display = "none";
            colorInput.value = this.db.colorArr.color1;
            colorInput.className = `t${this.db.index}_color1`;
            colorInput.addEventListener("change", this.function_colorSelectEdit);
            colorInputDiv.appendChild(colorInput);

            const colorInput2 = colorInput.cloneNode(true);
            colorInput2.value = this.db.colorArr.color2;
            colorInput2.className = `t${this.db.index}_color2`;
            colorInput2.addEventListener("change", this.function_colorSelectEdit);
            colorInputDiv.appendChild(colorInput2);
            const colorInput3 = colorInput.cloneNode(true);
            colorInput3.value = this.db.colorArr.color3;
            colorInput3.className = `t${this.db.index}_color3`;
            colorInput3.addEventListener("change", this.function_colorSelectEdit);
            colorInputDiv.appendChild(colorInput3);
            const colorInput4 = colorInput.cloneNode(true);
            colorInput4.className = `t${this.db.index}_done`;
            colorInput4.addEventListener("change", this.function_colorSelectEdit);
            colorInput4.value = this.db.colorArr.done;
            colorInputDiv.appendChild(colorInput4);


        const allDiv = this.div.cloneNode(true);
        const upDiv = this.div.cloneNode(true);
        const downDiv = this.div.cloneNode(true);

        tab_headDiv.style.display = "flex";
        tab_headDiv.style.flexDirection = "row";
        tab_headDiv.appendChild(i_btn_div);


        upDiv.style.display = this.db.inputShow ? "flex" : "none";
        upDiv.className = `t${this.db.index}inputDiv`
        upDiv.appendChild(textarea);

        downDiv.style.display = "flex";
        downDiv.style.flexDirection = "row";
        downDiv.style.flexWrap = "wrap";
        downDiv.style.flexGrow = "1";
        downDiv.appendChild(sortSelect);

        const textareaTogather = this.div.cloneNode(true);
        textareaTogather.style.display = this.db.inputShow ? "flex" : "none";
        textareaTogather.style.flexDirection = "row-reverse";
        textareaTogather.flexWrap = "wrap";
        textareaTogather.appendChild(subBtn);
        textareaTogather.appendChild(colorSelect);
        textareaTogather.appendChild(colorInputDiv);
        textareaTogather.className = `t${this.db.index}subDiv`;
        textareaTogather.style.flexGrow = 1;
        downDiv.appendChild(textareaTogather);

        allDiv.style.display = "flex";
        allDiv.style.flexDirection = "column";
        allDiv.appendChild(upDiv);
        allDiv.appendChild(downDiv);

        allDiv.style.flexGrow = 1;
        tab_headDiv.appendChild(allDiv);

        this.tab_memo_div.appendChild(tab_headDiv);
    }
    setBody() {
        const bodyDiv = this.div.cloneNode(true);
        bodyDiv.className = `t${this.db.index}_tuplesDiv`;
        this.allCheck = true;
        /*
        for (let i = 0; i < this.db.textArr.length; i++) {
            const tuple = this.makeTuple(this.db.textArr[i].checked, this.db.textArr[i].index, this.db.textArr[i].text, this.db.textArr[i].fk_colorIndex);
            if(this.db.textArr[i].checked==false){ this.allCheck = false; }
            bodyDiv.appendChild(tuple);
        }
        */
        if(true){
            const len = this.db.textArr.length;
            if(this.db.sort == 0){
                for (let i = len-1; i >= 0; i--) {
                    const tuple = this.makeTuple(this.db.textArr[i].checked, this.db.textArr[i].index, this.db.textArr[i].text, this.db.textArr[i].fk_colorIndex);
                    if(this.db.textArr[i].checked==false){ this.allCheck = false; }
                    bodyDiv.appendChild(tuple);
                }
            }else if(this.db.sort == 1){
                for (let i = 0; i < len; i++) {
                    const tuple = this.makeTuple(this.db.textArr[i].checked, this.db.textArr[i].index, this.db.textArr[i].text, this.db.textArr[i].fk_colorIndex);
                    if(this.db.textArr[i].checked==false){ this.allCheck = false; }
                    bodyDiv.appendChild(tuple);
                }
            }else if(this.db.sort == 2){
                let all = [ [], [], [], [] ];
                for(let j=0; j<all.length; j++){
                    for(let i=0; i<len; i++){
                        const i_index = i;
                        const i_color = this.db.textArr[i].fk_colorIndex;
                        if(i_color == j){
                            all[j].push(i_index);
                        }
                    }
                }
                for(let i=0; i<all.length;i++){
                    all[i].sort((a, b) => a - b);
                }
                for(let i=1; i<all.length; i++){
                    for(let j=0; j<all[i].length;j++){
                        const index = all[i][j];
                        const tuple = this.makeTuple(this.db.textArr[index].checked, this.db.textArr[index].index, this.db.textArr[index].text, this.db.textArr[index].fk_colorIndex);
                        if(this.db.textArr[index].checked==false){ this.allCheck = false; }
                        bodyDiv.appendChild(tuple);
                    }
                }
                for(let i=0; i<1; i++){
                    for(let j=0; j<all[i].length;j++){
                        const index = all[i][j];
                        const tuple = this.makeTuple(this.db.textArr[index].checked, this.db.textArr[index].index, this.db.textArr[index].text, this.db.textArr[index].fk_colorIndex);
                        if(this.db.textArr[index].checked==false){ this.allCheck = false; }
                        bodyDiv.appendChild(tuple);
                    }
                }
            }
        }
        
        this.tab_memo_div.appendChild(bodyDiv);
    }
    setFoot(check) {
        const footDiv = this.div.cloneNode(true);

        const checkDiv = this.div.cloneNode(true);
        const checkAll = this.input.cloneNode(true);
        checkAll.type = "checkbox";
        checkAll.checked = check;
        checkDiv.style.width = "40px";
        checkAll.className = `t${this.db.index}_allCheckbox`;
        checkAll.addEventListener("change", this.function_checkEvent);
        checkDiv.appendChild(checkAll);

        const select = this.select.cloneNode(true);
        let text = ["all", "color1", "color2", "color3"];
        for (let i = 0; i < text.length; i++) {
            const op = this.option.cloneNode(true);
            op.innerText = text[i];
            select.appendChild(op);
        }

        const copyBtn = this.button.cloneNode(true);
        copyBtn.innerText = "c";
        copyBtn.style.width = "40px";
        copyBtn.className = `t${this.db.index}_copyAll`
        copyBtn.addEventListener("click", this.function_copyEvent);
        const delBtn = copyBtn.cloneNode(true);
        delBtn.innerText = "x"
        delBtn.className = `t${this.db.index}_delAll`
        delBtn.addEventListener("click", this.function_allDelTuple); 


        const rightDiv = this.div.cloneNode(true);
        rightDiv.appendChild(select);
        rightDiv.appendChild(delBtn);
        rightDiv.appendChild(copyBtn);

        footDiv.appendChild(checkDiv);
        footDiv.appendChild(rightDiv);
        footDiv.style.display = "flex";


        this.tab_memo_div.appendChild(footDiv);
    }
    makeTuple(checked, index, text, colorIndex) {
        const tupleDiv = this.div.cloneNode(true);
        tupleDiv.className = `t${this.db.index}_i${index}_tupleDiv`;

        const chekDiv = this.div.cloneNode(true);
        chekDiv.style.display = "flex";
        chekDiv.style.alignItems = "stretch";
        const checkBox = this.input.cloneNode(true);
        checkBox.type = "checkbox";
        checkBox.width = "40px"
        checkBox.style.color = `${this.db.fontColor}`;
        checkBox.style.height = "100%";
        checkBox.value = index;
        checkBox.checked = checked;
        checkBox.style.display = "flex";
        checkBox.style.alignItems = "stretch";
        checkBox.className = `t${this.db.index}_i${index}_checkbox`;
        checkBox.addEventListener("change", this.function_checkEvent);

        chekDiv.style.display = "flex";
        chekDiv.style.alignItems = "stretch";

        chekDiv.style.width = "40px";
        chekDiv.appendChild(checkBox);

        const textDiv = this.div.cloneNode(true);
        const mark = this.mark.cloneNode(true);
        mark.style.width = "100%";
        mark.style.wordBreak = "break-word";
        mark.innerText = text;
        mark.className = `t${this.db.index}_i${index}_mark`;
        if(colorIndex != null){
            if(colorIndex == 1){mark.style.backgroundColor = this.db.colorArr.color1}
            else if(colorIndex == 2){mark.style.backgroundColor = this.db.colorArr.color2}
            else if(colorIndex == 3){mark.style.backgroundColor = this.db.colorArr.color3}
        }
        //mark.style.backgroundColor = "rgb(234, 37, 37)";
        mark.style.textDecorationLine = checked ? "line-through" : "none";
        mark.style.color = checked ? `${this.db.colorArr.done}` : `${this.db.fontColor}`;
        //mark.addEventListener("click",this.function_checkEvent);
        textDiv.style.textAlign = "start";
        textDiv.className = `t${this.db.index}_i${index}_textDiv`;
        textDiv.appendChild(mark);
        textDiv.addEventListener("click", this.function_checkEvent);

        const editDiv = this.div.cloneNode(true);
        const textareaEdit = this.textarea.cloneNode(true);
        textareaEdit.value = text;
        textareaEdit.rows = 5;
        textareaEdit.style.width = "100%"
        editDiv.style.display = "none";
        editDiv.className = `t${this.db.index}_i${index}_editDiv`;
        editDiv.appendChild(textareaEdit);

        const editDiv2 = this.div.cloneNode(true);
        const goUpBtn = this.button.cloneNode(true);
        goUpBtn.innerText = "Λ";
        goUpBtn.className = `t${this.db.index}_i${index}_befo`;
        goUpBtn.addEventListener("click", this.function_editIndex);
        goUpBtn.style.width = "40px";
        const goDownBtn = this.button.cloneNode(true);
        goDownBtn.innerText = "V";
        goDownBtn.className = `t${this.db.index}_i${index}_next`;
        goDownBtn.addEventListener("click", this.function_editIndex);
        goDownBtn.style.width = "40px";
        const subBtn = this.button.cloneNode(true);
        subBtn.innerText = "sub";
        subBtn.style.width = "40px";
        subBtn.style.marginRight = "10px";
        subBtn.className = `t${this.db.index}_i${index}_subBtn`;
        subBtn.addEventListener("click", this.function_showEvent);
        editDiv2.appendChild(goUpBtn);
        editDiv2.appendChild(goDownBtn);
        editDiv2.appendChild(subBtn);
        editDiv2.style.display = "none";
        editDiv2.className = `t${this.db.index}_i${index}_editBtnsDiv`;

        const mainBtnDiv = this.div.cloneNode(true);
        const copyBtn = this.button.cloneNode(true);
        copyBtn.innerText = "c"; copyBtn.style.width = "40px";
        copyBtn.className = `t${this.db.index}_i${index}_tupleCopy`;
        copyBtn.addEventListener("click", this.function_copyEvent);

        const delBtn = this.button.cloneNode(true);
        delBtn.className = `t${this.db.index}_i${index}_delBtn`;
        delBtn.innerText = "x"; delBtn.style.width = "40px";
        delBtn.addEventListener("click", this.function_delTuple);
        const editBtn = this.button.cloneNode(true);
        editBtn.innerText = "e"; editBtn.style.width = "40px";
        editBtn.className = `t${this.db.index}_i${index}_editBtn`;
        editBtn.addEventListener("click", this.function_showEvent);

        const colorSelect = this.select.cloneNode(true);
        let colorText = ["⁙⁙⁙⁙", "color1", "color2", "color3"];
        for (let i = 0; i < colorText.length; i++) {
            const op = this.option.cloneNode(true);
            op.innerText = `${colorText[i]}`;
            op.value = i;
            colorSelect.appendChild(op);
        }
        colorSelect.selectedIndex = colorIndex;
        colorSelect.className = `t${this.db.index}_i${index}_tupleColorSelect`;
        colorSelect.addEventListener("change", this.function_selectEvent);
        mainBtnDiv.style.display = "flex";
        mainBtnDiv.style.flexDirection = "row-reverse";
        mainBtnDiv.className = `t${this.db.index}_i${index}_colorECBtn`;

        mainBtnDiv.appendChild(copyBtn);
        mainBtnDiv.appendChild(editBtn);
        mainBtnDiv.appendChild(colorSelect);
        mainBtnDiv.appendChild(delBtn);

        const mainAreaDiv = this.div.cloneNode(true);
        mainAreaDiv.appendChild(textDiv);
        mainAreaDiv.appendChild(editDiv);
        mainAreaDiv.style.paddingTop = "10px";

        const btnDiv = this.div.cloneNode(true);
        btnDiv.style.display = "flex";
        btnDiv.style.flexDirection = "row-reverse";
        editDiv2.style.width = "160px";

        const emptyDiv = this.div.cloneNode(true);
        emptyDiv.className = `t${this.db.index}_i${index}_emptyDiv`;
        emptyDiv.style.display = "flex";
        emptyDiv.style.flexGrow = "1";
        emptyDiv.addEventListener("click", this.function_checkEvent);
        //mainBtnDiv.appendChild(emptyDiv);

        mainBtnDiv.style.width = "250px";
        btnDiv.appendChild(mainBtnDiv);
        btnDiv.appendChild(editDiv2);
        btnDiv.appendChild(emptyDiv);

        const rightDiv = this.div.cloneNode(true);
        rightDiv.style.width = "100%";
        rightDiv.appendChild(mainAreaDiv);
        rightDiv.appendChild(btnDiv);

        tupleDiv.style.display = "flex";
        tupleDiv.appendChild(chekDiv);
        tupleDiv.appendChild(rightDiv);

        tupleDiv.style.borderBottom = `${this.db.lineThick}px solid ${this.db.lineColor}`;

        return tupleDiv;
    }
    setElementAll() {
        this.tab_memo_div = this.div.cloneNode(true);
        this.tab_memo_div.className = `t${this.db.index}`;

        this.setHead();
        this.setBody();
        this.setFoot(this.allCheck);

        return this.tab_memo_div;
    }
}

class tabElement_calcul {
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;
    textarea = null;
    mark = null;

    allCheck = null;
    sum = null;

    db = {
        textArr : null,
        colorArr : null,
        inputShow:null,

        index: null,
        sort: null,

        fontSize: null, fontWeight: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null,
        lineColor: null, lineThick: null,

        index_fontFamily: null,
        index_fontStyle: null,
        index_fontWeight: null
    }
    constructor() {
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.input = document.createElement("input");
        this.form = document.createElement("form");
        this.select = document.createElement("select");
        this.option = document.createElement("option");
        this.textarea = document.createElement("textarea");
        this.mark = document.createElement("mark");
    }
    setValue(db) {
        this.db.textArr = db.tabInfo.text;

        this.db.sort = db.sort;
        this.db.inputShow = db.inputShow;

        this.allCheck = false;

        this.db.befoIndex = db.befoIndex;
        this.db.index = db.index;
        this.db.nextIndex = db.nextIndex;

        this.db.title = db.name;
        this.db.show = db.show;

        this.db.index_fontFamily = db.fontFamily;
        this.db.index_fontStyle = db.fontStyle;
        this.db.index_fontWeight = db.fontWeight;

        this.db.fontSize = db.fontSize;
        this.db.fontWeight = db.fontWeight < 100 ? all_fontWeight[db.fontWeight] : db.fontWeight;
        this.db.fontFamily = isNaN(Number(db.fontFamily)) ? db.fontFamily : all_fontFamily[db.fontFamily];
        this.db.fontStyle = all_fontStyle[db.fontStyle];

        this.db.fontColor = db.fontColor;
        this.db.backgroundColor = db.backgroundColor;
        this.db.lineColor = db.lineColor;

        this.db.width = db.width;
        this.db.lineThick = db.lineWeight;
        //make basic
        this.button.style.backgroundColor = "transparent";
        this.input.style.backgroundColor = "transparent";
        this.div.style.backgroundColor = "transparent";
        this.select.style.backgroundColor = "transparent";
        this.textarea.style.backgroundColor = "transparent";
        this.option.style.backgroundColor = this.db.backgroundColor;
        this.mark.style.backgroundColor = "transparent";

        this.select.style.border = "none";
        this.button.style.border = "none";
        this.input.style.border = "none";
        this.textarea.style.border = "none";
        this.mark.style.border = "none";

        this.select.style.padding = "0";
        this.button.style.padding = "0";
        this.input.style.padding = "0";
        this.textarea.style.padding = "0";
        this.mark.style.padding = "0";

        this.select.style.marginLeft = "10px";
        this.button.style.marginLeft = "10px";

        this.select.style.height = "40px";
        this.button.style.height = "40px";
        this.input.style.height = "40px";
        this.mark.style.height = "40px";

        this.select.style.fontFamily = this.db.fontFamily;
        this.select.style.fontSize = `${this.db.fontSize}pt`;
        this.select.style.fontWeight = this.db.fontWeight;
        this.select.style.fontStyle = this.db.fontStyle;
        this.select.style.color = this.db.fontColor;

        this.option.style.fontFamily = this.db.fontFamily;
        this.option.style.fontSize = `${this.db.fontSize}pt`;
        this.option.style.fontWeight = this.db.fontWeight;
        this.option.style.fontStyle = this.db.fontStyle;
        this.option.style.color = this.db.fontColor;

        this.button.style.fontFamily = this.db.fontFamily;
        this.button.style.fontSize = `${this.db.fontSize}pt`;
        this.button.style.fontWeight = this.db.fontWeight;
        this.button.style.fontStyle = this.db.fontStyle;
        this.button.style.color = this.db.fontColor;

        this.input.style.fontFamily = this.db.fontFamily;
        this.input.style.fontSize = `${this.db.fontSize}pt`;
        this.input.style.fontWeight = this.db.fontWeight;
        this.input.style.fontStyle = this.db.fontStyle;
        this.input.style.color = this.db.fontColor;

        this.div.style.fontFamily = this.db.fontFamily;
        this.div.style.fontSize = `${this.db.fontSize}pt`;
        this.div.style.fontWeight = this.db.fontWeight;
        this.div.style.fontStyle = this.db.fontStyle;
        this.div.style.color = this.db.fontColor;

        this.textarea.style.fontFamily = this.db.fontFamily;
        this.textarea.style.fontSize = `${this.db.fontSize}pt`;
        this.textarea.style.fontWeight = this.db.fontWeight;
        this.textarea.style.fontStyle = this.db.fontStyle;
        this.textarea.style.color = this.db.fontColor;

        this.mark.style.fontFamily = this.db.fontFamily;
        this.mark.style.fontSize = `${this.db.fontSize}pt`;
        this.mark.style.fontWeight = this.db.fontWeight;
        this.mark.style.fontStyle = this.db.fontStyle;
        this.mark.style.color = this.db.fontColor;

        this.MIN_BTN = this.button.cloneNode(true);
        this.MIN_BTN.style.display = "flex";
        this.MIN_BTN.style.alignItems = "center";
        this.MIN_BTN.style.justifyContent = "center";
        this.MIN_BTN.style.flexShirink = 0;
        this.MIN_BTN.style.width = "40px";
    }

    tab_memo_div = null;
    //head - i btn / form(textarea, sub, color-input, select) / select-sort(new, old, color)
    //body - checkbox / text(text div, edit input, color select, copy btn, del btn)
    //foot - checkbox(all) / select(all, color1~3) / del btn 

    //event --> sort / copy / checkAll(copy)
    function_showEvent(event) {
        const target = event.target.className;
        const split = target.split("_");
        const index = split[0].replace(baseic_regex, "");
        if (target.includes("iBtn")) {
            const element2 = document.querySelector(`.t${index}_keybordDiv`);
            const check = element2.style.display == "none" ? true : false;
            element2.style.display = check ? "block" : "none";

            const element = document.querySelector(`.t${index}_textarea`);
            element.rows = check ? 5 : 1;

            const observer = new Observer_sendGetData(true);
            observer.target = "tab_U";
            observer.value = `${index}/"inputShow"/${check}`//value:value, index:, :,
            subj.subscribe(observer);
            subj.notifyAll();
        } else if (target.includes("textDiv") || target.includes("mark")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_textDiv`);
            const check = element.style.display == "none" ? true : false;
            element.style.display = check ? "block" : "none";

            const element1 = document.querySelector(`.${split[0]}_${split[1]}_editDiv`);
            element1.style.display = check ? "none" : "block";

            const element2 = document.querySelector(`.${split[0]}_${split[1]}_editBtnsDiv`);
            element2.style.display = check ? "none" : "block";
        } else if (target.includes("subBtn")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_textDiv`);
            element.style.display = element.style.display == "none" ? "block" : "none";

            const element1 = document.querySelector(`.${split[0]}_${split[1]}_editDiv`);
            element1.style.display = element1.style.display == "none" ? "block" : "none";

            const element2 = document.querySelector(`.${split[0]}_${split[1]}_editBtnsDiv`);
            element2.style.display = element2.style.display == "none" ? "block" : "none";

            const tupleIndex = split[1].replace(baseic_regex, "");
            const textarea = document.querySelector(`.${split[0]}_${split[1]}_editDiv`).childNodes[0];
            
            let text = textarea.value;
            const regex = /[^0-9\{\}\[\]\/?.|\)*~`!^\-+<>\%&\\\(]/g; //정규표현식 t4_i0_emptyDiv
            const calcul = text.replace(regex, "");
            const newValue = new Function(`return ${calcul}`)();
            text += "=" + newValue;
            
            const mark = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            mark.innerText = textarea.value;
            const emptyDiv = document.querySelector(`.${split[0]}_${split[1]}_emptyDiv`);
            emptyDiv.innerText = " = " + newValue;

            const observer = new Observer_sendGetData(true);
            observer.check = true;
            observer.name = "tap_calcul_text update event";
            observer.target = "tab_calcul_text_U";
            observer.value = {index:tupleIndex, key:"text" , value:text};        
            subj.subscribe(observer);
            subj.notifyAll();
        }
    }
    function_checkEvent(event) {
        const target = event.target.className;
        const split = target.split("_");
        if (target.includes("textDiv") || target.includes("emptyDiv") || target.includes("mark")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_checkbox`);
            element.checked = element.checked == true ? false : true;

            const observer = new Observer_sendGetData(true);
            observer.name = "tap_calcul_text update event";
            observer.target = "tab_calcul_text_U";
            observer.value = {index:split[1].replace(baseic_regex, ""), 
                key:"checked", value:element.checked};
            subj.subscribe(observer);
            subj.notifyAll();

            const sumDiv = document.querySelector(`.${split[0]}_sum`);
            const value = document.querySelector(`.${split[0]}_${split[1]}_emptyDiv`).innerText.replace(baseic_regex, "");
            const value2 = sumDiv.innerText.replace(baseic_regex, "");

            if(value != null && element.checked){sumDiv.innerText = Number(value2) + Number(value);
            }else if(value != null && element.checked == false){
                sumDiv.innerText = Number(value2) - Number(value);
            }
            return
        } else if (target.includes("checkbox")) {
            const target = event.target;
            const observer = new Observer_sendGetData(true);
            observer.name = "tap_calcul_text update event";
            observer.target = "tab_calcul_text_U";
            observer.value = {index:target.className.split("_")[1].replace(baseic_regex, ""), 
                key:"checked", value:event.target.checked};
            subj.subscribe(observer);
            subj.notifyAll();

            const sumDiv = document.querySelector(`.${split[0]}_sum`);
            const value = document.querySelector(`.${split[0]}_${split[1]}_emptyDiv`).innerText.replace(baseic_regex, "");
            const value2 = sumDiv.innerText.replace(baseic_regex, "");

            if(value != null && event.target.checked){sumDiv.innerText = Number(value2) + Number(value);
            }else if(value != null && event.target.checked == false){
                sumDiv.innerText = Number(value2) - Number(value);
            }
        } else if (target.includes("allCheckbox")) {
            const element = document.querySelector(`.${split[0]}_tuplesDiv`);
            for (let i = 0; i < element.childNodes.length; i++) {
                const checkbox = element.childNodes[i].childNodes[0].childNodes[0];
                if (checkbox.checked != event.target.checked) {
                    element.childNodes[i].childNodes[0].childNodes[0].click();
                }
            }
        } else if(target.includes("allSubBtn")){
            const element = document.querySelector(`.${split[0]}_tuplesDiv`);
            const textarea = document.querySelector(`.${split[0]}_textarea`);
            let newText = "";
            for (let i = 0; i < element.childNodes.length; i++) {
                const checkbox = element.childNodes[i].childNodes[0].childNodes[0];
                if (checkbox.checked) {
                    if(newText.length !=0){ newText += "+"; }
                    newText += element.childNodes[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText;
                }
            }
            textarea.value = newText;
            const subBtn = document.querySelector(`.${split[0]}_subBtn`);
            subBtn.click();
        }
    }
    function_selectEvent(event) {
        const target = event.target.className;
        const split = target.split("_");
        if(target.includes("sortBtn")){
            const index = split[0].replace(baseic_regex, "");
            const key = "sort";
            const value = event.target.selectedIndex;

            const observer = new Observer_sendGetData(true);
            observer.check = true;
            observer.name = "tap update event";
            observer.target = "tab_U";
            observer.value = `${index}/${key}/${value}`;        
            subj.subscribe(observer);
            subj.notifyAll();

            const tuplesDiv = document.querySelector(`.t${index}_tuplesDiv`);
            const len = tuplesDiv.childNodes.length;
            if(value == 0){
                //const div = document.createElement("div"); 
                let exArr = [];
                for(let i=0; i<len; i++){
                    const i_tuple = tuplesDiv.childNodes[i];
                    const i_index = i_tuple.childNodes[0].childNodes[0].value
                    exArr.push(i_index);
                }
                exArr.sort((a, b) => b - a);
                for(let i=0; i<exArr.length; i++){
                    let n = 0; 
                    while(true){
                        const j_tuple = tuplesDiv.childNodes[n];
                        const j_index = j_tuple.childNodes[0].childNodes[0].value
                        if(exArr[i] == j_index){
                            tuplesDiv.appendChild(j_tuple);
                            break;
                        }
                        n += 1;
                    }
                }
            }else if(value == 1){
                let exArr = [];
                for(let i=0; i<len; i++){
                    const i_tuple = tuplesDiv.childNodes[i];
                    const i_index = i_tuple.childNodes[0].childNodes[0].value
                    exArr.push(i_index);
                }
                exArr.sort((a, b) => a - b);
                for(let i=0; i<exArr.length; i++){
                    let n = 0; 
                    while(true){
                        const j_tuple = tuplesDiv.childNodes[n];
                        const j_index = j_tuple.childNodes[0].childNodes[0].value
                        if(exArr[i] == j_index){
                            tuplesDiv.appendChild(j_tuple);
                            break;
                        }
                        n += 1;
                    }
                }
            }else if(value == 2){
                let all = [ [], [] ];
                for(let j=0; j<all.length; j++){
                    for(let i=0; i<len; i++){
                        const i_tuple = tuplesDiv.childNodes[i];
                        const i_index = i_tuple.childNodes[0].childNodes[0].value;
                        if(i_tuple.childNodes[0].childNodes[0].checked){
                            all[0].push(i_index);
                        }else{
                            all[1].push(i_index);
                        }
                    }
                }
                for(let i=0; i<all.length;i++){
                    all[i].sort((a, b) => a - b);
                }
                for(let i=1; i<all.length; i++){
                    for(let j=0; j<all[i].length;j++){
                        let n = 0; 
                        while(true){
                            const j_tuple = tuplesDiv.childNodes[n];
                            const j_index = j_tuple.childNodes[0].childNodes[0].value
                            if(all[i][j] == j_index){
                                tuplesDiv.appendChild(j_tuple);
                                break;
                            }
                            n += 1;
                        }
                    }
                }// for(let j=0; j<all[i].length;j++){
                    for(let i=0; i<1; i++){
                        for(let j=0; j<all[i].length;j++){
                            let n = 0; 
                            while(true){
                                const j_tuple = tuplesDiv.childNodes[n];
                                const j_index = j_tuple.childNodes[0].childNodes[0].value
                                if(all[i][j] == j_index){
                                    tuplesDiv.appendChild(j_tuple);
                                    break;
                                }
                                n += 1;
                            }
                        }
                    }
            }
        }
    }
    function_copyEvent(event){
        const target = event.target.className;
        const split = target.split("_");
        if (target.includes("emptyDiv")) {
            const element = document.querySelector(`.${split[0]}_${split[1]}_mark`);
            copyToClipboard(element.innerText + event.target.innerText);
        }else if(target.includes("copyAll")){
            const element = document.querySelector(`.${split[0]}_tuplesDiv`);
            let text = "";
            for (let i = 0; i < element.childNodes.length; i++) {
                const checkbox = element.childNodes[i].childNodes[0].childNodes[0];
                if(checkbox.checked){
                    const mark = element.childNodes[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText;
                    const value = element.childNodes[i].childNodes[1].childNodes[1].childNodes[1].innerText;
                    text += mark + " " + value;
                    text += "\n";
                }
            }
            copyToClipboard(text);
        }else if(target.includes("sum")){
            copyToClipboard(event.target.innerText);
        }
    }
    function_newTuple(event){
        const tabIndex = event.target.className.replace(baseic_regex, "");
        const textarea = document.querySelector(`.t${tabIndex}_textarea`);
        let text = textarea.value;

        const regex = /[^0-9\{\}\[\]\/?.|\)*~`!^\-+<>\%&\\\(]/g; //정규표현식
        const calcul = text.replace(regex, "");
        const newValue = new Function(`return ${calcul}`)();
        
        text += "=" + newValue;

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "tap_calcul_text new event";
        observer.target = "tab_calcul_text_C";
        observer.value = {tabIndex:tabIndex, text:text};        
        subj.subscribe(observer);
        subj.notifyAll();

        textarea.value = null;
    }
    function_colorSelectEdit(event){
        const target = event.target.className;
        const tabIndex = target.split("_")[0].replace(baseic_regex, "");
        const key = target.split("_")[1];

        const observer = new Observer_sendGetData(true);
        observer.name = "tab_memo_color update event";
        observer.target = "tab_memo_color_U";
        observer.value = {value:event.target.value, index:tabIndex,
            key:key,
        }
        subj.subscribe(observer);
        subj.notifyAll();
    }
    function_delTuple(event){
        const split = event.target.className.split("_");
        const tuple = document.querySelector(`.${split[0]}_${split[1]}_tupleDiv`);
        const tupleIndex = split[1].replace(baseic_regex, "");

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "tap_calcul_text del event";
        observer.target = "tab_calcul_text_D";
        observer.value = tupleIndex;    
        subj.subscribe(observer);
        subj.notifyAll();

        tuple.remove();
    }
    function_allDelTuple(event){
        const index = event.target.className.split("_")[0].replace(baseic_regex, "");

        const tuplesDiv = document.querySelector(`.t${index}_tuplesDiv`);
        for(let i=tuplesDiv.childNodes.length-1;i>=0;i--){
            const checkbox = tuplesDiv.childNodes[i].childNodes[0].childNodes[0];
            const del = tuplesDiv.childNodes[i].childNodes[0].childNodes[1];
            if(checkbox.checked){
                del.click();
            }
        }
        
    }
    function_editIndex(event){
        const target = event.target.className.split("_");
        const index = target[0].replace(baseic_regex, "");
        const tupleIndex1 = target[1].replace(baseic_regex, "");
        const key = target[2];
        let tupleIndex2 = null;
        if(key == "befo"){
            const befoElement = event.target.parentNode.parentNode.parentNode.parentNode.previousSibling;
            if(befoElement != null){
                tupleIndex2 = befoElement;
            }else{
                console.log("?");
                return
            }
        }else if(key == "next"){
            const nextElement = event.target.parentNode.parentNode.parentNode.parentNode.nextSibling;
            if(nextElement != null){
                tupleIndex2 = nextElement;
            }else{
                return
            }
        }

        const table = document.querySelector(`.t${index}_tuplesDiv`)
        const len = table.childNodes.length;


        if(key.includes("next")){
            let firstNodeNot = true;
            for(let i=0;i<len; i++){
                if(table.childNodes[i].className == `t${index}_i${tupleIndex1}_tupleDiv` && i == len -1){
                    firstNodeNot = false; break
                }
            }
            if(firstNodeNot){
                for(let i=0;i<len; i++){
                    if(table.childNodes[0].className == `t${index}_i${tupleIndex1}_tupleDiv`){
                        const nextNodeClassName = table.childNodes[1].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);

                        tupleIndex2 = nextNodeClassName.split("_")[1].replace(baseic_regex, "");
    
                        const nowNode = document.querySelector(`.t${index}_i${tupleIndex1}_tupleDiv`);
                        table.appendChild(nextNode);
                        table.appendChild(nowNode);
                        i += 1;
                    }else{
                        const nextNodeClassName = table.childNodes[0].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
                        table.appendChild(nextNode);
                    }

                }
            }
        }else if(key.includes("befo")){
            let firstNodeNot = true; let next = null;
            for(let i=0;i<len; i++){
                if(table.childNodes[i].className == `t${index}_i${tupleIndex1}_tupleDiv`){
                    if(table.childNodes[i - 1] != null){
                        next = table.childNodes[i - 1].className;
                    }
                }
                if(table.childNodes[i].className == `t${index}_i${tupleIndex1}_tupleDiv` && i == 0){
                    firstNodeNot = false; break
                }

            }
            if(firstNodeNot){
                for(let i=0;i<len; i++){
                    if(table.childNodes[0].className == `${next}`){
                        const befoNodeClassName = table.childNodes[0].className;
                        const befoNode = document.querySelector(`.${befoNodeClassName}`);
                        
                        tupleIndex2 = befoNodeClassName.split("_")[1].replace(baseic_regex, "");
                        
                        const nowNode = document.querySelector(`.t${index}_i${tupleIndex1}_tupleDiv`);
                        table.appendChild(nowNode);
                        table.appendChild(befoNode);
                        i += 1;
                    }else{
                        const nextNodeClassName = table.childNodes[0].className;
                        const nextNode = document.querySelector(`.${nextNodeClassName}`);
                        table.appendChild(nextNode);
                    }
                }
            }
        }

        if(tupleIndex2 != null){
            const observer = new Observer_sendGetData(true);
            observer.name = "tab_calcul_text update event";
            observer.target = "tab_calcul_text_U_indexChange";
            observer.value = {tupleIndex1:tupleIndex1, tupleIndex2:tupleIndex2}
            subj.subscribe(observer);
            subj.notifyAll();
        }
    }
    function_keybordClic(event){
        const key = event.target.innerText;
        const index = event.target.className.split("_")[0].replace(baseic_regex,"");
        const textarea = document.querySelector(`.t${index}_textarea`);
        let text = textarea.value;

        if(key == "del"){
            const backBtn = document.querySelector(`.t${index}_key_back`);
            backBtn.value += text[text.length - 1];
            text = text.slice(0, text.length - 1);
            textarea.value = text;
        }else if(key == "back"){
            let value = event.target.value;
            text += value[value.length - 1];
            textarea.value = text;
            event.target.value = value.slice(0, value.length - 1);
        }else{
            textarea.value += key;
        }
    }
    //<-- event
    setHead() {
        const tab_headDiv = this.div.cloneNode(true);
        tab_headDiv.className = `t${this.db.index}head`;
        tab_headDiv.style.marginTop = "10px";
        tab_headDiv.style.borderBottom = `${this.db.lineThick}px solid ${this.db.lineColor}`;

        const MIN_BTN = this.button.cloneNode(true);
        MIN_BTN.style.display = "flex";
        MIN_BTN.style.alignItems = "center";
        MIN_BTN.style.justifyContent = "center";
        MIN_BTN.style.flexShirink = 0;
        MIN_BTN.style.width = "40px";

        const i_btn_div = this.div.cloneNode(true);
        const i_btn = MIN_BTN.cloneNode(true);

        i_btn.innerText = "i";
        i_btn.style.alignItems = "stretch";
        i_btn.style.height = "100%";
        //i_btn.style.paddingTop = "5px";
        i_btn.style.marginLeft = 0;
        i_btn.className = `t${this.db.index}iBtn`;
        i_btn.addEventListener("click", this.function_showEvent);
        i_btn_div.appendChild(i_btn);

        //textarea--->

        const formDiv = this.div.cloneNode(true);
        formDiv.className = `t${this.db.index}Form`;
        formDiv.style.width = "100%";

        const textarea = this.textarea.cloneNode(true);
        textarea.rows = this.db.inputShow ? "5" : "1"; 
        textarea.placeholder = "input memo...";
        textarea.className = `t${this.db.index}_textarea`;
        textarea.style.width = "100%";

        const keybordDiv = this.div.cloneNode(true);
        keybordDiv.className = `t${this.db.index}_keybordDiv`;
        keybordDiv.style.display = this.db.inputShow ? "block" : "none"; 
        keybordDiv.style.width = "100%";
        const keyArr = [ 
            [".", "/", "%", "(", "del"],
            ["*", "-", "+", ")", "back"],
            ["1", "2", "3", "4", "5",],
            ["6", "7", "8", "9", "0"], 
            ["<", ">", "&", "|", "?",],
        ];
        for(let i=0; i<keyArr.length; i++){
            const keyRowDiv = this.div.cloneNode(true);
            let width = 0;
            for(let j=0; j<keyArr[i].length; j++){
                const btn = this.button.cloneNode(true);
                btn.style.width = "50px";
                width += 60;
                btn.className = `t${this.db.index}_key_${keyArr[i][j]}`;
                btn.innerText = keyArr[i][j];
                btn.value = keyArr[i][j];
                btn.addEventListener("click", this.function_keybordClic);
                keyRowDiv.appendChild(btn);
            }
            keyRowDiv.style.display = "block";
            keyRowDiv.style.width = `${width}px`;
            keybordDiv.appendChild(keyRowDiv);
        }
        formDiv.appendChild(textarea);
        formDiv.appendChild(keybordDiv);
        //-->textarea

        const sortSelect = this.select.cloneNode(true);
        const sortText = ["new", "old", "check"];
        for (let i = 0; i < sortText.length; i++) {
            const op = this.option.cloneNode(true);
            op.innerText = sortText[i];
            sortSelect.appendChild(op);
        }
        sortSelect.className = `t${this.db.index}sortBtn`;
        sortSelect.selectedIndex = this.db.sort;
        sortSelect.addEventListener("change",this.function_selectEvent);

        const subBtn = MIN_BTN.cloneNode(true);
        subBtn.style.marginRight = "10px";
        subBtn.className = `t${this.db.index}_subBtn`;
        subBtn.innerText = "sub";
        subBtn.addEventListener("click", this.function_newTuple);

        const allDiv = this.div.cloneNode(true);
        const upDiv = this.div.cloneNode(true);
        const downDiv = this.div.cloneNode(true);

        tab_headDiv.style.display = "flex";
        tab_headDiv.style.flexDirection = "row";
        tab_headDiv.appendChild(i_btn_div);

        upDiv.style.display = "flex";
        upDiv.className = `t${this.db.index}inputDiv`
        upDiv.appendChild(formDiv);

        downDiv.style.display = "flex";
        downDiv.style.flexDirection = "row";
        downDiv.style.flexWrap = "wrap";
        downDiv.style.flexGrow = "1";
        downDiv.appendChild(sortSelect);

        const textareaTogather = this.div.cloneNode(true);
        textareaTogather.style.display = "flex";
        //textareaTogather.style.display = this.db.inputShow ? "flex" : "none";
        textareaTogather.style.flexDirection = "row-reverse";
        textareaTogather.flexWrap = "wrap";
        textareaTogather.appendChild(subBtn);

        textareaTogather.className = `t${this.db.index}subDiv`;
        textareaTogather.style.flexGrow = 1;
        downDiv.appendChild(textareaTogather);

        allDiv.style.display = "flex";
        allDiv.style.flexDirection = "column";
        allDiv.appendChild(upDiv);
        allDiv.appendChild(downDiv);

        allDiv.style.flexGrow = 1;
        tab_headDiv.appendChild(allDiv);

        this.tab_memo_div.appendChild(tab_headDiv);
    }
    setBody() {
        const bodyDiv = this.div.cloneNode(true);
        bodyDiv.className = `t${this.db.index}_tuplesDiv`;
        this.allCheck = true;
        if(true){
            const len = this.db.textArr.length;
            if(this.db.sort == 0){
                for (let i = len-1; i >= 0; i--) {
                    const tuple = this.makeTuple(this.db.textArr[i].checked, this.db.textArr[i].index, this.db.textArr[i].text, this.db.textArr[i].fk_colorIndex);
                    if(this.db.textArr[i].checked==false){ 
                        this.allCheck = false; 
                    }else{
                        const text = this.db.textArr[i].text.split("=");
                        if(text[1] != null){
                            this.sum += Number(text[1]);
                        }
                    }
                    bodyDiv.appendChild(tuple);
                }
            }else if(this.db.sort == 1){
                for (let i = 0; i < len; i++) {
                    const tuple = this.makeTuple(this.db.textArr[i].checked, this.db.textArr[i].index, this.db.textArr[i].text, this.db.textArr[i].fk_colorIndex);
                    if(this.db.textArr[i].checked==false){ this.allCheck = false; }

                    const pls = this.db.textArr[i].text.split("=")[1];
                    if(pls != null && this.db.textArr[i].checked){
                        this.sum += Number(pls);
                    }
                    bodyDiv.appendChild(tuple);
                }
            }else if(this.db.sort == 2){
                let all = [ [], [] ];
                for(let j=0; j<this.db.textArr.length; j++){
                    const i_index = j;
                    const check = this.db.textArr[j].checked;
                    if(check){
                        all[0].push(i_index);
                        const pls = this.db.textArr[j].text.split("=")[1];
                        if(pls != null && this.db.textArr[j].checked){
                            this.sum += Number(pls);
                        }
                    }else{
                        all[1].push(i_index);
                    }
                }
                for(let i=0; i<all.length;i++){
                    all[i].sort((a, b) => a - b);
                }
                for(let i=1; i<all.length; i++){
                    for(let j=0; j<all[i].length;j++){
                        const index = all[i][j];
                        const tuple = this.makeTuple(this.db.textArr[index].checked, this.db.textArr[index].index, this.db.textArr[index].text);
                        if(this.db.textArr[index].checked==false){ this.allCheck = false; }
                        bodyDiv.appendChild(tuple);
                    }
                }
                for(let i=0; i<1; i++){
                    for(let j=0; j<all[i].length;j++){
                        const index = all[i][j];
                        const tuple = this.makeTuple(this.db.textArr[index].checked, this.db.textArr[index].index, this.db.textArr[index].text);
                        if(this.db.textArr[index].checked==false){ this.allCheck = false; }
                        bodyDiv.appendChild(tuple);
                    }
                }
            }
        }
        
        this.tab_memo_div.appendChild(bodyDiv);
    }
    setFoot(check, sum) {
        const footDiv = this.div.cloneNode(true);

        const checkDiv = this.div.cloneNode(true);
        const checkAll = this.input.cloneNode(true);
        checkAll.type = "checkbox";
        checkAll.checked = check;
        checkDiv.style.width = "40px";
        checkAll.className = `t${this.db.index}_allCheckbox`;
        checkAll.addEventListener("change", this.function_checkEvent);
        checkDiv.appendChild(checkAll);

        const copyBtn = this.button.cloneNode(true);
        copyBtn.innerText = "c";
        copyBtn.style.width = "40px";
        copyBtn.className = `t${this.db.index}_copyAll`
        copyBtn.addEventListener("click", this.function_copyEvent);
        const delBtn = copyBtn.cloneNode(true);
        delBtn.innerText = "x"
        delBtn.className = `t${this.db.index}_delAll`
        delBtn.addEventListener("click", this.function_allDelTuple); 

        const subBtn = this.button.cloneNode(true);
        subBtn.innerText = "sub";
        subBtn.style.width = "60px"
        subBtn.className = `t${this.db.index}_allSubBtn`;
        subBtn.addEventListener("click", this.function_checkEvent);
        const sumDiv = this.button.cloneNode(true);
        sumDiv.innerText = sum;
        sumDiv.style.display = "flex";
        sumDiv.style.marginRight = "14px";
        sumDiv.style.flexGrow = 1;
        sumDiv.style.flexDirection = "row-reverse";
        sumDiv.style.alignItems = "center";
        sumDiv.style.width = "60px"
        sumDiv.className = `t${this.db.index}_sum`;
        sumDiv.addEventListener("click", this.function_copyEvent);
        
        const rightDiv = this.div.cloneNode(true);
        rightDiv.appendChild(delBtn);
        rightDiv.appendChild(copyBtn);
        
        const leftDiv = this.div.cloneNode(true);
        leftDiv.appendChild(sumDiv);
        leftDiv.appendChild(subBtn);
        leftDiv.style.display = "flex";
        leftDiv.style.flexDirection = "row-reverse";
        leftDiv.style.flexGrow = 1;


        footDiv.appendChild(checkDiv);
        footDiv.appendChild(rightDiv);
        footDiv.appendChild(leftDiv);
        footDiv.style.display = "flex";

        this.tab_memo_div.appendChild(footDiv);
    }
    makeTuple(checked, index, text) {
        const tupleDiv = this.div.cloneNode(true);
        tupleDiv.className = `t${this.db.index}_i${index}_tupleDiv`;

        const chekDiv = this.div.cloneNode(true);
        chekDiv.style.display = "flex";
        chekDiv.style.flexDirection = "column";
        chekDiv.style.alignItems = "stretch";
        
        const checkBox = this.input.cloneNode(true);
        checkBox.type = "checkbox";
        checkBox.style.width = "40px"
        checkBox.style.color = `${this.db.fontColor}`;
        checkBox.style.height = "40px";
        checkBox.value = index;
        checkBox.checked = checked;
        checkBox.style.display = "flex";
        checkBox.style.alignItems = "stretch";
        checkBox.className = `t${this.db.index}_i${index}_checkbox`;
        checkBox.addEventListener("change", this.function_checkEvent);

        const delBtn = this.button.cloneNode(true);
        delBtn.className = `t${this.db.index}_i${index}_delBtn`;
        delBtn.style.margin = "0";
        delBtn.innerText = "x"; delBtn.style.width = "40px";
        delBtn.style.height = "40px";
        delBtn.style.width= "40px";
        delBtn.addEventListener("click", this.function_delTuple);

        chekDiv.style.width = "40px";
        chekDiv.appendChild(checkBox);
        chekDiv.appendChild(delBtn);

        const textDiv = this.div.cloneNode(true);
        const mark = this.mark.cloneNode(true);
        mark.style.width = "100%";
        mark.style.wordBreak = "break-word";
        mark.innerText = text.split("=")[0];
        mark.className = `t${this.db.index}_i${index}_mark`;
        mark.addEventListener("click", this.function_showEvent);

        textDiv.style.textAlign = "start";
        textDiv.className = `t${this.db.index}_i${index}_textDiv`;
        textDiv.appendChild(mark);
        textDiv.addEventListener("dblclick", this.function_showEvent);

        const editDiv = this.div.cloneNode(true);
        const textareaEdit = this.textarea.cloneNode(true);
        textareaEdit.value = text.split("=")[0];
        textareaEdit.rows = 2;
        textareaEdit.style.width = "100%"
        editDiv.style.display = "none";
        editDiv.className = `t${this.db.index}_i${index}_editDiv`;
        editDiv.appendChild(textareaEdit);

        const editDiv2 = this.div.cloneNode(true);
        const goUpBtn = this.button.cloneNode(true);
        goUpBtn.innerText = "Λ";
        goUpBtn.className = `t${this.db.index}_i${index}_befo`;
        goUpBtn.addEventListener("click", this.function_editIndex);
        goUpBtn.style.width = "40px";
        const goDownBtn = this.button.cloneNode(true);
        goDownBtn.innerText = "V";
        goDownBtn.className = `t${this.db.index}_i${index}_next`;
        goDownBtn.addEventListener("click", this.function_editIndex);
        goDownBtn.style.width = "40px";
        const subBtn = this.button.cloneNode(true);
        subBtn.innerText = "sub";
        subBtn.style.width = "40px";
        subBtn.style.marginRight = "10px";
        subBtn.className = `t${this.db.index}_i${index}_subBtn`;
        subBtn.addEventListener("click", this.function_showEvent);
        editDiv2.appendChild(goUpBtn);
        editDiv2.appendChild(goDownBtn);
        editDiv2.appendChild(subBtn);
        editDiv2.style.display = "none";
        editDiv2.className = `t${this.db.index}_i${index}_editBtnsDiv`;

        const mainAreaDiv = this.div.cloneNode(true);
        mainAreaDiv.appendChild(textDiv);
        mainAreaDiv.appendChild(editDiv);
        mainAreaDiv.style.paddingTop = "10px";

        const btnDiv = this.div.cloneNode(true);
        btnDiv.style.display = "flex";
        btnDiv.style.flexDirection = "row-reverse";
        editDiv2.style.width = "100%";

        const emptyDiv = this.div.cloneNode(true);
        emptyDiv.innerText = "= "+text.split("=")[1];
        emptyDiv.addEventListener("click", this.function_copyEvent);
        emptyDiv.className = `t${this.db.index}_i${index}_emptyDiv`;
        emptyDiv.style.flexDirection = "row-reverse";
        emptyDiv.style.marginRight = "14px";

        emptyDiv.style.display = "flex";
        emptyDiv.style.flexGrow = "1";
        emptyDiv.style.width = "100%";
        emptyDiv.addEventListener("click", this.function_checkEvent);

        btnDiv.appendChild(editDiv2);
        btnDiv.appendChild(emptyDiv);

        const rightDiv = this.div.cloneNode(true);
        rightDiv.style.width = "100%";
        rightDiv.appendChild(mainAreaDiv);
        rightDiv.appendChild(btnDiv);

        tupleDiv.style.display = "flex";
        tupleDiv.appendChild(chekDiv);
        tupleDiv.appendChild(rightDiv);

        tupleDiv.style.borderBottom = `${this.db.lineThick}px solid ${this.db.lineColor}`;

        return tupleDiv;
    }
    setElementAll() {
        this.tab_memo_div = this.div.cloneNode(true);
        this.tab_memo_div.className = `t${this.db.index}`;

        this.setHead();
        this.setBody();
        this.setFoot(this.allCheck, this.sum);

        return this.tab_memo_div;
    }
}
//<==========View - element all

//Model - make tuple all ==========>
class htmlInfo {
    lastPageShow = null; title = null;
    fontSize = null; fontWeight = null; fontFamily = null; fontType = null;
    fontColor = null; backgroundColor = null; lineColor = null;
    htmlBackgroundColor = null; lightDarkMode = null;
    language = null;

    newInfo = [];
    schedule = [];
    trash = {window:[], tab:[], tab_text:[]};
    constructor() {
        this.lastPageShow = 0; this.title = 'hello!';
        this.fontSize = basic_fontSize; this.fontWeight = 0; this.fontFamily = 1; this.fontStyle = 0;
        this.fontColor = basic_fontColor; this.backgroundColor = all_backgroundColor[3]; this.lineColor = basic_lineColor;
        this.htmlBackgroundColor = basic_htmlBacground; this.lightDarkMode = true;
        this.language = 'kr';

        this.trash = {window:[], tab:[], tab_text:[]};
    }
}

class Window {
    index = null; indexBefo = null; indexNext = null; name = null; show = null;
    fontSize = null; fontWeight = null; fontFamily = null; fontStyle = null;
    fontColor = null; backgroundColor = null; lineColor = null;
    width = null; lineWeight = null;

    constructor() {
        this.index = null; this.indexBefo = null; this.indexNext = null;
        this.name = "window"; this.show = true;
        this.fontSize = basic_fontSize; this.fontWeight = 0; this.fontFamily = 1; this.fontStyle = 0;
        this.fontColor = basic_fontColor; this.backgroundColor = all_backgroundColor[0]; this.lineColor = basic_lineColor;
        this.width = basic_width; this.lineWeight = basic_lineWeight;
    }
}

class TabInfo {
    index = null; indexBefo = null; indexNext = null; fk_windowIndex = null; 
    type = null; name = null; show = null; sort = null; inputShow = null; 
    fontSize = null; fontColor = null; backgroundColor = null; width = null;

    constructor(typeNum) {
        this.index = 0; this.indexBefo = null; this.indexNext = null; this.fk_windowIndex = 0; 
        this.type = typeNum; this.name = all_tapType_kr[typeNum]; 
        this.show = true; this.sort = 0; this.inputShow = true;
        this.fontSize = basic_fontSize; this.fontColor = basic_fontColor; this.backgroundColor = all_backgroundColor[0]; this.width = basic_width;
    }
}

class Tab_Memo_color {
    fk_tabIndex = null; color1 = null; color2 = null; color3 = null; done = null; 
    constructor(tabIndex) {
        this.fk_tabIndex = tabIndex; this.color1 = '#fe0000'; this.color2 = '#1500ff'; this.color3 = '#00ff19'; this.done = "#A3A3A3";
    }
}
class Tab_Memo_text {
    fk_tabIndex = null; key_madeDate = null;
    checked = null; text = null; fk_colorIndex = null;
    constructor(tabIndex) {
        this.fk_tabIndex = tabIndex; this.key_madeDate = new Date();
        this.checked = true; this.text = null; this.fk_colorIndex = 0;
    }
}

class Tab_Calcul_text {
    fk_tabIndex = null; key_madeDate = null;
    checked = null; text = null; 
    constructor(tabIndex) {
        this.fk_tabIndex = tabIndex; this.key_madeDate = new Date();
        this.checked = true; this.text = null;
    }
}
//<==========Model - make tuple all

//MVC pattern all ==========>
class Model {
    htmlInfo = null;
    windowArr = [];
    tabInfoArr = [];

    tab_memo_colorArr = [];
    tab_memo_textArr = [];
    tab_calcul_textArr = [];
    observer_update = "hear, I am Model";
    check = null; value = null; target = null; name = null;


    DBname = {
        html: "htmlDB",
        window: "windowDB",
        tabInfo: "tabInfoDB",

        tab_memo_color: "memo_color",
        tab_memo_text: "memo_text",
        
        tab_calcul_text : "calcul_text",
    }

    constructor() {
        this.check = true; this.value = null; this.target = null; this.name = null;
        this.htmlInfo = JSON.parse(localStorage.getItem("htmlDB"));
        this.windowArr = JSON.parse(localStorage.getItem("windowDB"));
        this.tabInfoArr = JSON.parse(localStorage.getItem("tabInfoDB"));

        this.tab_memo_colorArr = JSON.parse(localStorage.getItem("memo_color"));
        this.tab_memo_textArr = JSON.parse(localStorage.getItem("memo_text"));

        this.tab_calcul_textArr = JSON.parse(localStorage.getItem(this.DBname.tab_calcul_text));

        if (this.htmlInfo == null) {
            this.htmlInfo = new htmlInfo();
            this.htmlInfo_save();
        }
        if (this.windowArr == null) {
            this.windowArr = [];
            this.window_C();
            this.window_save();
        }
        if (this.tabInfoArr == null) {
            this.tabInfoArr = [];
            this.tab_save();
        }

        if (this.tab_memo_colorArr == null) {
            this.tab_memo_colorArr = [];
            this.tab_memo_color_save();
        }else{
            let newArr = []
            for(let i=0;i<this.tab_memo_colorArr.length;i++){
                if(this.tab_memo_colorArr != null){
                    newArr.push(this.tab_memo_colorArr[i]);
                }
            }
            this.tab_memo_colorArr = newArr;
            this.tab_memo_text_save();
        }
        if (this.tab_memo_textArr == null) {
            this.tab_memo_textArr = [];
            this.tab_memo_text_save();
        }else{
            let newArr = []
            for(let i=0;i<this.tab_memo_textArr.length;i++){
                if(this.tab_memo_textArr != null){
                    newArr.push(this.tab_memo_textArr[i]);
                }
            }
            this.tab_memo_textArr = newArr;
            this.tab_memo_text_save();
        }

        if (this.tab_calcul_textArr == null) {
            this.tab_calcul_textArr = [];
            this.tab_calcul_text_save();
        }else{
            let newArr = []
            for(let i=0;i<this.tab_calcul_textArr.length;i++){
                if(this.tab_calcul_textArr != null){
                    newArr.push(this.tab_calcul_textArr[i]);
                }
            }
            this.tab_calcul_textArr = newArr;
            this.tab_calcul_text_save();
        }
    }
    //html_remote
    html_U(key, value) {
        this.htmlInfo[key] = value;
        this.htmlInfo_save();
    }
    html_trash_D(key, value, type) {
        let tab_text = []; 
        let tab = []; 
        let window = []; 
        console.log(key, value, type);
        if(type == "tuple"){
            for(let i=0; i<this.htmlInfo.trash.tab_text.length; i++){
                if(this.htmlInfo.trash.tab_text[i].index != key && this.htmlInfo.trash.tab_text[i].text != value){
                    tab_text.push(this.htmlInfo.trash.tab_text[i]);
                }
            }
        }else if(type == "tab"){
            for(let i=0; i<this.htmlInfo.trash.tab.length; i++){
                if(this.htmlInfo.trash.tab[i].index != key){
                    tab.push(this.htmlInfo.trash.tab[i]);
                }
            }
            for(let i=0; i<this.htmlInfo.trash.tab_text.length; i++){
                if(this.htmlInfo.trash.tab_text[i].index != key){
                    tab_text.push(this.htmlInfo.trash.tab_text[i]);
                }
            }
        }else if(type == "window"){
            for(let i=0; i<this.htmlInfo.trash.window.length; i++){
                if(this.htmlInfo.trash.window[i].index != key){
                    tab_text.push(this.htmlInfo.trash.tab_text[i]);
                }
            }
            for(let i=0; i<this.htmlInfo.trash.tab.length; i++){
                if(this.htmlInfo.trash.tab[i].index != key){
                    tab.push(this.htmlInfo.trash.tab[i]);
                }
            }
            for(let i=0; i<this.htmlInfo.trash.tab_text.length; i++){
                if(this.htmlInfo.trash.tab_text[i].index != key){
                    window.push(this.htmlInfo.trash.window[i]);
                }
            }
        }
        this.htmlInfo.trash.tab_text = tab_text;
        this.htmlInfo.trash.tab = tab;
        this.htmlInfo.trash.window = window;
        this.htmlInfo_save();
    }

    //window--
    window_C() {
        const newWin = new Window();
        if (this.windowArr.length <= 0) {
            newWin.index = 0;
            newWin.name += newWin.index;
            this.windowArr.push(newWin);
        } else {
            let check = false;
            for (let i = 0; i < this.windowArr.length; i++) {
                if (this.windowArr[i] == null) {
                    newWin.index = i;
                    check = true;
                }
                if (this.windowArr[i] != null && this.windowArr[i].indexNext == null) {
                    newWin.indexBefo = i;
                }
            }
            //this.windowArr[newWin.indexNext].indexNext = newWin.index;
            if (check == false) {
                newWin.index = this.windowArr.length;
                newWin.name += newWin.index;
                this.windowArr.push(newWin);
            } else {
                newWin.name += newWin.index;
                this.windowArr[newWin.index] = newWin;
            }

            //배경색 지정
            new_windwo_colorIndex += 1;
            if (newWin.indexBefo != null) {
                for (let i = 0; i < all_backgroundColor.length; i++) {
                    if (all_backgroundColor[i] == this.windowArr[newWin.indexBefo].backgroundColor) {
                        newWin.backgroundColor = i < all_backgroundColor.length - 1 ? all_backgroundColor[i + 1] : all_backgroundColor[0];
                    }
                }
            } else if (newWin.indexBefo == null) {
                newWin.backgroundColor = all_backgroundColor[0];
            }
            this.windowArr[newWin.indexBefo].indexNext = newWin.index;
        }
        this.value = newWin;
        this.window_save();
    }
    window_U(index, key, value) {
        this.windowArr[index][key] = value;
        this.window_save();
    }
    window_U_indexChange(winIndex, select){
        let index = this.windowArr[winIndex];
        let befo = this.windowArr[index.indexBefo];
        let next = this.windowArr[index.indexNext];
        
        let Nnext = null;
        if(next != null){
            Nnext = next.indexNext == null ? null:this.windowArr[next.indexNext];
        } 
        let Bbefo = null;
        if(befo !=null){
            Bbefo = befo.indexBefo ==null ? null:this.windowArr[befo.indexBefo];
        }

        if(select == "befo"){
            if(befo != null){ 
                if(next !=null){
                    next.indexBefo = befo.index;
                }
                if(Bbefo != null){
                    Bbefo.indexNext = winIndex;
                }
                index.indexBefo = Bbefo == null ? null : Bbefo.index;
                index.indexNext = befo.index; 

                befo.indexBefo = index.index;
                befo.indexNext = next == null ? null : next.index;
            }
        }else if(select == "next"){
            if(next != null){ 
                if(befo !=null){
                    befo.indexNext = next.index;
                }
                if(Nnext != null){
                    Nnext.indexBefo = winIndex;
                }
                index.indexBefo = next.index;
                index.indexNext = Nnext  == null ? null : Nnext.index;

                next.indexBefo = befo == null ? null : befo.index;
                next.indexNext = index.index;
            }
        }
        
        this.window_save();
        //location.reload(true);
    }
    window_D(index) {
        const befo = this.windowArr[index].indexBefo;
        const next = this.windowArr[index].indexNext;
        if (befo != null) { this.windowArr[befo].indexNext = next; }
        if (next != null) { this.windowArr[next].indexBefo = befo; }

        //del save---
        const timeIndex =new Date();
        this.windowArr[index].index = timeIndex;  
        this.htmlInfo.trash.window.push(this.windowArr[index]);
        if(this.htmlInfo.trash.window.length > 5){
            this.htmlInfo.window.trash.shift();
        }
        this.htmlInfo_save();

        for(let i=0; i<this.tabInfoArr.length; i++){
            if(this.tabInfoArr[i] != null && this.tabInfoArr[i].fk_windowIndex == index){
                this.tab_D(i);
            }
        }
        //---del save

        this.windowArr[index] = null;
        if (index == this.windowArr.length - 1) {
            this.windowArr.pop();
        }
        this.window_save();
    }

    //tab info
    tab_C(winIndex, type) {
        const newTab = new TabInfo();
        newTab.type = type;
        newTab.fk_windowIndex = winIndex;
        newTab.name = `${all_tapType_kr[type]}`;

        newTab.fontColor = this.windowArr[winIndex].fontColor;
        newTab.backgroundColor = this.windowArr[winIndex].backgroundColor;

        newTab.fontSize = this.windowArr[winIndex].fontSize;
        newTab.fontFamily = this.windowArr[winIndex].fontFamily;
        newTab.fontStyle = this.windowArr[winIndex].fontStyle;
        newTab.fontWeight = this.windowArr[winIndex].fontWeight;

        newTab.lineColor = this.windowArr[winIndex].lineColor;
        newTab.lineWeight = this.windowArr[winIndex].lineWeight;
        newTab.width = this.windowArr[winIndex].width;
        if (this.tabInfoArr.length <= 0) {
            newTab.index = 0;
            newTab.name += newTab.index;
            this.tabInfoArr.push(newTab);
        } else {
            let check = false;
            for (let i = 0; i < this.tabInfoArr.length; i++) {
                if (this.tabInfoArr[i] == null) {
                    newTab.index = i;
                    check = true;
                }
                if (this.tabInfoArr[i] != null && this.tabInfoArr[i].indexNext == null) {
                    newTab.indexBefo = i;
                }
            }
            //this.windowArr[newWin.indexNext].indexNext = newWin.index;
            if (check == false) {
                newTab.index = this.tabInfoArr.length;
                newTab.name += newTab.index;
                this.tabInfoArr.push(newTab);
            } else {
                newTab.name += newTab.index;
                this.tabInfoArr[newTab.index] = newTab;
            }
            //윈도우 한테 정보 내려받기
            this.tabInfoArr[newTab.indexBefo].indexNext = newTab.index;
            delete this.tabInfoArr[newTab.indexBefo].tabInfo;
            console.log(this.tabInfoArr[newTab.indexBefo]);
        }
        this.value = newTab;

        this.tab_save();
        if(type == 0){
            this.tab_memo_color_C(newTab.index);
        }
    }
    tab_U(tabIndex, key, value){
        //tab edit
        this.tabInfoArr[tabIndex][key] = value;
        if(key.includes("inputShow")){
            this.tabInfoArr[tabIndex].inputShow = value
        }
        this.tab_save();
    }
    tab_D(tabIndex){
        const timeIndex =new Date();

        const befo = this.tabInfoArr[tabIndex].indexBefo;
        const next = this.tabInfoArr[tabIndex].indexNext;
        if (befo != null) { this.tabInfoArr[befo].indexNext = next; }
        if (next != null) { this.tabInfoArr[next].indexBefo = befo; }

        if(this.tabInfoArr[tabIndex].type == 0){
            this.tab_memo_color_D(tabIndex);
            for(let i=0;i<this.tab_memo_textArr.length;i++){
                if(this.tab_memo_textArr[i] != null && this.tab_memo_textArr[i].fk_tabIndex == tabIndex){
                    //trash tab_text---
                    const newTrashTuple = {
                        index : timeIndex, 
                        text : this.tab_memo_textArr[i].text
                    }
                    this.htmlInfo.trash.tab_text.push(newTrashTuple);
                    if(this.htmlInfo.trash.tab.length > 40){
                        this.htmlInfo.trash.tab_text.shift();
                    }
                    this.htmlInfo_save();
                    //---trash tab_text
                    this.tab_memo_textArr[i] = null;
                }
            }
            this.tab_memo_text_save();
        }
        //trash tab---
        this.tabInfoArr[tabIndex].index = timeIndex;  
        this.htmlInfo.trash.tab.push(this.tabInfoArr[tabIndex]);
        if(this.htmlInfo.trash.tab.length > 10){
            this.htmlInfo.trash.tab.shift();
        }
        this.htmlInfo_save();
        //---trash tab 
        
        this.tabInfoArr[tabIndex] = null;
        if (tabIndex == this.tabInfoArr.length - 1) {
            this.tabInfoArr.pop();
        }
        this.tab_save();
    }
    tab_U_indexChange(tabIndex, select){
        let index = this.tabInfoArr[tabIndex];
        let befo = this.tabInfoArr[index.indexBefo];
        let next = this.tabInfoArr[index.indexNext];
        
        let Nnext = null;
        if(next != null){
            Nnext = next.indexNext ==null ? null:this.tabInfoArr[next.indexNext];
        } 

        let Bbefo = null;
        if(befo !=null){
            Bbefo = befo.indexBefo ==null ? null:this.tabInfoArr[befo.indexBefo];
        }

        if(select == "befo"){
            if(befo != null){ 
                if(next !=null){
                    next.indexBefo = befo.index;
                }
                if(Bbefo != null){
                    Bbefo.indexNext = tabIndex;
                }
                index.indexBefo = Bbefo == null ? null : Bbefo.index;
                index.indexNext = befo.index; 

                befo.indexBefo = index.index;
                befo.indexNext = next == null ? null : next.index;
            }
        }else if(select == "next"){
            if(next != null){ 
                if(befo !=null){
                    befo.indexNext = next.index;
                }
                if(Nnext != null){
                    Nnext.indexBefo = tabIndex;
                }
                index.indexBefo = next.index;
                index.indexNext = Nnext  == null ? null : Nnext.index;

                next.indexBefo = befo == null ? null : befo.index;
                next.indexNext = index.index;
            }
        }
        this.tab_save();
        location.reload(true);
    }

    //tab_memo_color
    tab_memo_color_C(tabIndex){
        const newColor = new Tab_Memo_color();
        newColor.fk_tabIndex = tabIndex;
        this.tab_memo_colorArr.push(newColor);
        this.tab_memo_color_save();
    }
    tab_memo_color_U(tabIndex, key, value){
        for(let i=0;i<this.tab_memo_colorArr.length; i++){
            if(this.tab_memo_colorArr[i].fk_tabIndex ==tabIndex){
                this.tab_memo_colorArr[i][key] = value;
            }
        }
        
        this.tab_memo_color_save();
    }
    tab_memo_color_D(tabIndex){
        let newArr = [];
        for(let i=0;i<this.tab_memo_colorArr.length;i++){
            if(this.tab_memo_colorArr[i].fk_tabIndex != tabIndex){
                newArr.push(this.tab_memo_colorArr[i]);
            }
        }
        this.tab_memo_colorArr = newArr;
        this.tab_memo_color_save();
    }

    //tab_memo_text
    tab_memo_text_C(tabIndex, text, colorIndex){
        const memoText = new Tab_Memo_text();

        memoText.fk_tabIndex = tabIndex;
        const time =  new Date();
        const timeLi = {
            year:time.getFullYear(), month:time.getMonth(), date:time.getDate(), day:time.getDay(), 
            hours:time.getHours(), minutes:time.getMinutes(), seconds:time.getSeconds(),
        };   
        memoText.key_madeDate = timeLi;

        memoText.checked = false;
        memoText.fk_colorIndex = colorIndex;
        memoText.text = text;

        this.tab_memo_textArr.push(memoText);
        this.tab_memo_text_save();
        this.value = memoText;
    }
    tab_memo_text_U(tupleIndex, key, value){
        //fk_tabIndex, key_madeDate, checked, text, fk_colorIndex
        this.tab_memo_textArr[tupleIndex][key] = value;

        /*
        const time =  new Date();
        const timeLi = {
            year:time.getFullYear(), month:time.getMonth(), date:time.getDate(), day:time.getDay(), 
            hours:time.getHours(), minutes:time.getMinutes(), seconds:time.getSeconds(),
        };   
        this.tab_memo_textArr[tupleIndex].key_editDate = timeLi;*/
        this.tab_memo_text_save();
    }
    tab_memo_text_U_indexChange(tupleIndex1, tupleIndex2){
        //fk_tabIndex, key_madeDate, checked, text, fk_colorIndex
        const ex = this.tab_memo_textArr[tupleIndex1];
        this.tab_memo_textArr[tupleIndex1] = this.tab_memo_textArr[tupleIndex2];
        this.tab_memo_textArr[tupleIndex1].index = tupleIndex1;
        this.tab_memo_textArr[tupleIndex2] = ex;
        this.tab_memo_textArr[tupleIndex2].index = tupleIndex2;
        this.tab_memo_text_save();
    }
    tab_memo_text_D(textIndex){
        //trash tab_text---
        const timeIndex =new Date();
        const newTrashTuple = {index : timeIndex, 
            text : this.tab_memo_textArr[textIndex].text
        }
        this.htmlInfo.trash.tab_text.push(newTrashTuple);
        if(this.htmlInfo.trash.tab_text.length > 40){
            this.htmlInfo.trash.tab_text.shift();
        }
        this.htmlInfo_save();
        //---trash tab_text

        this.tab_memo_textArr[textIndex] = null;
        this.tab_memo_text_save();
    }

    //Tab_Calcul_text
    tab_calcul_text_C(tabIndex, text){
        const memoText = new Tab_Calcul_text();

        memoText.fk_tabIndex = tabIndex;
        const time =  new Date();
        const timeLi = {
            year:time.getFullYear(), month:time.getMonth(), date:time.getDate(), day:time.getDay(), 
            hours:time.getHours(), minutes:time.getMinutes(), seconds:time.getSeconds(),
        };   
        memoText.key_madeDate = timeLi;
        memoText.checked = false;
        memoText.text = text;

        this.tab_calcul_textArr.push(memoText);
        this.tab_calcul_text_save();
        this.value = memoText;
    }
    tab_calcul_text_D(textIndex){
        const timeIndex =new Date();
        const newTrashTuple = {index : timeIndex, 
            text : this.tab_calcul_textArr[textIndex].text
        }
        this.htmlInfo.trash.tab_text.push(newTrashTuple);
        if(this.htmlInfo.trash.tab_text.length > 40){
            this.htmlInfo.trash.tab_text.shift();
        }
        this.htmlInfo_save();
        //---trash tab_text

        this.tab_calcul_textArr[textIndex] = null;
        this.tab_calcul_text_save();
    }
    tab_calcul_text_U(tupleIndex, key, value){
        this.tab_calcul_textArr[tupleIndex][key] = value;
        this.tab_calcul_text_save();
    }
    tab_calcul_text_U_indexChange(tupleIndex1, tupleIndex2){
        //fk_tabIndex, key_madeDate, checked, text, fk_colorIndex
        const ex = this.tab_calcul_textArr[tupleIndex1];
        this.tab_calcul_textArr[tupleIndex1] = this.tab_calcul_textArr[tupleIndex2];
        this.tab_calcul_textArr[tupleIndex1].index = tupleIndex1;
        this.tab_calcul_textArr[tupleIndex2] = ex;
        this.tab_calcul_textArr[tupleIndex2].index = tupleIndex2;
        this.tab_calcul_text_save();
    }

    checkFunction() { return this.check; }
    sendValue() {
        this.window_C();
        return this.value;
    }
    sendTarget() { return this.target }
    sendName() { return this.name }
    getValue(value) {
        this.value = value;
        this.window_D(value);
    }

    htmlInfo_save() { localStorage.setItem(this.DBname.html, JSON.stringify(this.htmlInfo)); }
    window_save() { localStorage.setItem(this.DBname.window, JSON.stringify(this.windowArr)); }
    tab_save() { localStorage.setItem(this.DBname.tabInfo, JSON.stringify(this.tabInfoArr)); }

    tab_memo_color_save() { localStorage.setItem(this.DBname.tab_memo_color, JSON.stringify(this.tab_memo_colorArr)); }
    tab_memo_color_nullClear(){
        let newArr = [];
        for(let i=0;i<this.tab_memo_colorArr.length; i++){
            if(this.tab_memo_colorArr[i]!=null){
                newArr.push(this.tab_memo_colorArr[i]);
            }
        }
        this.tab_memo_colorArr = newArr;
        this.tab_memo_color_save();
    }
    tab_memo_text_save() { localStorage.setItem(this.DBname.tab_memo_text, JSON.stringify(this.tab_memo_textArr)); }
    tab_memo_text_nullClear(){
        let newArr = [];
        for(let i=0;i<this.tab_memo_textArr.length; i++){
            if(this.tab_memo_textArr[i]!=null){
                newArr.push(this.tab_memo_textArr[i]);
            }
        }
        this.tab_memo_textArr = newArr;
        this.tab_memo_text_save();
    }

    tab_calcul_text_save(){localStorage.setItem(this.DBname.tab_calcul_text, JSON.stringify(this.tab_calcul_textArr));}
    tab_calcul_text_nullClear(){
        let newArr = [];
        for(let i=0;i<this.tab_calcul_textArr.length; i++){
            if(this.tab_calcul_textArr[i]!=null){
                newArr.push(this.tab_calcul_textArr[i]);
            }
        }
        this.tab_calcul_textArr = newArr;
        this.tab_memo_text_save();
    }
}
class View {
    returnElement = null;
    newTuple = null;
    constructor(type, info, tabType, tabInfo) {
        if (type == "html") {
            const element = new htmlRemoteElement();
            let newArr = [];
            for(let i=0; i<info.newInfo.length; i++){
                for(let j=0; j<info.newInfo[i].length; j++){
                    newArr.push({text:info.newInfo[i][j].text, 
                        time:`${info.newInfo[i][j].key_madeDate.year}-${info.newInfo[i][j].key_madeDate.month}-${info.newInfo[i][j].key_madeDate.date} ${info.newInfo[i][j].key_madeDate.hours}:${info.newInfo[i][j].key_madeDate.minutes}`
                    });
                }
            }
            const sorted_list = newArr.sort(function(a, b) {
                return new Date(a.time).getTime() - new Date(b.time).getTime();
            });

            info.newInfo = sorted_list;
            element.setValue(info);
            this.returnElement = element.setElementAll();
        } else if (type == "window") {
            const element = new windowElement();
            element.setValue(info);
            this.returnElement = element.setElementCss();
        } else if (type == "tab") {
            const element = new tabElement();
            let newI = info;
            if(tabType == "memo"){
                newI.tabInfo = tabInfo;
            }
            element.setValue(newI);
            this.returnElement = element.setElementAll();
        }else if(type == "tuple"){
            if(tabType == "memo"){
                const element = new tabElement_memo();
                const exInfo = { text : [], color : info.color};
                info.set.tabInfo = exInfo;

                element.setValue(info.set);
                const tabInfo = info.tab; 
                this.returnElement = element.makeTuple(tabInfo.checked, tabInfo.index, tabInfo.text, tabInfo.fk_colorIndex);
            }else if(tabType == "calcul"){
                const element = new tabElement_calcul();
                const exInfo = { text : [] };
                info.set.tabInfo = exInfo;

                element.setValue(info.set);
                const tabInfo = info.tab; 
                this.returnElement = element.makeTuple(tabInfo.checked, tabInfo.index, tabInfo.text);
            }
            const html_tuple_info = {
                text : info.tab.text,
                time : `${info.tab.key_madeDate.year}-${info.tab.key_madeDate.month}-${info.tab.key_madeDate.date} ${info.tab.key_madeDate.hours}:${info.tab.key_madeDate.minutes}`
            }
            this.newTuple = html_tuple_info;
        }
    }
    htmlRecentNew(htmlInfo){
        const recentPlsPage = document.querySelector(".recentPlsPage");
        const element = new htmlRemoteElement();
        element.setValue(htmlInfo);
        recentPlsPage.prepend(element.tuple_recentWork(this.newTuple));
    }
}
class Controller {
    ex = null; value = null; model = null; name = null;
    constructor() { this.ex = true; this.name = "Controller_observer" }
    firstPageOpen() {
        this.value = null;
        this.model = new Model();

        //db null clear
        this.model.tab_memo_color_nullClear();
        this.model.tab_memo_text_nullClear();
        this.model.tab_calcul_text_nullClear();

        let winSelectInfo = [];
        //window start
        let win_i = 0;
        if(this.model.windowArr.length < 1 ){
            this.model.window_C();
        }
        for (let i = 0; i < this.model.windowArr.length; i++) {
            if (this.model.windowArr[i] != null && this.model.windowArr[i].indexBefo == null){
                win_i = this.model.windowArr[i].index;
                break
            }
        }
        while(true){
            winSelectInfo.push({i:this.model.windowArr[win_i].index, title:this.model.windowArr[win_i].name});
            this.windowAppend(this.model.windowArr[win_i]);
            const next = this.model.windowArr[win_i].indexNext;
            if(next != null){ win_i = next }
            else{ win_i = null; break }
        }
        
        //tab start
        let tab_i = null;
        for (let i = 0; i < this.model.tabInfoArr.length; i++) {
            if (this.model.tabInfoArr[i] != null && this.model.tabInfoArr[i].indexBefo == null){
                tab_i = this.model.tabInfoArr[i].index;
                break
            }
        }
        while(true){
            if(tab_i == null){break};
            if(this.model.tabInfoArr[tab_i].type == 0){
                let tabText = [];
                let tabColor = [];
                for(let j=0;j<this.model.tab_memo_textArr.length; j++){
                    if(this.model.tab_memo_textArr[j]!=null && this.model.tab_memo_textArr[j].fk_tabIndex==tab_i){
                        this.model.tab_memo_textArr[j].index = j;
                        tabText.push(this.model.tab_memo_textArr[j]);
                    }
                }
                for(let j=0; j<this.model.tab_memo_colorArr.length; j++){
                    if(this.model.tab_memo_colorArr[j] !=null && this.model.tab_memo_colorArr[j].fk_tabIndex==tab_i){
                        tabColor = this.model.tab_memo_colorArr[j];
                    }
                }
                const tabInfo = { text:tabText, color:tabColor, winSelect:winSelectInfo};
                this.model.tabInfoArr[tab_i].tabInfo = tabInfo;
            }else if(this.model.tabInfoArr[tab_i].type == 1){
                let tabText = [];
                for(let j=0;j<this.model.tab_calcul_textArr.length; j++){
                    if(this.model.tab_calcul_textArr[j]!=null && this.model.tab_calcul_textArr[j].fk_tabIndex==tab_i){
                        this.model.tab_calcul_textArr[j].index = j;
                        tabText.push(this.model.tab_calcul_textArr[j]);
                    }
                }
                const tabInfo = { text:tabText, winSelect:winSelectInfo};
                this.model.tabInfoArr[tab_i].tabInfo = tabInfo;
            }

            this.tabAppend(this.model.tabInfoArr[tab_i]);
            delete this.model.tabInfoArr[tab_i].tabInfo;

            const next = this.model.tabInfoArr[tab_i].indexNext;
            if(next != null){ tab_i = next }
            else{ tab_i = null; break }
        }

        //html start
        const newHtmlInfo = this.model.htmlInfo;
        newHtmlInfo.newInfo.push(this.model.tab_memo_textArr);
        newHtmlInfo.newInfo.push(this.model.tab_calcul_textArr);
        const v_element_html = new View("html", newHtmlInfo);
        mainHtml.appendChild(v_element_html.returnElement);
        this.model.htmlInfo.newInfo = [];
    }
    windowAppend(data) {
        const v_element_window = new View("window", data);
        mainDiv.appendChild(v_element_window.returnElement);
    }
    tabAppend(setInfo, tabType, tabInfo) {
        const v_element_tab = new View("tab", setInfo, tabType, tabInfo);
        const targetWindow = document.querySelector(`.w${setInfo.fk_windowIndex}body`);
        targetWindow.appendChild(v_element_tab.returnElement);
    }
    tupleAppend(tabIndex, data, tabType){
        const v_element_tab = new View("tuple", data, tabType);
        v_element_tab.htmlRecentNew(this.model.htmlInfo);
        const target = document.querySelector(`.t${tabIndex}_tuplesDiv`);
        target.prepend(v_element_tab.returnElement);
    }
    checkFunction() { return false; }
    sendValue() { return this.value; }
    getValue(target, value) {
        if (target == "window_C") {
            this.model.window_C();
            this.windowAppend(this.model.value);
        } else if (target == "window_D") {
            this.model.window_D(value);
        } else if (target == "window_U") {
            const index = value.split("/")[0];
            const key = value.split("/")[1];
            let value2 = value.split("/")[2];
            if (value2 == "true" || value2 == "false") { value2 = value2 == "true" ? true : false; }
            if (isNaN(value2) == false) { value2 = Number(value2) }
            this.model.window_U(index, key, value2)
        }else if(target == "window_U_indexChange"){
            this.model.window_U_indexChange(value.index, value.select);
        } else if (target == "html_U") {
            const key = value.split("/")[0];
            let value2 = value.split("/")[1];
            if (value2 == "true" || value2 == "false") { value2 = value2 == "true" ? true : false; }
            if (isNaN(value2) == false) { value2 = Number(value2) }
            this.model.html_U(key, value2);
        } else if (target == "tab_C") {
            const tabIndex = Number(value.split("/")[0]);
            const type = Number(value.split("/")[1]);
            this.model.tab_C(tabIndex, type);
            let tabInfo = { }; 
            if(this.model.value.type == 0){
                tabInfo = { color: null, text : [] } 
                for(let j=0; j<this.model.tab_memo_colorArr.length; j++){
                    if(this.model.tab_memo_colorArr[j] != null && this.model.tab_memo_colorArr[j].fk_tabIndex==this.model.value.index){
                        tabInfo.color = this.model.tab_memo_colorArr[j];
                    }
                }
            this.tabAppend(this.model.value, "memo", tabInfo);
            }else if(this.model.value.type == 1){
                tabInfo = { text : [] };
                this.tabAppend(this.model.value, "calcul", tabInfo);
            }
        }else if(target == "tab_U"){
            const index = value.split("/")[0];
            const key = value.split("/")[1];
            let value2 = value.split("/")[2];
            if (value2 == "true" || value2 == "false") { value2 = value2 == "true" ? true : false;}
            if (isNaN(value2) == false) { value2 = Number(value2); }
            this.model.tab_U(index, key, value2);
        }else if(target == "tab_U_indexChange"){
            this.model.tab_U_indexChange(value.index, value.select);
        }else if(target == "tab_D"){
            this.model.tab_D(value);
        }else if (target == "tab_memo_text_C") {
            const tabIndex = value.tabIndex;
            const text = value.text;
            const colorIndex = value.colorIndex;
            this.model.tab_memo_text_C(tabIndex, text, colorIndex);
            this.model.value.index = this.model.tab_memo_textArr.length - 1;
            const info = {
                set:this.model.tabInfoArr[tabIndex],
                tab:this.model.value,
            }
            for(let j=0; j<this.model.tab_memo_colorArr.length; j++){
                if(this.model.tab_memo_colorArr[j] !=null && this.model.tab_memo_colorArr[j].fk_tabIndex==tabIndex){
                    info.color = this.model.tab_memo_colorArr[j];
                }
            }
            this.tupleAppend(tabIndex, info, "memo");

        }else if(target == "tab_memo_text_U"){
            const index = value.index;
            const key = value.key;
            let value2 = value.value;
            if (value2 == "true" || value2 == "false") { value2 = value2 == "true" ? true : false; }
            if (isNaN(value2) == false) { value2 = Number(value2) }
            this.model.tab_memo_text_U(index, key, value2);
        }else if(target == "tab_memo_text_U_indexChange"){
            this.model.tab_memo_text_U_indexChange(value.tupleIndex1, value.tupleIndex2);
        }else if(target == "tab_memo_text_D"){
            this.model.tab_memo_text_D(value);
        }else if(target == "tab_memo_color_U"){
            const tabIndex = value.index;
            const key = value.key;
            const colorValue = value.value;
            this.model.tab_memo_color_U(tabIndex, key, colorValue);
        }else if(target == "html_trash_D"){
            this.model.html_trash_D(value.key, value.value, value.type);
        }else if(target == "tab_calcul_text_C"){
            const tabIndex = value.tabIndex;
            const text = value.text;
            this.model.tab_calcul_text_C(tabIndex, text);
            this.model.value.index = this.model.tab_calcul_textArr.length - 1;
            const info = {
                set:this.model.tabInfoArr[tabIndex],
                tab:this.model.value,
            }
            this.tupleAppend(tabIndex, info, "calcul");
        }else if(target == "tab_calcul_text_D"){
            this.model.tab_calcul_text_D(value);
        }else if(target == "tab_calcul_text_U"){
            const index = value.index;
            const key = value.key;
            let value2 = value.value;
            if (value2 == "true" || value2 == "false") { value2 = value2 == "true" ? true : false; }
            if (isNaN(value2) == false) { value2 = Number(value2) }
            this.model.tab_calcul_text_U(index, key, value2);
        }else if(target == "tab_calcul_text_U_indexChange"){
            this.model.tab_calcul_text_U_indexChange(value.tupleIndex1, value.tupleIndex2);
        }
    }
    sendTarget() { return "windowAppend"; }
    sendName() { return "Controller_observer"; }
}
const start_main = new Controller();
subj.subscribe(start_main);
start_main.firstPageOpen();

//<==========MVC pattern all