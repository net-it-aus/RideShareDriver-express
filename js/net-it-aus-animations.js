/* <!-- collapse all     Ctrl + k + 0 --> */
/* <!-- expand all       Ctrl + k + j --> */
/* <!-- format           Alt + Shift + F (USE WITH CAUTION)--> */
/* <!-- word wrap toggle Alt + z --> */

// wait for DOM to load START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener("load", () => {
    // console.log("loaded");
    function animateButtons(){
        const buttonsToAnimate = document.getElementsByClassName("animated-button");
        for (i = 0; i < buttonsToAnimate.length;i++){
            console.log(buttonsToAnimate[i].id);
            document.getElementById(buttonsToAnimate[i].id).addEventListener("click", (event) => {
                animatedButtonClicked(event.target.id);
            });
        }
    }
    function animatedButtonClicked(targetID){
        console.log(targetID,"click");
        console.log(targetID,document.getElementById(targetID).classList);
        document.getElementById(targetID).classList.add("global-button-animation");
        setTimeout(animatedButtonRemoveAnimation,1000,targetID);
    }
    function animatedButtonRemoveAnimation(targetID){
        document.getElementById(targetID).classList.remove("global-button-animation");
    }
    animateButtons();
});
// wait for DOM to load END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
