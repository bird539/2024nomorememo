const mainDiv = document.querySelector(".main");
const mainHtml = document.querySelector('html');
mainHtml.style.height = '100%';
mainHtml.style.textAlign = "center";

const all_fontWeight = [100, 200, 300, 400, 500, 600, 700, 800];
const all_fontFamily = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong'];
const all_fontStyle = ['normal', 'italic', 'oblique'];
const all_tapType_kr = ['메모', '계산', '링크', '시간', '그림', '달력', '확률'];
const all_backgroundColor = ['#FEF896', '#E4F1E7', '#C9DAEE', '#FAD5E6'];
const all_langauge = ['kr','en','ch','jp'];
const all_labgaugeText = [
    ko={},
    en={},
    ch={},
    jp={}
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
//==========================================================

//옵저버 디자인 패턴 ===>
class Subject_sendGetData {
    exValue = null; check = null; target = null; 
    constructor() { this.observers = []; this.exValue = null; this.check = true; this.target = null; }
    subscribe(observer) { this.observers.push(observer); }
    unsubscribe(observer) { this.observers = this.observers.filter((obs) => obs !== observer); }
    clear(){
        this.observers = [this.observers[0], ];
    }
    notifyAll() {
        for(let i = this.observers.length-1; i>-1; i--){
            let subscriber = this.observers[i];
            try {
                if(subscriber.name == "Controller_observer"){ //컨트롤러는 무조건 실행
                    subscriber.getValue(this.target, this.exValue); 
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
    checkFunction(){ return this.check; }
    sendValue(){ return this.value; }
    getValue(value){ this.value = value; }
    sendTarget(){ return this.target; }
    sendName(){ return this.name; }
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

        //쓰레기통 - 윈도우     (삭제일key, 윈도우 제목, 탭 제목들, 탭 정보들 )
        trashWindow: [],        //삭제일 + 윈도우div(tap디테일(탭 글자들)) + 복구 btn
        //쓰레기통 - 탭들       (삭제일key, 탭 제목들, 탭 정보들 )
        trashTab: [],           //삭제일 + tap디테일(탭 글자들))          + 복구 btn
        //쓰레기통 - 탭 정보들  (삭제일key, 탭 정보들 )               
        trashTabText: [],      //삭제일  + 탭 글자들           + 복구 btn

        index_fontWeight :  null,
        index_fontFamily : null,
        index_fontStyle : null,
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
    function_htmlEdit(event){
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "html update event";
        observer.target = "html_U";
        const key = event.target.className.split("_")[1];
        let value = event.target.value;
        if(key == "fontFamily" || key == "fontStyle" || key == "language"){
            value = event.target.selectedIndex;
        }else if(key=="lightDarkMode"){
            value = event.target.checked;
        }
        observer.value = `${key}/${value}`;

        subj.subscribe(observer);
        subj.notifyAll();
    }
    //<-- function event

    //make tuple -->
    newRecentInfoMake(newInfo) {
        const newInfoDiv = this.div.cloneNode(true);
        newInfoDiv.style.display = "flex";
        //newInfoDiv.style.flexGrow = "1";

        const dateDiv = newInfoDiv.cloneNode(true);
        const befoTime = new Date(newInfo.date);
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
    newRestWorkInfoMake(newInfo2) {
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
    trasInfoMake(newInfo) {

    }
    //<--make tuple

    //pages
    recentPlsPage() {
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "block";
        for (let i = 0; i < this.db.newInfo.length; i++) {
            pageDiv.appendChild(this.newRecentInfoMake(this.db.newInfo[i]));
        }
        pageDiv.className = "recentPlsPage";
        return pageDiv;
    }
    restWorkPage() {
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "flex";
        for (let i = 0; i < this.db.schedule.length; i++) {

            pageDiv.appendChild(this.newRestWorkInfoMake(this.db.schedule[i]));
        }
        //임시 숨기기
        pageDiv.className = "restWorkPage";
        pageDiv.style.display = "none";
        return pageDiv;
    }
    trashPage(){
        const pageDiv = this.div.cloneNode(true);
        pageDiv.style.width = "flex";

        pageDiv.innerText = "trash Page..."
        return pageDiv;
    }
    remoteEditPage(){
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
        for(let i=0; i<all_langauge.length; i++){
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
        for(let i=0; i<all_fontFamily.length; i++){
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
        for(let i=0; i<all_fontStyle.length; i++){
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
        if(this.db.lastPageShow != "0"){page.style.display = "none";}
        pagesDiv.appendChild(page);
        
        page = this.restWorkPage();
        if(this.db.lastPageShow != "1"){page.style.display = "none";}
        pagesDiv.appendChild(page);
        
        page = this.trashPage();
        if(this.db.lastPageShow != "2"){page.style.display = "none";}
        pagesDiv.appendChild(page);

        page = this.remoteEditPage();
        if(this.db.lastPageShow != "3"){page.style.display = "none";}
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
        headBtn.addEventListener("click", showHide);

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

        index_fontFamily:null,
        index_fontStyle:null,
        index_fontWeight:null 
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
    function_createWindow(event){
        const observer = new Observer_sendGetData(true);
        observer.name = "make new window event";
        observer.target = "window_C";
        subj.subscribe(observer);
        subj.notifyAll();
    }
    function_removeWindow(event){
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
    function_editWindow(event){
        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "window update event";
        observer.target = "window_U";
        const index = event.target.className.split("_")[0].replace(baseic_regex, "");
        const key = event.target.className.split("_")[1];
        let value = event.target.value;
        if(key == "fontFamily" || key == "fontStyle"){
            value = event.target.selectedIndex;
        }
        observer.value = `${index}/${key}/${value}`;
        subj.subscribe(observer);
        subj.notifyAll();
    }

    function_newTab(event){
        const winIndex = event.target.className.split("_")[0].replace(baseic_regex, "");
        const tabType =  event.target.className.split("_")[1];

        const observer = new Observer_sendGetData(true);
        observer.check = true;
        observer.name = "new tab pluse event";
        observer.target = "tab_C";

        observer.value = `${winIndex}/${tabType}`;
        subj.subscribe(observer);
        subj.notifyAll();
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
        const strArray = event.target.className.split('_');
        for (let i = 0; i < strArray.length; i++) {
            if (strArray[i].includes("showHide")) {
                const targetName = strArray[i].split(":")[1];
                const target = document.querySelector(`.${targetName}`);
                target.style.display = target.style.display != "none" ? "none" : strArray[i].split(":")[2];
                if(targetName.includes("body")){
                    const indexStr = strArray[0];
                    const index = indexStr.replace(baseic_regex, "");
                    const show = target.style.display != "none";
                    observer.value = `${index}/show/${show}`;
                }
            }
        }
        subj.subscribe(observer);
        subj.notifyAll();
    }
    showHide2(event){
        const name =  event.target.className;
        const win = name.replace(baseic_regex, "");
        let target_classNames = ["body", "TabSelectDiv", "EditDiv"]; 
        let click_classNames = [`w${win}titleBtn_showHide:w${win}body:flex`, "TabPlsBtn", "Edit"]; 
        for(let i = 0; i<click_classNames.length; i++){
            if(name.includes(click_classNames[i])){
                let display = document.querySelector(`.w${win}${target_classNames[i]}`).style.display == "none" ? "none" : "flex";
                if(display != "none"){
                    for(let j = i; j<target_classNames.length; j++){
                        const target = document.querySelector(`.w${win}${target_classNames[j]}`);
                        target.style.display = "none";
                    }
                }else{
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
        titleBtn.className = `w${this.db.index}titleBtn_showHide:w${this.db.index}body:block`;
        titleBtn.addEventListener('click', this.showHide);

        const tapPlsBtn = MIN_BTN.cloneNode(true);
        tapPlsBtn.innerText = "+";
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
            if(i==7){
                plsBtn_new.addEventListener("click", this.function_createWindow);
            }else{
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
        goTobefo.innerText = "<= move to front";
        const goTonext = LEFT_BTN.cloneNode(true);
        goTonext.innerText = "move to back =>";
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
class tabElement{
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
        index :null,  indexBefo :null,  indexNext :null, 
        show : null, 
        type:null,
        sort : null, 
        
        //수정 가능
        name:null,
        fontSize:null,
        fontColor:null, backgroundColor:null,
        width:null,

        //window 상속받기
        fk_windowInex :null,

        fontFamily :null, fontStyle :null, fontWeight :null, 
        lineColor :null,  lineWeight :null, 
        width :null, 

        index_fontWeight :  null,
        index_fontFamily : null,
        index_fontStyle : null,

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
        this.db.fk_windowInex = db.fk_windowInex;

        this.db.index = db.index;
        this.db.indexBefo = db.indexBefo;
        this.db.indexNext = db.indexNext;

        this.db.show =db.show; 
        this.db.type =db.type;
        this.db.sort =db.sort;

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

    tabEditPage(){
        const editDiv = this.div.cloneNode(true);
        editDiv.innerText = "edit somthing...";

        return editDiv;
    }
    tabMainPage(){
        const tabDiv = this.div.cloneNode(true);
        tabDiv.innerText = "tab memo or other somthing...";

        return tabDiv;
    }
    
    setElementAll(){
        //basic element set
        const MAIN_LINE_DIV = this.div.cloneNode(true);
        MAIN_LINE_DIV.style.display = "flex";
        MAIN_LINE_DIV.style.borderBottom = `${this.db.lineWeight}px solid ${this.db.lineColor}`;
        console.log(`${this.db.lineWeight}px solid ${this.db.lineColor}`);
        
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
        tabDiv.className = `t${this.db.index}_k${this.db.type}`;
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
        //titleBtn.addEventListener('click', this.showHide);
        const tapPlsBtn = MIN_BTN.cloneNode(true);
        tapPlsBtn.innerText = "e";
        tapPlsBtn.className = `t${this.db.index}EditBtn`

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
class tabElement_memo{
    div = null;
    button = null;
    input = null;
    form = null;
    select = null;
    option = null;
    db = {
        index:null,
        sort: null,
        
        fontSize: null, fontThick: null, fontFamily: null, fontStyle: null,
        fontColor: null, backgroundColor: null, 
        lineColor: null,lineThick: null,

        index_fontFamily:null,
        index_fontStyle:null,
        index_fontWeight:null 
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

    

    //head - i btn / form(textarea, sub, color-input, select) / select-sort(new, old, color)
    //body - checkbox / text(text div, edit input, color select, copy btn, del btn)
    //foot - checkbox(all) / select(all, color1~3) / del btn 
    setElementAll(){
        const tab_memo_div = this.div.cloneNode(true);
        tab_memo_div.className = `t${this.db.index}`;
        

        return tab_memo_div;
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
    constructor() {
        this.lastPageShow = 0; this.title = 'hello!';
        this.fontSize = basic_fontSize; this.fontWeight = 0; this.fontFamily = 1; this.fontStyle = 0;
        this.fontColor = basic_fontColor; this.backgroundColor = all_backgroundColor[3]; this.lineColor = basic_lineColor;
        this.htmlBackgroundColor = basic_htmlBacground; this.lightDarkMode = true;
        this.language = 'kr';
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
    index = null; fk_windowInex = null; type = null; name = null; show = null; sort = null; fontSize = null;
    fontColor = null; backgroundColor = null; width = null;

    constructor(typeNum) {
        this.index = 0; this.fk_windowInex = 0; this.type = typeNum; this.name = all_tapType_kr[typeNum]; this.show = true; this.sort = 0; this.fontSize = basic_fontSize;
        this.fontColor = basic_fontColor; this.backgroundColor = all_backgroundColor[0]; this.width = basic_width;
    }
}

class Tab_Memo_color {
    fk_tabIndex = null; color1 = null; color2 = null; color3 = null;
    constructor(tabIndex) {
        this.fk_tabIndex = tabIndex; this.color1 = '#fe0000'; this.color2 = '#1500ff'; this.color3 = '#00ff19';
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
//<==========Model - make tuple all

//MVC pattern all ==========>
class Model {
    htmlInfo = null;
    windowArr = [];
    tabInfoArr = [];

    tab_memo_colorArr = [];
    tab_memo_textArr = [];
    observer_update = "hear, I am Model";
    check = null; value = null; target = null; name = null;


    DBname = {
        html: "htmlDB",
        window: "windowDB",
        tabInfo: "tabInfoDB",

        tab_memo_color: "memo_color",
        tab_memo_text: "memo_text",
    }


    constructor() {
        this.check = true; this.value = null; this.target = null; this.name = null;
        this.htmlInfo = JSON.parse(localStorage.getItem("htmlDB"));
        this.windowArr = JSON.parse(localStorage.getItem("windowDB"));
        this.tabInfoArr = JSON.parse(localStorage.getItem("tabInfoDB"));

        this.tab_memo_colorArr = JSON.parse(localStorage.getItem("memo_color"));
        this.tab_memo_textArr = JSON.parse(localStorage.getItem("memo_text"));

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
        }
        if (this.tab_memo_textArr == null) {
            this.tab_memo_textArr = [];
            this.tab_memo_text_save();
        }
    }

    tab_C(winIndex, type){
        const newTab = new TabInfo();
        newTab.type = type;
        newTab.fk_windowInex = winIndex;
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
                if (this.tabInfoArr[i]!=null && this.tabInfoArr[i].indexNext == null) {
                    newTab.indexBefo = i;                    
                }
            }
            //this.windowArr[newWin.indexNext].indexNext = newWin.index;
            if (check == false) {
                newTab.index = this.tabInfoArr.length ;
                newTab.name += newTab.index;
                this.tabInfoArr.push(newTab);
            } else {
                newTab.name += newTab.index;
                this.tabInfoArr[newTab.index] = newTab;
            }
            
            //윈도우 한테 정보 내려받기

            
            this.tabInfoArr[newTab.indexBefo].indexNext = newTab.index;
        }
        this.value = newTab;
        this.tab_save();
    }

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
                if (this.windowArr[i]!=null && this.windowArr[i].indexNext == null) {
                    newWin.indexBefo = i;                    
                }
            }
            //this.windowArr[newWin.indexNext].indexNext = newWin.index;
            if (check == false) {
                newWin.index = this.windowArr.length ;
                newWin.name += newWin.index;
                this.windowArr.push(newWin);
            } else {
                newWin.name += newWin.index;
                this.windowArr[newWin.index] = newWin;
            }
            
            //배경색 지정
            new_windwo_colorIndex += 1;
            if(newWin.indexBefo != null){
                for(let i=0;i<all_backgroundColor.length;i++){
                    if(all_backgroundColor[i] == this.windowArr[newWin.indexBefo].backgroundColor){
                        newWin.backgroundColor = i < all_backgroundColor.length-1 ? all_backgroundColor[i + 1]:all_backgroundColor[0];
                    }
                }
            }else if(newWin.indexBefo == null){
                newWin.backgroundColor = all_backgroundColor[0];
            }
            this.windowArr[newWin.indexBefo].indexNext = newWin.index;
        }
        this.value = newWin;
        this.window_save();
    }
    window_U(index, key, value){
        this.windowArr[index][key] = value;
        this.window_save();
    }
    window_D(index){
        const befo = this.windowArr[index].indexBefo;
        const next = this.windowArr[index].indexNext;
        if(befo != null){this.windowArr[befo].indexNext = next; }
        if(next != null){this.windowArr[next].indexBefo = befo; }
        this.windowArr[index] = null;
        if(index == this.windowArr.length -1){
            let newArr = [];
            for(let i=0; i<this.windowArr.length-2; i++){
                newArr.push(this.windowArr[i]); 
            }
            this.windowArr = newArr;
        }
        this.window_save();
    }

    html_U(key, value){
        this.htmlInfo[key] = value;
        this.htmlInfo_save();
    }

    checkFunction(){ return this.check; }
    sendValue(){ 
        this.window_C();
        return this.value; 
    }
    sendTarget(){ return this.target }
    sendName(){ return this.name }
    getValue(value){ 
        this.value = value;
        this.window_D(value); 
    }

    htmlInfo_save() { localStorage.setItem(this.DBname.html, JSON.stringify(this.htmlInfo)); }
    window_save() { localStorage.setItem(this.DBname.window, JSON.stringify(this.windowArr)); }
    tab_save() { localStorage.setItem(this.DBname.tabInfo, JSON.stringify(this.tabInfoArr)); }
    
    tab_memo_color_save() { localStorage.setItem(this.DBname.tab_memo_color, JSON.stringify(this.tab_memo_colorArr)); }
    tab_memo_text_save() { localStorage.setItem(this.DBname.tab_memo_text, JSON.stringify(this.tab_memo_textArr)); }
}
class View {
    returnElement = null;
    constructor(type, info) {
        if (type == "html") {
            const element = new htmlRemoteElement();
            element.setValue(info);
            this.returnElement = element.setElementAll();
        } else if (type == "window") {
            const element = new windowElement();
            element.setValue(info);
            this.returnElement = element.setElementCss();
        }else if(type=="tab"){
            const element = new tabElement();
            element.setValue(info);
            this.returnElement = element.setElementAll();
        }
    }
}
class Controller {
    ex = null; value = null; model = null; name = null;
    constructor() { this.ex = true; this.name="Controller_observer" }
    firstPageOpen() {
        this.value = null;
        this.model = new Model();
        const v_element_html = new View("html", this.model.htmlInfo);
        mainHtml.appendChild(v_element_html.returnElement);

        for (let i = 0; i < this.model.windowArr.length; i++) {
            if (this.model.windowArr[i] != null) {
                this.windowAppend(this.model.windowArr[i]);
            }
        }
        for(let i=0; i< this.model.tabInfoArr.length; i++){
            if (this.model.tabInfoArr[i] != null) {
                this.tabAppend(this.model.tabInfoArr[i]);
            }
        }
    }
    windowAppend(data){
        const v_element_window = new View("window", data);
        mainDiv.appendChild(v_element_window.returnElement);
    }
    tabAppend(data){
        const v_element_tab = new View("tab", data);
        const targetWindow = document.querySelector(`.w${data.fk_windowInex}body`);
        targetWindow.appendChild(v_element_tab.returnElement);
    }
    checkFunction(){    return false; }
    sendValue() {       return this.value; }
    getValue(target,value){
        if(target == "window_C"){
            this.model.window_C();
            this.windowAppend(this.model.value);
        }else if(target == "window_D"){
            this.model.window_D(value);
        }else if(target == "window_U"){
            const index = value.split("/")[0];
            const key = value.split("/")[1];
            let value2 = value.split("/")[2];
            if(value2 == "true" || value2 == "false"){ value2 = value2 == "true" ? true : false; }
            if(isNaN(value2)==false){ value2 = Number(value2)  }
            this.model.window_U(index, key, value2)
        }else if(target == "html_U"){
            const key = value.split("/")[0];
            let value2 = value.split("/")[1];
            if(value2 == "true" || value2 == "false"){ value2 = value2 == "true" ? true : false; }
            if(isNaN(value2)==false){ value2 = Number(value2)  }
            this.model.html_U(key, value2);
        }else if(target == "tab_C"){
            const winIndex = Number(value.split("/")[0]);
            const type = Number(value.split("/")[1]);
            this.model.tab_C(winIndex, type);
            this.tabAppend(this.model.value, winIndex);
        }
    }
    sendTarget(){       return "windowAppend"; }
    sendName(){         return "Controller_observer"; }
}
const start_main = new Controller();
subj.subscribe(start_main);
start_main.firstPageOpen();

//<==========MVC pattern all
let array10 = new Array(10);




//========================================================================



//실험실------------------------------------------------------------------------------------------
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
/*
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
        console.log(`${this.name}: notified from ${subj} class!`);
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
        console.log("~~");
    }
}
const cc = new c("c");

subj.subscribe(a);
subj.subscribe(b);
subj.subscribe(cc);
subj.notifyAll();
*/