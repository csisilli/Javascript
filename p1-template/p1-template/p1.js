const http = require('http');
const url = require('url');

// Import our static data
const teams = require('./teams.json');
const all_standings = require('./standings.json');

// The two variables above are now arrays of objects.  They
// will be your data for the application.  You shouldn't have to 
// read the fi-les again.

// Some basic lists derived from the standings.  You will probable
// find these useful when building your pages
// Make sure you take a look at what this functionality is doing - 
// the map function is incredibly helpful for transforming arrays, 
// and the use of Set and Array.from allow you to remove duplicates.

// Array.from - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Set - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// Array.map - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const years = Array.from(new Set(all_standings.map(s => s.year)));
const leagues = Array.from(new Set(all_standings.map(s => s.league)));
const divisions = Array.from(new Set(all_standings.map(s => s.division)));
const heading = () => {
    const html = `
        <!doctype html>
            <html>
                <head>
                    <title>Home</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css">
                </head>
               
                <body>
                    <a href='/'>Home</a>
                    <br/>
                    <h1>Home</h1>
                     <header>
                     <a href= '/teams'>Teams</a>
                     <section>
                     <p>Standings</p>
                    <ul>
                    <li>
                        
                        <p><a href= '/standings/${years[0]}'>2022 Season</a></p>
                        <ul><li>
                            <a href='/standing/${years[0]}/${leagues[0]}'>AL</a>
                        <ul>
                            <li><a href='/standings/2022/AL/East'>East</a></li>
                            <li><a href='/standings/2022/AL/Central'>Central</a></li>
                            <li><a href='/standings/2022/AL/West'>West</a></li>
                        </ul>
                        </li>
                        <li>
                        <p><a href='/standings/${years[0]}/${leagues[1]}'>NL</a>
                        <ul>
                            <li><a href='/standings/2022/NL/East'>East</a></li>
                            <li><a href='/standings/2022/NL/Central'>Central</a></li>
                            <li><a href='/standings/2022/NL/West'>West</a></li>
                        </ul>
                            </li>
                        
                        </ul>
                        </li>
                        </ul>
                        <ul>
                    <li>
                        
                        <p><a href= '/standings/${years[1]}'>2021 Season</a></p>
                        <ul><li>
                            <a href='/standing/${years[1]}/${leagues[0]}'>AL</a>
                        <ul>
                            <li><a href='/standings/2021/AL/East'>East</a></li>
                            <li><a href='/standings/2021/AL/Central'>Central</a></li>
                            <li><a href='/standings/2021/AL/West'>West</a></li>
                        </ul>
                        </li>
                        <li>
                        <p><a href='/standings/${years[1]}/${leagues[1]}'>NL</a>
                        <ul>
                            <li><a href='/standings/2021/NL/East'>East</a></li>
                            <li><a href='/standings/2021/NL/Central'>Central</a></li>
                            <li><a href='/standings/2021/NL/West'>West</a></li>
                        </ul>
                            </li>
                        
                        </ul>
                        </li>
                        </ul>
                    </section> 
                              
                       
                    
    `;
    return html;
     
}

const footing = () => {
    return `
        </body>
    </html>
    `;
    return footing;
}

const teamspage  =() =>{
    const teamSite = `
    <!doctype html>
            <html>
                <head>
                    <title>Teams</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css">
                </head>
               
                <body>
                    <a href='/'>Home</a>
                    <br/>  
                    <h1>Teams</h1>
                   
                    
                    `;
                    
                    return teamSite;
}
const pages = ()=>{
    const pages = `
    <!doctype html>
            <html>
                <head>
                    
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css">
                </head>
               
                <body>
                    <a href='/'>Home</a>
                    <br/>  
                    
                   
                    
                    `;
                    return pages;
                    
}

const serve = (req, res) => {
    const uri = url.parse(req.url).pathname;
    const parts = uri.split('/').splice(1);
    // parts[0] is going to be 'teams', 'standings', or '' - '' (homepage)
   
    // You should examine the URL to determine which page to build.
    // Each page will have the same heading part and footing - it's the contents
    // that will be different.

    // Hint:  Make one function for each page, and having it return the html
    // content, and reuse heading/footing for all of them.

    // For the starter, I'm just building a generic page with a generic title.
    //const team_site = `teams.json`;
    const table = '<table><thead> <th>LOGO</th><th>CITY</th><th>NAME</th><th>WINS</th><th>LOSSES</th></thead>'
    let html = heading('Home')+ footing();
    if(req.url === "/teams" ){
        html = teamspage()+footing();
        html += '<table><thead> <th>LOGO</th><th>CITY</th><th>NAME</th><th>CODE</th></thead>'
        for(let i =0; i<teams.length; i++){
            
            html+= `
                <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${teams[i].name}</td><td>${teams[i].code}</td></tr>
                `
        }
        html += '</table>'
    }
    
    if(parts[0] == 'standings'){
        //Year of 2022
        if(parts[1] =='2022'){
            html = pages()+table+footing();
            html += `<title>Standings - 2022</title> <h1>Standings-2022</h1>`
            for(let i =0; i<years.length; i++){ 
                
                html+= `
                    <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    ` 
            }
            html += '</table>'
        }   
        // 2022 AL
        if(parts[2]==leagues[0]){
            html = pages()+table+footing();
            html += `<title>Standings - 2022- AL</title> <h1>Standings-2022-AL</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                        ` 
                }
            html += '</table>'
        }
            //2022 AL East
            if(parts[3]==divisions[0]){
                html = pages()+table+footing();
                    html += `<title>Standings-2022-AL-East</title> <h1>Standings-2022-AL-East</h1>`
                    for(let i =0; i<teams.length; i++){  
                        html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                        ` 
                    }
                    html += '</table>'
            //2022 AL Central
            }
            if(parts[3]==divisions[1]){
                html = pages()+table+footing();
                html += `<title>Standings-2022-AL-Central</title> <h1>Standings-2022-AL-Central</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                        `
                }
                html += '</table>'
            }
            //2022 AL West
            if(parts[3]==divisions[2]){
                html = pages()+table+footing();
                html += `<title>Standings-2022-AL-West</title> <h1>Standings-2022-AL-West</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                        `
                }
                html += '</table>'
        //2022 NL
        }
        if(parts[2]==leagues[1]){
                html = pages()+table+footing();
                html += `<title>Standings - 2022- NL</title> <h1>Standings-2022-NL</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                        ` 
                }
                html += '</table>'
        }        //2022 NL East
                if(parts[3]=='standings/2022/NL/East'){
                    html = pages()+table+footing();
                    html += `<title>Standings-2022-NL-East</title> <h1>Standings-2022-NL-East</h1>`
                    for(let i =0; i<teams.length; i++){  
                        html+= `
                            <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                            ` 
                    }
                    html += '</table>'
                  }  //2022 NL Central
                 if(parts[3]==divisions[1]){
                    html = pages()+table+footing();
                    html += `<title>Standings-2022-NL-Central</title> <h1>Standings-2022-NL-Central</h1>`
                    for(let i =0; i<teams.length; i++){  
                        html+= `
                            <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    `
                    }
                    html += '</table>'
                    }    //2022 NL West
                 if(parts[3]==divisions[2]){
                    html = pages()+table+footing();
                    html += `<title>Standings-2022-NL-West</title> <h1>Standings-2022-NL-West</h1>`
                    for(let i =0; i<teams.length; i++){  
                        html+= `
                            <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    `
                    }
                    html += '</table>'
                }   
            
        //2021
         if(parts[1] =='2021'){
            html = pages()+table+footing();
            html += `<title>Standings - 2021</title> <h1>Standings-2021</h1>`
            for(let i =0; i<teams.length; i++){  
                html+= `
                    <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>   
                    `   
            }
            html += '</table>'
        }
        //2021 AL East
        if(parts[3]==divisions[0]){
            html = pages()+table+footing();
                html += `<title>Standings-2021-AL-East</title> <h1>Standings-2021-AL-East</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                    <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    ` 
                }
                html += '</table>'
        //2021 AL Central
        }
        if(parts[3]==divisions[1]){
            html = pages()+table+footing();
            html += `<title>Standings-2021-AL-Central</title> <h1>Standings-2021-AL-Central</h1>`
            for(let i =0; i<teams.length; i++){  
                html+= `
                    <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    `
            }
            html += '</table>'
        }
        //2021 AL West
        if(parts[3]==divisions[2]){
            html = pages()+table+footing();
            html += `<title>Standings-2021-AL-West</title> <h1>Standings-2021-AL-West</h1>`
            for(let i =0; i<teams.length; i++){  
                html+= `
                    <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    `
            }
            html += '</table>'
    //2021 NL
    }
    if(parts[2]==leagues[1]){
            html = pages()+table+footing();
            html += `<title>Standings - 2021- NL</title> <h1>Standings-2021-NL</h1>`
            for(let i =0; i<teams.length; i++){  
                html+= `
                    <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                    ` 
            }
            html += '</table>'
    }        //2021 NL East
            if(parts[3]=='standings/2022/NL/East'){
                html = pages()+table+footing();
                html += `<title>Standings-2021-NL-East</title> <h1>Standings-2021-NL-East</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                        ` 
                }
                html += '</table>'
              }  //2021 NL Central
             if(parts[3]==divisions[1]){
                html = pages()+table+footing();
                html += `<title>Standings-2021-NL-Central</title> <h1>Standings-2021-NL-Central</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                `
                }
                html += '</table>'
                }    //2021 NL West
             if(parts[3]==divisions[2]){
                html = pages()+table+footing();
                html += `<title>Standings-2021-NL-West</title> <h1>Standings-2021-NL-West</h1>`
                for(let i =0; i<teams.length; i++){  
                    html+= `
                        <tr><td><img src="${teams[i].logo}"/></td><td>${teams[i].city}</td><td>${all_standings[i].team}</td><td>${all_standings[i].wins}</td><td>${all_standings[i].losses}</td></tr>             
                `
                }
                html += '</table>'
            }   

    }//prints  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();

}

http.createServer(serve).listen(3000);