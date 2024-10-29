async function FetchRepo() {
    var req = await fetch("https://api.github.com/search/repositories?q=@amistix",{
        headers:{
            Accept: "application/vnd.github.v3+json",
        }
    });
    var result = await req.json();
    console.log(result);
}

FetchRepo();