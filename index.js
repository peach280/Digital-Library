function register()
{

    alert("Registration succesful!")
    setTimeout(function()
    {
        window.location.href="Books.html"
    },1000)
    return false;
}
function login(event)
{
    event.preventDefault();
    alert("Logged in")
    setTimeout(function()
    {
        window.location.href="Books.html"
    },100)   
    
}

async function searchBooks()
{
    const searchQuery = document.getElementById('searchInput').value
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
    try
    {
        const response=await fetch(apiUrl)
        const data = await response.json()
        displayResults(data.items)
    }
    catch(error)
    {
        console.error('Error fetching data:',error)
    }
}
function displayResults(books)
{
    const bookResults=document.getElementById("bookResults")
    bookResults.innerHTML=""
    books.forEach(book => {
        const title=book.volumeInfo.title
        const authors=book.volumeInfo.authors ? book.volumeInfo.authors.join(',') : 'Unknown author'
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
        const bookLink = book.volumeInfo.infoLink;
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <a href ="${bookLink}" target="blank">
            <img src="${thumbnail}" alt="${title}">
            <div>
                <h2>${title}</h2>
                <p>By: ${authors}</p>
            </div>
        `;
        bookResults.appendChild(bookElement);
        
    });
}

