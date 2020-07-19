// const path = "va_april_DOH.csv";
const path = "va_all_pandemic.csv";
const path_2="case_accell_RVA_April_May.csv"
var hospitalizations=[];
var cases = [];
var deaths = [];
var dates = [];
var cases_14=[];
var hosp_14=[];
var deaths_14=[];

var daily_avg = []
var change_in_avg = []
var dates_2 = []  
var cases_2 = []

function init (){
    d3.csv(path).then((object)=>{
        // console.log(object);
        object.forEach((row) =>{
            // console.log(row);
            Object.entries(row).forEach(([key, value])=>{
            // console.log(key, value);
            if(key=="Report_Date"){
                dates.push(value)
                }  
            else if (key=="Total Cases") {
                cases.push(value)                
            }
            else if (key=="Hospitalizations") {
                hospitalizations.push(value)                
            }
            else if (key=="Deaths") {
                deaths.push(value)                
            }
            else if (key=="Total_Cases_+14d") {
                cases_14.push(value)                
            }
            else if (key=="Hosp +14d") {
                hosp_14.push(value)                
            }
            else if (key=="Death +14d") {
                deaths_14.push(value)                
            }
            }          
            )
        })

// console.log(dates)
// console.log(cases)
// console.log(hospitalizations)
// console.log(deaths)

//multi line
var trace1 = {
    x: dates,
    y: cases,
    text: 'cases',
    mode: 'lines',
    line: {
    color: 'green',
    width: 3},
    name: 'confirmed cases at date'
  };

  var trace2 = {
    x: dates,
    y: hospitalizations,
    text: 'hospitalizations',
    mode: 'lines',
    line: {
    color: 'orange',
    width: 3},
    name: 'confirmed hospitalizations at date'
  };

  var trace3 = {
    x: dates,
    y: deaths,
    text: 'deaths',
    mode: 'lines',
    line: {
    color: 'red',
    width: 3},
    name: 'confirmed deaths at date'
  };

  var trace1b = {
    x: dates,
    y: cases_14,
    text: 'cases +14',
    mode: 'lines',
    line: {
    dash: 'dot',
    color: '0ED41B',
    width: 3},
    name: 'cases 14 days from date'
  };

  var trace2b = {
    x: dates,
    y: hosp_14,
    text: 'hospitalizations +14',
    mode: 'lines',
    line: {
    dash: 'dot',
    color: 'FFDD6C',
    width: 3},
    name: 'hospitalizations 14 days from date'
  };

  var trace3b = {
    x: dates,
    y: deaths_14,
    text: 'deaths +14',
    mode: 'lines',
    line: {
    dash: 'dot',
    color: 'FF96B2',
    width: 3},
    name: 'deaths 14 days from date'
  };
  
  var data = [trace1, trace2, trace3, trace1b, trace2b, trace3b];
  
  var layout = {
    title: 'Cases, hospitalizations and deaths in Virginia for April-June',
    xaxis:{title: "Day of pandemic"},
    showlegend: true    
  };
  
  Plotly.newPlot('line', data, layout);
}
)
}

init()

// function init_2(){
// var width = 300
// margin = ({top: 10, right: 120, bottom: 10, left: 40})

// dy = width / 6
// dx = 10


// d3.json('flare-2.json').then((data)=>{
//   tree = d3.tree().nodeSize([dx, dy])
//   diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

  
//     const root = d3.hierarchy(data);
  
//     root.x0 = dy / 2;
//     root.y0 = 0;
//     root.descendants().forEach((d, i) => {
//       d.id = i;
//       d._children = d.children;
//       if (d.depth && d.data.name.length !== 7) d.children = null;
//     });
  
//     const svg = d3.create("svg")
//         .attr("viewBox", [-margin.left, -margin.top, width, dx])
//         .style("font", "10px sans-serif")
//         .style("user-select", "none");
  
//     const gLink = svg.append("g")
//         .attr("fill", "none")
//         .attr("stroke", "#555")
//         .attr("stroke-opacity", 0.4)
//         .attr("stroke-width", 1.5);
  
//     const gNode = svg.append("g")
//         .attr("cursor", "pointer")
//         .attr("pointer-events", "all");
  
//     function update(source) {
//       const duration = d3.event && d3.event.altKey ? 2500 : 250;
//       const nodes = root.descendants().reverse();
//       const links = root.links();
  
//       // Compute the new tree layout.
//       tree(root);
  
//       let left = root;
//       let right = root;
//       root.eachBefore(node => {
//         if (node.x < left.x) left = node;
//         if (node.x > right.x) right = node;
//       });
  
//       const height = right.x - left.x + margin.top + margin.bottom;
  
//       const transition = svg.transition()
//           .duration(duration)
//           .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
//           .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));
  
//       // Update the nodes…
//       const node = gNode.selectAll("g")
//         .data(nodes, d => d.id);
  
//       // Enter any new nodes at the parent's previous position.
//       const nodeEnter = node.enter().append("g")
//           .attr("transform", d => `translate(${source.y0},${source.x0})`)
//           .attr("fill-opacity", 0)
//           .attr("stroke-opacity", 0)
//           .on("click", d => {
//             d.children = d.children ? null : d._children;
//             update(d);
//           });
  
//       nodeEnter.append("circle")
//           .attr("r", 2.5)
//           .attr("fill", d => d._children ? "#555" : "#999")
//           .attr("stroke-width", 10);
  
//       nodeEnter.append("text")
//           .attr("dy", "0.31em")
//           .attr("x", d => d._children ? -6 : 6)
//           .attr("text-anchor", d => d._children ? "end" : "start")
//           .text(d => d.data.name)
//         .clone(true).lower()
//           .attr("stroke-linejoin", "round")
//           .attr("stroke-width", 3)
//           .attr("stroke", "white");
  
//       // Transition nodes to their new position.
//       const nodeUpdate = node.merge(nodeEnter).transition(transition)
//           .attr("transform", d => `translate(${d.y},${d.x})`)
//           .attr("fill-opacity", 1)
//           .attr("stroke-opacity", 1);
  
//       // Transition exiting nodes to the parent's new position.
//       const nodeExit = node.exit().transition(transition).remove()
//           .attr("transform", d => `translate(${source.y},${source.x})`)
//           .attr("fill-opacity", 0)
//           .attr("stroke-opacity", 0);
  
//       // Update the links…
//       const link = gLink.selectAll("path")
//         .data(links, d => d.target.id);
  
//       // Enter any new links at the parent's previous position.
//       const linkEnter = link.enter().append("path")
//           .attr("d", d => {
//             const o = {x: source.x0, y: source.y0};
//             return diagonal({source: o, target: o});
//           });
  
//       // Transition links to their new position.
//       link.merge(linkEnter).transition(transition)
//           .attr("d", diagonal);
  
//       // Transition exiting nodes to the parent's new position.
//       link.exit().transition(transition).remove()
//           .attr("d", d => {
//             const o = {x: source.x, y: source.y};
//             return diagonal({source: o, target: o});
//           });
  
//       // Stash the old positions for transition.
//       root.eachBefore(d => {
//         d.x0 = d.x;
//         d.y0 = d.y;
//       });
//     }
  
//     update(root);
  
//     return svg.node();
  
// })
// }

// init_2()
