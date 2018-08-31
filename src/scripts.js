const button = document.querySelector('#btn')


const getToken = () => {
  const input = document.querySelector('#input');
  const email = input.value;
  const atTuring = email.split('@')[1]
  // console.log(atTuring)

  if (!email) {
    document.querySelector('#display-token').innerText = 'Please fill out required fields.'
  } else if (atTuring !== 'turing.io') {
    document.querySelector('#display-token').innerText = 'turing.io email required.'
  } else {
    return fetch('/api/v1/jwt', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      appName: 'byob',
      email: email
    })
  })
    .then(response => response.json())
    .then(results => {
      document.querySelector('#display-token').innerText = 'Jason Web Token: ' + JSON.stringify(results.token)
    })
    
  }

}

button.addEventListener('click', getToken)