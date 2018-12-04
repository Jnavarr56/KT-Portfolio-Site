function phraseHTML ( str, el, animClass ) { 
    str = str.toUpperCase();
    el.empty();
    let newHTML = '';
    for ( let c = 0; c < str.length; c ++ ) {
        let newChar = str[c] === ' ' ? '&nbsp;' : str[c];
        newHTML += `<span class="${ animClass + c }">${newChar}</span>`;
    }
    return newHTML;
}

class Kat { 
    constructor() {

        this.animPhrases = [],
        this.phraseTextElement = null,
        this.phraseInAnimClass = null,
        this.phraseOutAnimClass = null;

        this.scrollPos = $( window ).scrollTop();
        this.startedScroll = false;
        this.desktopNav = null;
        this.desktopNavAnimClass = null;
        this.desktopNavWordsAnimClass = null;
        this.desktopNavWordsClass = null;
        this.allNav = [];
        this.menuAnimTrack = {} 
        this.origLeft = null;
        this.origWidth = null;
        
    }
    setPhraseAnimationElements( phrasesArray, phraseElementID, phraseInClass, phraseOutClass) {

        this.animPhrases = phrasesArray;
        this.phraseTextElement = $( '#' + phraseElementID );
        this.phraseInAnimClass = phraseInClass,
        this.phraseOutAnimClass = phraseOutClass;
    }
    enablePhraseAnimate() {  

        let self = this,
            started = false,
            firstSw = false,
            phraseIndex = 0;

        function writeSpinEff()  {     

            const wait = started ? 250 + ( ( self.animPhrases[ phraseIndex ].length ) * 75 ) : 0;
            started = true;

            self.phraseTextElement.html( 
                phraseHTML(
                    self.animPhrases[ phraseIndex ], 
                    self.phraseTextElement,
                    self.phraseInAnimClass
                )
            );
            phraseIndex === self.animPhrases.length - 1 ? phraseIndex = 0: phraseIndex ++;

            setTimeout( function() {  
      
                self.phraseTextElement.children().each( function( c ) {
                    $( this ).removeClass( `${ self.phraseInAnimClass + c }` );
                    $( this ).addClass( `${ self.phraseOutAnimClass + c }` );
                } );

                setTimeout( function() {
                    firstSw = true;
                    writeSpinEff();
                }, 85 + ( firstSw ? self.phraseTextElement.children().length * 75 : 0 )  );
                
            }, wait + ( firstSw ? 750 : 0 )  );

        }
        writeSpinEff();
    }
    setDesktopNavAnimationElements( desktopNavElID, menuAnimationClass, menuWordsAnimationClass, menuWordsClass ) {

        this.desktopNav = $( '#' + desktopNavElID );
        this.desktopNavAnimClass = menuAnimationClass;
        this.desktopNavWordsAnimClass = menuWordsAnimationClass;
        this.desktopNavWordsClass = $( '.' + menuWordsClass );

        this.allNav = [ 
            this.desktopNav, 
            this.desktopNavWordsClass 
        ];
        
        this.origLeft = Number( this.desktopNav.css( 'left' ).match( /[^px]+/ )[0] ) / $( 'body' ).innerWidth();
        this.origWidth = Number( this.desktopNav.css( 'width' ).match( /[^px]+/ )[0] ) / $( 'body' ).innerWidth();
    }
    enableDesktopNavAnimate() {

        let self = this,
            moving = false;

        self.desktopNav.children().each( function(i) {
            $( this ).click( function() {
                let scrollToID = '#' + $( this ).children().eq(0).text().toLowerCase();

                console.log($(scrollToID).offset().top);
                $(window).scrollTop($(scrollToID).offset().top);

            } );
        } );

        $( window ).scroll( function () {

                let bottomLanding =  $( 'section' ).eq( 0 ).offset().top + $( 'section' ).eq( 0 ).height(),
                goingDownInHome = 
                    $( this ).scrollTop() > self.scrollPos && 
                    $( this ).scrollTop() <= bottomLanding,
                goingUpInHome = 
                    $( this ).scrollTop() < self.scrollPos && 
                    $( this ).scrollTop() <= bottomLanding, 
                pastHome = 
                    $( this ).scrollTop() > bottomLanding;

                let distToHomeEnd =  $( this ).scrollTop() / bottomLanding;

                
                if ( goingDownInHome || goingUpInHome ) {
                    
                    let dimChange = ( ( $( window ).innerHeight()*.60 ) - ( self.origWidth * $(window).width() ) ) * distToHomeEnd;

                    let rotationDegreesToCurrent = 90 * distToHomeEnd,
                        leftDistToCurrent =
                            ( ( 1 - ( ( self.desktopNav.children().eq( 0 ).height() * 1.5 ) / $( 'body' ).innerWidth() ) ) * 
                            distToHomeEnd ) + ( ( self.origLeft ) *  ( 1 - distToHomeEnd ) );

                    self.menuAnimTrack = {
                        menu: rotationDegreesToCurrent,
                        words: rotationDegreesToCurrent * -1,
                        left: leftDistToCurrent
                    } 

                    self.desktopNav.css( 
                        {
                            'transform' : `rotate(${ self.menuAnimTrack.menu }deg)`,
                            'left' : `${ self.menuAnimTrack.left * 100 }%`,
                            'width' :  `${
         
                               ( ( ( ( self.origWidth * $( window ).innerWidth() ) + dimChange ) / 
                               $( window ).innerWidth() ) * 100 )
                               + '%'
                            }`
                        } 
                    );
    
                    self.desktopNavWordsClass.css( 
                        {
                            'transform' : `rotate(${ self.menuAnimTrack.words }deg)`
                        } 
                    );
    
                    $( 'section' ).eq( 0 ).css( 'opacity', `${ 1 - ( distToHomeEnd * 3 ) }`);

                }
                if ( pastHome && self.menuAnimTrack.menu !== 90 ) {

                    self.menuAnimTrack = {
                        menu: 90,
                        words: -90,
                        left: ( 1 - ( ( self.desktopNav.children().eq( 0 ).height() * 1.5 ) / $( 'body' ).innerWidth() ) )
                    }
                    
                }

                else {

                }

                self.scrollPos = $( window ).scrollTop();
        } );
        
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

    Katrina.setPhraseAnimationElements( 
        phrases, 
        'bounceText', 
        'animatePhraseIn', 
        'animatePhraseOut' 
    );
    Katrina.enablePhraseAnimate();



    Katrina.setDesktopNavAnimationElements(
        'desktopNav',
        'menuToSide',
        'menuWordsToSide',
        'menuWords'
    );
    Katrina.enableDesktopNavAnimate();

    
    




    
    
} );