// Styles
import '../scss/site.scss'
import { Navigation } from './global'
import { Animations } from './animations'
import { Confetti } from './modules/confetti/'
import { Youtube } from './modules/youtube'

ready(() => {
    new Navigation(),
    new Animations(),
    new Youtube().init(),
    new Confetti().init()
})

function ready(fn) {
    console.log('RWS Smartboard Running')
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}