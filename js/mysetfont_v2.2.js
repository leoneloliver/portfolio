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

    let width = document.body.clientWidth;

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
            color: #fff;
            font-family: verdana;
            font-size: 12px;
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
            border: 0;
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
        #fontcontrol, #linecontrol{
            font-size: 20px;
            background-color: #fff !important;
            color: #3d4246 !important;
            border: 1px solid #09d88b !important;
            padding: 5px !important;
            margin: 0 auto;
            height: 34px;
            margin-top: 2px;
            margin-bottom: 18px;
        }
        [data-font] {
            cursor: pointer;	
        }
        [data-font]:hover, .f_selected {
            background-color: rgb(248 234 24 / 49%) !important;
            color: #f9a7bf !important;
        }
        #f_close {
            position: fixed;
            z-index: 9999999999;
            color: #403737;
            width: 25px;
            bottom: 256px;
            right: 38px;
            padding: 0;
            margin: 0;
            line-height: 10px;
            height: 25px;
            background: #cccccc;
            border-radius: 40px;
            font-size: 12px !important;
            border: 0;
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
            height: 269px;
            background: #272626;
        }
        button#f_copy {
            position: fixed;
            z-index: 9999999999999;
            right: 42px;
            bottom: 36px;
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
            text-transform: capitalize;
            border: 0;
            padding: 0 8px;
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
            Font Size: <input type="number" id="fontcontrol" id="fontcontrol" min="0" max="150">
            Line Height: <input type="number" id="linecontrol" id="linecontrol" min="0" max="200">
            <button id="copyfont">Check Fonts</button>
        </div>`;
        document.body.insertBefore(overlayDiv, document.body.firstChild);

        const elFont = document.querySelectorAll('[data-font]');
        const squareConteiner = document.querySelector('.container-font');
        squareConteiner.addEventListener('mouseleave', event => {
            for(let j = 0; j < elFont.length; j++){
                elFont[j].classList.remove('f_selected');
            }
        });

        var currentelement = null;
        for(let i = 0; i < elFont.length; i++){ 
            elFont[i].addEventListener('click', event => {
                currentelement = elFont[i];
                let fontSize = window.getComputedStyle(currentelement).fontSize;
                let lineHeight = window.getComputedStyle(currentelement).lineHeight;
                currentelement.style.fontSize = fontSize;
                currentelement.style.lineHeight = lineHeight;

                let currentFont = fontSize.replace("px", "");
                let currentHeight = lineHeight.replace("px", "");
                document.querySelector('#fontcontrol').value = currentFont;
                document.querySelector('#linecontrol').value = currentHeight;
                document.querySelector('.container-font').classList.remove('f_hide');
                for(let j = 0; j < elFont.length; j++){
                    elFont[j].classList.remove('f_selected');
                }
                currentelement.classList.add('f_selected')
            });
        }

        document.querySelector('#fontcontrol').addEventListener("change", function(){			
            let cont = "";
            cont = currentelement;
            cont.style.fontSize = document.querySelector('#fontcontrol').value+"px";	
        });

        document.querySelector('#linecontrol').addEventListener("change", function(){			
            let cont = "";
            cont = currentelement;
            cont.style.lineHeight = document.querySelector('#linecontrol').value+"px";	
        });

        function getAllFonts(){
            let fontfinal = width+'\r\n';
            for(let i = 0; i < elFont.length; i++){
                fontfinal += (i+1)+" > "+elFont[i].innerText.substring(0, 20) +' = font-size: '+ window.getComputedStyle(elFont[i]).fontSize +'; line-height: '+ window.getComputedStyle(elFont[i]).lineHeight +';\r\n';
            }
            document.querySelector('#font-result').innerHTML = "<div class='inner-result'><textarea id='text-result' name='text-result' rows='4' cols='50'>"+fontfinal+"</textarea></div><button id='f_close'>X</button><button id='f_copy'>&nbsp;copy [] </button>";

            document.querySelector('#f_close').addEventListener("click", function(){
                document.querySelector('#font-result').innerHTML = "";
            });

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