const btn = document.querySelector('button')
btn.addEventListener('click',()=>{
    fetch('/create-checkout-session',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            items:[
                {id:1,quantity:3},
                {id:2,quantity:1}
            ]
        })
    }).then(res=>{
        if(res.ok) return res.json()
        return res.json().then((json)=>Promise.reject(json))
    }).then(({url})=>{
        // console.log(url)
        window.location = url
    }).catch(e=>{
        console.error('this is my error',e.error)
    })

})