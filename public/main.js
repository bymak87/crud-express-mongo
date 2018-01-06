const update = document.getElementById('update');

update.addEventListener('click', function(){
    //send PUT request here
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Darth Vader',
            'quote' : 'I find your lack of faith disturbing.'
        })
    }).then(res => {
        if (res.ok) return res.json()
    })
        .then(data => {
            console.log(data)
        })
});

const del = document.querySelector('#delete');

del.addEventListener('click', function () {
    fetch('/quotes', {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Darth Vadar'
        })
    }).then(res => {
        if(res.ok) return res.json()
    }).then(data => {
        console.log("del data: " + JSON.stringify(data));
        window.location.reload(true);
    })
})