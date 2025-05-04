import React from "react";
import RotorButton from "./RotorButton";
import CtaBackground from "../svg/large-cta-background.svg"


const LargeCTA = () => {

    return (
        <div>
            <div>
            
            </div>
             
            <div className="column is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet has-text-white is-vcentered py-6" /* style={{
            backgroundImage: `url(${ctaBackground})`, 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover',
            backgroundPosition:'center', 
            textAlign: 'center',
            minHeight:'700px'
          }} */>
          
              <div>
                  <div className="p-6" style={{position: 'relative', zIndex: '1', textAlign: 'center',}}>
                  <CtaBackground style={{
               
               zIndex:'-1',
               height: '110%',
               width: '120%',
               left: '-10%',
               top: '-5%',
               position: 'absolute'

           }}  />      
                <h2 className="is-size-2 mb-3">
                Därför ska du välja en digitalbyrå som kan mer än ett verktyg
                </h2>
                <p>
                Ja, vi kallar dem verktyg – SEO, annonsering på Google, Facebook, Instagram, Linked In, marketing automation etc.
                För precis som ett verktyg finns de till för att bygga något större.
                <br/><br/>Och de hänger ihop. Allt handlar om att hitta de verktyg som passar dig just nu.
                En SEO-byrå kommer att tycka att SEO är det verktyget.
                En Facebook-byrå kommer att rekommendera – ja gissa – Facebook.
                Och så vidare.

                <br/><br/>Vi tror inte på den lösningen.
                Därför att rätt verktyg för dig är det som skapar intäkter på kort eller lång sikt, på effektivast möjliga sätt.
                Oavsett vad verktyget kallas. 
                <br/><br/>Vi kan verktygen. Men framför allt har vi en plattform för att bygga ditt eget säljande system, med de verktyg du behöver för ökad lönsamhet.
                </p>
                <p className="mb-6">
                   <span className="mb-6">I vår kostnadsfria guide kan du läsa om hur du ska göra för att nå dit.</span> 
                
                
                <RotorButton buttonText="Jag vill ha guiden" buttonLink="/lp/kostnadsfri-guide" newWindow={true}/>
                </p>
                <div style={{height:'100px'}}>
                </div>
                </div>
                </div>
            </div>

        </div>


    )
};

export default LargeCTA