// document.addEventListener('DOMContentLoaded', () => {
//     userSearchEndpoint()
//     userReposEndpoint()
// });

// users = ({
//     Accept: application/vnd.github.v3+json
// })

// // Accept: application/vnd.github.v3+json

// // fetching the user search
// function userSearchEndpoint(userName){
//     fetch(`https://api.github.com/search/users${userName}`)
//     .then(resp => resp.json())
//     userReposEndpoint(userName)
// }
// userSearchEndpoint()

// // async function userReposEndpoint(userName){
// //     const reposUl = document.querySelector('#repos-list')
// //     const getRepo = await fetch(`https://api.github.com/users/repos${userName}`)
// //     const data = await getRepo.json()
// //     data.forEach ((item) => {
// //         const aElement = document.createElement('a')
// //         aElement.classList.add('repo') // class name for the a tag
// //         aElement.href = item.url
// //         aElement.innerText = item.name // the user name
// //         aElement.target = "_blank"
// //         reposUl.appendChild(aElement)
// //     })
// // }
// // const formSerch = document.querySelector('#github-form')
// // function formSubmit (event){
// //     event.preventDefult()
// //     if (formSerch.value != ''){
// //         userSearchEndpoint(formSerch.value)
// //         formSerch.value = ""
// //     }
// // }

// // formSerch.addEventListener('submit',() => formSubmit() )



document.addEventListener("DOMContentLoaded", () => {
  logInput()
});

function logInput(){
  document.querySelector("#github-form").addEventListener("submit", (event) => {
    event.preventDefault()
    userName = document.querySelector("#search").value
    
    getUser(userName)
  });
}
  
// getting user name
function getUser(userName){
  fetch(`https://api.github.com/users/${userName}`)
  .then(resp => resp.json())
  .then(result => getInfo(result))
}

// getting user repo by creating heading , img, p, and button inside the div 
function getInfo(data){
  const div = document.querySelector("#user-list")

  const h2 = document.createElement("h2")
  h2.innerText = `${data.login}`

  const img = document.createElement("img")
  img.setAttribute("src", `${data.avatar_url}`)
  
  const a = document.createElement("a");
  a.setAttribute("target", "_blank")
  a.setAttribute("href", `https://github.com/${data.login}`)
  a.innerText = img
  
  const p = document.createElement("p")
  p.innerText = "Click the Repository button to access the Repositories."
  
  const p2 = document.createElement("p")
  p2.innerText = `https://api.github.com/users/${userName}/repos`
  
  const btn = document.createElement("button")
  btn.setAttribute("id", `${data.login}`)
  btn.innerText = "Repository"
  
  btn.addEventListener("click", () => { // adding event listener to the button 
    fetch(`https://api.github.com/users/${data.login}/repos`)
    .then(resp => resp.json())
    .then(data => getRepos(data))
  })
  const card = document.createElement("div");
  card.append(h2, img, p, p2, btn);
  div.appendChild(card);
}
  
function getRepos(repo){
  const div2 = document.querySelector("#repos-list")
  repositoryNames = [] 
  for (const info of repo) {
    const p = document.createElement("p")
    p.innerText = (info.name)
    div2.append(p)
  }
}