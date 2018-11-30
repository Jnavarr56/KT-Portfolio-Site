

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
            phraseIndex = 1;

        phraseElement.html( self.animPhrases[ 0 ].toUpperCase());
        
        setInterval( function() {
            phraseElement.html( '' );
            let str = self.animPhrases[ phraseIndex ].toUpperCase(),
                newHTML = '';


            for ( let c = 0; c < str.length; c ++ ) {
                newHTML += `<span class="animatePhraseIn${c}">${str[c]}</span>`;
            }


            phraseElement.html( newHTML );
            phraseIndex === self.animPhrases.length - 1 ? phraseIndex = 0 : phraseIndex ++;
        }, 3250 );
        





    }
    phraseAnimateMobile() {
        //console.log( 'Test animate 2' );
    }
}
var phrases = [
    'Junior Developer',
    'Polish Speaker',
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
    Katrina.phraseAnimateMobile();
    
    
    
} );