const express = require('express')
const morgan = require('morgan')

const app = express()
// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'))
// This is the final request handler
app.get('/', (req, res) => {
    res.send('Hello Express, whats up!')
})

app.get('/hello', (req, res) => {
    res
        .status(204)
        .end()
})

//**** Web APIs with Express assignment: ****
//1.
app.get('/sum', (req, res) => {
    // req.query.a = parseInt(req.query.a)
    // const a = req.query.a
    // req.query.b = parseInt(req.query.b)
    // const b = req.query.b
    // console.log(req.query.a)
    // const a = (+req.query.a)
    // const b = (+req.query.b)
    // const c = a + b

    const sum = parseInt(req.query.a) + parseInt(req.query.b)

    res.json({sum})
})
//2.
app.get('/cipher', (req, res) => {
    
    const text = req.query.text
    const shift = parseInt(req.query.shift)
    // console.log(text)
    // console.log(shift)
    const alphabets = 
    ['A','B','C','D','E','F',
    'G','H','I','J','K','L',
    'M','N','O','P','Q','R',
    'S','T','U','V','W','X',
    'Y','Z']
    
    function encrypt(text) {
        const shiftNumber = Number(shift)
        let cipher = ''
        for (let i = 0; i < text.length; i++) {
            const position = alphabets.indexOf(text[i].toUpperCase())
            const newPosition = (position + shiftNumber)%26
            cipher = cipher + alphabets[newPosition]
        }
        return cipher
    }
    res.send(encrypt(text))
})
//3.
app.get('/lotto', (req, res) => {
  const numbers = (+req.query.numbers)
  const arr = []
  while(arr.length < 6) {
    const random = Math.floor(Math.random() * 20) + 1
    if (arr.indexOf(random) === -1) arr.push(random)
  }
    
})
/*************** end express assignment ****************************/

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        Route: ${req.route}
        body: ${req.body}
        fresh: ${req.fresh}
        method: ${req.method}
        query: ${req.query}
    `;
    res.send(responseText)
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name
    const race = req.query.race

    //2. validate the values
    if(!name) {
        //3. name was not provided
        return res.status(400).send('Please provide a name')
    }
    if(!race) {
        //3. race was not provided
        return res.status(400).send('Please provide a race')
    }
    //4. and 5. both name and race are valid so do the processing
    const greeting =  `Greetings ${name} the ${race}, welcome to our kingdom`

    //6. send the response
    res.send(greeting)
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end()
})

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!')
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!')
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that Here. Never call again!')
})

app.get('/', (req, res) => {
    console.log('The root path was called')
    res.send('Hello Express!')
})

app.get('/video', (req, res) => {
    const video = {
        title: 'Cats falling over',
        description: '15 minutes of hilarious fun as cats fall over', 
        length: '15.40'
    }
    res.json(video)
})

app.get('/colors', (req, res) => {
    const colors = [
        {
            name: 'red',
            rgb: 'FF0000'
        },
        {
            name: "green",
            rgb: "00FF00"
          },
          {
            name: "blue",
            rgb: "0000FF"
          },
    ];
    res.json(colors);
});

app.get('/grade', (req, res) => {
    // get the mark from the query
    const { mark } = req.query;
  
    // do some validation
    if (!mark) {
      // mark is required
      return res
        .status(400)
        .send('Please provide a mark');
    }
  
    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
      // mark must be a number
      return res
        .status(400)
        .send('Mark must be a numeric value');
    }
  
    if (numericMark < 0 || numericMark > 100) {
      // mark must be in range 0 to 100
      return res
        .status(400)
        .send('Mark must be in range 0 to 100');
    }
  
    if (numericMark >= 90) {
      return res.send('A');
    }
  
    if (numericMark >= 80) {
      return res.send('B');
    }
  
    if (numericMark >= 70) {
      return res.send('C');
    }
  
    res.send('F');
  });

app.listen(8000, () => {
    console.log('Express server is listening on port 8000')
})

