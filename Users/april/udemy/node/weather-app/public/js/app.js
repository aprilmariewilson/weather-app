
fetch('http://puzzle.mead.io/puzzle').then((res) => {
  res.json().then((data) => {
    console.log(data)
  })
});


const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value
  messageOne.textContent = 'Loading ...'
  messageTwo.textContent = ''
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})