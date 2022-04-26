// @name         Set Font
// @version      v1
// @description  A font playground
// @author       Leonel Oliveira

var f_globalUrl = window.location.href;
var f_mainUrl = new URL(f_globalUrl);
var hasSetfont = f_mainUrl.searchParams.get("setfont");

if(hasSetfont){

    console.log('setFont is running!');

    alert('Setfont is turned ON!');

    const addStyle = () => {

        let styleSheet = `
        .container-font{
            position: fixed;
            width: 160px;
            top: 0;
            right: 0;
            z-index: 999999999999;
            border: 1px solid #000;
            background: #000;
            padding: 12px;
            text-align: center;
        }
        .container-font button{
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
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 2px;
        }
        .inner-result{
            background-color: #323232;
            color: #ddffe2;
            padding: 12px;
            font-size: 12px;
            border-top: 3px solid #000;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 999999999;
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
        #f_close {
            position: fixed;
            z-index: 9999999999;
            color: #403737;
            width: 25px;
            bottom: 265px;
            right: 12px;
            padding: 0;
            margin: 0;
            line-height: 10px;
            height: 25px;
            background: #cccccc;
            border-radius: 40px;
            padding-left: 3px;
            font-size: 12px !important;
        }
        .f_hide{
            display:none;
        }
        textarea#text-result {
            color: #0ed88c;
            width: 100%;
            border: 0;
            padding: 12px;
            font-size: 12px !important;
            line-height: 22px;
        }
        button#f_copy {
            position: fixed;
            z-index: 9999999999999;
            right: 18px;
            bottom: 58px;
            /* width: 12px; */
            padding: 0;
            margin: 0;
            line-height: 12px;
            height: 30px;
            font-family: verdana;
            font-size: 12px !important;
            font-weight: 600;
            background: #399f84;
            color: #fff;
        }
        button#f_copy:hover{
            background: #efefef;
            color: #000;
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
        <div class="container-font f_hide">
            <input type="number" id="fontcontrol" id="fontcontrol" min="0" max="100">
            <button id="copyfont">Check Fonts</button>
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

            document.querySelector('.container-font').classList.remove('f_hide');
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
                fontfinal += "> "+elFont[i].innerText.substring(0, 20) +' -> '+ window.getComputedStyle(elFont[i]).fontSize +' \r\n';
            }
            document.querySelector('#font-result').innerHTML = "<div class='inner-result'><textarea id='text-result' name='text-result' rows='4' cols='50'>"+fontfinal+"</textarea></div><button id='f_close'>X</button><button id='f_copy'>&nbsp;copy [] </button>";

            document.querySelector('#f_close').addEventListener("click", function(){
                document.querySelector('#font-result').innerHTML = "";
            })

            document.querySelector('#f_copy').addEventListener("click", function(){
                var copyText = document.getElementById("text-result");

                /* Select the textarea field */
                copyText.select();
                copyText.setSelectionRange(0, 99999); /* For mobile devices */

                /* Copy the text inside the text field */
                navigator.clipboard.writeText(copyText.value);

                /* Alert the copied text */
                // alert("Copied the text: " + copyText.value);
                document.execCommand('copy');
            })
        }

        document.querySelector('#copyfont').addEventListener("click", function(){
            getAllFonts();
        })

        addStyle();
    })();

}