
const alertBox = document.querySelector(".alert-box");
const inputText = document.querySelector("#input-text");
const inputFactor = document.querySelector("#input-factor");
const inputHeight = document.querySelector("#input-height");
const inputWidth = document.querySelector("#input-width");

// Alert

function aletUser( msg )
{
    alertBox.classList.remove("d-none");
    document.querySelector(".alert-box p").innerHTML = msg;
    setTimeout( () => {
        closeAlert();
    }, 3000);
};

function closeAlert()
{
    alertBox.classList.add("alert-close");
    setTimeout( () => {
        alertBox.classList.remove("alert-close");
        alertBox.classList.add("d-none");
    }, 500);
};

document.querySelector(".alert-box img").addEventListener("click" , closeAlert );

// Reset Button

document.querySelector(".reset-btn").addEventListener("click",() => {
    inputText.value = "";
    inputFactor.value = "";
    inputHeight.value = "";
    inputWidth.value = "";
    document.querySelector("#output-text").value = "";
    document.querySelector(".reset-btn").className = "reset-btn d-none";
});

inputText.addEventListener("input", () => {
    if( inputText.value === "" )
        document.querySelector(".reset-btn").className = "reset-btn d-none";
    else
        document.querySelector(".reset-btn").className = "reset-btn";    
});

// Multiplying factor
document.querySelector("#factor-submit-btn").addEventListener("click",() => {
    if( inputText.value === "" )
    {  
        aletUser("Input text field can't be empty.");
        return;
    }
    else if( inputFactor.value === "" )
    {  
        aletUser("Multiplication factor can't be empty.");
        return;
    }

    var text = inputText.value;
    var factor = parseFloat(inputFactor.value);

    var output = "";
    var btw = false;

    for( let i=0; i<text.length; i++ )
    {
        if( text[i] === ":" ) btw = true;
        else if( text[i] === ";" ) btw = false;
        else
        {
            var str = "";
            while( ( '0' <= text[i] && text[i] <= '9' ) || ( text[i] === '.' && '0' <= text[i-1] && text[i-1] <= '9') )
            {
                str += text[i];
                i++;
            }
            if( str !== "" )
            {
                if(btw)
                    output += Math.round( parseFloat( str ) * factor * 10) / 10;
                else
                    output += str;
            } 
        }   
        if( i<text.length ) output += text[i];
    }

    setOutput(output);
});

// Height

document.querySelector("#height-submit-btn").addEventListener("click",() => {
    if( inputText.value === "" )
    {  
        aletUser("Input text field can't be empty.");
        return;
    }
    else if( inputHeight.value === "" )
    {  
        aletUser("Requiered height field can't be empty.");
        return;
    }

    var rqHt = inputHeight.value;
    var text = inputText.value;
    rqHt = Number(rqHt);
    
    var orgHt;
    for( i=0; i<text.length - 5; i++)
    {
        if(text.substring(i,i+6) === "height")
        {
            var temp = "";
            for( i=i+6; i<text.length;i++)
            {
                if( text[i] === "p" ) 
                    break;
                else if( '0' <= text[i] && text[i] <= '9' )
                    temp += text[i];
            }
            orgHt = Number(temp);
            break;
        }
    }

    if( !orgHt )
    {
        aletUser("No Height input given in input text.");
        return;
    }

    inputFactor.value =  parseFloat((rqHt / orgHt).toFixed(5));
    document.querySelector("#factor-submit-btn").click();
});

// Width

document.querySelector("#width-submit-btn").addEventListener("click",() => {
    if( inputText.value === "" )
    {  
        aletUser("Input text field can't be empty.");
        return;
    }
    else if( inputWidth.value === "" )
    {  
        aletUser("Required width field can't be empty.");
        return;
    }

    var rqWt = inputWidth.value;
    var text = inputText.value;
    rqWt = Number(rqWt);
    
    var orgWt;
    for( i=0; i<text.length - 4; i++)
    {
        if(text.substring(i,i+5) === "width")
        {
            var temp = "";
            for( i=i+5; i<text.length;i++)
            {
                if( text[i] === "p" ) 
                    break;
                else if( '0' <= text[i] && text[i] <= '9' )
                    temp += text[i];
            }
            orgWt = Number(temp);
            break;
        }
    }

    if( !orgWt )
    {
        aletUser("No Width input given in input text.");
        return;
    }

    inputFactor.value =  parseFloat((rqWt / orgWt).toFixed(5));
    document.querySelector("#factor-submit-btn").click();
});

function setOutput( result )
{
    aletUser("Output text copied to clipboard.");
    document.querySelector("#output-text").value = result;
    document.querySelector("#output-text").select();
    document.execCommand('copy');
    document.querySelector("#input-text").focus();
    document.querySelector("#output-text").classList.add("output-anm");
    setTimeout( () => {
        document.querySelector("#output-text").classList.remove("output-anm");
    }, 1000);
}