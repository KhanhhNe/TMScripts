// ==UserScript==
// @name         PiratsShipsKiller
// @namespace    https://github.com/KhanhhNe
// @version      1.0.0
// @description  Auto play pirats/ships game.ru
// @author       KhanhhNe
// @run-at       document-start
// @include      https://pirats-game.ru/account/store
// @include      https://pirats-game.ru/account/farm
// @include      https://pirats-game.ru/account/battles
// @include      https://pirats-game.ru/account/payment
// @include      https://ships-game.ru/account/store
// @include      https://ships-game.ru/account/farm
// @include      https://ships-game.ru/account/battles
// @include      https://ships-game.ru/account/payment
// @icon         https://www.google.com/s2/favicons?domain=pirats-game.ru
// @grant        none
// ==/UserScript==


// jshint esversion:6
// jshint asi:true


function collectCoins() {
    const coinElem = document.querySelector('p td:nth-child(1)')
    if (coinElem === null) return setTimeout(collectCoins, 1000)
    if (document.querySelector('.nebest')) return

    const coinsNow = parseFloat(coinElem.innerHTML.match(/[0-9.]+/g)) * 2 * 100
    if (isFinite(coinsNow) && coinsNow > 10000 && coinsNow % 1000 <= 1000) {
        console.log(`Collecting coins ${coinsNow}`)
        document.querySelector('.osnbtn').click()
    } else {
        console.log(`nothing ${coinsNow}`)
    }
}


function battle() {
    const battleElem = document.querySelector('.battlein:nth-child(4) .cavav[type=submit]')
    if (battleElem) {
        console.log("Battling")
        battleElem.click()
    } else {
        console.log("nothing")
    }
}


function buyCapt() {
    const balanceElem = document.querySelector('.cl-left div div:nth-child(1) > a, .img-rait4 font')
    if (balanceElem === null) return setTimeout(buyCapt, 1000)

    const balance = parseFloat(balanceElem.textContent)
    if (balance > 1000) {
        console.log("Bought captain")
        fetch('/', {
            method: 'POST',
            body: 'sbor=%D1%EE%E1%F0%E0%F2%FC+%E2%F1%E5'
        }).then(() => {
            setTimeout(() => location.replace(''), 1000)
            document.querySelector('div:nth-child(5) .osnbtn').click()
        })
    } else {
        console.log(`nothing ${balance}`)
    }
}


function payment() {
    const paymentElem = document.querySelector('#res_sum')
    if (paymentElem === null) return setTimeout(collectCoins, 1000)

    const payment = parseFloat(paymentElem.value)
    if (isFinite(payment) && payment > 10) {
        console.log(`Payment ${payment}`)
        document.querySelector('.osnbtn').click()
    } else {
        console.log(`nothing ${payment}`)
    }
}


setTimeout(() => location.reload(), 5 * 60000)
setTimeout(() => location.replace(location.href), 6 * 60000)
if (location.pathname === '/account/store') {
    setTimeout(() => location.replace('/account/battles'), 0.5 * 60000)
    collectCoins()
}
else if (location.pathname === '/account/battles') {
    setTimeout(() => location.replace('/account/farm'), 0.5 * 60000)
    battle()
}
else if (location.pathname === '/account/farm') {
    setTimeout(() => location.replace('/account/payment'), 0.5 * 60000)
    buyCapt()
}
else if (location.pathname === '/account/payment') {
    setTimeout(() => location.replace('/account/store'), 0.5 * 60000)
    payment()
}
