function phraseHTML ( str, el ) { 
    str = str.toUpperCase();
    el.empty();
    let newHTML = '';
    for ( let c = 0; c < str.length; c ++ ) {
        let newChar = str[c] === ' ' ? '&nbsp;' : str[c];
        newHTML += `<span class="animatePhraseIn${c}">${newChar}</span>`;
    }
    return newHTML;
}

class Kat { 
    constructor() {
        this.animPhrases = [];
        this.phraseTextID = null;
        this.phraseTextIDMobile = null;
    }
    setPhraseAnimationElements( phrasesArray, phraseElementID, phraseElementIDMobile = null ) {
        this.animPhrases = phrasesArray;
        this.phraseTextID = phraseElementID;
        this.phraseTextIDMobile = phraseElementIDMobile;
    }
    phraseAnimate() {

        let self = this,
            phraseElement = $( '#' + this.phraseTextID ),
            started = false,
            firstSw = false,
            phraseIndex = 0;

        function writeSpinEff()  {            
            const wait = started ? 250 + ( ( self.animPhrases[ phraseIndex ].length ) * 75 ) : 0;
            started = true;

            phraseElement.html( 
                phraseHTML( self.animPhrases[ phraseIndex ], phraseElement )
            );
            phraseIndex === self.animPhrases.length - 1 ? phraseIndex = 0: phraseIndex ++;
            
            //+ ( firstSw ? 1500 : 0 ) 

            setTimeout( function() {  
                firstSw = true;
                
                
                writeSpinEff();
            }, wait + ( firstSw ? 1500 : 0 )  );
        }
        
        writeSpinEff();
        
        
   
        





    }

}
var phrases = [
    'Polish Polyglot',
    'Junior Developer',
    'Coffee Addict',
    'Former English Teacher',
    'Amateur Sociologist',
    'Bouldering Fanatic',
    'HS Theatre Geek',
];

$( document ).ready( function() {
    
    var Katrina = new Kat();
    Katrina.setPhraseAnimationElements( phrases, 'bounce-text', 'bounce-text-mobile' );
    Katrina.phraseAnimate();
    
    
    
    
} );