import './assets/style/style.css';
import './assets/style/mediaQuerys.css'
import emailjs from '@emailjs/browser'

const inputEmail = document.getElementById('input_email')
const form = document.querySelector('form')
const buttomClick = document.querySelector('#btn-notify')
const icons = document.querySelectorAll('.icon')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let nome = 'pedro'

    const templateParams = {
        from_name: nome,
        email: inputEmail.value,
        message: 'iai seu cagao'
    }

    emailjs.send("service_sywlngt", "template_wnl4o5w", templateParams, "EF2-B2Suwj2YSHuxq")
        .then((response) => {
            console.log('SUCESS!', response.status, response.text)
            nome
            inputEmail.value
        })
        .catch((error) => console.log('FAILE...', error))
       

    inputEmail.value = ""
    
})


inputEmail.addEventListener('input', function(e) {
    if(inputEmail.checkValidity() == false) {
        inputEmail.style.borderColor = 'red';
    } else {
        inputEmail.style.borderColor = 'rgba(192, 192, 192, 0.37)'

    }

})



Array.from(icons).forEach((element) => {
    element.addEventListener('mouseover', function(e) {
        element.style.backgroundColor = 'hsl(223, 87%, 63%)'

        let link_a = element.querySelectorAll('a');
        let iconsImg = [];

        for(let i = 0; i < link_a.length; i++) {
            let elemento_pai = link_a[i]
            let img =  elemento_pai.querySelector('img')

            if(img.src.includes('instagram')) {
                img.setAttribute('src', "./src/assets/img/icon-instagram-branco.png")
            }

            if(img.src.includes('facebook')) {
                img.setAttribute('src', "./src/assets/img/icon-facebook-branco.png")
            }

            if(img.src.includes('twitter')) {
                img.setAttribute('src', "./src/assets/img/icon-twitter-branco.png")
            }

            // console.log(img.src.includes('instagram'))
            // img.setAttribute('src', "./src/assets/img/icons8-facebook-64 (2).png")

        };

    });

    element.addEventListener('mouseout', function(e) {
        element.style.backgroundColor = ''
        let link_a = element.querySelectorAll('a')
        // console.log(element)

        for(let i = 0; i < link_a.length; i++) {
            let elemento_pai = link_a[i]
            let img =  elemento_pai.querySelector('img')

            if(img.src.includes('instagram')) {
                img.setAttribute('src', "./src/assets/img/icon-instagram.png")
            }

            if(img.src.includes('facebook')) {
                img.setAttribute('src', "./src/assets/img/icon-facebook.png")
            }

            if(img.src.includes('twitter')) {
                img.setAttribute('src', "./src/assets/img/icon-twitter.png")
            }

        };
    });

})


// icons.addEventListener('mouseover', function(e) {
//     console.log(e)
// })



