// @name         Set Font
// @version      v1
// @description  A font playground
// @author       Leonel Oliveira

var f_globalUrl = window.location.href;
var f_mainUrl = new URL(f_globalUrl);
var hasSetfont = f_mainUrl.searchParams.get("setfont");

if(hasSetfont){

    console.log('setFont is running!')

    const addStyle = () => {

        let styleSheet = `
        .container-font{
            position: fixed;
            width: 138px;
            top: 0;
            right: 0;
            z-index: 999999999999;
            border: 1px solid #000;
            background: #000;
            padding: 12px;
        }
        .container-font button{
            font-size: 10px;
            padding: 0;
            margin: 0;
            height: 31px;
            line-height: 0;
            width: 100%;
            background: #ccc;
            text-align: center;
            border-radius: 40px;
            z-index: 999999999;
            position: relative;
        }
        .inner-result{
            background-color: #000;
            color: #07d88c;
            padding: 12px;
            font-size: 12px;
        }
        #fontcontrol{
            font-size: 20px;
            background-color: #fff !important;
            color: #3d4246 !important;
            border: 1px solid #efefef !important;
            padding: 5px !important;
            margin: 0 auto;
            height: 55px;
            margin-top: 10px;
            margin-bottom: 16px;
        }
        [data-font] {
            cursor: pointer;	
        }
    `;
        let css = document.createElement('style');
        css.type = "text/css";
        css.innerHTML = styleSheet;
        document.getElementsByTagName("head")[0].appendChild(css);
    }

    (function() {
        'use strict';


        let overlayDiv = document.createElement('DIV');
        overlayDiv.id = "setFont";
        overlayDiv.innerHTML = `<div id="font-result"></div>
        <div class="container-font">
            <input type="number" id="fontcontrol" id="fontcontrol" min="0" max="100">
            <button id="copyfont">Copy</button>
        </div>`;
        document.body.insertBefore(overlayDiv, document.body.firstChild);

        const elFont = document.querySelectorAll('[data-font]');

        var currentelement = null;
        for(let i = 0; i < elFont.length; i++){
            elFont[i].addEventListener('click', event => {
            currentelement = elFont[i];
            let fontSize = window.getComputedStyle(currentelement).fontSize;
            let currentFont = fontSize.replace("px", "");
            document.querySelector('#fontcontrol').value = currentFont;
            });
        }

        document.querySelector('#fontcontrol').addEventListener("change", function(){			
            let cont = "";
            cont = currentelement;
            cont.style.fontSize = document.querySelector('#fontcontrol').value+"px";	
        });

        function getAllFonts(){
            let fontfinal = "";
            for(let i = 0; i < elFont.length; i++){
                fontfinal += "("+elFont[i].innerText.substring(0, 20) +' -> '+ window.getComputedStyle(elFont[i]).fontSize +') ---- ';
            }
            document.querySelector('#font-result').innerHTML = "<div class='inner-result'>"+fontfinal+"</div>";
        }

        document.querySelector('#copyfont').addEventListener("click", function(){
            getAllFonts();
        })

        addStyle();
    })();

}