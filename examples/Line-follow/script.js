import './main.css'

let path = document.querySelector('path')
let pathlength = path.getTotalLength()

path.style.strokeDasharray = (pathlength / 10) + ' ' + (pathlength)

path.style.strokeDashoffset = (pathlength + (pathlength / 10))

window.addEventListener("scroll", () => {
    let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)

    let drawlength = pathlength * scrollPercentage
    path.style.strokeDashoffset = (pathlength + (pathlength / 10)) - drawlength
    console.log(scrollPercentage);
})

import backgroundUrl from './background.jpg'

let div = document.querySelector("section.one")
div.style.backgroundImage = "url(" + backgroundUrl + ")"
div.style.backgroundSize = "cover"