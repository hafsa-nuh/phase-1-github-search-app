document.addEventListener('DOMContentLoaded', () => {
    userSearchEndpoint()
    userReposEndpoint()
});

users = ({
    Accept: application/vnd.github.v3+json
})

// Accept: application/vnd.github.v3+json

// fetching the user search
function userSearchEndpoint(userName){
    fetch(`https://api.github.com/search/users${userName}`)
    .then(resp => resp.json())
    userReposEndpoint(userName)
}
userSearchEndpoint()

async function userReposEndpoint(userName){
    const reposUl = document.querySelector('#repos-list')
    const getRepo = await fetch(`https://api.github.com/users/repos${userName}`)
    const data = await getRepo.json()
    data.forEach ((item) => {
        const aElement = document.createElement('a')
        aElement.classList.add('repo') // class name for the a tag
        aElement.href = item.url
        aElement.innerText = item.name // the user name
        aElement.target = "_blank"
        reposUl.appendChild(aElement)
    })
}
const formSerch = document.querySelector('#github-form')
function formSubmit (event){
    event.preventDefult()
    if (formSerch.value != ''){
        userSearchEndpoint(formSerch.value)
        formSerch.value = ""
    }
}

formSerch.addEventListener('submit',() => formSubmit() )



