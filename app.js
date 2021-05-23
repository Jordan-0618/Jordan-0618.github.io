function renderData(obj){
    var panel = d3.select("#sample-metadata");

    // //Clear data in html

    panel.html("");

    // //add key and value to panel
   
    Object.entries(obj).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
    });

};

// Create function to read json

function getMetaData(sample){ 
    // console.log("hello");  
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        var metadata = data.metadata;
        console.log(metadata);
        var selectedId;
        var filteredData = [];
        // filter data for Object with selected number

        var selectElement = d3.select("#selDataset")
            selectElement.html("") 

        selectElement = d3.select("#selDataset")
            .append('select')
            .attr('class', 'select')
            .on('change', optionChanged)

        function optionChanged(a) {
            // console.log(this.value)
            filteredData = metadata.filter(x => x.id == this.value)
            console.log(filteredData)
            renderData(filteredData[0]);
            renderCharts(filteredData[0]);
        };

        

        // var selectElement = d3.select("selDataset");
        console.log(selectElement);
        var options = selectElement.selectAll("option").data(metadata).enter()
        .append("option").text(function(d) {return d.id;});
  
        console.log(options);
        renderData(filteredData[0]);
        renderCharts(filteredData[0]);
        
    });
    
};

getMetaData();


function renderCharts(obj){
    d3.json("data/samples.json").then((sample_data) => {
        var filterSamples = sample_data.samples.filter(x => x.id == obj.id);
        // console.log(sample_data);
        // console.log(filterSamples);
        var sampleIds = filterSamples[0].otu_ids;
        // console.log(sampleIds)
        var sample_values = filterSamples[0].sample_values.slice(0,10).reverse();
        // console.log(sampleValues)
        var otu_labels = filterSamples[0].otu_labels.slice(0,10);
        // console.log(sampleLabels)
        var topOtu = (filterSamples[0].otu_ids.slice(0,10)).reverse();
        var otu_ids = topOtu.map(d => "OTU" + d);
        // console.log(`otu IDs: ${otuId}`);
        var otu_labels = filterSamples[0].otu_labels.slice(0,10);
        // console.log(`otu labels: ${otuLabels}`)

        var trace1 ={
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            marker: {
                color: "blue"},
                type: "bar",
                orientation: "h"
        };

        var layout_1 = {
            title: "Top 10 OTU by Subject"

        };

        var data = [trace1];

        Plotly.newPlot("bar", data, layout_1);

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker:{ 
                size: sample_values,
                color: "pink"
            },
            text: otu_labels

        };

        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2, layout_2)
    });

    // function init() {
    //     d3.json("data/samples.json").then((data) => {
    //         console.log(data)

    //         data.names.forEach((name) => {
    //             d3.select("#selDataset")
    //             .append("option")
    //             .text(name)
    //             .property("value");
    //         });
    //         renderCharts(data.names[0]);
            
    //     })
    // }
    // // init();
}


renderCharts()    
