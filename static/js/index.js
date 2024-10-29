(async () => {
    var req = await fetch("https://github.com/amistix?tab=repositories",{
        headers:{
            Accept: "application/vnd.github.v3+json",
        }
    });
    var result = await req.json();
    console.log(result);
})()