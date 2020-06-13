//Student Jorge Alberto Muñozcano Castro
//1) create a local host using Github
//2) create  a function that helps you read, organized and vizualized sample.json inside the data carpet, looked  for the otu  variable.
function getPlots(id) {
        d3.json("samples.json").then(bellybuttonsample =>{
            console.log(bellybuttonsample) //test succesfull message printed in console
            var otuids = bellybuttonsample.samples[0].otu_ids;
            console.log(otuids)//test succesfull message printed in console
            //3)rom the the json sample,  extract and organized the values and labels required using the slice function (reverse the values variable)
            var bellybuttonvalues =  bellybuttonsample.samples[0].sample_values.slice(0,10).reverse();
            console.log(bellybuttonvalues)//test succesfull message printed in console
            var bellybuttonlabels =  bellybuttonsample.samples[0].otu_labels.slice(0,10);
            console.log (bellybuttonlabels)//testsuccesfull message printed in console
             // 4) From the the json sample, find the top 10 otu ids for the required plot using the slice function
            var top10otu = (bellybuttonsample.samples[0].otu_ids.slice(0, 10)).reverse();
            // 5) Using the map function, get the otu id's to the desired form for the plot
            var otuid = top10otu.map(d => "OTU " + d);
            console.log(`The followings otu ids were found: ${otuid}`)
            //6) Using the slice function get the top 10 labels for the plot
            var top10labels =  bellybuttonsample.samples[0].otu_labels.slice(0,10);
            console.log(`The following labels were found: ${top10labels}`)
            //test sucesfull message printed in console
            //7) Create a customize trace variable for the bar charts with horizontal orientation
            var tracebelly = {
                x: bellybuttonvalues,
                y: otuid,
                text: top10labels,
                marker: {color: 'purple'},
                type:"bar",
                orientation: "h",
            };
            // 8)Create a variable data variable
            var bellybuttondata = [tracebelly];
            //9)Create layout variable to set plots layout
            var bellylayout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 50
                }
            };
            //10)Create the bar plot with Plotly function
        Plotly.newPlot("bar",bellybuttondata,bellylayout);    
            //test succesfull bar chart generated
            // 11) Create a new trace variable in order to create a bubble chart
            var tracebelly2 = {
                x: bellybuttonsample.samples[0].otu_ids,
                y: bellybuttonsample.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: bellybuttonsample.samples[0].sample_values,
                    color: bellybuttonsample.samples[0].otu_ids
                },
                text:  bellybuttonsample.samples[0].otu_labels
            };
            // 12) Create the layout for the bubble plot
            var bellylayout2 = {
                xaxis:{title: "OTU ID"},
                height: 650,
                width: 800
            };
            // 13)Create data variable for trace created befored
            var bellybuttondata2 = [tracebelly2];
            // 14)create the bubble plot with Plotly function
        Plotly.newPlot("bubble", bellybuttondata2, bellylayout2); 
            //test succesfull bar chart generated
        });
    }  
    // 15)Create a new function to extract the demographic data
    function getDemoInfo(id) {
    // 16) Using d3, read the json file to extract data and create a metadavariable
        d3.json("samples.json").then((bellydata)=> {
            var metadata_bb = bellydata.metadata;
            console.log(metadata_bb)
          //17)Create a variable that filters the meta data info by id
           var studyresult = metadata_bb.filter(meta => meta.id.toString() === id)[0];
          //18)Create a variable that selects demographic panel to put data into
           var demographicwithbb = d3.select("#sample-metadata");
         // 19)Clean the demographic info panel each time before getting new id info
           demographicwithbb.html("");    
         // 20) Extract demographic data data for each id and append the info into the panel with an object
            Object.entries(studyresult).forEach((key) => {   
                demographicwithbb.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // 21)Create the function in order to change change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    // 22)Create an init function for the data rendering
    function init() {
    // 23) Create a variable tha select dropdown menu 
        var otudropdown = d3.select("#selDataset");
    // 24) Using d3 extract the json data get the id data to the dropdwown menu
        d3.json("samples.json").then((bellydata)=> {
            console.log(bellydata)
            bellydata.names.forEach(function(name) {
            otudropdown.append("option").text(name).property("value");
        });
        // call the functions to display the data and the plots to the page
        getPlots(bellydata.names[0]);
        getDemoInfo(bellydata.names[0]);
    });
}
init();    
    
    
    