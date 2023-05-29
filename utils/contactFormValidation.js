export const validatePhoneNumber = (mobileNumber, countryCode) => {
    const regex = new RegExp(/^(\+\d{1,3}[\s-])?\(?\d{3}\)?[\s-]?\d{3,4}[\s-]?\d{3,5}$/, "g");
    if (regex.test(countryCode + "-" + mobileNumber)) {
        return "passed";
    } else {
        return "failed";
    }
}

export const emailValidator = (str) => /^[^@\s]+@[^@\s\.]+\.[^@\s]+$/.test(str);

export const insertHyphen = (targetValue, length, unlimited) => {
    let cardNumber = targetValue;
    let formatNumber = cardNumber.split('-').join('');
    if (formatNumber.length > 0) {
        formatNumber = formatNumber.match(new RegExp(`.{1,${length}}`, 'g')).join('-');
    }
    if (unlimited) {
        return formatNumber;
    }
    if (formatNumber.length > 11) {
        let str = formatNumber.split("-");
        str[2] = (str[2] + str.slice(3, str.length)).replace(/,/g, "");
        return [str[0], str[1], str[2]].join("-");
    }
    return formatNumber;
}

export const validateCreditCardNumber = (cardNumber) => {
    cardNumber = String(cardNumber);
    const length = cardNumber.length;
    if (length === 0) {
        return false;
    }
    let count = 0;

    /* Traverse the whole credit card number. If index + 1 is even, double the value.
    If above 9 then adjust value */
    for (let i = 0; i < length; i++) {
        let currentDigit = parseInt(cardNumber[i]);
        if ( (i+2) % 2 === 0) {
            if ((currentDigit *= 2) > 9) {
                currentDigit -= 9;
            }
        }
        count += currentDigit;
    }

    return (count % 10) === 0;
}

export const noInputScenario = (image) => image.setAttribute('hidden', true);

export const creditCardType = (cardNumber) => { // returns card type image; should not rely on this for checking if a card is valid
    if (typeof cardNumber !== "string") {
        throw Error("MUST BE A STRING OF NUMBERS");
    }
    if (cardNumber === "") {
        null
    }
    cardNumber = cardNumber.split(' ').join("");
    const types = {
        electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        dankort: /^(5019)\d+$/,
        interpayment: /^(636)\d+$/,
        unionpay: /^(62|88)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
        // solo: /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/ // try find a good image for it before we include this
    }
    for(const type in types) {
        if(types[type].test(cardNumber)) {
            return type;
        }
    }
    return null;
};


const luhnAlgorithm = (elm) => {
    let cardNumber = elm.value;
    elm.value = cardNumber.replace(/[^-\d]/g, '');
    cardNumber = cardNumber.replace(/\-/g, '');

    const imgCard = document.getElementById('imgCard');

    insertHyphen(elm, 4)
        if (validateCreditCardNumber(cardNumber)) {
            if (cardNumber.length > 0) {
                imgCard.removeAttribute('hidden');
                const p = document.querySelector('p[data-paragraph="card"');
                if (p) {
                    p.remove();
                }
                imgCard.src = './assets/' + (cardType(cardNumber) || 'other') + '.png';
                return true;
            } else {
                noInputScenario(imgCard);
                return false;
            }
        } else {
            noInputScenario(imgCard);
            return false;
        }
}

/*
                            <div>
                                <span>Contact</span>
                                <p>westminister@gmail.com</p>
                                <button onClick={handleOpenClick}>Change</button>
                            </div>

                            <div>
                                <span>Deliver to</span>
                                <p>350 Marina Drive, Westminister, Milton Keynes, SW1A 2EA, United Kingdom</p>
                                <button onClick={handleOpenClick}>Change</button>
                            </div>

                            <div>
                                <span>Method</span>
                                <p>Express Shipping (Delivered in 1-2 Business Days with DPD) . $9.99</p>
                                <button onClick={handleOpenClick}>Change</button>
                            </div>
*/